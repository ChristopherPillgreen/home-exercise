// next.config.js
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: true,
  // compiler: {
  //   keepClassNames: true,
  // },
  output: 'standalone',
  
  webpack: (config, { dev, isServer }) => {
    // Provide fallbacks for both server and client builds
    
    config.optimization.minimize = false;
    
    
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      oracledb: false,
      'pg-query-stream': false,
      mariadb: false,
    };

    // Use IgnorePlugin to completely ignore these modules
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^oracledb$/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /^pg-query-stream$/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /^mariadb\/callback$/ })
    );

    return config;
  },
};

module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// module.exports = {
//   webpack: (config, { dev, isServer }) => {
//     // Provide fallbacks for both server and client builds
    
//     config.optimization.minimize = false;
//     return config;
//   },
// };