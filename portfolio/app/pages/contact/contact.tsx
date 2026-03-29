import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Contact() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      <Header />
      <main style={{ paddingTop: "8rem", maxWidth: 1200, margin: "0 auto", padding: "8rem 2rem 6rem" }}>
        {"placeholder for contact form"}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            color: "var(--ink)",
            marginBottom: "2rem",
          }}
        >
          Contact
        </h1>
      </main>
      <Footer />
    </div>
  );
}