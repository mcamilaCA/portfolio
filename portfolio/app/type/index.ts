export type Project = {
    id: Int8Array;
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
    id: Int8Array;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    media_url?: string;
    date: string;
  };

  export type Subscribers= {
    id: Int8Array;
    created_at: string;
    email: string;
    confirmed: boolean;
  };