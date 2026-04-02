import Link from "next/link";
import { useReveal } from "@/app/hooks/Usereveal";
import type { Post } from "@/app/types";
import Image from "next/image";


type Props = {
  entry: Post;
  index: number;
};

export default function BlogCard({ entry, index }: Props) {
  const { ref, visible } = useReveal();

  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      ref={ref}
      className="letter-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s ease ${index * 0.12}s`,
        display: "flex",
        height: "100%",
        flexDirection: "column",
        background: "var(--surface)",
        borderBottom: "3px solid var(--gold)",
      }}
    >
      {/* Media (optional) */}

    < div 
        style = {{
          position: "relative",
          width: "100%",
          aspectRatio: "16/10",
          overflow: "hidden",
        }}
      >
        
       {entry.media_url ? (
          <Image
            src={entry.media_url}
            alt={entry.title}
            fill
            className="card-img"
            style={{
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(.22,.68,0,1)",
            }}
          />
        ) : (
          <div
              style={{
                width: "100%",
                height: "100%",
                background: "var(--parchment-alt)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
                <span style={{ fontSize: "2rem", opacity: 0.3, color: "var(--gold)" }}>✦</span>
          </div>  
          )}
          <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(14,13,11,0.35) 100%)",
            pointerEvents: "none",
          }}
        />
    </div>

        {/* Body */}
        <div
          style={{
            padding: "1.1rem",
            display:"flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 300,
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.4rem",
            }}
          >
            {formattedDate}
          </p>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "1.05rem",
              color: "var(--ink)",
              letterSpacing: "0.01em",
              lineHeight: 1.25,
            }}
          >
            {entry.title}
          </h3>

          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(184,154,94,0.22)",
              margin: "1rem 0",
            }}
          />

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontWeight: 300,
              fontSize: "0.78rem",
              color: "var(--ash)",
              lineHeight: 1.6,
              marginBottom: "1.2rem",
              flex: 1,
            }}
          >
            {entry.summary}
          </p>

          <Link href={`/pages/blog/${entry.slug}`} className="card-cta">
            Read entry →
          </Link>
        </div>
      </div>
  );
}