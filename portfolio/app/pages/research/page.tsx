"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import SectionHeader from "@/app/components/sectionHeader";
import ResearchEntryCard from "@/app/components/researchEntryCard";
import { shimmer } from "@/app/components/shimmer";
import type { ResearchEntry, ResearchKind } from "@/app/types";

const KIND_ORDER: { kind: ResearchKind; label: string; title: string }[] = [
  { kind: "experience", label: "Background", title: "Research Experience" },
  { kind: "publication", label: "Published Work", title: "Publications" },
  { kind: "note", label: "Field Notes", title: "Research Notes" },
  { kind: "replication", label: "Reproduced Work", title: "Paper Replications" },
];

function EntrySkeleton() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderBottom: "3px solid var(--border)", padding: "2.2rem", marginBottom: "2rem" }}>
      <div style={{ ...shimmer, height: "0.6rem", width: "25%", marginBottom: "0.8rem" }} />
      <div style={{ ...shimmer, height: "1.4rem", width: "55%", marginBottom: "1.5rem" }} />
      <div style={{ ...shimmer, height: "0.85rem", width: "100%", marginBottom: "0.6rem" }} />
      <div style={{ ...shimmer, height: "0.85rem", width: "80%" }} />
    </div>
  );
}

export default function Research() {
  const [entries, setEntries] = useState<ResearchEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("research_entries")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase error:", error);
        } else if (data) {
          setEntries(data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />
      <div className="page-hero">
        <div aria-hidden className="page-hero-sparkle" />
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.68rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.6rem",
          }}
        >
          Field Work
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--gold-lt)",
            letterSpacing: "-0.01em",
            marginBottom: "1.1rem",
          }}
        >
          Research
        </h1>
        <img src="/assets/section-rule.svg" alt="" aria-hidden style={{ width: 140, opacity: 0.8, margin: "0 auto" }} />
      </div>
      <main>
        {KIND_ORDER.map(({ kind, label, title }, sectionIndex) => {
          const groupEntries = entries.filter((e) => e.kind === kind);
          if (!loading && groupEntries.length === 0) return null;

          return (
            <section
              key={kind}
              style={{
                padding: "4rem 2rem 5rem",
                background: sectionIndex % 2 === 0 ? "var(--surface)" : "var(--surface-alt)",
              }}
            >
              <SectionHeader label={label} title={title} />
              <div style={{ maxWidth: 800, margin: "0 auto" }}>
                {loading
                  ? [0, 1].map((i) => <EntrySkeleton key={i} />)
                  : groupEntries.map((entry, i) => (
                      <ResearchEntryCard key={entry.id} entry={entry} index={i} />
                    ))}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}
