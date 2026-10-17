import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Course thumbnails come from YouTube's thumbnail CDN.
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
