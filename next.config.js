const withPWA = require("next-pwa");
const runtimeCaching = require("./runtimeCaching");

module.exports = withPWA({
  trailingSlash: true,
  reactStrictMode: true,
  unstable_JsPreload: false, // TO BE TESTED TO BE SURE IT IMPROVE THE PERFS
  experimental: {
    staticPageGenerationTimeout: 600000,
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    runtimeCaching: runtimeCaching,
    // dynamicStartUrl=false,
    // cacheOnFrontEndNav: true,
  },
});

// To use bundle-analyzer, uncomment and see ./next/analyse directory

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   // enabled: process.env.ANALYZE === "true",
//   enabled: "true",
// });
// module.exports = withBundleAnalyzer({});
