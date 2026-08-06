export type Project = {
    id: string;
    title: string;
    image_url: string;
    git_url: string;
    proj_url: string;
    tags: string[];
    slug: string;
    date: string;
    summary: string;
  };

export type ProjectDetail = {
    id: string;
    title: string;
    image_url: string;
    description: string;
    created_at: string;
    slug:string;
  
    outcomes?: string;            // Key learnings and impact (legacy free-text field)
    problem?: string;             // What problem the project addresses
    solution?: string;            // The approach taken to solve it
    architecture?: string;        // System/technical architecture
    technical_decisions?: string; // Notable engineering decisions and why
    challenges?: string;          // Obstacles encountered
    lessons_learned?: string;     // Reflections and takeaways
    tags?: string[];             // In the format-> ["React", "Supabase", "Design"]
    live_url?: string;           // Link to live project
    repo_url?: string;           // Code link
    role?: string;               // Format -> Lead Developer & Designer
    year?: string;               // Format-> 2024
  };
  
export type Post = {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    media_url?: string;
    date: string;
    summary: string;
  };


export type BlogDetail = {
    id: string;
    title: string;
    date: string;
    media_url?: string;
    slug:string;
    summary: string;

    body?: string;               // Long-form content / markdown
    tags?: string[];             // e.g. ["Travel", "Coding", "Life"]
    location?: string;           // e.g. "Lisbon, Portugal"
    mood?: string;               // A personal touch, e.g. "Reflective"
    gallery?: string[];          // Extra images for the entry
  };

export type ResearchKind = "experience" | "publication" | "note" | "replication";

export type ResearchEntry = {
    id: string;
    kind: ResearchKind;
    title: string;
    subtitle?: string;           // e.g. "Lab of Dr. Tatsuhisa Tsuboi · Tsinghua University"
    year?: string;               // e.g. "2023" or "2022–2023"

    objective?: string;
    methods?: string;
    results?: string;
    reflection?: string;

    tags?: string[];
    link_url?: string;           // paper DOI, replication repo, etc.
    link_label?: string;         // e.g. "Read Paper ↗"
    display_order?: number;
  };

export type Subscribers= {
    id: string;
    created_at: string;
    email: string;
    confirmed: boolean;
    
  };