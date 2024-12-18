/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "http://localhost:3000/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
