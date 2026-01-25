/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    modern: true,
  },
  images: {
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
