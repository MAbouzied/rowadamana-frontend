/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rowadamana.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
