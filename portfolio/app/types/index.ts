export type Project = {
    id: string;
    title: string;
    image_url: string;
    description: string;
    git_url: string;
    proj_url: string;
    tags: string;
    slug: string;
    date: string;
  };
  
  export type Post = {
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    media_url?: string;
    date: string;
  };

  export type Subscribers= {
    id: string;
    created_at: string;
    email: string;
    confirmed: boolean;
  };