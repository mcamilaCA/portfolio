import { shimmer } from "@/app/components/shimmer";

export default function JournalCardSkeleton() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div style={{ width: "100%", aspectRatio: "3/2", ...shimmer, borderRadius: 0 }} />
      <div style={{ padding: "1.5rem" }}>
        <div style={{ ...shimmer, height: "0.6rem", width: "30%", marginBottom: "0.6rem" }} />
        <div style={{ ...shimmer, height: "0.6rem", width: "45%", marginBottom: "1.1rem" }} />
        <div style={{ ...shimmer, height: 1, width: "100%", marginBottom: "1.1rem", borderRadius: 0 }} />
        <div style={{ ...shimmer, height: "1.1rem", width: "80%", marginBottom: "0.6rem" }} />
        <div style={{ ...shimmer, height: "1.1rem", width: "55%", marginBottom: "1rem" }} />
        <div style={{ ...shimmer, height: "0.75rem", width: "100%", marginBottom: "0.4rem" }} />
        <div style={{ ...shimmer, height: "0.75rem", width: "70%" }} />
      </div>
    </div>
  );
}
