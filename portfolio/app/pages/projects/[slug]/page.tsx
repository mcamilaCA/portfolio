import Link from "next/link";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Tag from "@/app/components/tag";
import MetaItem from "@/app/components/metaItem";
import Section from "@/app/components/section";
import StatusMessage from "@/app/components/statusMessage";
import type { ProjectDetail } from "@/app/types";

export const revalidate = 60;

// ─────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("ProjectDetail")
    .select("*")
    .eq("slug", slug)
    .single();

  // PGRST116 is Supabase's "no rows for .single()" code — a legitimate
  // not-found. Any other error is a real fetch failure and gets its own state.
  if (error && error.code !== "PGRST116") {
    console.error("Supabase error fetching project:", error);
    return (
      <>
        <Header />
        <StatusMessage
          variant="error"
          backHref="/pages/projects"
          backLabel="← Back to projects"
        />
        <Footer />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Header />
        <StatusMessage
          variant="not-found"
          title="Project not found"
          backHref="/pages/projects"
          backLabel="← Back to projects"
        />
        <Footer />
      </>
    );
  }

  const p = data as ProjectDetail;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
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
            alt={p.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "scale-down",
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
              "linear-gradient(to bottom, rgba(20,16,13,0.15) 0%, var(--ink) 100%)",
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
            color: "var(--gold-lt)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            transition: "opacity 0.25s",
            zIndex: 2,
          }}
          className="back-link"
        >
          ← Back To Projects
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
            color: "var(--ash)",
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
            color: "var(--gold-lt)",
            letterSpacing: "-0.01em",
            marginBottom: "0.75rem",
          }}
        >
          {p.title}
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
          {p.description}
        </p>

        {/* Gold rule */}
        <div style={{ width: "100%", height: 3, background: "var(--border)", marginBottom: "2.5rem" }} />

        {/* ── Meta row ──────────────────────────────────────────── */}
        {(p.role || p.year) && (
          <div
            style={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
              paddingBottom: "2.5rem",
              borderBottom: "3px solid var(--border)",
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
              marginBottom: "1.5rem",
            }}
          >
            {p.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}

        {/* ── Case study sections ─────────────────────────────────
            Structured Problem/Solution/Architecture/Decisions/
            Challenges/Lessons fields. Falls back to the legacy
            "outcomes" blob for rows that haven't been migrated. */}
        {p.problem && <Section label="Problem" text={p.problem} />}
        {p.solution && <Section label="Solution" text={p.solution} />}
        {p.architecture && <Section label="Architecture" text={p.architecture} />}
        {p.technical_decisions && (
          <Section label="Technical Decisions" text={p.technical_decisions} />
        )}
        {p.challenges && <Section label="Challenges" text={p.challenges} />}
        {p.lessons_learned && (
          <Section label="Lessons Learned" text={p.lessons_learned} />
        )}
        {!p.problem && !p.solution && !p.architecture && p.outcomes && (
          <Section label="Outcomes" text={p.outcomes} />
        )}

        {/* ── CTA links ─────────────────────────────────────────── */}
        {(p.live_url || p.repo_url) && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              paddingTop: "2.5rem",
              borderTop: "3px solid var(--border)",
            }}
          >
            {p.live_url && (
              <a
                href={p.live_url}
                target="_blank"
                rel="noreferrer"
                className="project-cta-primary"
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
                className="project-cta-secondary"
                style={{
                  display: "inline-block",
                  padding: "0.85rem 2.2rem",
                  border: "1px solid var(--border)",
                  color: "var(--gold-lt)",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
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
