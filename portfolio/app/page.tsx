"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ProjectCard from "@/app/components/project_card";
import VlogCard from "@/app/components/blog_card";
import SkeletonCard from "@/app/components/skeletonCard";
import SectionHeader from "@/app/components/sectionHeader";
import type { Project, Post } from "@/app/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const heroContentRef = useRef<HTMLDivElement>(null);

  // ── Getting Supabase data ──────────────────────────────────────────────────
  useEffect(() => {
    async function fetchData() {
      const [{ data: projectData }, { data: blogData }] = await Promise.all([
        supabase
          .from("Projects")
          .select("id, title, image_url, description, git_url, proj_url, tags, slug, date")
          .order("date", { ascending: false })
          .limit(3),
        supabase
          .from("Posts")
          .select("id, title, slug, content, published, media_url,date")
          .order("date", { ascending: false })
          .limit(3),
      ]);

      if (projectData) setProjects(projectData);
      if (blogData) setBlogs(blogData);
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
          minHeight: "80svh",
          display: "flex",
          alignItems: "center",
          padding: "0 2rem",
          paddingTop: "1rem",
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
            background: "linear-gradient(to right, rgba(20, 18, 16, 0.85) 0%, rgba(20, 18, 16, 0.65) 35%,rgba(20, 18, 16, 0.3) 60%,rgba(20, 18, 16, 0.1) 100%);, url('/assets/bg_ptfolio.jpg') center/cover no-repeat",
            pointerEvents: "none",
          }}
        />

        {/* Hero content */}
        <div
          ref={heroContentRef}
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1500,
            margin: "0 auto",
            width: "100%",
            paddingTop: "1rem",
            animation: "heroReveal 1.1s cubic-bezier(.22,.68,0,1) forwards",
          }}
        >

          <div 
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              maxWidth: 1500,
              margin: "0 auto",
              width: "100%",
              paddingTop: "1rem",
              animation: "heroReveal 1.1s cubic-bezier(.22,.68,0,1) forwards",
              gap: "1rem"

            }}
            > 
            {/* Content to the left */}
            < div style={{ flex: 1, paddingRight: "1rem", transform:"scale(1.2)"}}>
              <p style={{ fontFamily: "'Lato', sans-serif", 
                          fontWeight: 300, 
                          maxWidth: 1500,
                          fontSize: "0.75rem", 
                          letterSpacing: "0.25em", 
                          textTransform: "uppercase", 
                          color: "var(--gold)", 
                          marginLeft: "7rem",
                          marginBottom: "1.5rem" }}>
                Portfolio & Learning Journal · {new Date().getFullYear()}
              </p>

              <h1 style={{ fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 200,
                          fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                          lineHeight: 1.15,
                          color: "var(--warm-parchment)",
                          letterSpacing: "0.01em",
                          marginBottom: "2rem" }}>
                Welcome to my part of the ton.
              </h1>

              <p style={{ fontFamily: "'Lato', sans-serif",
                          fontWeight: 400,
                          fontSize: "0.95rem",
                          color: "rgba(245,241,234,0.58)",
                          maxWidth: 480,
                          lineHeight: 1.8,
                          marginBottom: "3rem",
                          letterSpacing: "0.03em",
                          textShadow: "0 2px 12px rgba(0, 0, 0, 0.35)" }}>
                Learner, developer, content creator &amp; storyteller — for there&apos;s never a dull day
                if one remains curious.

                <br />
                <br />

                Graduated with a Bachelor&apos;s in Computer Science from Florida International University and studied Translational Medicine for half a year in Tsinghua University, 
                I&apos;m currently exploring the realms of full-stack development, content creation, and the art of storytelling with a  focus on Data Science and Machine learning.
                <br/>
                This portfolio is a collection of my projects, field notes, and musings as I navigate the ever-evolving landscape of technology and creativity.
              </p>
            
            </div>

            {/* Content to the rigth */}
            < div style={{ flex: 1, textAlign:"left", maxWidth:"120%", transform:"scale(1.2)"}}>
                <img src="/assets/home.png"
                alt= "Home Gyeongbokgung Palace self-portrait"
                style={{maxWidth: "140%",
                        height: "auto",
                        borderRadius: "8px"
                }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/pages/projects"
              className="hero-btn-primary"
              style={{
                display: "inline-block",
                padding: "0.85rem 2.2rem",
                background: "linear-gradient(135deg,#c6a15b,#b8924f)",
                boxShadow: "0 4px 14px rgba(184,154,94,0.25)",
                color: "var(--ink)",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 400,
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
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
              Peruse My Works
            </Link>

            <Link
              href="/pages/about"
              style={{
                display: "inline-block",
                padding: "0.85rem 2.2rem",
                border: "1px solid rgba(245,241,234,0.4)",
                backdropFilter: "blur(4px)",
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
              Of My Person
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
              gridTemplateColumns: "repeat(auto-fit, minmax(220px,260px))",
              alignItems: "stretch",
              justifyContent: "center",
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
           Catalogue of Projects →
          </Link>
        </div>
      </section>

      {/* ════════════ VLOGS ════════════ */}
      <section style={{ padding: "7rem 2rem", background: "var(--surface-alt)" }}>
        <SectionHeader label="Field Notes" title="Latest Blog Entries" />

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
            : blogs.map((v, i) => (
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
           Compendium of Entries →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}