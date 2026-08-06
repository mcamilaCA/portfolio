export default function Section({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <p
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          fontSize: "0.63rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "1rem",
        }}
      >
        {label}
      </p>
      <div
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 300,
          fontSize: "1rem",
          color: "var(--body-text)",
          lineHeight: 1.85,
        }}
      >
        {text.split("\n\n").map((para, i) => (
          <p key={i} style={{ marginBottom: "1.4rem" }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
