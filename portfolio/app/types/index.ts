export type Project = {
    id: string;
    title: string;
    image_url: string;
    git_url: string;
    proj_url: string;
    tags: string;
    slug: string;
    date: string;
    summary: string;
  };

export type ProjectDetail = {
    id: string;
    name: string;
    image_url: string;
    summary: string;
    created_at: string;
    slug:string;
  
    
    full_description?: string;   // Long-form rich text / markdown body
    tags?: string[];             // e.g. ["React", "Supabase", "Design"]
    live_url?: string;           // Link to live project
    repo_url?: string;           // GitHub / GitLab repo
    role?: string;               // e.g. "Lead Developer & Designer"
    year?: string;               // e.g. "2024"
    gallery?: string[];          // Extra image URLs shown in the grid
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
    short: string;
    slug:string;

    body?: string;               // Long-form content / markdown
    tags?: string[];             // e.g. ["Travel", "Coding", "Life"]
    location?: string;           // e.g. "Lisbon, Portugal"
    mood?: string;               // A personal touch, e.g. "Reflective"
    gallery?: string[];          // Extra images for the entry
  };

export type Subscribers= {
    id: string;
    created_at: string;
    email: string;
    confirmed: boolean;
    
  };