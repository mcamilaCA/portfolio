import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Greeting from "@/app/components/greeting";
import Socials from "@/app/components/socials";

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      <Header />
      <main style={{ paddingTop: "8rem", maxWidth: 1200, margin: "0 auto", padding: "8rem 2rem 6rem" }}>
        
        <Greeting/>
          
      <div
        style={{
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          gap: "2rem", 
          maxWidth: 1200,
          margin: "0 auto", 
          padding: "2rem", 
        }}
      >
        {/* Left Side: Text */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "var(--ink)", 
              maxWidth: "100%",
              lineHeight: 2,
              marginBottom: "3rem",
              letterSpacing: "0.02em",
            }}
          >
            <br/>
            Graduated with a Bachelor&apos;s in Computer Science from Florida International University. During my education I worked as a Teaching Assistant in a Java programming class and had two internships in Data Science & Machine Learning at AbbVie.
            <br />
            Studied Translational Medicine for half a year in Tsinghua University while working as a research assistant in the lab of Dr. Tatsuhisa Tsuboi,
            <br />
            where I collaborated on the paper &quot;Contrastive learning of dynamic processing body formation reveals undefined mechanisms of approved compounds.&quot;
            <br />
            I&apos;m currently exploring the realms of full-stack development, content creation, and the art of storytelling with a focus on Data Science and Machine learning.
            <br />
          </p>
        </div>

        {/* Right Side: Image */}
        <div style={{ flex: 1, textAlign: "right" }}>
          <img
            src="/assets/IMG_8489.jpeg" 
            alt="Sticker of myself"
            style={{
              maxWidth: "70%",
              height: "auto", 
              borderRadius: "30%", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
            }}
          />
        </div>
      </div>
        <Socials />
      </main>
      <Footer />
    </div>
  );
}