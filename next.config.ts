import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  images: {
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/", destination: "/courses", permanent: false }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
