import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'global-living.vercel.app',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'pub-396d22cca10644eeba822f5e89000a8a.r2.dev',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
