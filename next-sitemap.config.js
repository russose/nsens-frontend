module.exports = {
  siteUrl: "https://www.nsens.org",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // exclude: ['/protected-page', '/awesome/secret-page'],
  alternateRefs: [
    {
      href: "https://www.nsens.org/en/",
      hreflang: "en",
    },
    {
      href: "https://www.nsens.org/fr/",
      hreflang: "fr",
    },
    {
      href: "https://www.nsens.org/it/",
      hreflang: "it",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  transform: async (config, path) => {
    function customIgnoreFunction(path) {
      const path_to_be_included =
        path.endsWith("/fr") ||
        path.endsWith("/en") ||
        path.endsWith("/it") ||
        path.includes("Notebooks");
      return !path_to_be_included;
    }

    // custom function to ignore the path
    if (customIgnoreFunction(path)) {
      return null;
    }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
