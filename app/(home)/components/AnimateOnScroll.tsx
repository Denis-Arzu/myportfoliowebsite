'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
}

const animationStyles = {
  'fade-up': { hidden: 'opacity-0 translate-y-6', visible: 'opacity-100 translate-y-0' },
  'fade-in': { hidden: 'opacity-0', visible: 'opacity-100' },
  'scale-in': { hidden: 'opacity-0 scale-95', visible: 'opacity-100 scale-100' },
  'slide-left': { hidden: 'opacity-0 -translate-x-6', visible: 'opacity-100 translate-x-0' },
  'slide-right': { hidden: 'opacity-0 translate-x-6', visible: 'opacity-100 translate-x-0' },
};

export default function AnimateOnScroll({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fade-up'
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target); // Only animate once
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? styles.visible : styles.hidden}
        ${className}
      `}
    >
      {children}
    </div>
  );
}