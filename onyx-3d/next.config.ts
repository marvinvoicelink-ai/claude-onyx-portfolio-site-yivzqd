import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Zwei Root-Layouts (app/(de), app/(es)) — dafür braucht es die globale 404.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
