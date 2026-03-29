/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de performance
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Otimizações de compilação (SWC)
  swcMinify: true,
  
  // Permitir carregamento de imagens de domínios externos
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Otimizações experimentais para reduzir bundle size
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react'],
    // Forçar o compilador a ser mais agressivo com JS moderno
    scrollRestoration: true,
  },
};

export default nextConfig;
