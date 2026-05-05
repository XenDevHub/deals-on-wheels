"use client";

import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhoRentsSection from "@/components/WhoRentsSection";
import EverythingIncludedSection from "@/components/EverythingIncludedSection";
import WhyChooseHybridSection from "@/components/WhyChooseHybridSection";
import RentVsBuySection from "@/components/RentVsBuySection";

const RentalSection = lazy(() => import("@/components/RentalSection"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const SalesSection = lazy(() => import("@/components/SalesSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => (
  <div className="w-full py-24 flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  return (
    <main className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar />

      <HeroSection />







      <div className="relative">
        <Suspense fallback={<SectionLoader />}>
          <RentalSection />
        </Suspense>
        <WhoRentsSection />
        <Suspense fallback={<SectionLoader />}>
          <WhyChooseUs />
        </Suspense>
        <EverythingIncludedSection />
        <Suspense fallback={<SectionLoader />}>
          <SalesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
      </div>
      <WhyChooseHybridSection />

      <RentVsBuySection />
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </main>
  );
}
