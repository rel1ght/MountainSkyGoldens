require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const path = require("path");

module.exports = {
  siteMetadata: {
    siteUrl: "https://mountainskygoldens.com",
    title: "Mountain Sky Goldens",
  },
  plugins: [
    // {
    // 	resolve: "gatsby-plugin-layout",
    // 	options: {
    // 		component: require.resolve("./src/components/layout.js"),
    // 	},
    // },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.mountainskygoldens.com",
        sitemap: "https://www.mountainskygoldens.com/sitemap/sitemap-index.xml",
        policy: [
          {
            userAgent: "Googlebot",
            disallow: ["/deposit", "/adoptSubmitted", "/studService"],
          },
          { userAgent: "*", allow: "/" },
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sharp`,
      options: { defaults: { formats: ["jpg", "png"] } },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-theme-material-ui",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: "gatsby-theme-material-ui",
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: "Poppins",
                variants: ["200", "300", "400", "700"],
              },
              {
                family: "Crete Round",
                variants: ["200", "300", "400", "700"],
              },
            ],
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Phamelo"],
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `rghby61rtlrc`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-25RR0300TL", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "OPT_CONTAINER_ID",
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          // respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          // origin: "YOUR_SELF_HOSTED_ORIGIN",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/.*\.svg/,
        },
        filters: [
          (value) => {
            console.log(value);
          },
        ],
        // omitKeys: [
        // 	// "xmlnsDc",
        // 	// "xmlnsCc",
        // 	// "xmlnsRdf",
        // 	// "xmlnsSvg",
        // 	// "xmlnsSodipodi",
        // 	// "xmlnsInkscape",
        // ],
      },
    },
  ],
};
