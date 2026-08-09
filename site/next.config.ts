import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://sugar-high.vercel.app/react',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
