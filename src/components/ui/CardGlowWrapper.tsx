'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CardGlowWrapperProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'indigo' | 'violet' | 'cyan' | 'emerald' | 'rose';
  as?: 'article' | 'section' | 'div';
}

export function CardGlowWrapper({
  children,
  className,
  glowColor = 'indigo',
  as = 'article',
}: CardGlowWrapperProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for raw mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Premium standardized spring physics config (stiffness ~300, damping ~22)
  const springConfig = { stiffness: 300, damping: 22, mass: 0.85 };

  // Smooth mouse coordinates (lags slightly behind for elegant inertia)
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Micro tilt values (max 2.2 degrees for organic tilt)
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Scale spring
  const scale = useSpring(1, springConfig);

  // Interactive style interpolations
  const hoverActive = useSpring(0, springConfig); // 0 (normal) -> 1 (hovered)

  const borderColors = {
    indigo: 'rgba(99, 102, 241, 0.22)',
    violet: 'rgba(139, 92, 246, 0.22)',
    cyan: 'rgba(6, 182, 212, 0.22)',
    emerald: 'rgba(16, 185, 129, 0.22)',
    rose: 'rgba(244, 63, 94, 0.22)',
  };

  const shadowColors = {
    indigo: 'rgba(99, 102, 241, 0.08)',
    violet: 'rgba(139, 92, 246, 0.08)',
    cyan: 'rgba(6, 182, 212, 0.08)',
    emerald: 'rgba(16, 185, 129, 0.08)',
    rose: 'rgba(244, 63, 94, 0.08)',
  };

  const glowColors = {
    indigo: 'rgba(99, 102, 241, 0.12)',
    violet: 'rgba(139, 92, 246, 0.12)',
    cyan: 'rgba(6, 182, 212, 0.12)',
    emerald: 'rgba(16, 185, 129, 0.12)',
    rose: 'rgba(244, 63, 94, 0.12)',
  };

  const borderColorStyle = useTransform(
    hoverActive,
    [0, 1],
    ['rgba(255, 255, 255, 0.05)', borderColors[glowColor]]
  );

  const shadowStyle = useTransform(
    hoverActive,
    [0, 1],
    [
      '0 4px 30px rgba(0, 0, 0, 0.5)',
      `0 20px 50px rgba(0, 0, 0, 0.75), 0 0 30px ${shadowColors[glowColor]}`
    ]
  );

  // Dual-gradient spotlight blending primary highlight and ambient cyan
  const spotlightBackground = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(280px circle at ${x}px ${y}px, ${glowColors[glowColor]} 0%, rgba(6, 182, 212, 0.04) 50%, transparent 100%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Normalize coordinates relative to card center (-1 to 1 range)
    const dx = (x - rect.width / 2) / (rect.width / 2);
    const dy = (y - rect.height / 2) / (rect.height / 2);

    // Apply micro tilt values (tilt max 2.2 degrees to look organic)
    rotateX.set(-dy * 2.2);
    rotateY.set(dx * 2.2);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.015);
    hoverActive.set(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    hoverActive.set(0);
  };

  // Determine motion element tag type statically to optimize SSR
  const MotionTag = as === 'article' 
    ? motion.article 
    : as === 'section' 
      ? motion.section 
      : motion.div;

  return (
    <MotionTag
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scale,
        rotateX,
        rotateY,
        transformPerspective: 1000,
        borderColor: borderColorStyle,
        boxShadow: shadowStyle,
      }}
      className={cn(
        "glass-panel relative rounded-2xl overflow-hidden transition-colors duration-300",
        className
      )}
    >
      {/* GPU-accelerated spring-smoothed spotlight mask */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: spotlightBackground,
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </MotionTag>
  );
}
