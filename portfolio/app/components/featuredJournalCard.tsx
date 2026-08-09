import Link from "next/link";
import Image from "next/image";
import JournalMetadata from "@/app/components/journalMetadata";
import JournalDivider from "@/app/components/journalDivider";
import { getReadingTime } from "@/app/lib/readingTime";
import type { Post } from "@/app/types";

type Props = {
  entry: Post;
  folio: number;
};

export default function FeaturedJournalCard({ entry, folio }: Props) {
  const field = entry.tags?.[0];
  const readingTime = getReadingTime(entry.body ?? entry.summary);

  return (
    <div
      className="journal-card"
      style={{
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Link
        href={`/pages/blog/${entry.slug}`}
        className="journal-card-link"
        aria-label={entry.title}
      />

      <div
        className="journal-card-media"
        style={{ position: "relative", flex: "1 1 380px", minWidth: 280, aspectRatio: "4/3" }}
      >
        {entry.media_url ? (
          <Image
            src={entry.media_url}
            alt={entry.title}
            fill
            priority
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
            <span style={{ fontSize: "2.2rem", opacity: 0.3, color: "var(--gold)" }}>✦</span>
          </div>
        )}
      </div>

      <div
        style={{
          flex: "1 1 320px",
          minWidth: 280,
          padding: "clamp(1.5rem, 3vw, 2.75rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            fontSize: "0.62rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--rose-lt)",
            marginBottom: "1rem",
          }}
        >
          Featured Entry
        </p>

        <JournalMetadata folio={folio} date={entry.date} field={field} readingTime={readingTime} size="md" />

        <div style={{ margin: "1.4rem 0" }}>
          <JournalDivider width={72} />
        </div>

        <h2
          className="journal-card-title"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            lineHeight: 1.15,
            color: "var(--gold-lt)",
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            marginBottom: "1.1rem",
          }}
        >
          {entry.title}
        </h2>

        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.95rem",
            color: "var(--ash)",
            lineHeight: 1.75,
            marginBottom: "1.75rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {entry.summary}
        </p>

        <span className="journal-cta" style={{ fontSize: "0.78rem" }}>
          Read Article <span className="journal-cta-arrow">→</span>
        </span>
      </div>
    </div>
  );
}
