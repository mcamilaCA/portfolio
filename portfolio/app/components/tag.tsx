export default function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.3rem 0.85rem",
        background: "var(--ink-2)",
        border: "1px solid var(--border)",
        fontFamily: "'Lato', sans-serif",
        fontWeight: 300,
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--gold)",
      }}
    >
      {label}
    </span>
  );
}
