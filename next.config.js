/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'http',
    //         hostname: '103.41.112.95',
    //         port: '3000',
    //         pathname: '/images/**', // Adjust the path if needed
    //       },
    //     ],
    //   },
      images: {
        domains: ['103.41.112.95'], // Add your image source here
      },
};

module.exports = nextConfig;
