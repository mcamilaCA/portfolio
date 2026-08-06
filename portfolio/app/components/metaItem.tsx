export default function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          fontSize: "0.63rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "1.05rem",
          color: "var(--ink)",
          letterSpacing: "0.02em",
        }}
      >
        {value}
      </p>
    </div>
  );
}
