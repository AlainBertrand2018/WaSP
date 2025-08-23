
import type {NextConfig} from 'next';

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
      }
    ],
  },
  env: {
    NEXT_PUBLIC_HYPERADMIN_EMAIL: process.env.HYPERADMIN_EMAIL,
  },
  webpack: (config, { isServer }) => {
    // Exclude server-only packages from the client-side bundle
    if (!isServer) {
      config.externals = [
        ...(config.externals || []),
        '@opentelemetry/instrumentation',
        '@opentelemetry/sdk-node',
        'handlebars',
        // Add any other problematic packages here
      ];
    }

    return config;
  },
};

export default nextConfig;
