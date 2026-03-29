import Link from "next/link";
import { useReveal } from "@/app/hooks/Usereveal";
import type { Project } from "@/app/types";
import Image from "next/image";


type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className="letter-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${index * 0.12}s, transform 0.65s ease ${index * 0.12}s`,
        display: "flex",
        flexDirection: "column",
        background: "var(--surface)",
        borderBottom: "3px solid var(--gold)",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
        }}
      >
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.6s cubic-bezier(.22,.68,0,1)",
            }}
            className="card-img"
            layout="responsive"
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
        {/* Gradient overlay */}
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
          padding: "1.6rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}
        >
          Project
        </p>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: "1.3rem",
            color: "var(--ink)",
            letterSpacing: "0.01em",
            lineHeight: 1.25,
          }}
        >
          {project.title}
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
            fontWeight: 300,
            fontSize: "0.85rem",
            color: "var(--ash)",
            lineHeight: 1.7,
            marginBottom: "1.2rem",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        <Link href={`/pages/projects/${project.id}`} className="card-cta">
          View work →
        </Link>
      </div>
    </div>
  );
}