import { useReveal } from "@/app/hooks/Usereveal";
import Tag from "@/app/components/tag";
import MetaItem from "@/app/components/metaItem";
import type { ResearchEntry, ResearchKind } from "@/app/types";

type Props = {
  entry: ResearchEntry;
  index: number;
};

const KIND_LABEL: Record<ResearchKind, string> = {
  experience: "Research Experience",
  publication: "Publication",
  note: "Research Note",
  replication: "Paper Replication",
};

export default function ResearchEntryCard({ entry, index }: Props) {
  const { ref, visible } = useReveal();

  const fields: { label: string; value?: string }[] = [
    { label: "Objective", value: entry.objective },
    { label: "Methods", value: entry.methods },
    { label: "Results", value: entry.results },
    { label: "Reflection", value: entry.reflection },
  ].filter((f) => f.value);

  return (
    <div
      ref={ref}
      className="letter-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${index * 0.1}s, transform 0.65s ease ${index * 0.1}s`,
        background: "var(--surface)",
        borderBottom: "3px solid var(--gold)",
        padding: "2.2rem",
        marginBottom: "2rem",
      }}
    >
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "0.5rem",
        }}
      >
        {KIND_LABEL[entry.kind]}
      </p>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontSize: "1.4rem",
          color: "var(--ink)",
          letterSpacing: "0.01em",
          lineHeight: 1.3,
          marginBottom: "0.4rem",
        }}
      >
        {entry.title}
      </h3>

      {(entry.subtitle || entry.year) && (
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.82rem",
            color: "var(--ash)",
            letterSpacing: "0.02em",
            marginBottom: "1.5rem",
          }}
        >
          {[entry.subtitle, entry.year].filter(Boolean).join(" · ")}
        </p>
      )}

      {fields.length > 0 && (
        <>
          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(184,154,94,0.22)",
              margin: "0 0 1.5rem",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              marginBottom: entry.tags?.length || entry.link_url ? "1.5rem" : 0,
            }}
          >
            {fields.map((f) => (
              <MetaItem key={f.label} label={f.label} value={f.value as string} />
            ))}
          </div>
        </>
      )}

      {entry.tags && entry.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: entry.link_url ? "1.2rem" : 0 }}>
          {entry.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      )}

      {entry.link_url && (
        <a href={entry.link_url} target="_blank" rel="noreferrer" className="card-cta">
          {entry.link_label || "View ↗"}
        </a>
      )}
    </div>
  );
}
