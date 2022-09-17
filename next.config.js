const withPWA = require("next-pwa");
const runtimeCaching = require("./src/config/runtimeCaching");

module.exports = withPWA({
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // removeConsole: true,
  },
  // productionBrowserSourceMaps: true, // for bundle-wizard
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching: runtimeCaching,
    skipWaiting: true,
    // dynamicStartUrl=false,
    // cacheOnFrontEndNav: true,
  },
});

// To use bundle-analyzer, uncomment, run build and see ./next/analyse directory
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   // enabled: process.env.ANALYZE === "true",
//   enabled: "true",
// });
// module.exports = withBundleAnalyzer({});

// To use bundle-wizard:
// 1) uncomment  productionBrowserSourceMaps: true,
// 2) run the production build (npm run start)
// 3) run  bundle-wizard (npm run bundle-wizard)
