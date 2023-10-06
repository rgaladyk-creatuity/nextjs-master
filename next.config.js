/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true
    },
    images: {
        domains: ["media.graphassets.com"],
    },
};

module.exports = nextConfig;