// src/components/HeroSection.jsx
"use client";

import { motion } from "framer-motion";
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
          child.material.color = new THREE.Color("#ff2800"); // Rosso Corsa (Red)
          child.material.metalness = 0.8;
          child.material.roughness = 0.1;
        } else {
          child.material.color = new THREE.Color("#050505"); // Obsidian Black
          child.material.metalness = 0.8;
          child.material.roughness = 0.2;
        }
        if (child.material.clearcoat !== undefined) child.material.clearcoat = 1.0;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1.3} position={[0, -0.5, 0]} />;
}

const HeroSection = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        type: "tween",
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.5 }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 gpu bg-[#080c14]"
    >
      {/* Exclusive Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
        {/* Left Side: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col space-y-6 text-center lg:text-left pt-20 lg:pt-0"
        >
          <motion.div variants={itemVariants}>
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px]">
              EXCLUSIVE LUXURY
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bebas leading-[1] text-heading tracking-tight"
          >
            {t.hero.headline}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-body text-base max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-80"
          >
            {t.hero.subHeadline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
          >
            <button className="btn-primary py-3 px-8 text-xs">
              {t.hero.rentBtn}
            </button>
            <button className="btn-secondary py-3 px-8 text-xs">
              {t.hero.buyBtn}
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 pt-8 justify-center lg:justify-start text-body/40"
          >
            <div className="flex flex-col">
              <span className="text-xl font-bebas text-heading tracking-widest">50+</span>
              <span className="text-[8px] uppercase tracking-widest">Luxury Cars</span>
            </div>
            <div className="w-[1px] h-8 bg-border-subtle" />
            <div className="flex flex-col">
              <span className="text-xl font-bebas text-heading tracking-widest">24/7</span>
              <span className="text-[8px] uppercase tracking-widest">Support</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive 3D Car */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="w-full h-[50vh] lg:h-[80vh] cursor-grab active:cursor-grabbing relative z-30"
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

      {/* Optimized bottom transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background-secondary to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
