const webpack = require('webpack');

/**
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
  output: 'standalone',
  webpack: (config, { dev, isServer }) => {
    
    config.optimization.minimize = false;
    
    
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      oracledb: false,
      'pg-query-stream': false,
      mariadb: false,
    };

    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^oracledb$/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /^pg-query-stream$/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /^mariadb\/callback$/ })
    );

    return config;
  },
};

module.exports = nextConfig;