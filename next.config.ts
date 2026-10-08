import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev assets are blocked when the phone opens the LAN address instead of localhost.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
