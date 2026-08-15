import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ProjectGallery from "@/app/components/projectGallery";

export const revalidate = 60;

export default async function Projects() {
  const { data, error } = await supabase
    .from("Projects")
    .select("id, title, git_url, proj_url, date, slug, image_url, summary, tags")
    .order("date", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />
      <main>
        {/* ── Simplified hero: just the two lines of text over the gold-dust glow ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            padding: "4.5rem 2rem 1.75rem",
            background: "radial-gradient(ellipse 90% 100% at 50% 0%, var(--ink-2) 0%, var(--ink) 100%)",
          }}
        >
          <div aria-hidden className="page-hero-sparkle" />
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.68rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.5rem",
            }}
          >
            Selected Work
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--gold-lt)",
              letterSpacing: "-0.01em",
            }}
          >
            The Gallery
          </h1>
        </div>

        {/* ── Masterpiece (left) + vertical collection rail (right) ─────── */}
        <section style={{ padding: "1rem 2rem 3rem", background: "var(--ink)" }}>
          <ProjectGallery projects={data ?? []} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
