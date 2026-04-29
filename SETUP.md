# Deals on Wheels Setup Guide

## Firebase Configuration

### 1. Firestore Collections

#### `cars` collection
Each document in this collection represents a car.
```json
{
  "name": "Toyota Corolla 2023",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2023,
  "type": "rental",           // "rental" | "sale" | "both"
  "price": 150000,            // sale price in BDT
  "rentalDaily": 3500,
  "rentalWeekly": 20000,
  "description": "...",
  "images": ["url1", "url2"], // Firebase Storage URLs
  "available": true,
  "bookedDates": ["2025-05-10", "2025-05-11"],
  "createdAt": timestamp
}
```

#### `bookings` collection
Each document in this collection represents a customer booking.
```json
{
  "name": "Customer Name",
  "phone": "01XXXXXXXXX",
  "carId": "firestore_doc_id",
  "carName": "Toyota Corolla 2023",
  "date": "2025-05-15",
  "timeSlot": "10:00 AM",
  "type": "rental",
  "status": "pending",        // "pending" | "confirmed" | "rejected"
  "createdAt": timestamp
}
```

### 2. Firestore Security Rules
Copy and paste these into your Firebase Console under Firestore > Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{id} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /cars/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Storage Rules
Copy and paste these into your Firebase Console under Storage > Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cars/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Authentication
Enable **Email/Password** authentication in the Firebase Console under Authentication > Sign-in method.
Create your admin account there manually to log in to the admin panel.

## Environment Variables
Ensure your `.env.local` file contains the following keys:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_WHATSAPP_NUMBER=8801XXXXXXXXX
```

## Running the Project
```bash
npm install
npm run dev
```
Navigate to `http://localhost:3000` to view the site.
Navigate to `http://localhost:3000/admin` to access the admin panel.
