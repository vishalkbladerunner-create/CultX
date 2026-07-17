import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin workspace root to this package (avoid parent lockfile confusion)
    root: path.join(__dirname),
  },
};

export default nextConfig;
