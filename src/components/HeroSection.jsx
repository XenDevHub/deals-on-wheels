// src/components/HeroSection.jsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useRef, Suspense, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

function CarModel() {
  const { scene } = useGLTF("/ferrari.glb");
  
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Apply a high-contrast Arctic White & Obsidian Black finish
        if (child.name.toLowerCase().includes("body") || child.material.name.toLowerCase().includes("body")) {
          child.material.color = new THREE.Color("#ffffff"); // Arctic White
          child.material.metalness = 0.7;
          child.material.roughness = 0.05;
        } else {
          child.material.color = new THREE.Color("#050505"); // Obsidian Black
          child.material.metalness = 0.8;
          child.material.roughness = 0.2;
        }
        if (child.material.clearcoat !== undefined) child.material.clearcoat = 1.0;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1.8} position={[0, 0, 0]} />;
}
const HeroSection = () => {
  const { t, lang } = useLanguage();
  const headline = t.hero.headline;
  const subHeadline = t.hero.subHeadline;
  const containerRef = useRef(null);

  const isBn = lang === "bn";
  const titleClasses = isBn
    ? "text-4xl md:text-5xl lg:text-6xl font-bebas tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 leading-[1.4] pb-2"
    : "text-5xl md:text-6xl lg:text-7xl font-bebas tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 leading-[1.1] pb-2";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const textVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Exclusive Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,68,255,0.08)_0%,transparent_50%)]" />
      </div>
      {/* Background Gradient */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </motion.div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between z-20 mt-20 h-full w-full">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left pt-20 lg:pt-0">
          <div className="mask-container mb-6">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className={titleClasses}
            >
              {headline.split(",")[0]},<br />
              <span className="opacity-80">{headline.split(",")[1]}</span>
            </motion.h1>
          </div>

          <div className="mask-container mb-12">
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-sm md:text-lg text-white/60 max-w-xl font-light tracking-wide uppercase"
            >
              {subHeadline}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-6"
          >
            <button
              onClick={() => scrollTo("rentals")}
              className="btn-luxury px-12 py-5 text-white font-bold rounded-full uppercase tracking-widest text-xs z-10"
            >
              {t.hero.rentBtn}
            </button>

            <button
              onClick={() => scrollTo("sales")}
              className="group relative px-12 py-5 text-white font-bold rounded-full uppercase tracking-widest text-xs z-10 border border-transparent hover:border-white/20 transition-all"
            >
              <span className="relative z-10">{t.hero.buyBtn}</span>
              <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D Car */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="w-full lg:w-[60%] h-[50vh] lg:h-[80vh] cursor-grab active:cursor-grabbing relative z-30"
        >
          <Canvas shadows camera={{ position: [5, 3, 5], fov: 40 }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.6} adjustCamera={true}>
                <CarModel />
              </Stage>
              <Environment preset="city" />
            </Suspense>
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={1} 
              maxPolarAngle={Math.PI / 2} 
              minPolarAngle={0}
              makeDefault
            />
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 z-20 cursor-pointer flex flex-col items-center gap-4 left-1/2 -translate-x-1/2"
        onClick={() => scrollTo("rentals")}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
