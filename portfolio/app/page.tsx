"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ProjectCard from "@/app/components/project_card";
import BlogCard from "@/app/components/blog_card";
import SkeletonCard from "@/app/components/skeletonCard";
import SectionHeader from "@/app/components/sectionHeader";
import type { Project, Post } from "@/app/types";

const SKILLS = [
  { icon: "/assets/icon-data-science.svg", label: "Data Science" },
  { icon: "/assets/icon-machine-learning.svg", label: "Machine Learning" },
  { icon: "/assets/icon-bioinformatics.svg", label: "Bioinformatics" },
  { icon: "/assets/icon-visualization.svg", label: "Visualization" },
  { icon: "/assets/icon-storytelling.svg", label: "Storytelling" },
];

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
          .select("id, title, summary, image_url, summary, git_url, proj_url, tags, slug, date")
          .order("date", { ascending: false })
          .limit(3),
        supabase
          .from("Posts")
          .select("id, title, slug, published, media_url,date, summary")
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
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          paddingTop: 68,
          overflow: "hidden",
          background:
            "linear-gradient(100deg, rgba(10,8,6,0.94) 0%, rgba(10,8,6,0.8) 32%, rgba(10,8,6,0.42) 58%, rgba(10,8,6,0.18) 78%), url('/assets/background_homepage.png') center/cover no-repeat, var(--ink)",
        }}
      >
        {/* Ambient sparkle overlay */}
        <div aria-hidden className="hero-sparkle-overlay" />

        {/* Ornate frame with gothic corners */}
        <div aria-hidden className="hero-frame">
          <img src="/assets/corner-ornament.svg" alt="" className="hero-corner" style={{ top: -1, left: -1 }} />
          <img src="/assets/corner-ornament.svg" alt="" className="hero-corner" style={{ top: -1, right: -1, transform: "scaleX(-1)" }} />
          <img src="/assets/corner-ornament.svg" alt="" className="hero-corner" style={{ bottom: -1, left: -1, transform: "scaleY(-1)" }} />
          <img src="/assets/corner-ornament.svg" alt="" className="hero-corner" style={{ bottom: -1, right: -1, transform: "scale(-1,-1)" }} />
        </div>

        {/* Hero content */}
        <div
          ref={heroContentRef}
          className="hero-grid"
          style={{
            animation: "heroReveal 1.1s cubic-bezier(.22,.68,0,1) forwards",
          }}
        >
          {/* Content to the left */}
          <div>
            <img
              src="/assets/section-rule.svg"
              alt=""
              aria-hidden
              style={{ width: 150, marginBottom: "1.25rem", opacity: 0.8 }}
            />

            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)",
                lineHeight: 1.05,
                color: "var(--gold-lt)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "0.9rem",
              }}
            >
              Maria Camila
            </h1>

            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 400,
                fontSize: "0.78rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Data Scientist &amp; AI Enthusiast
            </p>

            <img
              src="/assets/flourish-divider.svg"
              alt=""
              aria-hidden
              style={{ width: 220, margin: "1.15rem 0" }}
            />

            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.92rem",
                color: "rgba(232,220,192,0.72)",
                maxWidth: 460,
                lineHeight: 1.65,
                letterSpacing: "0.02em",
              }}
            >
              I bridge data, design, and domain knowledge to build meaningful
              solutions that create real impact.
              <br />
              <br />
              Bachelor&apos;s in Computer Science from Florida International
              University. Research assistant at Tsinghua University,
              contributing to published work on contrastive learning methods.
              Data science &amp; machine learning intern at AbbVie.
            </p>

            {/* Skills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", margin: "1.5rem 0" }}>
              {SKILLS.map((skill) => (
                <div key={skill.label} className="skill-row">
                  <img src={skill.icon} alt="" aria-hidden style={{ width: 18, height: 18 }} />
                  <span
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.72rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ width: 56, height: 1, background: "var(--gold)", opacity: 0.4, marginBottom: "1.25rem" }} />

            {/* Quote */}
            <p
              style={{
                display: "flex",
                gap: "0.65rem",
                alignItems: "flex-start",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.05rem",
                color: "var(--gold-lt)",
                lineHeight: 1.6,
                maxWidth: 440,
                marginBottom: "1.75rem",
              }}
            >
              <img src="/assets/compass-icon.svg" alt="" aria-hidden style={{ width: 18, height: 18, marginTop: 4, flexShrink: 0 }} />
              Curiosity is the compass. Data is the map. Impact is the destination.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/pages/projects"
                className="hero-btn-primary"
                style={{
                  display: "inline-block",
                  padding: "0.85rem 2.2rem",
                  background: "linear-gradient(135deg,var(--gold),var(--gold-dp))",
                  boxShadow: "0 4px 14px rgba(201,168,118,0.25)",
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
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-lt)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg,var(--gold),var(--gold-dp))";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                View Projects
              </Link>

              <Link
                href="/pages/research"
                style={{
                  display: "inline-block",
                  padding: "0.85rem 2.2rem",
                  border: "1px solid rgba(232,220,192,0.35)",
                  backdropFilter: "blur(4px)",
                  color: "var(--gold-lt)",
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
                  el.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(232,220,192,0.35)";
                  el.style.transform = "scale(1)";
                }}
              >
                Research
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "1.5rem",
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

      {/* ════════════ BLOGS ════════════ */}
      <section style={{ padding: "7rem 2rem", background: "var(--surface-alt)" }}>
        <SectionHeader label="Field Notes" title="Latest Blog Entries" />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 260px))",
            alignItems: "stretch",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {loading
            ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
            : blogs.map((v, i) => (
                <BlogCard key={v.id} entry={v} index={i} />
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