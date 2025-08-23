import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tgapgvvufswaxsyyhnna.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    // Avoid AWS SDK bundling on client.
    if (!isServer && nextRuntime === 'edge') {
      config.externals.push('@aws-sdk/client-s3');
    }
     if (!isServer) {
      config.externals.push(
        '@opentelemetry/instrumentation',
        '@opentelemetry/sdk-node'
      );
    }
    return config;
  },
};

export default nextConfig;
