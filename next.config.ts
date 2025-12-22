import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 1. TypeScript Validation: Keep ignoring errors as requested */
  typescript: {
    ignoreBuildErrors: true,
  },

  /* 2. Modern Package Handling: Replaces your old Webpack config.
        This tells Turbopack to keep these libraries on the server only. */
  serverExternalPackages: [
    '@aws-sdk/client-s3',
    '@opentelemetry/instrumentation',
    '@opentelemetry/sdk-node',
    'genkit', 
    '@genkit-ai/googleai'
  ],

  /* 3. Images Configuration */
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
};

export default nextConfig;