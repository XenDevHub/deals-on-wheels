// src/app/layout.jsx
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Deals on Wheels | Exclusive Premium Car Rentals & Sales",
  description: "Drive Your Dreams, Rent Your Freedom. Experience the ultimate driving luxury.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${inter.variable} antialiased selection:bg-blue-500/30`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
