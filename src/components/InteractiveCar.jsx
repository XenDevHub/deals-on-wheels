// src/components/InteractiveCar.jsx
"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const InteractiveCar = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hero.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const offX = (clientX - centerX) / (width / 2);
      const offY = (clientY - centerY) / (height / 2);
      
      setRotation({ 
        x: Math.max(-5, Math.min(5, -offY * 5)), 
        y: Math.max(-10, Math.min(10, offX * 10)) 
      });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setRotation({ x: 0, y: 0 });
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center z-30"
      style={{ perspective: '1000px' }}
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          opacity: 0.6
        }}
      />

      <div
        className={`relative w-full h-full transition-transform duration-200 ease-out will-change-transform gpu ${!isHovering ? 'animate-float' : ''}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1592193666082-c44093c1860a?auto=format&fit=crop&w=1200&q=90"
          alt="Ferrari Rosso Corsa"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(0) rotateY(0); }
          50% { transform: translateY(-10px) rotateX(1deg) rotateY(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .gpu {
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

export default InteractiveCar;
