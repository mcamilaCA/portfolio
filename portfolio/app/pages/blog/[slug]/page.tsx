"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Tag from "@/app/components/tag";
import JournalMetadata from "@/app/components/journalMetadata";
import JournalDivider from "@/app/components/journalDivider";
import { shimmer } from "@/app/components/shimmer";
import { getReadingTime } from "@/app/lib/readingTime";
import type { BlogDetail } from "@/app/types";

function BlogSkeleton() {
  return (
    <div style={{ paddingTop: "9rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 2rem 7rem" }}>
        <div style={{ ...shimmer, height: "0.6rem", width: "20%", marginBottom: "1.2rem" }} />
        <div style={{ ...shimmer, height: "3rem", width: "80%", marginBottom: "0.8rem" }} />
        <div style={{ ...shimmer, height: "3rem", width: "55%", marginBottom: "2rem" }} />
        <div style={{ ...shimmer, height: "0.75rem", width: "40%", marginBottom: "2.5rem" }} />
        <div style={{ ...shimmer, width: "100%", aspectRatio: "3/2", marginBottom: "2.5rem" }} />
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
            color: i === 0 ? "var(--gold-lt)" : "var(--body-text)",
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
  const { slug } = useParams<{ slug: string }>();
  const [entry, setEntry] = useState<BlogDetail | null>(null);
  const [folio, setFolio] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      supabase.from("BlogDetail").select("*").eq("slug", slug).single(),
      supabase.from("Posts").select("slug, date").order("date", { ascending: false }),
    ]).then(([{ data, error }, { data: allPosts }]) => {
      if (error || !data) {
        setNotFound(true);
      } else {
        setEntry(data as BlogDetail);
        if (allPosts) {
          const idx = allPosts.findIndex((p) => p.slug === slug);
          if (idx !== -1) setFolio(allPosts.length - idx);
        }
      }
      setLoading(false);
    });
  }, [slug]);

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
            background: "var(--ink)",
            gap: "1.5rem",
          }}
        >
          <span style={{ color: "var(--gold)", fontSize: "2rem" }}>✦</span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "3rem",
              color: "var(--gold-lt)",
            }}
          >
            Entry not found
          </h1>
          <Link href="/pages/blog" className="card-cta">
            ← Back to the Journal
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const e = entry!;
  const field = e.tags?.[0];
  const readingTime = getReadingTime(e.body ?? e.summary);
  const hasGallery = e.gallery && e.gallery.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />

      <article
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "8rem 2rem 7rem",
        }}
      >
        {/* ── Back link + folio eyebrow ─────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
          <Link
            href="/pages/blog"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 400,
              fontSize: "0.68rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--rose-lt)",
              textDecoration: "none",
            }}
          >
            ← The Journal
          </Link>
          {typeof folio === "number" && (
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ash)",
              }}
            >
              Journal / Folio {String(folio).padStart(3, "0")}
            </p>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
            lineHeight: 1.1,
            color: "var(--gold-lt)",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            marginBottom: "1.1rem",
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
            marginBottom: "1.75rem",
          }}
        >
          {e.summary}
        </p>

        <JournalMetadata date={e.date} field={field} readingTime={readingTime} size="md" />

        {(e.location || e.mood) && (
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.82rem",
              color: "var(--ash)",
              letterSpacing: "0.02em",
              marginTop: "0.6rem",
            }}
          >
            {[e.location, e.mood].filter(Boolean).join(" · ")}
          </p>
        )}

        <div style={{ margin: "2rem 0" }}>
          <JournalDivider ornament />
        </div>

        {/* ── Framed hero plate ──────────────────────────────────── */}
        {e.media_url && (
          <div className="journal-frame" style={{ marginBottom: "2.5rem" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/2", overflow: "hidden" }}>
              <img
                src={e.media_url}
                alt={e.title}
                className="journal-img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        )}

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
            <div style={{ marginBottom: "2rem" }}>
              <JournalDivider />
            </div>
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
              Plates
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
                    alt={`${e.title} — plate ${i + 1}`}
                    className="journal-img gallery-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "scale-down",
                      transition: "transform 0.5s cubic-bezier(.22,.68,0,1)",
                    }}
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
