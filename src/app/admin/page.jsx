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
    description: "", available: true, images: []
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
        description: "", available: true, images: []
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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 shadow-2xl"
        >
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bebas text-white tracking-widest mb-2">ADMIN</h1>
            <p className="text-xs text-white/40 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Email Address</label>
              <input 
                type="email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
                className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white outline-none focus:border-primary transition-colors" 
                required 
              />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Password</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white outline-none focus:border-primary transition-colors" 
                required 
              />
            </div>
            {loginError && <p className="text-red-500 text-xs tracking-wide">{loginError}</p>}
            <button type="submit" className="w-full py-4 mt-4 bg-white text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-white/90 active:scale-[0.98]">
              LOGIN TO DASHBOARD
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-bebas text-white tracking-widest">DEALS ON WHEELS <span className="text-primary ml-2">ADMIN</span></h1>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/40 tracking-widest uppercase hidden md:block">{user.email}</span>
            <button onClick={handleLogout} className="text-[10px] font-bold text-white/60 hover:text-white border border-white/10 px-4 py-2 uppercase tracking-widest transition-colors">
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-12 border-b border-white/5 pb-px">
          {["bookings", "cars"].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all relative ${
                activeTab === tab ? "text-white" : "text-white/40 hover:text-white/80"
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
                  className={`px-6 py-2 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                    bookingFilter === filter 
                      ? "border-primary text-primary bg-primary/5" 
                      : "border-white/10 text-white/40 hover:border-white/30"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {bookings.filter(b => bookingFilter === "all" || b.status === bookingFilter).map(b => (
                <div key={b.id} className="bg-[#0a0a0a] p-6 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-colors hover:border-white/10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{b.name}</h3>
                      <span className="text-[10px] text-white/40 font-mono bg-white/5 px-2 py-1">{b.phone}</span>
                    </div>
                    <p className="text-xs text-white/60 tracking-wide mb-3">
                      <span className="text-primary font-bold">{b.carName}</span> · {b.date} · {b.timeSlot}
                    </p>
                    <div className={`inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-widest border ${
                      b.status === 'confirmed' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                      b.status === 'rejected' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                      'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                    }`}>
                      {b.status}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={() => updateBookingStatus(b.id, "confirmed")} className="flex-1 md:flex-none px-4 py-2 bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 hover:bg-green-500/20 transition-colors">APPROVE</button>
                    <button onClick={() => updateBookingStatus(b.id, "rejected")} className="flex-1 md:flex-none px-4 py-2 bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors">REJECT</button>
                    <button onClick={() => deleteBooking(b.id)} className="px-4 py-2 bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20 hover:bg-red-500/20 transition-colors">✕</button>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && (
                <div className="py-20 text-center border border-dashed border-white/10 text-white/40 text-xs tracking-widest uppercase">
                  No bookings found
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-bebas text-white tracking-widest">INVENTORY</h2>
              <button 
                onClick={() => {
                  setEditingCar(null);
                  setCarFormData({ name: "", brand: "", model: "", year: new Date().getFullYear(), type: "rental", price: 0, rentalDaily: 0, rentalWeekly: 0, description: "", available: true, images: [] });
                  setIsCarModalOpen(true);
                }}
                className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
              >
                + ADD VEHICLE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map(car => (
                <div key={car.id} className="bg-[#0a0a0a] border border-white/5 flex flex-col hover:border-white/20 transition-colors group">
                  <div className="relative h-56 w-full overflow-hidden bg-[#050505]">
                    {car.images?.[0] && (
                      <Image src={car.images[0]} alt={car.name} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    )}
                    <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-bold tracking-widest uppercase text-white">
                      {car.type}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bebas tracking-wide mb-1 uppercase text-white">{car.name}</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-6">{car.brand} · {car.model} · {car.year}</p>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-white/5">
                      <button 
                        onClick={() => {
                          setEditingCar(car);
                          setCarFormData(car);
                          setIsCarModalOpen(true);
                        }} 
                        className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 hover:bg-white/5 transition-colors"
                      >
                        EDIT
                      </button>
                      <button onClick={() => deleteCar(car)} className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCarModalOpen(false)} className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md" />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#050505]">
                <h2 className="text-2xl font-bebas text-white tracking-widest">{editingCar ? "EDIT VEHICLE DETAILS" : "NEW VEHICLE ENTRY"}</h2>
                <button onClick={() => setIsCarModalOpen(false)} className="text-white/40 hover:text-white transition-colors">✕</button>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto no-scrollbar">
                <form onSubmit={handleCarSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  
                  {/* Left Column: Details */}
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Vehicle Name</label>
                      <input type="text" value={carFormData.name} onChange={(e) => setCarFormData({...carFormData, name: e.target.value})} className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white outline-none focus:border-primary transition-colors" required placeholder="e.g. Porsche 911 GT3 RS" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Brand</label>
                        <input type="text" value={carFormData.brand} onChange={(e) => setCarFormData({...carFormData, brand: e.target.value})} className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white outline-none focus:border-primary transition-colors" required placeholder="e.g. Porsche" />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Model</label>
                        <input type="text" value={carFormData.model} onChange={(e) => setCarFormData({...carFormData, model: e.target.value})} className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white outline-none focus:border-primary transition-colors" required placeholder="e.g. 911" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Manufacture Year</label>
                        <input type="number" value={carFormData.year} onChange={(e) => setCarFormData({...carFormData, year: e.target.value})} className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white outline-none focus:border-primary transition-colors" required />
                      </div>
                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Listing Type</label>
                        <select value={carFormData.type} onChange={(e) => setCarFormData({...carFormData, type: e.target.value})} className="w-full bg-[#050505] border border-white/10 p-4 text-sm text-white outline-none focus:border-primary transition-colors appearance-none">
                          <option value="rental">Rental Only</option>
                          <option value="sale">Sale Only</option>
                          <option value="both">Both (Rental & Sale)</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6 mt-6 space-y-6">
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Pricing Configuration</h3>
                      
                      {/* Explicit labels for pricing */}
                      <div>
                        <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Total Sale Price (BDT)</label>
                        <input type="number" value={carFormData.price} onChange={(e) => setCarFormData({...carFormData, price: parseInt(e.target.value) || 0})} className="w-full bg-[#050505] border border-white/10 p-4 text-sm font-mono text-white outline-none focus:border-primary transition-colors" placeholder="e.g. 15000000" />
                        <p className="text-[9px] text-white/30 mt-1">Leave 0 if not for sale.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Daily Rental Rate (BDT)</label>
                          <input type="number" value={carFormData.rentalDaily} onChange={(e) => setCarFormData({...carFormData, rentalDaily: parseInt(e.target.value) || 0})} className="w-full bg-[#050505] border border-white/10 p-4 text-sm font-mono text-white outline-none focus:border-primary transition-colors" placeholder="e.g. 5000" />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Weekly Rental Rate (BDT)</label>
                          <input type="number" value={carFormData.rentalWeekly} onChange={(e) => setCarFormData({...carFormData, rentalWeekly: parseInt(e.target.value) || 0})} className="w-full bg-[#050505] border border-white/10 p-4 text-sm font-mono text-white outline-none focus:border-primary transition-colors" placeholder="e.g. 30000" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6 mt-6">
                      <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Vehicle Description</label>
                      <textarea value={carFormData.description} onChange={(e) => setCarFormData({...carFormData, description: e.target.value})} className="w-full h-32 bg-[#050505] border border-white/10 p-4 text-sm text-white outline-none focus:border-primary transition-colors resize-none" placeholder="Enter detailed specifications and description..." />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-4 border border-white/5 bg-[#050505] mt-4 hover:border-white/20 transition-colors">
                      <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${carFormData.available ? 'bg-primary border-primary' : 'border-white/20'}`}>
                        {carFormData.available && <span className="text-white text-[10px]">✓</span>}
                      </div>
                      <input type="checkbox" checked={carFormData.available} onChange={(e) => setCarFormData({...carFormData, available: e.target.checked})} className="hidden" />
                      <span className="text-xs tracking-widest uppercase text-white/70">Vehicle is available for public</span>
                    </label>
                  </div>

                  {/* Right Column: Images & Submit */}
                  <div className="space-y-6 flex flex-col">
                    <div>
                      <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Media Gallery</label>
                      <div className="relative border border-dashed border-white/20 bg-[#050505] hover:border-primary/50 transition-colors cursor-pointer group">
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="py-16 px-6 text-center flex flex-col items-center">
                          <svg className="w-8 h-8 text-white/20 mb-4 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-xs font-bold tracking-widest text-white uppercase">Click or drag images here</p>
                          <p className="text-[9px] text-white/30 tracking-widest uppercase mt-2">Max 5 high-res images</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-4">
                      <label className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2 block">Or Add Image URL (If Upload Fails)</label>
                      <div className="flex gap-2">
                        <input 
                          type="url" 
                          value={tempImageUrl}
                          onChange={(e) => setTempImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/..." 
                          className="w-full bg-[#050505] border border-white/10 p-3 text-sm text-white outline-none focus:border-primary transition-colors" 
                        />
                        <button 
                          type="button"
                          onClick={addImageUrl}
                          className="px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                          ADD
                        </button>
                      </div>
                    </div>

                    {uploadingImages && (
                      <div className="text-center py-4 border border-white/5 bg-[#050505]">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">Uploading Media...</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-grow content-start mt-4">
                      {carFormData.images.map((url, i) => (
                        <div key={i} className="relative aspect-square border border-white/10 group overflow-hidden bg-[#050505]">
                          <Image src={url} alt={`Preview ${i}`} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          <button type="button" onClick={() => removeImage(url)} className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 backdrop-blur text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">✕</button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/5 mt-auto flex gap-4">
                      <button type="button" onClick={() => setIsCarModalOpen(false)} className="flex-1 py-4 bg-transparent border border-white/10 text-white/70 hover:text-white hover:border-white/30 text-xs font-bold uppercase tracking-widest transition-all">
                        CANCEL
                      </button>
                      <button type="submit" disabled={uploadingImages} className="flex-1 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all disabled:opacity-50">
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
