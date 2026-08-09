"use client";

import { useEffect, useMemo, useState } from "react";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import JournalHeader from "@/app/components/journalHeader";
import JournalFilters from "@/app/components/journalFilters";
import JournalCard from "@/app/components/journalCard";
import FeaturedJournalCard from "@/app/components/featuredJournalCard";
import JournalCardSkeleton from "@/app/components/journalCardSkeleton";
import type { Post } from "@/app/types";

const ALL = "All";

export default function Blog() {
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(ALL);

  useEffect(() => {
    supabase
      .from("Posts")
      .select("*")
      .order("date", { ascending: false })
      .then(({ data }) => {
        if (data) setBlogs(data);
        setLoading(false);
      });
  }, []);

  const folioBySlug = useMemo(() => {
    const map = new Map<string, number>();
    blogs.forEach((entry, i) => map.set(entry.slug, blogs.length - i));
    return map;
  }, [blogs]);

  const categories = useMemo(() => {
    const fields = blogs.map((entry) => entry.tags?.[0]).filter((f): f is string => Boolean(f));
    return Array.from(new Set(fields));
  }, [blogs]);

  const filteredBlogs = useMemo(
    () => (activeFilter === ALL ? blogs : blogs.filter((entry) => entry.tags?.[0] === activeFilter)),
    [blogs, activeFilter]
  );

  const [featured, ...rest] = filteredBlogs;

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />
      <main>
        <div className="page-hero">
          <div aria-hidden className="page-hero-sparkle" />
          <JournalHeader />
          {categories.length > 0 && (
            <JournalFilters categories={categories} active={activeFilter} onChange={setActiveFilter} />
          )}
        </div>

        <section style={{ padding: "4.5rem 2rem 7rem", background: "var(--ink)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {loading ? (
              <>
                <JournalCardSkeleton />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "1.75rem",
                    marginTop: "2.5rem",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <JournalCardSkeleton key={i} />
                  ))}
                </div>
              </>
            ) : filteredBlogs.length === 0 ? (
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
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "1.75rem",
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
      </main>
      <Footer />
    </div>
  );
}
