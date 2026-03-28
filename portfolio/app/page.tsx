"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProjectCard from "@/app/components/ProjectCard";
import VlogCard from "@/app/components/VlogCard";
import SkeletonCard from "@/app/components/SkeletonCard";
import SectionHeader from "@/app/components/SectionHeader";
import type { Project, VlogEntry } from "@/app/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [vlogs, setVlogs] = useState<VlogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const heroContentRef = useRef<HTMLDivElement>(null);

  // ── Getting Supabase data ──────────────────────────────────────────────────
  useEffect(() => {
    async function fetchData() {
      const [{ data: projectData }, { data: vlogData }] = await Promise.all([
        supabase
          .from("Projects")
          .select("id, title, img_url, description, proj_url, date")
          .order("date", { ascending: false })
          .limit(3),
        supabase
          .from("Posts")
          .select("id, title, date, media_url, content")
          .order("date", { ascending: false })
          .limit(3),
      ]);

      if (projectData) setProjects(projectData);
      if (vlogData) setVlogs(vlogData);
      setLoading(false);
    }

    fetchData();
  }, []);

  // ── Hero parallax ───────────────────────────────────────────────
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
    <div style={{ minHeight: "100vh", background: "var(--parchment)", overflowX: "hidden" }}>
      <Header />

      {/* ════════════ HERO ════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          padding: "0 2rem",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse 80% 70% at 60% 40%, #2a2317 0%, #0e0d0b 100%)",
        }}
      >
        {/* Grain noise */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
            opacity: 0.5,
            animation: "grainShift 0.12s steps(1) infinite",
            pointerEvents: "none",
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 60% at 20% 50%, transparent 0%, rgba(14,13,11,0.5) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Hero content */}
        <div
          ref={heroContentRef}
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            paddingTop: "8rem",
            animation: "heroReveal 1.1s cubic-bezier(.22,.68,0,1) forwards",
          }}
        >
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.5rem",
            }}
          >
            Portfolio · {new Date().getFullYear()}
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              lineHeight: 1.0,
              color: "var(--parchment)",
              letterSpacing: "-0.01em",
              marginBottom: "2rem",
            }}
          >
            Crafting
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Digital</em>
            <br />
            Experiences
          </h1>

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "rgba(245,241,234,0.58)",
              maxWidth: 420,
              lineHeight: 1.8,
              marginBottom: "3rem",
              letterSpacing: "0.02em",
            }}
          >
            Designer, developer, content creator &amp; storyteller — building things that feel
            as good as they look.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/pages/projects"
              className="hero-btn-primary"
              style={{
                display: "inline-block",
                padding: "0.85rem 2.2rem",
                background: "var(--gold)",
                color: "var(--ink)",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 400,
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 1,
                transition: "background 0.25s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-light)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
            >
              View Work
            </Link>

            <Link
              href="/pages/about"
              style={{
                display: "inline-block",
                padding: "0.85rem 2.2rem",
                border: "1px solid rgba(245,241,234,0.3)",
                color: "var(--parchment)",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 1,
                transition: "border-color 0.25s, color 0.25s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--gold)";
                el.style.color = "var(--gold)";
                el.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(245,241,234,0.3)";
                el.style.color = "var(--parchment)";
                el.style.transform = "scale(1)";
              }}
            >
              About Me
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            animation: "scrollBounce 2s ease-in-out infinite",
            zIndex: 2,
          }}
        >
          <span
            style={{
              display: "block",
              width: 1,
              height: 36,
              background: "linear-gradient(to bottom, transparent, var(--gold))",
            }}
          />
          <span
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              opacity: 0.7,
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ════════════ PROJECTS ════════════ */}
      <section style={{ padding: "7rem 2rem", background: "var(--surface)" }}>
        <SectionHeader label="Selected Work" title="Recent Projects" />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {loading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
            : projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "3rem auto 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link href="/pages/projects" className="view-all">
            All projects →
          </Link>
        </div>
      </section>

      {/* ════════════ VLOGS ════════════ */}
      <section style={{ padding: "7rem 2rem", background: "var(--surface-alt)" }}>
        <SectionHeader label="Field Notes" title="Latest Vlog Entries" />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {loading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
            : vlogs.map((v, i) => (
                <VlogCard key={v.id} entry={v} index={i} />
              ))}
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "3rem auto 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link href="/pages/blog" className="view-all">
            All entries →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}