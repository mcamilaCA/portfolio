export default function SkeletonCard() {
    return (
      <div
        style={{
          background: "var(--surface)",
          borderBottom: "3px solid rgba(184,154,94,0.22)",
          overflow: "hidden",
        }}
      >
        {/* Image placeholder */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            ...shimmer,
          }}
        />
        {/* Text placeholders */}
        <div style={{ padding: "1.6rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ ...shimmer, height: "0.65rem", width: "35%", borderRadius: 2 }} />
          <div style={{ ...shimmer, height: "1.2rem", width: "70%", borderRadius: 2, margin: "0.25rem 0 0.5rem" }} />
          <div style={{ ...shimmer, height: "0.75rem", width: "100%", borderRadius: 2 }} />
          <div style={{ ...shimmer, height: "0.75rem", width: "85%", borderRadius: 2 }} />
          <div style={{ ...shimmer, height: "0.75rem", width: "60%", borderRadius: 2 }} />
          <div style={{ ...shimmer, height: "0.65rem", width: "30%", borderRadius: 2, marginTop: "0.75rem" }} />
        </div>
      </div>
    );
  }
  
  const shimmer: React.CSSProperties = {
    background:
      "linear-gradient(90deg, var(--parchment-alt) 0%, rgba(245,241,234,0.5) 50%, var(--parchment-alt) 100%)",
    backgroundSize: "800px 100%",
    animation: "shimmer 1.6s infinite linear",
  };