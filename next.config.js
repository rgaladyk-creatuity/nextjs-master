/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
        serverActions: true,
    },
    images: {
        domains: ["media.graphassets.com"],
    },
};

module.exports = nextConfig;