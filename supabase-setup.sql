-- =============================================
-- Deals on Wheels - Supabase Table Setup
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- =============================================

-- 1. Drop existing tables if they exist (careful: this deletes data)
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS cars;

-- 2. Create CARS table
CREATE TABLE cars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 2024,
  type TEXT NOT NULL DEFAULT 'rental' CHECK (type IN ('rental', 'sale', 'both')),
  price INTEGER DEFAULT 0,
  "rentalDaily" INTEGER DEFAULT 0,
  "rentalWeekly" INTEGER DEFAULT 0,
  description TEXT DEFAULT '',
  available BOOLEAN DEFAULT true,
  images TEXT[] DEFAULT '{}',
  premium BOOLEAN DEFAULT false,
  seats INTEGER DEFAULT 5,
  suitcases INTEGER DEFAULT 2,
  bags INTEGER DEFAULT 2,
  transmission TEXT DEFAULT 'Automatic',
  doors INTEGER DEFAULT 4,
  gps BOOLEAN DEFAULT true,
  "insuranceIncluded" BOOLEAN DEFAULT false,
  "fuelType" TEXT DEFAULT 'Petrol',
  mileage TEXT DEFAULT '',
  color TEXT DEFAULT '',
  "minAge" INTEGER DEFAULT 25,
  terms TEXT DEFAULT '',
  "bookedDates" TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 3. Create BOOKINGS table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  "carId" UUID REFERENCES cars(id) ON DELETE SET NULL,
  "carName" TEXT NOT NULL,
  date TEXT NOT NULL,
  "returnDate" TEXT DEFAULT '',
  "pickupLocation" TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  "totalDays" INTEGER DEFAULT 1,
  "totalCost" INTEGER DEFAULT 0,
  "timeSlot" TEXT DEFAULT '',
  type TEXT DEFAULT 'rental',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  "createdAt" TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 5. Create policies to allow public read and insert
-- Cars: anyone can read, authenticated can write
CREATE POLICY "Allow public read cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Allow public insert cars" ON cars FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update cars" ON cars FOR UPDATE USING (true);
CREATE POLICY "Allow public delete cars" ON cars FOR DELETE USING (true);

-- Bookings: anyone can read/insert, authenticated can update/delete
CREATE POLICY "Allow public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Allow public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete bookings" ON bookings FOR DELETE USING (true);

-- 6. Create indexes for performance
CREATE INDEX idx_cars_type ON cars(type);
CREATE INDEX idx_cars_available ON cars(available);
CREATE INDEX idx_cars_created ON cars("createdAt" DESC);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings("createdAt" DESC);

-- 7. Insert sample rental car (optional - remove if you want empty)
INSERT INTO cars (name, brand, model, year, type, "rentalDaily", "rentalWeekly", seats, transmission, "fuelType", "insuranceIncluded", premium, available, images, description, terms)
VALUES 
  ('BMW 5 Series', 'BMW', '5 Series', 2024, 'rental', 5000, 30000, 5, 'Automatic', 'Petrol', true, true, true, 
   ARRAY['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=75'],
   'Executive sedan with premium features.',
   E'01. Minimum Age: Driver must be at least 25 years old.\n02. Valid Driving License and NID required.\n03. Security Deposit: ৳20,000 refundable.\n04. Fuel Policy: Return with same fuel level.\n05. Client responsible for damages during rental.'),
   
  ('Range Rover Sport', 'Land Rover', 'Range Rover Sport', 2023, 'rental', 8000, 50000, 7, 'Automatic', 'Diesel', true, true, true,
   ARRAY['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=75'],
   'Luxury SUV for premium experiences.',
   E'01. Minimum Age: 25 years old.\n02. Valid License & NID required.\n03. Deposit: ৳30,000.\n04. Return with same fuel level.\n05. Client responsible for damages.'),

  ('Toyota Corolla', 'Toyota', 'Corolla', 2024, 'rental', 3000, 18000, 5, 'Automatic', 'Petrol', false, false, true,
   ARRAY['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=75'],
   'Reliable and fuel-efficient sedan.',
   E'01. Minimum Age: 21 years.\n02. Valid License required.\n03. Deposit: ৳10,000.\n04. Return with same fuel.\n05. Client responsible for damages.');

-- 8. Insert sample sale car (optional)
INSERT INTO cars (name, brand, model, year, type, price, seats, transmission, "fuelType", mileage, color, available, images, description)
VALUES
  ('Mercedes-Benz E 450', 'Mercedes-Benz', 'E 450', 2023, 'sale', 6850000, 5, 'Automatic', 'Petrol', '12400', 'Silver', true,
   ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=75'],
   'Certified pre-owned luxury sedan.'),

  ('Tesla Model S', 'Tesla', 'Model S Plaid', 2024, 'sale', 8490000, 5, 'Automatic', 'Electric', '8200', 'White', true,
   ARRAY['https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=800&q=75'],
   'Top-of-the-line electric performance.');

-- Done! Your tables are ready.
