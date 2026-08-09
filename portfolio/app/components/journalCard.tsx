import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/app/hooks/Usereveal";
import JournalMetadata from "@/app/components/journalMetadata";
import JournalDivider from "@/app/components/journalDivider";
import { getReadingTime } from "@/app/lib/readingTime";
import type { Post } from "@/app/types";

type Props = {
  entry: Post;
  index: number;
  folio: number;
};

export default function JournalCard({ entry, index, folio }: Props) {
  const { ref, visible } = useReveal();
  const field = entry.tags?.[0];
  const readingTime = getReadingTime(entry.body ?? entry.summary);

  return (
    <div
      ref={ref}
      className="journal-card"
      style={{
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s, border-color 0.4s ease`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Link
        href={`/pages/blog/${entry.slug}`}
        className="journal-card-link"
        aria-label={entry.title}
      />

      <div className="journal-card-media" style={{ position: "relative", width: "100%", aspectRatio: "3/2" }}>
        {entry.media_url ? (
          <Image
            src={entry.media_url}
            alt={entry.title}
            fill
            className="journal-card-img journal-img"
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
            <span style={{ fontSize: "1.6rem", opacity: 0.3, color: "var(--gold)" }}>✦</span>
          </div>
        )}
      </div>

      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <JournalMetadata folio={folio} date={entry.date} field={field} readingTime={readingTime} />

        <div style={{ margin: "1.1rem 0" }}>
          <JournalDivider />
        </div>

        <h3
          className="journal-card-title"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: "1.35rem",
            lineHeight: 1.25,
            color: "var(--gold-lt)",
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          {entry.title}
        </h3>

        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "var(--ash)",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: "1.4rem",
            flex: 1,
          }}
        >
          {entry.summary}
        </p>

        <span className="journal-cta">
          Read Article <span className="journal-cta-arrow">→</span>
        </span>
      </div>
    </div>
  );
}
