/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bdcdmqdz-3333.brs.devtunnels.ms',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
