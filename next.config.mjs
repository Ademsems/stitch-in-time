/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local placeholders only for now; real client photography swaps in later.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
