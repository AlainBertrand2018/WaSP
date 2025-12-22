import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 1. TypeScript Validation: Keep ignoring errors */
  typescript: {
    ignoreBuildErrors: true,
  },

  /* 2. ESLint: Force ignore during builds
     (We use @ts-expect-error to bypass the Next.js 16 type definition bug) */
  // @ts-expect-error - valid config property despite type definition
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* 3. Modern Package Handling */
  serverExternalPackages: [
    '@aws-sdk/client-s3',
    '@opentelemetry/instrumentation',
    '@opentelemetry/sdk-node',
    'genkit', 
    '@genkit-ai/google-genai'
  ],

  /* 4. Images Configuration */
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
