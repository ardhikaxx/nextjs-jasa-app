import type { NextConfig } from "next";

const nextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'ui-avatars.com',
            'avatars.githubusercontent.com',
            'graph.facebook.com'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig