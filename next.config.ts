import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    // @ts-expect-error - Next.js TS definitions haven't caught up to this Turbopack feature yet
    turbopack: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;