
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
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@opentelemetry/exporter-jaeger'] = false;
    config.externals.push('handlebars');
    return config;
  },
  turbo: {
    resolveAlias: {
      '@opentelemetry/exporter-jaeger': false,
      'handlebars': 'handlebars/dist/cjs/handlebars.js',
    },
  },
};

export default nextConfig;
