/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v0.blob.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

