/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  reactStrictMode: true,
  images: {
    domains: ['http2.mlstatic.com']
  }
}

module.exports = nextConfig
