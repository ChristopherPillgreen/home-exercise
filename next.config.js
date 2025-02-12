/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverMinification: false,
  },
  webpack(config, { dev, isServer }) {
    // config.optimization.minimize = false;
  
    return config;
  },
};
