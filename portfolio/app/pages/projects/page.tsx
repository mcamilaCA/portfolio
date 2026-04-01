"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import ProjectCard from "@/app/components/project_card";
import SkeletonCard from "@/app/components/skeletonCard";
import SectionHeader from "@/app/components/sectionHeader";
import type { Project } from "@/app/types";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    supabase
      .from("Projects")
      .select("id, title, image_url, description, git_url, proj_url, tags, slug, date")
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase error:", error);
        } else if (data) {
          setProjects(data);
        }
        setLoading(false);
      });
  }, []);


  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      console.log(projects.length);
      <Header />
      <main style={{ paddingTop: "7rem" }}>
        <section style={{ padding: "4rem 2rem 7rem", background: "var(--surface)" }}>
          <SectionHeader label="Selected Work" title="All Projects" />
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px,260px))",
              alignItems: "stretch",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {loading
              ? [0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)
              : projects.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}