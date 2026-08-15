"use client";

import { useMemo, useState } from "react";
import JournalHeader from "@/app/components/journalHeader";
import JournalFilters from "@/app/components/journalFilters";
import JournalCard from "@/app/components/journalCard";
import FeaturedJournalCard from "@/app/components/featuredJournalCard";
import type { Post } from "@/app/types";

const ALL = "All";

export default function BlogList({ posts }: { posts: Post[] }) {
  const [activeFilter, setActiveFilter] = useState(ALL);

  const folioBySlug = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((entry, i) => map.set(entry.slug, posts.length - i));
    return map;
  }, [posts]);

  const categories = useMemo(() => {
    const fields = posts.map((entry) => entry.tags?.[0]).filter((f): f is string => Boolean(f));
    return Array.from(new Set(fields));
  }, [posts]);

  const filteredBlogs = useMemo(
    () => (activeFilter === ALL ? posts : posts.filter((entry) => entry.tags?.[0] === activeFilter)),
    [posts, activeFilter]
  );

  const [featured, ...rest] = filteredBlogs;

  return (
    <>
      <div className="page-hero">
        <div aria-hidden className="page-hero-sparkle" />
        <JournalHeader />
        {categories.length > 0 && (
          <JournalFilters categories={categories} active={activeFilter} onChange={setActiveFilter} />
        )}
      </div>

      <section style={{ padding: "4.5rem 2rem 7rem", background: "var(--ink)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {filteredBlogs.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                color: "var(--ash)",
                fontStyle: "italic",
              }}
            >
              No entries recorded in this field yet.
            </p>
          ) : (
            <>
              {featured && (
                <FeaturedJournalCard entry={featured} folio={folioBySlug.get(featured.slug) ?? 1} />
              )}

              {rest.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
                    gap: "1rem",
                    marginTop: "2.5rem",
                  }}
                >
                  {rest.map((entry, i) => (
                    <JournalCard
                      key={entry.id}
                      entry={entry}
                      index={i}
                      folio={folioBySlug.get(entry.slug) ?? 1}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
