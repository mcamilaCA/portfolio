"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import type { ProjectDetail } from "@/app/types";

// ─────────────────────────────────────────────────────────────────
// Utility: simple tag pill
// ─────────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.3rem 0.85rem",
        border: "1px solid var(--border)",
        fontFamily: "'Lato', sans-serif",
        fontWeight: 300,
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--ash)",
      }}
    >
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────
// Utility: meta row item (Role, Year, etc.)
// ─────────────────────────────────────────────────────────────────
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          fontSize: "0.63rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "1.05rem",
          color: "var(--ink)",
          letterSpacing: "0.02em",
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Skeleton shimmer helper
// ─────────────────────────────────────────────────────────────────
const shimmer: React.CSSProperties = {
  background:
    "linear-gradient(90deg, var(--parchment-alt) 0%, rgba(245,241,234,0.5) 50%, var(--parchment-alt) 100%)",
  backgroundSize: "800px 100%",
  animation: "shimmer 1.6s infinite linear",
  borderRadius: 2,
};

function ProjectSkeleton() {
  return (
    <div style={{ paddingTop: "7rem" }}>
      {/* Hero image skeleton */}
      <div style={{ width: "100%", height: "60vh", ...shimmer, borderRadius: 0 }} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ ...shimmer, height: "0.7rem", width: "20%", marginBottom: "1.2rem" }} />
        <div style={{ ...shimmer, height: "3rem", width: "70%", marginBottom: "1rem" }} />
        <div style={{ ...shimmer, height: "1px", width: "100%", marginBottom: "2rem" }} />
        <div style={{ display: "flex", gap: "3rem", marginBottom: "3rem" }}>
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div style={{ ...shimmer, height: "0.6rem", width: 60, marginBottom: "0.5rem" }} />
              <div style={{ ...shimmer, height: "1rem", width: 90 }} />
            </div>
          ))}
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ ...shimmer, height: "0.85rem", width: `${100 - i * 7}%`, marginBottom: "0.6rem" }} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────
export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setProject(data as ProjectDetail);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <><Header /><ProjectSkeleton /><Footer /></>;

  if (notFound) {
    return (
      <>
        <Header />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--parchment)",
            gap: "1.5rem",
          }}
        >
          <span style={{ color: "var(--gold)", fontSize: "2rem" }}>✦</span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "3rem",
              color: "var(--ink)",
            }}
          >
            Project not found
          </h1>
          <Link href="/pages/projects" className="card-cta">
            ← Back to projects
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const p = project!;
  const hasGallery = p.gallery && p.gallery.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      <Header />

      {/* ── Hero image ─────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "65vh",
          overflow: "hidden",
          background: "var(--ink)",
        }}
      >
        {p.image_url && (
          <img
            src={p.image_url}
            alt={p.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.75,
            }}
          />
        )}
        {/* Gradient fade at bottom */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(14,13,11,0.2) 0%, rgba(245,241,234,1) 100%)",
          }}
        />

        {/* Back link overlaid on hero */}
        <Link
          href="/pages/projects"
          style={{
            position: "absolute",
            top: "6rem",
            left: "2rem",
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--parchment)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "opacity 0.25s",
            zIndex: 2,
          }}
          className="back-link"
        >
          ← Projects
        </Link>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <article
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "3rem 2rem 7rem",
        }}
      >
        {/* Overline */}
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.68rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "1rem",
          }}
        >
          Project
        </p>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.05,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            marginBottom: "0.75rem",
          }}
        >
          {p.name}
        </h1>

        {/* Lead / brief description */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.25rem",
            color: "var(--ash)",
            lineHeight: 1.65,
            marginBottom: "2rem",
          }}
        >
          {p.summary}
        </p>

        {/* Gold rule */}
        <div style={{ width: "100%", height: 1, background: "var(--border)", marginBottom: "2.5rem" }} />

        {/* ── Meta row ──────────────────────────────────────────── */}
        {(p.role || p.year) && (
          <div
            style={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {p.role && <MetaItem label="Role" value={p.role} />}
            {p.year && <MetaItem label="Year" value={p.year} />}
            {/* ── Add more MetaItems here as needed ────────────── */}
          </div>
        )}

        {/* ── Tags ──────────────────────────────────────────────── */}
        {p.tags && p.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "3rem",
            }}
          >
            {p.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}

        {/* ── Full description / body ────────────────────────────
            Renders as plain paragraphs. If you want Markdown,
            swap this for a library like react-markdown.         */}
        {p.full_description && (
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "1rem",
              color: "var(--ink)",
              lineHeight: 1.85,
              marginBottom: "3rem",
            }}
          >
            {p.full_description.split("\n\n").map((para, i) => (
              <p key={i} style={{ marginBottom: "1.4rem" }}>
                {para}
              </p>
            ))}
          </div>
        )}

        {/* ── Gallery ───────────────────────────────────────────── */}
        {hasGallery && (
          <div style={{ marginBottom: "3rem" }}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.63rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "1.2rem",
              }}
            >
              Gallery
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1rem",
              }}
            >
              {p.gallery!.map((url, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    background: "var(--parchment-alt)",
                  }}
                >
                  <img
                    src={url}
                    alt={`${p.name} — image ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s cubic-bezier(.22,.68,0,1)",
                    }}
                    className="gallery-img"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA links ─────────────────────────────────────────── */}
        {(p.live_url || p.repo_url) && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              paddingTop: "2.5rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            {p.live_url && (
              <a
                href={p.live_url}
                target="_blank"
                rel="noreferrer"
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
                View Live ↗
              </a>
            )}
            {p.repo_url && (
              <a
                href={p.repo_url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.85rem 2.2rem",
                  border: "1px solid var(--border)",
                  color: "var(--ink)",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "border-color 0.25s, color 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "var(--gold)";
                  el.style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--ink)";
                }}
              >
                View Repo ↗
              </a>
            )}
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}