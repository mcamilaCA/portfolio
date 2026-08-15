import Link from "next/link";

type StatusMessageProps = {
  variant?: "error" | "not-found";
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  /** "page" centers in the full viewport (detail pages); "inline" fits within a section (lists/home). */
  layout?: "page" | "inline";
};

const DEFAULTS: Record<"error" | "not-found", { title: string; description?: string }> = {
  error: {
    title: "Something went wrong",
    description: "We couldn't load this content. Please try again shortly.",
  },
  "not-found": {
    title: "Not found",
  },
};

export default function StatusMessage({
  variant = "error",
  title,
  description,
  backHref,
  backLabel,
  layout = "page",
}: StatusMessageProps) {
  const defaults = DEFAULTS[variant];
  const resolvedTitle = title ?? defaults.title;
  const resolvedDescription = description ?? defaults.description;

  return (
    <div
      style={{
        minHeight: layout === "page" ? "100vh" : undefined,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: layout === "page" ? "var(--ink)" : undefined,
        padding: layout === "inline" ? "4rem 1.5rem" : undefined,
        gap: "1.25rem",
        textAlign: "center",
      }}
    >
      <span style={{ color: "var(--gold)", fontSize: layout === "page" ? "2rem" : "1.5rem" }}>
        ✦
      </span>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: layout === "page" ? "3rem" : "1.6rem",
          color: "var(--gold-lt)",
        }}
      >
        {resolvedTitle}
      </h1>
      {resolvedDescription && (
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "var(--ash)",
            maxWidth: 420,
            lineHeight: 1.6,
          }}
        >
          {resolvedDescription}
        </p>
      )}
      {backHref && (
        <Link href={backHref} className="card-cta">
          {backLabel ?? "← Back"}
        </Link>
      )}
    </div>
  );
}
