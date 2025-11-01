'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { HTMLMotionProps, Variants } from 'framer-motion';
import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { cn } from '@/lib/utils';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'stagger';
  className?: string;
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  variant = 'fadeInUp', 
  className = '',
  delay = 0 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variantMap: Record<string, Variants> = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    stagger: staggerContainer
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variantMap[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// Floating animation for the Om symbol
export function FloatingOm({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Parallax effect for background elements
export function ParallaxElement({ 
  children, 
  speed = 0.5 
}: { 
  children: React.ReactNode; 
  speed?: number; 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className="will-change-transform">
      {children}
    </motion.div>
  );
}

// Enhanced parallax for hero backgrounds with multiple layers
export function ParallaxHero({ 
  children, 
  backgroundSpeed = 0.5,
  midgroundSpeed = 0.3,
  className = ""
}: { 
  children: React.ReactNode; 
  backgroundSpeed?: number;
  midgroundSpeed?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, backgroundSpeed * 150]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], [0, midgroundSpeed * 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background Layer */}
      <motion.div 
        style={{ y: backgroundY, scale }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/70 via-red-50/50 to-pink-100/70" />
      </motion.div>
      
      {/* Midground Layer */}
      <motion.div 
        style={{ y: midgroundY }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-orange-50/30" />
      </motion.div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Parallax text effects
export function ParallaxText({ 
  children, 
  speed = 0.2 
}: { 
  children: React.ReactNode; 
  speed?: number; 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.div 
      ref={ref} 
      style={{ y, opacity }} 
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.6, -0.05, 0.01, 0.99] 
      }}
    >
      {children}
    </motion.div>
  );
}

// Enhanced button with micro-interactions
type InteractiveButtonProps = HTMLMotionProps<'button'>;

export function InteractiveButton({ 
  children, 
  className = "",
  ...props 
}: InteractiveButtonProps) {
  return (
    <motion.button
      className={className}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      <motion.div
        whileHover={{ 
          filter: "brightness(1.1)",
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}

// Card hover effects
type InteractiveCardProps = HTMLMotionProps<'div'>;

export function InteractiveCard({ 
  children, 
  className = "",
  ...props 
}: InteractiveCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      <motion.div
        whileHover={{
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          transition: { duration: 0.3 }
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Magnetic effect for buttons
interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
}

export function MagneticElement({ 
  children, 
  strength = 0.2 
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    ref.current!.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)';
    }
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </div>
  );
}

// Loading skeleton animation
/**
 * Enhanced Skeleton Loader with image placeholder support
 */
export function SkeletonLoader({ 
  className,
  variant = 'default',
  animated = true
}: { 
  className?: string;
  variant?: 'default' | 'image' | 'text' | 'avatar' | 'card';
  animated?: boolean;
}) {
  const baseClasses = cn(
    "bg-slate-200 dark:bg-slate-700",
    animated && "animate-pulse",
    className
  );

  const variants = {
    default: "rounded-md",
    image: "rounded-lg aspect-video",
    text: "rounded h-4",
    avatar: "rounded-full aspect-square",
    card: "rounded-lg p-4 space-y-3"
  };

  if (variant === 'card') {
    return (
      <div className={cn(baseClasses, variants.card)}>
        <div className="bg-slate-300 dark:bg-slate-600 h-4 rounded w-3/4"></div>
        <div className="bg-slate-300 dark:bg-slate-600 h-4 rounded w-1/2"></div>
        <div className="bg-slate-300 dark:bg-slate-600 h-4 rounded w-5/6"></div>
      </div>
    );
  }

  return <div className={cn(baseClasses, variants[variant])} />;
}
