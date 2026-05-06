// src/app/admin/page.jsx
"use client";

import { useState, useEffect } from "react";
import { auth, storage } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [bookingFilter, setBookingFilter] = useState("all");

  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [carFormData, setCarFormData] = useState({
    name: "", brand: "", model: "", year: new Date().getFullYear(),
    type: "rental", price: 0, rentalDaily: 0, rentalWeekly: 0,
    description: "", available: true, images: [],
    premium: false,
    seats: 5,
    suitcases: 2,
    bags: 2,
    transmission: "Automatic",
    doors: 4,
    gps: true,
    insuranceIncluded: false,
    fuelType: "Petrol",
    mileage: "",
    color: "",
    minAge: 25,
    terms: "01. Minimum Age: Driver must be at least 25 years old with a valid driving license.\n02. Identification: Valid Driving License and Passport required.\n03. Security Deposit: A refundable security deposit of $1,000 is required.\n04. Usage: Vehicle must be driven within state boundaries or as per agreement.\n05. Fuel Policy: Vehicle will be delivered with a full tank and must be returned with a full tank."
  });
  const [uploadingImages, setUploadingImages] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    const { data: bookingsData } = await supabase.from("bookings").select("*").order("createdAt", { ascending: false });
    setBookings(bookingsData || []);

    const { data: carsData } = await supabase.from("cars").select("*").order("createdAt", { ascending: false });
    setCars(carsData || []);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      setLoginError("Invalid email or password");
    }
  };

  const handleLogout = () => signOut(auth);

  // Booking Actions
  const updateBookingStatus = async (id, status) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    fetchData();
  };

  const deleteBooking = async (id) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      await supabase.from("bookings").delete().eq("id", id);
      fetchData();
    }
  };

  // Car Actions
  const handleCarSubmit = async (e) => {
    e.preventDefault();
    setUploadingImages(true);
    try {
      const carData = { ...carFormData, createdAt: new Date().toISOString() };
      // Remove id from carData if it's there
      delete carData.id;
      if (editingCar) {
        await supabase.from("cars").update(carData).eq("id", editingCar.id);
      } else {
        await supabase.from("cars").insert([carData]);
      }
      setIsCarModalOpen(false);
      setEditingCar(null);
      setCarFormData({
        name: "", brand: "", model: "", year: new Date().getFullYear(),
        type: "rental", price: 0, rentalDaily: 0, rentalWeekly: 0,
        description: "", available: true, images: [],
        premium: false, seats: 5, suitcases: 2, bags: 2, transmission: "Automatic", doors: 4, gps: true, insuranceIncluded: false, fuelType: "Petrol", mileage: "", color: "", minAge: 25,
        terms: "01. Minimum Age: Driver must be at least 25 years old with a valid driving license.\n02. Identification: Valid Driving License and Passport required.\n03. Security Deposit: A refundable security deposit of $1,000 is required.\n04. Usage: Vehicle must be driven within state boundaries or as per agreement.\n05. Fuel Policy: Vehicle will be delivered with a full tank and must be returned with a full tank."
      });
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Error saving car. Check console for details.");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploadingImages(true);
    const newUrls = [];
    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('car-images')
          .upload(fileName, file);
          
        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('car-images')
          .getPublicUrl(fileName);

        newUrls.push(data.publicUrl);
      }
      setCarFormData({ ...carFormData, images: [...carFormData.images, ...newUrls] });
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Image upload failed. Ensure you have created a public bucket named 'car-images' in Supabase, or use the 'Add Image URL' option instead.");
    }
    setUploadingImages(false);
  };

  const addImageUrl = () => {
    if (tempImageUrl.trim()) {
      setCarFormData({ ...carFormData, images: [...carFormData.images, tempImageUrl.trim()] });
      setTempImageUrl("");
    }
  };

  const removeImage = (url) => {
    setCarFormData({ ...carFormData, images: carFormData.images.filter(i => i !== url) });
  };

  const deleteCar = async (car) => {
    if (confirm("Are you sure? This will delete the car and its images from the database.")) {
      // Delete from Storage (ignore errors if image already deleted)
      for (const url of car.images || []) {
        try {
          if (url.includes("supabase.co") || url.includes("supabase.in")) {
            const urlParts = url.split('/car-images/');
            if (urlParts.length > 1) {
              const filePath = urlParts[1];
              await supabase.storage.from('car-images').remove([filePath]);
            }
          } else if (url.includes("firebasestorage")) {
            const imageRef = ref(storage, url);
            await deleteObject(imageRef);
          }
        } catch (e) { console.error(e); }
      }
      // Delete from Supabase
      await supabase.from("cars").delete().eq("id", car.id);
      fetchData();
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md bg-white border border-slate-200 p-10 shadow-2xl rounded-2xl"
        >
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="relative h-16 w-16 mb-4">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl font-black italic font-display text-slate-900 tracking-tighter mb-2">
              Deals<span className="text-primary">On</span>Wheels
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block">Email Address</label>
              <input 
                type="email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" 
                required 
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block">Password</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" 
                required 
              />
            </div>
            {loginError && <p className="text-red-500 text-xs tracking-wide">{loginError}</p>}
            <button type="submit" className="w-full py-4 mt-4 bg-slate-900 text-white font-bold text-xs uppercase tracking-widest transition-all hover:bg-slate-800 active:scale-[0.98] rounded-xl">
              LOGIN TO DASHBOARD
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary/10 selection:text-primary">
      {/* Header */}
      <div className="border-b border-slate-100 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black italic font-display text-slate-900 tracking-tighter">
                Deals<span className="text-primary">On</span>Wheels
              </span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden md:block" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-slate-400 hidden md:block">Inventory Dashboard</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[10px] font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-4 py-2 uppercase tracking-widest transition-colors hidden md:block rounded-lg">
              BACK TO SITE
            </Link>
            <span className="text-xs text-slate-400 tracking-widest uppercase hidden md:block">{user.email}</span>
            <button onClick={handleLogout} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-4 py-2 uppercase tracking-widest transition-colors rounded-lg">
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-12 border-b border-slate-100 pb-px">
          {["bookings", "cars"].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all relative ${
                activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-primary" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "bookings" ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
              {["all", "pending", "confirmed", "rejected"].map(filter => (
                <button 
                  key={filter} 
                  onClick={() => setBookingFilter(filter)} 
                  className={`px-6 py-2 border text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg ${
                    bookingFilter === filter 
                      ? "border-primary text-primary bg-primary/5" 
                      : "border-slate-200 text-slate-400 hover:border-slate-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {bookings.filter(b => bookingFilter === "all" || b.status === bookingFilter).map(b => (
                <div key={b.id} className="bg-slate-50 p-6 border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-colors hover:border-slate-200 rounded-2xl">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{b.name}</h3>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-200/50 px-2 py-1 rounded">{b.phone}</span>
                    </div>
                    <p className="text-xs text-slate-500 tracking-wide mb-3">
                      <span className="text-primary font-bold">{b.carName}</span> · {b.date} · {b.timeSlot}
                    </p>
                    <div className={`inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-widest border rounded-full ${
                      b.status === 'confirmed' ? 'border-green-200 text-green-600 bg-green-50' :
                      b.status === 'rejected' ? 'border-red-200 text-red-600 bg-red-50' :
                      'border-yellow-200 text-yellow-700 bg-yellow-50'
                    }`}>
                      {b.status}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={() => updateBookingStatus(b.id, "confirmed")} className="flex-1 md:flex-none px-4 py-2 bg-green-50 text-green-600 text-xs font-bold border border-green-200 hover:bg-green-100 transition-colors rounded-lg">APPROVE</button>
                    <button onClick={() => updateBookingStatus(b.id, "rejected")} className="flex-1 md:flex-none px-4 py-2 bg-yellow-50 text-yellow-700 text-xs font-bold border border-yellow-200 hover:bg-yellow-100 transition-colors rounded-lg">REJECT</button>
                    <button onClick={() => deleteBooking(b.id)} className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold border border-red-200 hover:bg-red-100 transition-colors rounded-lg">✕</button>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && (
                <div className="py-20 text-center border border-dashed border-slate-200 text-slate-400 text-xs tracking-widest uppercase rounded-2xl">
                  No bookings found
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-bebas text-slate-900 tracking-widest">INVENTORY</h2>
              <button 
                onClick={() => {
                  setEditingCar(null);
                  setCarFormData({ 
                    name: "", brand: "", model: "", year: new Date().getFullYear(), 
                    type: "rental", price: 0, rentalDaily: 0, rentalWeekly: 0, 
                    description: "", available: true, images: [],
                    premium: false, seats: 5, suitcases: 2, bags: 2, transmission: "Automatic", doors: 4, gps: true, insuranceIncluded: false, fuelType: "Petrol", mileage: "", color: "", minAge: 25,
                    terms: "01. Minimum Age: Driver must be at least 25 years old with a valid driving license.\n02. Identification: Passport or National ID required for security verification.\n03. Security Deposit: A refundable security deposit of ৳20,000 is required upon delivery.\n04. Usage: Vehicle must be driven within national boundaries only.\n05. Fuel Policy: Vehicle will be delivered with a full tank and must be returned with a full tank."
                  });
                  setIsCarModalOpen(true);
                }}
                className="px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors rounded-xl shadow-lg"
              >
                + ADD VEHICLE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map(car => (
                <div key={car.id} className="bg-white border border-slate-100 flex flex-col hover:border-slate-200 transition-all hover:shadow-xl rounded-2xl overflow-hidden group">
                  <div className="relative h-56 w-full overflow-hidden bg-slate-50">
                    {car.images?.[0] && (
                      <Image src={car.images[0]} alt={car.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    )}
                    <div className="absolute top-4 right-4 px-2 py-1 bg-white/80 backdrop-blur-md border border-slate-200 text-[9px] font-bold tracking-widest uppercase text-slate-900 rounded">
                      {car.type}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bebas tracking-wide mb-1 uppercase text-slate-900">{car.name}</h3>
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-6">{car.brand} · {car.model} · {car.year}</p>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-slate-50">
                      <button 
                        onClick={() => {
                          setEditingCar(car);
                          setCarFormData(car);
                          setIsCarModalOpen(true);
                        }} 
                        className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors rounded-lg"
                      >
                        EDIT
                      </button>
                      <button onClick={() => deleteCar(car)} className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-600 border border-red-100 hover:bg-red-50 transition-colors rounded-lg">
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Car Form Modal */}
      <AnimatePresence>
        {isCarModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCarModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] rounded-[2rem]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-2xl font-bebas text-slate-900 tracking-widest">{editingCar ? "EDIT VEHICLE DETAILS" : "NEW VEHICLE ENTRY"}</h2>
                <button onClick={() => setIsCarModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">✕</button>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto no-scrollbar">
                <form onSubmit={handleCarSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  
                  {/* Left Column: Details */}
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Vehicle Name</label>
                      <input type="text" value={carFormData.name} onChange={(e) => setCarFormData({...carFormData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" required placeholder="e.g. Porsche 911 GT3 RS" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Brand</label>
                        <input type="text" value={carFormData.brand} onChange={(e) => setCarFormData({...carFormData, brand: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" required placeholder="e.g. Porsche" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Model</label>
                        <input type="text" value={carFormData.model} onChange={(e) => setCarFormData({...carFormData, model: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" required placeholder="e.g. 911" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Manufacture Year</label>
                        <input type="number" value={carFormData.year} onChange={(e) => setCarFormData({...carFormData, year: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" required />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Listing Type</label>
                        <select value={carFormData.type} onChange={(e) => setCarFormData({...carFormData, type: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl appearance-none cursor-pointer">
                          <option value="rental">Rental Only</option>
                          <option value="sale">Sale Only</option>
                          <option value="both">Both (Rental & Sale)</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-6 space-y-6">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Pricing Configuration</h3>
                      
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Total Sale Price (AUD)</label>
                        <input type="number" value={carFormData.price} onChange={(e) => setCarFormData({...carFormData, price: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm font-mono text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" placeholder="e.g. 45000" />
                        <p className="text-[9px] text-slate-400 mt-1">Leave 0 if not for sale.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Weekly Rental Rate (AUD) *</label>
                          <input type="number" value={carFormData.rentalWeekly} onChange={(e) => setCarFormData({...carFormData, rentalWeekly: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm font-mono text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" placeholder="e.g. 700" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-6 space-y-6">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Detailed Specifications</h3>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-100 bg-slate-50 hover:border-slate-300 transition-colors rounded-xl">
                          <div className={`w-4 h-4 border flex items-center justify-center transition-colors rounded ${carFormData.premium ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                            {carFormData.premium && <span className="text-white text-[10px]">✓</span>}
                          </div>
                          <input type="checkbox" checked={carFormData.premium} onChange={(e) => setCarFormData({...carFormData, premium: e.target.checked})} className="hidden" />
                          <span className="text-[10px] tracking-widest uppercase text-slate-600 font-bold">Premium Brand</span>
                        </label>
                        
                        <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-100 bg-slate-50 hover:border-slate-300 transition-colors rounded-xl">
                          <div className={`w-4 h-4 border flex items-center justify-center transition-colors rounded ${carFormData.gps ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                            {carFormData.gps && <span className="text-white text-[10px]">✓</span>}
                          </div>
                          <input type="checkbox" checked={carFormData.gps} onChange={(e) => setCarFormData({...carFormData, gps: e.target.checked})} className="hidden" />
                          <span className="text-[10px] tracking-widest uppercase text-slate-600 font-bold">GPS Included</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-100 bg-slate-50 hover:border-slate-300 transition-colors rounded-xl">
                          <div className={`w-4 h-4 border flex items-center justify-center transition-colors rounded ${carFormData.insuranceIncluded ? 'bg-green-500 border-green-500' : 'border-slate-300 bg-white'}`}>
                            {carFormData.insuranceIncluded && <span className="text-white text-[10px]">✓</span>}
                          </div>
                          <input type="checkbox" checked={carFormData.insuranceIncluded} onChange={(e) => setCarFormData({...carFormData, insuranceIncluded: e.target.checked})} className="hidden" />
                          <span className="text-[10px] tracking-widest uppercase text-slate-600 font-bold">Insurance Included</span>
                        </label>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Fuel Type</label>
                          <select value={carFormData.fuelType} onChange={(e) => setCarFormData({...carFormData, fuelType: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl appearance-none cursor-pointer">
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="CNG">CNG</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Mileage (km)</label>
                          <input type="text" value={carFormData.mileage} onChange={(e) => setCarFormData({...carFormData, mileage: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" placeholder="e.g. 12,000" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Color</label>
                          <input type="text" value={carFormData.color} onChange={(e) => setCarFormData({...carFormData, color: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" placeholder="e.g. Midnight Black" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Seats</label>
                          <input type="number" value={carFormData.seats} onChange={(e) => setCarFormData({...carFormData, seats: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Transmission</label>
                          <select value={carFormData.transmission} onChange={(e) => setCarFormData({...carFormData, transmission: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl appearance-none cursor-pointer">
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Suitcases (Large)</label>
                          <input type="number" value={carFormData.suitcases} onChange={(e) => setCarFormData({...carFormData, suitcases: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Bags (Small)</label>
                          <input type="number" value={carFormData.bags} onChange={(e) => setCarFormData({...carFormData, bags: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Doors</label>
                          <input type="number" value={carFormData.doors} onChange={(e) => setCarFormData({...carFormData, doors: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Min Driver Age</label>
                          <input type="number" value={carFormData.minAge} onChange={(e) => setCarFormData({...carFormData, minAge: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Rental Terms & Conditions</label>
                        <textarea value={carFormData.terms} onChange={(e) => setCarFormData({...carFormData, terms: e.target.value})} className="w-full h-32 bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors resize-none rounded-xl" placeholder="Enter rental rules and conditions..." />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-6">
                      <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Vehicle Description</label>
                      <textarea value={carFormData.description} onChange={(e) => setCarFormData({...carFormData, description: e.target.value})} className="w-full h-32 bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 outline-none focus:border-primary transition-colors resize-none rounded-xl" placeholder="Enter detailed specifications and description..." />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-100 bg-slate-50 mt-4 hover:border-slate-300 transition-colors rounded-xl">
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors rounded ${carFormData.available ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                        {carFormData.available && <span className="text-white text-[10px]">✓</span>}
                      </div>
                      <input type="checkbox" checked={carFormData.available} onChange={(e) => setCarFormData({...carFormData, available: e.target.checked})} className="hidden" />
                      <span className="text-xs tracking-widest uppercase text-slate-600 font-bold">Vehicle is available for public</span>
                    </label>
                  </div>

                  {/* Right Column: Images & Submit */}
                  <div className="space-y-6 flex flex-col">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Media Gallery</label>
                      <div className="relative border border-dashed border-slate-300 bg-slate-50 hover:border-primary transition-colors cursor-pointer group rounded-2xl">
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="py-16 px-6 text-center flex flex-col items-center">
                          <svg className="w-8 h-8 text-slate-300 mb-4 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-xs font-bold tracking-widest text-slate-900 uppercase">Click or drag images here</p>
                          <p className="text-[9px] text-slate-400 tracking-widest uppercase mt-2">Max 5 high-res images</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-4">
                      <label className="text-[10px] text-slate-400 uppercase tracking-[0.15em] mb-2 block font-bold">Or Add Image URL (If Upload Fails)</label>
                      <div className="flex gap-2">
                        <input 
                          type="url" 
                          value={tempImageUrl}
                          onChange={(e) => setTempImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/..." 
                          className="w-full bg-slate-50 border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:border-primary transition-colors rounded-xl" 
                        />
                        <button 
                          type="button"
                          onClick={addImageUrl}
                          className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest transition-colors rounded-xl border border-slate-200"
                        >
                          ADD
                        </button>
                      </div>
                    </div>

                    {uploadingImages && (
                      <div className="text-center py-4 border border-slate-100 bg-slate-50 rounded-xl">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">Uploading Media...</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-grow content-start mt-4">
                      {carFormData.images.map((url, i) => (
                        <div key={i} className="relative aspect-square border border-slate-100 group overflow-hidden bg-slate-50 rounded-xl">
                          <Image src={url} alt={`Preview ${i}`} fill className="object-cover transition-opacity" />
                          <button type="button" onClick={() => removeImage(url)} className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 backdrop-blur text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-full shadow-lg">✕</button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100 mt-auto flex gap-4">
                      <button type="button" onClick={() => setIsCarModalOpen(false)} className="flex-1 py-4 bg-transparent border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-400 text-xs font-bold uppercase tracking-widest transition-all rounded-xl">
                        CANCEL
                      </button>
                      <button type="submit" disabled={uploadingImages} className="flex-1 py-4 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 rounded-xl shadow-xl">
                        SAVE VEHICLE
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
