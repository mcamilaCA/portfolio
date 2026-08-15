"use client";

import { useEffect, useRef } from "react";

export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroContentRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.35}px)`;
      el.style.opacity = `${Math.max(0, 1 - y / 500)}`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={heroContentRef}
      className="hero-grid"
      style={{
        animation: "heroReveal 1.1s cubic-bezier(.22,.68,0,1) forwards",
      }}
    >
      {children}
    </div>
  );
}
