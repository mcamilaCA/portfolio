import { shimmer } from "@/app/components/shimmer";

export default function JournalCardSkeleton() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div style={{ width: "100%", aspectRatio: "16/9", ...shimmer, borderRadius: 0 }} />
      <div style={{ padding: "1.1rem" }}>
        <div style={{ ...shimmer, height: "0.58rem", width: "55%", marginBottom: "0.75rem" }} />
        <div style={{ ...shimmer, height: 1, width: "100%", marginBottom: "0.75rem", borderRadius: 0 }} />
        <div style={{ ...shimmer, height: "1rem", width: "85%", marginBottom: "0.5rem" }} />
        <div style={{ ...shimmer, height: "1rem", width: "60%", marginBottom: "0.75rem" }} />
        <div style={{ ...shimmer, height: "0.7rem", width: "100%", marginBottom: "0.35rem" }} />
        <div style={{ ...shimmer, height: "0.7rem", width: "70%" }} />
      </div>
    </div>
  );
}
