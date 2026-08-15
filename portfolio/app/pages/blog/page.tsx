import supabase from "@/app/config/supabase_client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import BlogList from "@/app/components/blogList";

export const revalidate = 60;

export default async function Blog() {
  const { data } = await supabase
    .from("Posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
      <Header />
      <main>
        <BlogList posts={data ?? []} />
      </main>
      <Footer />
    </div>
  );
}
