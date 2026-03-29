/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de performance
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Otimizações de compilação (SWC)
  swcMinify: true,
  
  // Permitir carregamento de imagens de domínios externos se necessário
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Otimizações experimentais para reduzir bundle size
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
