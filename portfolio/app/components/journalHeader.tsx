"use client";

import { useReveal } from "@/app/hooks/Usereveal";
import JournalDivider from "@/app/components/journalDivider";

export default function JournalHeader() {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 720,
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          fontSize: "0.68rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "0.6rem",
        }}
      >
        Vol. I — The Archive
      </p>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
          color: "var(--gold-lt)",
          letterSpacing: "0.06em",
          marginBottom: "1.1rem",
        }}
      >
        The Journal
      </h1>

      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          fontSize: "0.95rem",
          color: "var(--ash)",
          lineHeight: 1.7,
          maxWidth: 480,
          margin: "0 auto 1.75rem",
        }}
      >
        Notes from the intersection of computation, science, technology, and curiosity.
      </p>

      <div style={{ maxWidth: 260, margin: "0 auto" }}>
        <JournalDivider ornament />
      </div>
    </div>
  );
}
