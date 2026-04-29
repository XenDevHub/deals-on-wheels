// src/app/layout.jsx
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";

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
    <html lang="bn" className="dark">
      <body className={`${bebasNeue.variable} ${inter.variable} antialiased bg-[#050505] text-white selection:bg-primary/30 selection:text-white`}>
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
