/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
        
      },
      {
        protocol: 'https',
        hostname: 'fineryandcake.com', 
        
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com', 
        
      },
     
    ],
  }, 
   experimental: {
    serverActions: true,
  },
}

export default nextConfig;
