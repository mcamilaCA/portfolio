"use client";

import { useReveal } from "@/app/hooks/Usereveal";

type Props = {
  label: string;
  title: string;
};

export default function SectionHeader({ label, title }: Props) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: "0 auto 4rem",
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
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "0.6rem",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "var(--ink)",
          letterSpacing: "-0.01em",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: 48,
          height: 1,
          background: "var(--gold)",
        }}
      />
    </div>
  );
}