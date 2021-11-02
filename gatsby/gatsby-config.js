require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});
import path from "path";

module.exports = {
	siteMetadata: {
		siteUrl: "https://www.yourdomain.tld",
		title: "Mountain Sky Goldens",
	},
	plugins: [
		// {
		// 	resolve: "gatsby-plugin-layout",
		// 	options: {
		// 		component: require.resolve("./src/components/layout.js"),
		// 	},
		// },
		"gatsby-image",
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
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
	],
};
