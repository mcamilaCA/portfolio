"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "@/app/components/tag";
import type { Project } from "@/app/types";

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
      className={`gallery-thumb gallery-rail-item${active ? " is-active" : ""}`}
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

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const active = rail.querySelector<HTMLElement>(`[data-index="${selected}"]`);
    active?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selected]);

  const goTo = (direction: 1 | -1) => {
    setSelected((s) => (s + direction + projects.length) % projects.length);
  };

  const featured = projects[selected];

  if (!featured) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "var(--ash)",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        No projects to display yet.
      </p>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1300,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "2.5rem",
      }}
    >
      {/* ── Main feature ─────────────────────────────────────────── */}
      <div style={{ flex: "0 1 620px", minWidth: 0 }}>
        <div style={{ maxWidth: 620 }}>
          <div className="masterpiece-wrap">
            <div className="masterpiece-frame" style={{ padding: "1rem" }}>
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

          {/* ── Museum plaque ────────────────────────────────── */}
          <div
            style={{
              marginTop: "0.85rem",
              textAlign: "center",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "1rem 1.5rem",
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
                marginBottom: "0.4rem",
              }}
            >
              Fig. {String(selected + 1).padStart(2, "0")}
              {featured.date ? ` — ${new Date(featured.date).getFullYear()}` : ""}
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "1.5rem",
                color: "var(--gold-lt)",
                marginBottom: "0.5rem",
              }}
            >
              {featured.title}
            </h3>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.82rem",
                color: "var(--ash)",
                lineHeight: 1.55,
                marginBottom: "0.75rem",
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
                  gap: "0.4rem",
                  marginBottom: "0.85rem",
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
      </div>

      {/* ── Vertical collection rail ──────────────────────────────── */}
      {projects.length > 1 && (
        <div style={{ flex: "0 0 240px" }}>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.75rem",
            }}
          >
            More in the Collection
          </p>
          <div ref={railRef} className="gallery-rail" style={{ maxHeight: 660 }}>
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
        </div>
      )}
    </div>
  );
}
