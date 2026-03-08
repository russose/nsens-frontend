const siteUrl = "https://www.nsens.org/";

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/*batch*"],
  alternateRefs: [
    // {
    //   href: siteUrl + "en",
    //   hreflang: "en",
    // },
    {
      href: siteUrl + "fr",
      hreflang: "fr",
    },
    {
      href: siteUrl + "it",
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
        // path.endsWith("/fr") ||
        // path.endsWith("/en") ||
        // path.endsWith("/it") ||
        // !path.includes("/batch");
        // path.includes("Notebooks");
        path.includes("/en");
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
      // alternateRefs: config.alternateRefs ?? [],
      alternateRefs: config.alternateRefs.map((alternateRef) => ({
        href: `${alternateRef.href}` + `${path}`.slice(3),
        // href: `${alternateRef.href}`,
        // href: `${path}`.slice(3),
        // href: siteUrl,
        hreflang: alternateRef.hreflang,
        hrefIsAbsolute: true,
      })),
    };
  },
};
