import { shimmer } from "@/app/components/shimmer";

export default function JournalCardSkeleton() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div style={{ width: "100%", aspectRatio: "2.4/1", ...shimmer, borderRadius: 0 }} />
      <div style={{ padding: "0.6rem" }}>
        <div style={{ ...shimmer, height: "0.55rem", width: "55%", marginBottom: "0.4rem" }} />
        <div style={{ ...shimmer, height: 1, width: "100%", marginBottom: "0.4rem", borderRadius: 0 }} />
        <div style={{ ...shimmer, height: "0.8rem", width: "85%", marginBottom: "0.3rem" }} />
        <div style={{ ...shimmer, height: "0.8rem", width: "60%", marginBottom: "0.4rem" }} />
        <div style={{ ...shimmer, height: "0.6rem", width: "100%", marginBottom: "0.25rem" }} />
        <div style={{ ...shimmer, height: "0.6rem", width: "70%" }} />
      </div>
    </div>
  );
}
