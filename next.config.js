/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'naszsklep-api.vercel.app',
                port: '',
                pathname: '',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '',
            },
            {
                protocol: 'https',
                hostname: 'media.graphassets.com',
                port: '',
                pathname: '',
            },
        ],
    },
};

module.exports = nextConfig;