module.exports = {
  siteUrl: "https://www.nsens.org",
  generateRobotsTxt: true,
  // exclude: ['/protected-page', '/awesome/secret-page'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/_next*",
      },
    ],
  },
};
