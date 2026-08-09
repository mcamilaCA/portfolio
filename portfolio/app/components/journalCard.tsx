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

      <div className="journal-card-media" style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
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
            <span style={{ fontSize: "1.4rem", opacity: 0.3, color: "var(--gold)" }}>✦</span>
          </div>
        )}
      </div>

      <div style={{ padding: "0.6rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <JournalMetadata folio={folio} date={entry.date} field={field} readingTime={readingTime} compact />

        <div style={{ margin: "0.4rem 0" }}>
          <JournalDivider />
        </div>

        <h3
          className="journal-card-title"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: "0.82rem",
            lineHeight: 1.2,
            color: "var(--gold-lt)",
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            marginBottom: "0.3rem",
          }}
        >
          {entry.title}
        </h3>

        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.7rem",
            color: "var(--ash)",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: "0.5rem",
            flex: 1,
          }}
        >
          {entry.summary}
        </p>

        <span className="journal-cta" style={{ fontSize: "0.58rem" }}>
          Read Article <span className="journal-cta-arrow">→</span>
        </span>
      </div>
    </div>
  );
}
