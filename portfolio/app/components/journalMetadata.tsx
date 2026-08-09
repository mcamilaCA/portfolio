type Props = {
  folio?: number;
  date: string;
  field?: string;
  readingTime?: number;
  size?: "sm" | "md";
  align?: "left" | "center";
  compact?: boolean;
};

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    .toUpperCase();
}

export default function JournalMetadata({
  folio,
  date,
  field,
  readingTime,
  size = "sm",
  align = "left",
  compact = false,
}: Props) {
  const labelSize = size === "md" ? "0.68rem" : compact ? "0.58rem" : "0.6rem";

  if (compact) {
    const parts = [
      typeof folio === "number" ? `Folio ${String(folio).padStart(3, "0")}` : null,
      formatDate(date),
      readingTime ? `${readingTime} MIN READ` : null,
    ].filter(Boolean);

    return (
      <div style={{ textAlign: align }}>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            fontSize: labelSize,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: field ? "0.3rem" : 0,
          }}
        >
          {parts.join(" · ")}
        </p>
        {field && (
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 400,
              fontSize: labelSize,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--rose-lt)",
            }}
          >
            Field / {field}
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: align }}>
      {typeof folio === "number" && (
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            fontSize: labelSize,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.35rem",
          }}
        >
          Folio {String(folio).padStart(3, "0")}
        </p>
      )}

      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          fontSize: labelSize,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ash)",
          marginBottom: field ? "0.35rem" : 0,
        }}
      >
        {formatDate(date)}
        {readingTime ? ` · ${readingTime} MIN READ` : ""}
      </p>

      {field && (
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            fontSize: labelSize,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--rose-lt)",
          }}
        >
          Field / {field}
        </p>
      )}
    </div>
  );
}
