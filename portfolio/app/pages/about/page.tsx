import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Socials from "@/app/components/socials";
import Section from "@/app/components/section";

const BIO = [
  "Graduated with a Bachelor's in Computer Science from Florida International University. During my education I worked as a Teaching Assistant in a Java programming class and had two internships in Data Science & Machine Learning at AbbVie.",
  "Studied Translational Medicine for half a year in Tsinghua University while working as a research assistant in the lab of Dr. Tatsuhisa Tsuboi, where I collaborated on the paper \"Contrastive learning of dynamic processing body formation reveals undefined mechanisms of approved compounds.\"",
  "I'm currently exploring the realms of full-stack development, content creation, and the art of storytelling with a focus on Data Science and Machine Learning.",
].join("\n\n");

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />

      <div className="page-hero">
        <div aria-hidden className="page-hero-sparkle" />
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.68rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.6rem",
          }}
        >
          The Person Behind The Work
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--gold-lt)",
            letterSpacing: "-0.01em",
            marginBottom: "1.1rem",
          }}
        >
          About
        </h1>
        <img src="/assets/section-rule.svg" alt="" aria-hidden style={{ width: 140, opacity: 0.8, margin: "0 auto" }} />
      </div>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem 6rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left: Biography */}
          <Section label="Biography" text={BIO} />

          {/* Right: Portrait frame (placeholder — drop a photo into the arch clip later) */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg
              width="220"
              height="330"
              viewBox="0 0 400 600"
              style={{ maxWidth: "100%", height: "auto" }}
            >
              <defs>
                <clipPath id="aboutArchClip">
                  <path d="M20,600 L20,220 C20,110 100,20 200,20 C300,20 380,110 380,220 L380,600 Z" />
                </clipPath>
                <radialGradient id="aboutArchGlow" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#3a2c1c" />
                  <stop offset="100%" stopColor="#221b15" />
                </radialGradient>
              </defs>

              <g clipPath="url(#aboutArchClip)">
                <rect x="20" y="20" width="360" height="580" fill="url(#aboutArchGlow)" />
              </g>

              {/* Keepsake mark reserved for a future portrait */}
              <g opacity="0.8">
                <circle cx="200" cy="310" r="34" fill="none" stroke="#C9A876" strokeWidth="1" />
                <text
                  x="200"
                  y="322"
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  fontSize="30"
                  fill="#C9A876"
                >
                  MC
                </text>
              </g>

              <path
                d="M20,600 L20,220 C20,110 100,20 200,20 C300,20 380,110 380,220 L380,600 Z"
                fill="none"
                stroke="#C9A876"
                strokeWidth="2"
              />
              <path
                d="M32,600 L32,222 C32,118 106,32 200,32 C294,32 368,118 368,222 L368,600 Z"
                fill="none"
                stroke="#C9A876"
                strokeWidth="0.75"
              />
              <circle cx="200" cy="24" r="4" fill="#C9A876" />
            </svg>
          </div>
        </div>

        <img
          src="/assets/flourish-divider.svg"
          alt=""
          aria-hidden
          style={{ width: 220, margin: "3.5rem auto 0", display: "block" }}
        />
        <Socials />
      </main>

      <Footer />
    </div>
  );
}
