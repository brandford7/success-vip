/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static3.smr.vc",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

module.exports = nextConfig;
