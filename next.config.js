const withPWA = require("next-pwa");
const runtimeCaching = require("./src/config/runtimeCaching");

module.exports = withPWA({
  trailingSlash: true,
  reactStrictMode: true,
  // experimental: {
  //   staticPageGenerationTimeout: 8000,
  // },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching: runtimeCaching,
    // dynamicStartUrl=false,
    // cacheOnFrontEndNav: true,
  },
});

// To use bundle-analyzer, uncomment, run buid and see ./next/analyse directory

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   // enabled: process.env.ANALYZE === "true",
//   enabled: "true",
// });
// module.exports = withBundleAnalyzer({});
