"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrolled } from "@/app/hooks/Usescrolled";
import Image from "next/image";


const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Collaborate", href: "/collab" },
];

export default function Header() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(245,241,234,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(184,154,94,0.22)"
          : "1px solid transparent",
        transition:
          "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <Image src="/assets/logo.png" alt="Logo" width= {50} height={50}/>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "1.05rem",
              color: "var(--ink)",
              letterSpacing: "0.06em",
            }}
          >
            Maria Camila Copo Amador
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "2.2rem", alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--ink)",
                transition: "transform 0.3s, opacity 0.3s",
                transformOrigin: "center",
                ...(menuOpen && i === 0 ? { transform: "translateY(6.5px) rotate(45deg)" } : {}),
                ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                ...(menuOpen && i === 2 ? { transform: "translateY(-6.5px) rotate(-45deg)" } : {}),
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile draw */}
      {menuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem 2rem 1.5rem",
            borderTop: "1px solid rgba(184,154,94,0.22)",
            background: "rgba(245,241,234,0.96)",
            backdropFilter: "blur(18px)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem",
                color: "var(--ink)",
                textDecoration: "none",
                padding: "0.6rem 0",
                borderBottom: "1px solid rgba(184,154,94,0.22)",
                letterSpacing: "0.05em",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}