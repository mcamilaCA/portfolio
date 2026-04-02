"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import BlogCard from "@/app/components/blog_card";
import SkeletonCard from "@/app/components/skeletonCard";
import SectionHeader from "@/app/components/sectionHeader";
import type { Post } from "@/app/types";

export default function Blog() {
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    supabase
      .from("Post")
      .select("id, title, slug, published, media_url,date, summary")
      .order("date", { ascending: false })
      .then(({ data }) => {
        if (data) setBlogs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      <Header />
      <main style={{ paddingTop: "7rem" }}>
        <section style={{ padding: "4rem 2rem 7rem", background: "var(--surface)" }}>
          <SectionHeader label="Field Notes" title="All Blog Entries" />
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {loading
              ? [0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)
              : blogs.map((v, i) => <BlogCard key={v.id} entry={v} index={i} />)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}