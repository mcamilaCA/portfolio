"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import type { BlogDetail } from "@/app/types";

// ─────────────────────────────────────────────────────────────────
// Utility: tag pill
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
// Skeleton
// ─────────────────────────────────────────────────────────────────
const shimmer: React.CSSProperties = {
  background:
    "linear-gradient(90deg, var(--parchment-alt) 0%, rgba(245,241,234,0.5) 50%, var(--parchment-alt) 100%)",
  backgroundSize: "800px 100%",
  animation: "shimmer 1.6s infinite linear",
  borderRadius: 2,
};

function BlogSkeleton() {
  return (
    <div style={{ paddingTop: "7rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 2rem 7rem" }}>
        <div style={{ ...shimmer, height: "0.65rem", width: "15%", marginBottom: "1.2rem" }} />
        <div style={{ ...shimmer, height: "3rem", width: "80%", marginBottom: "0.8rem" }} />
        <div style={{ ...shimmer, height: "3rem", width: "55%", marginBottom: "2rem" }} />
        <div style={{ ...shimmer, height: 1, width: "100%", marginBottom: "2.5rem" }} />
        {[100, 90, 95, 80, 88, 70].map((w, i) => (
          <div key={i} style={{ ...shimmer, height: "0.85rem", width: `${w}%`, marginBottom: "0.6rem" }} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Drop-cap first letter helper
// ─────────────────────────────────────────────────────────────────
function BodyContent({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div>
      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: i === 0 ? "'Cormorant Garamond', serif" : "'Lato', sans-serif",
            fontWeight: i === 0 ? 400 : 300,
            fontSize: i === 0 ? "1.18rem" : "1rem",
            color: "var(--ink)",
            lineHeight: i === 0 ? 1.75 : 1.9,
            marginBottom: "1.6rem",
            letterSpacing: i === 0 ? "0.01em" : "0",
          }}
        >
          {para}
        </p>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────
export default function BlogEntryPage() {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("Post")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
        } else {
          setEntry(data as BlogDetail);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <><Header /><BlogSkeleton /><Footer /></>;

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
            Entry not found
          </h1>
          <Link href="/pages/blog" className="card-cta">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const e = entry!;

  const formattedDate = new Date(e.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hasGallery = e.gallery && e.gallery.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      <Header />

      {/* ── Hero media ─────────────────────────────────────────── */}
      {e.media_url ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "60vh",
            overflow: "hidden",
            background: "var(--ink)",
          }}
        >
          <img
            src={e.media_url}
            alt={e.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.72,
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(14,13,11,0.2) 0%, rgba(245,241,234,1) 100%)",
            }}
          />
          <Link
            href="/pages/blog"
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
              zIndex: 2,
            }}
          >
            ← Blog
          </Link>
        </div>
      ) : (
        /* No media: spacer + back link */
        <div style={{ paddingTop: "7rem", paddingLeft: "2rem", paddingBottom: "1rem", maxWidth: 720, margin: "0 auto" }}>
          <Link
            href="/pages/blog"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ash)",
              textDecoration: "none",
              transition: "color 0.25s",
            }}
          >
            ← Blog
          </Link>
        </div>
      )}

      {/* ── Content ────────────────────────────────────────────── */}
      <article
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: e.media_url ? "2rem 2rem 7rem" : "1rem 2rem 7rem",
        }}
      >
        {/* Date + location + mood */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.2rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.68rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {formattedDate}
          </p>

          {e.location && (
            <>
              <span style={{ color: "var(--border)", fontSize: "0.8rem" }}>·</span>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.68rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--ash)",
                }}
              >
                {e.location}
              </p>
            </>
          )}

          {e.mood && (
            <>
              <span style={{ color: "var(--border)", fontSize: "0.8rem" }}>·</span>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  color: "var(--ash)",
                }}
              >
                {e.mood}
              </p>
            </>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
            lineHeight: 1.08,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
          }}
        >
          {e.title}
        </h1>

        {/* Summary / lead */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.2rem",
            color: "var(--ash)",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          {e.short}
        </p>

        {/* Gold rule */}
        <div
          style={{
            width: "100%",
            height: 1,
            background: "var(--border)",
            marginBottom: "2.5rem",
            position: "relative",
          }}
        >
          {/* Centered ornament */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              background: "var(--parchment)",
              padding: "0 0.75rem",
              color: "var(--gold)",
              fontSize: "0.8rem",
              lineHeight: 1,
            }}
          >
            ✦
          </span>
        </div>

        {/* Tags */}
        {e.tags && e.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {e.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}

        {/* ── Body text ─────────────────────────────────────────
            Split on double newlines → paragraphs.
            Swap for react-markdown if you store Markdown.      */}
        {e.body ? (
          <BodyContent text={e.body} />
        ) : (
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.9rem",
              color: "var(--ash)",
              fontStyle: "italic",
            }}
          >
            No body content yet. Add a &ldquo;body&rdquo; column to your blog_entries table.
          </p>
        )}

        {/* ── Gallery ───────────────────────────────────────────── */}
        {hasGallery && (
          <div style={{ marginTop: "3rem" }}>
            <div
              style={{
                width: "100%",
                height: 1,
                background: "var(--border)",
                marginBottom: "2rem",
              }}
            />
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
              Photos
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {e.gallery!.map((url, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1",
                    overflow: "hidden",
                    background: "var(--parchment-alt)",
                  }}
                >
                  <img
                    src={url}
                    alt={`${e.title} — photo ${i + 1}`}
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

        {/* ── Footer nav ───────────────────────────────────────── */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link href="/pages/blog" className="card-cta">
            ← All entries
          </Link>
          <span style={{ color: "var(--gold)", fontSize: "0.9rem" }}>✦</span>
        </div>
      </article>

      <Footer />
    </div>
  );
}