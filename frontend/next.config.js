/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/all-posts',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
