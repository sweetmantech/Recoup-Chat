// next.config.mjs

import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, 
    swcMinify: true,
    transpilePackages: ["geist"],
    images: {
      domains: ["i.imgur.com", "ipfs.decentralized-content.com"]
    },
};

export default withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
})(nextConfig);

