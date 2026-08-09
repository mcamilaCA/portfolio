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
  index,
  active,
  onSelect,
}: {
  project: Project;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active}
      data-index={index}
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
          fontSize: "0.88rem",
          color: "var(--gold-lt)",
          padding: "0.5rem 0.7rem 0.6rem",
          lineHeight: 1.25,
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

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const active = strip.querySelector<HTMLElement>(`[data-index="${selected}"]`);
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selected]);

  const goTo = (direction: 1 | -1) => {
    setSelected((s) => (s + direction + projects.length) % projects.length);
  };

  const featured = projects[selected];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />
      <main>
        <div className="page-hero" style={{ padding: "4.5rem 2rem 1rem" }}>
          <div aria-hidden className="page-hero-sparkle" />
          <SectionHeader label="Selected Work" title="The Gallery" />
        </div>

        {/* ── Masterpiece: the currently viewed project ─────────────── */}
        <section style={{ padding: "0.25rem 2rem 0.5rem", background: "var(--ink)", marginTop: "-3.75rem" }}>
          {loading ? (
            <MasterpieceSkeleton />
          ) : featured ? (
            <div style={{ maxWidth: 400, margin: "0 auto" }}>
              <div className="masterpiece-wrap">
                <div className="masterpiece-frame" style={{ padding: "0.75rem" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/9",
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
                        <span style={{ fontSize: "2rem", opacity: 0.3, color: "var(--gold)" }}>✦</span>
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

                {projects.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous project"
                      className="gallery-arrow frame-arrow frame-arrow-left"
                      onClick={() => goTo(-1)}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next project"
                      className="gallery-arrow frame-arrow frame-arrow-right"
                      onClick={() => goTo(1)}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* ── Museum plaque ────────────────────────────────────── */}
              <div
                style={{
                  maxWidth: 400,
                  margin: "0.4rem auto 0",
                  textAlign: "center",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "0.6rem 1.1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.58rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "0.3rem",
                  }}
                >
                  Fig. {String(selected + 1).padStart(2, "0")}
                  {featured.date ? ` — ${new Date(featured.date).getFullYear()}` : ""}
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "1.2rem",
                    color: "var(--gold-lt)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {featured.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.76rem",
                    color: "var(--ash)",
                    lineHeight: 1.45,
                    marginBottom: "0.5rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
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
                      gap: "0.35rem",
                      marginBottom: "0.6rem",
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
          <section style={{ padding: "0 2rem 3rem", background: "var(--ink)" }}>
            <div ref={stripRef} className="gallery-strip" style={{ maxWidth: 1200, margin: "0 auto" }}>
              {projects.map((p, i) => (
                <GalleryThumb
                  key={p.slug}
                  project={p}
                  index={i}
                  active={i === selected}
                  onSelect={() => setSelected(i)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
