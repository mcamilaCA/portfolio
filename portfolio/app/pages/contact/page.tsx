"use client";

import { useRef, useState } from "react";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const MIN_SUBMIT_SECONDS = 3; // bots that fill+submit instantly get caught here
const COOLDOWN_MS = 60_000; // one submission per minute per browser
const LAST_SUBMIT_KEY = "contact_last_submit";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRenderedAt = useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Honeypot: real visitors never see or fill this field, so any value means a bot.
    const honeypot = (new FormData(e.target as HTMLFormElement).get("company") as string) ?? "";
    if (honeypot.trim() !== "") {
      // Pretend it worked so the bot doesn't learn the field is a trap.
      setSuccessMessage(
        "I look forward to discussing our future endeavours. Please be patient as I will answer as soon as I am capable of!"
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      return;
    }

    if (Date.now() - formRenderedAt.current < MIN_SUBMIT_SECONDS * 1000) {
      setErrorMessage("That was fast! Please take a moment and try again.");
      return;
    }

    const lastSubmit = Number(window.localStorage.getItem(LAST_SUBMIT_KEY) ?? 0);
    if (Date.now() - lastSubmit < COOLDOWN_MS) {
      setErrorMessage("You've just sent a message — please wait a minute before sending another.");
      return;
    }

    try {
      const { error } = await supabase.from("Mails").insert([formData]);

      if (error) {
        console.error("Error saving message to database:", error.message);
        setErrorMessage("Something went wrong sending your message. Please try again.");
      } else {
        window.localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
        setSuccessMessage(
          "I look forward to discussing our future endeavours. Please be patient as I will answer as soon as I am capable of!"
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Something went wrong sending your message. Please try again.");
    }
  };

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
          Collaborate
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
          Do Not Fret, Speak Your Mind
        </h1>
        <img src="/assets/section-rule.svg" alt="" aria-hidden style={{ width: 140, opacity: 0.8, margin: "0 auto" }} />
      </div>

      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "4.5rem 2rem 7rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "var(--body-text)",
            maxWidth: "620px",
            marginBottom: "3rem",
          }}
        >
          If you have any ideas or requests feel free to reach out. <br />
          I am always open for collaborations, discussions and new opportunities.
        </p>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "100%",
            maxWidth: "600px",
            background: "var(--ink-2)",
            border: "1px solid var(--border)",
            padding: "2.5rem",
            borderRadius: "2px",
            boxShadow: "0 20px 44px rgba(0,0,0,0.35)",
          }}
        >
          <input
            type="text"
            name="company"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="gothic-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="gothic-input"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="gothic-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="gothic-input"
            style={{ minHeight: "150px", resize: "vertical" }}
          />
          <button
            type="submit"
            style={{
              padding: "1rem",
              fontFamily: "'Lato', sans-serif",
              fontWeight: 400,
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg,var(--gold),var(--gold-dp))",
              color: "var(--ink)",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              transition: "background 0.25s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.background = "var(--gold-lt)";
              target.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.background = "linear-gradient(135deg,var(--gold),var(--gold-dp))";
              target.style.transform = "scale(1)";
            }}
          >
            Send Message
          </button>
        </form>
        {successMessage && (
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1.1rem",
              color: "var(--gold-lt)",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              background: "var(--ink-2)",
              border: "1px solid var(--border)",
              padding: "1.2rem 1.5rem",
              borderRadius: "2px",
              maxWidth: "600px",
            }}
          >
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1rem",
              color: "var(--gold-lt)",
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              background: "var(--ink-2)",
              border: "1px solid var(--border)",
              padding: "1rem 1.5rem",
              borderRadius: "2px",
              maxWidth: "600px",
            }}
          >
            {errorMessage}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
