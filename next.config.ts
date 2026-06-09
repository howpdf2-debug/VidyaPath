/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: '/api/ads',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;