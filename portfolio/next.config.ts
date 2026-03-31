import type { NextConfig } from "next";

module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', "http://192.168.4.51:3000", 'portfolio-eta-lemon-68.vercel.app'],
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
