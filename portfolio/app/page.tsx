import Image from "next/image";
import supabase  from "./config/supabase_client";

export default function Home() {
  console.log("Supabase URL: ", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log(supabase) 
  return (
    <div className="flex items-center justify-center bg-cover bg-center bg-zinc font-sans dark:bg-amber-950"
      style={{backgroundImage:"url('/public/assets/bg_ptfolio.jpg')"}}
    >
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/assets/logo.png"
          alt="Camila's Logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Dearest Gentle Viewer 
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
           Pray, do step into my little corner of the ton, where data waltzes with intuition, and every corner hides a story longing to be discovered while merging with the sudden burst of creativity of this author.
          </p>
        </div>
      </main>
    </div>
  );
}
