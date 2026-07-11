import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives in an iCloud-synced folder (~/Desktop). iCloud evicts/renames
  // files inside .next while `next dev` writes them, 404ing every chunk. iCloud skips
  // anything named *.nosync, so the build dir must keep this suffix.
  distDir: ".next.nosync",
};

export default nextConfig;
