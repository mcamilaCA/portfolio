import { shimmer } from "@/app/components/shimmer";

export default function SkeletonCard() {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderBottom: "3px solid var(--border)",
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