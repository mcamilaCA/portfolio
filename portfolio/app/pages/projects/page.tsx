"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Tag from "@/app/components/tag";
import SectionHeader from "@/app/components/sectionHeader";
import { shimmer } from "@/app/components/shimmer";
import type { Project } from "@/app/types";

function MasterpieceSkeleton() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div className="masterpiece-frame">
        <div style={{ ...shimmer, width: "100%", aspectRatio: "4/3" }} />
      </div>
      <div style={{ ...shimmer, height: "0.6rem", width: "30%", margin: "2rem auto 1rem" }} />
      <div style={{ ...shimmer, height: "1.6rem", width: "50%", margin: "0 auto 1rem" }} />
      <div style={{ ...shimmer, height: "0.85rem", width: "70%", margin: "0 auto" }} />
    </div>
  );
}

function GalleryThumb({
  project,
  active,
  onSelect,
}: {
  project: Project;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active}
      className={`gallery-thumb${active ? " is-active" : ""}`}
      style={{ padding: 0, textAlign: "left" }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--parchment-alt)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "1.4rem", opacity: 0.3, color: "var(--gold)" }}>✦</span>
          </div>
        )}
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.95rem",
          color: "var(--gold-lt)",
          padding: "0.7rem 0.85rem 0.85rem",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {project.title}
      </p>
    </button>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase
      .from("Projects")
      .select("id, title, git_url, proj_url, date, slug, image_url, summary, tags")
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase error:", error);
        } else {
          setProjects(data);
        }
        setLoading(false);
      });
  }, []);

  const scrollStrip = (direction: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const featured = projects[selected];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />
      <main>
        <div className="page-hero">
          <div aria-hidden className="page-hero-sparkle" />
          <SectionHeader label="Selected Work" title="The Gallery" />
        </div>

        {/* ── Masterpiece: the currently viewed project ─────────────── */}
        <section style={{ padding: "1rem 2rem 3rem", background: "var(--ink)" }}>
          {loading ? (
            <MasterpieceSkeleton />
          ) : featured ? (
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <div className="masterpiece-frame">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    background: "var(--ink-2)",
                  }}
                >
                  {featured.image_url ? (
                    <Image
                      key={featured.slug}
                      src={featured.image_url}
                      alt={featured.title}
                      fill
                      className="masterpiece-img"
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "2.4rem", opacity: 0.3, color: "var(--gold)" }}>✦</span>
                    </div>
                  )}
                </div>
                <img
                  src="/assets/border-frame.svg"
                  alt=""
                  aria-hidden
                  className="masterpiece-ornament"
                />
              </div>

              {/* ── Museum plaque ────────────────────────────────────── */}
              <div
                style={{
                  maxWidth: 560,
                  margin: "2.25rem auto 0",
                  textAlign: "center",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "1.75rem 2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.62rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Fig. {String(selected + 1).padStart(2, "0")}
                  {featured.date ? ` — ${new Date(featured.date).getFullYear()}` : ""}
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "1.7rem",
                    color: "var(--gold-lt)",
                    marginBottom: "0.85rem",
                  }}
                >
                  {featured.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.85rem",
                    color: "var(--ash)",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  {featured.summary}
                </p>
                {featured.tags && featured.tags.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "0.5rem",
                      marginBottom: "1.4rem",
                    }}
                  >
                    {featured.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center", gap: "1.75rem" }}>
                  <Link href={`/pages/projects/${featured.slug}`} className="card-cta">
                    View work →
                  </Link>
                  {featured.git_url && (
                    <a
                      href={featured.git_url}
                      target="_blank"
                      rel="noreferrer"
                      className="card-cta"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "var(--ash)",
                fontFamily: "'Lato', sans-serif",
              }}
            >
              No projects to display yet.
            </p>
          )}
        </section>

        {/* ── Gallery strip: the rest of the collection ─────────────── */}
        {!loading && projects.length > 1 && (
          <section style={{ padding: "0 2rem 7rem", background: "var(--ink)" }}>
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <button
                type="button"
                aria-label="Scroll gallery left"
                className="gallery-arrow"
                onClick={() => scrollStrip(-1)}
              >
                ‹
              </button>
              <div ref={stripRef} className="gallery-strip">
                {projects.map((p, i) => (
                  <GalleryThumb
                    key={p.slug}
                    project={p}
                    active={i === selected}
                    onSelect={() => setSelected(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Scroll gallery right"
                className="gallery-arrow"
                onClick={() => scrollStrip(1)}
              >
                ›
              </button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
