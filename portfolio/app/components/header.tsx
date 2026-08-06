"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrolled } from "@/app/hooks/Usescrolled";
import Image from "next/image";


const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/pages/projects" },
  { label: "Research", href: "/pages/research" },
  { label: "Blog", href: "/pages/blog" },
  { label: "About", href: "/pages/about" },
  { label: "Collaborate", href: "/pages/contact" },
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
        background: "rgba(20,16,13,0.9)",
        backdropFilter: "blur(14px) saturate(1.2)",
        WebkitBackdropFilter: "blur(14px) saturate(1.2)",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,118,0.3)"
          : "1px solid rgba(201,168,118,0.14)",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1650,
          margin: " auto",
          padding: "2 0rem",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", justifyContent:"left",gap: "0.6rem", textDecoration: "none" }}>
          <Image src="/assets/logo.png" alt="Logo" width= {36} height={36} />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "1rem",
              color: "var(--gold-lt)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Maria Camila
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "1.1rem", alignItems: "center"}} className="desktop-nav">
          {NAV_LINKS.map((link, i) => (
            <span key={link.href} style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
              <Link href={link.href} className="nav-link-dark">
                {link.label}
              </Link>
              {i < NAV_LINKS.length - 1 && (
                <img
                  src="/assets/nav-cross.svg"
                  alt=""
                  aria-hidden
                  style={{ width: 12, height: 12, opacity: 0.55 }}
                />
              )}
            </span>
          ))}
          <img
            src="/assets/monogram-seal-64.png"
            alt=""
            aria-hidden
            style={{ width: 26, height: 26, marginLeft: "0.6rem", opacity: 0.9 }}
          />
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
                background: "var(--gold-lt)",
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
            borderTop: "1px solid rgba(201,168,118,0.25)",
            background: "rgba(20,16,13,0.97)",
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
                textDecoration: "none",
                color: "var(--gold-lt)",
                padding: "0.6rem 0",
                borderBottom: "1px solid rgba(201,168,118,0.2)",
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
