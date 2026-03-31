"use client";

import { useState } from "react";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging log
    try {
      const { error } = await supabase.from("Mails").insert([formData]);
  
      if (error) {
        console.error("Error saving message to database:", error.message);
      } else {
        setSuccessMessage(
          "I look forward to discussing our future endeavours. Please be patient as I will answer as soon as I am capable of!"
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      <Header />
      <main
        style={{
          paddingTop: "8rem",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "4rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5vw, 2rem)",
            lineHeight: 1.2,
            color: "var(--ink)",
            marginBottom: "2rem",
          }}
        >
          Do not fret and speak your mind!
        </h1>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "1.2rem",
            lineHeight: 1.6,
            color: "var(--ink)",
            maxWidth: "800px",
            marginBottom: "3rem",
          }}
        >
        If you have any ideas or requests feel free to reach out. <br/>
        I am always open for collaborations, discussions and new opportunities        
      </p>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "100%",
            maxWidth: "600px",
            background: "var(--surface)",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "1rem",
              fontSize: "1rem",
              border: "1px solid var(--ink)",
              borderRadius: "5px",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--ink)")}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "1rem",
              fontSize: "1rem",
              border: "1px solid var(--ink)",
              borderRadius: "5px",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--ink)")}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{
              padding: "1rem",
              fontSize: "1rem",
              border: "1px solid var(--ink)",
              borderRadius: "5px",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--ink)")}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              padding: "1rem",
              fontSize: "1rem",
              border: "1px solid var(--ink)",
              borderRadius: "5px",
              minHeight: "150px",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--ink)")}
          />
          <button
            type="submit"
            style={{
              padding: "1rem",
              fontSize: "1rem",
              background: "var(--ink)",
              color: "var(--parchment)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = "var(--ink)";
            }}
          >
            Send Message
          </button>
        </form>
        {successMessage && (
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1.2rem",
              color: "var(--ink)",
              fontFamily: "'Cormorant Garamond', serif",
              background: "var(--surface)",
              padding: "1rem",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {successMessage}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}