/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['suzstudio.live'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'suzstudio.live',
        pathname: '/_assets/**',
      },
    ],
  },
}

module.exports = nextConfig
