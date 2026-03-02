/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'prymshare-app-files.s3.amazonaws.com',
                port: '',
                pathname: '/logos/**',
            },
        ],
    },
    experimental: {
        // turbo: { ... } // Next.js 15 might handle this automatically
    }
};

export default nextConfig;