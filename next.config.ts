import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* no route-compile popup / corner badge during page switches */
  devIndicators: false,
};

export default nextConfig;
