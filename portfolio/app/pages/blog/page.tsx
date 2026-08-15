import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import BlogList from "@/app/components/blogList";
import StatusMessage from "@/app/components/statusMessage";

export const revalidate = 60;

export default async function Blog() {
  const { data, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });

  if (error) {
    console.error("Supabase error fetching posts:", error);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />
      <main>
        {error ? (
          <StatusMessage layout="inline" variant="error" />
        ) : (
          <BlogList posts={data ?? []} />
        )}
      </main>
      <Footer />
    </div>
  );
}
