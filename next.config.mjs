/** @type {import('next').NextConfig} */

import PWA from 'next-pwa'

const withPWA = PWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["geist"],
  images: {
    domains: ["i.imgur.com", "ipfs.decentralized-content.com"]
  },
  swcMinify: true,
};

export default withPWA(nextConfig)

