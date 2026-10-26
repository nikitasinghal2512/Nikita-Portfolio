import type { NextConfig } from "next";

// Only GitHub Pages (running in GitHub Actions) requires static export and repository subpath.
// Vercel and local environments run at root domain ("") with full Next.js dynamic routing support.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/Nikita-Portfolio",
      }
    : {}),
  images: {
    unoptimized: true,
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
