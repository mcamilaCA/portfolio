import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "portfolio-git-main-mcopo001-fiuedus-projects.vercel.app",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hbrodwfbrmqlmftkyhhk.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;