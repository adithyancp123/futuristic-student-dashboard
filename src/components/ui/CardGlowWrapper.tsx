'use client';

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowStyles = {
    indigo: 'rgba(99, 102, 241, 0.12)',
    violet: 'rgba(139, 92, 246, 0.12)',
    cyan: 'rgba(6, 182, 212, 0.12)',
    emerald: 'rgba(16, 185, 129, 0.12)',
    rose: 'rgba(244, 63, 94, 0.12)',
  };

  const borderStyles = {
    indigo: 'hover:border-indigo-500/25',
    violet: 'hover:border-violet-500/25',
    cyan: 'hover:border-cyan-500/25',
    emerald: 'hover:border-emerald-500/25',
    rose: 'hover:border-rose-500/25',
  };

  const Tag = as;

  return (
    <Tag
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "glass-panel relative rounded-2xl overflow-hidden transition-all duration-300",
        borderStyles[glowColor],
        className
      )}
    >
      {/* Glowing spotlight mask */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowStyles[glowColor]}, transparent 80%)`,
        }}
      />
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Tag>
  );
}
