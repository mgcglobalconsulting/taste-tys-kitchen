import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A package-lock.json in the home directory otherwise confuses root detection.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
