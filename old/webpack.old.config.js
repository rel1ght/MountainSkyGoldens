const webpack = require("webpack");
const path = require("path");
const config = {
	target: "web",
	entry: "./assets/js/index.js",
	output: {
		path: path.resolve(__dirname + "../dist"),
		filename: "bundle.js",
		publicPath: "/assets/"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									useBuiltIns: "entry"
								}
							]
						]
					}
				}
			},

			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						// Adds CSS to the DOM by injecting a `<style>` tag
						loader: "style-loader"
					},
					{
						// Interprets `@import` and `url()` like `import/require()` and will resolve them
						loader: "css-loader"
					},
					{
						// Loader for webpack to process CSS with PostCSS
						loader: "postcss-loader",
						options: {
							plugins: function() {
								return [require("autoprefixer")];
							}
						}
					},
					{
						// Loads a SASS/SCSS file and compiles it to CSS
						loader: "sass-loader"
					}
				]
			},
			// {
			// 	test: /\.(png|svg|jpg|gif)$/,
			// 	use: ["file-loader"]
			// },

			{
				test: /\.(eot|woff|otf|woff2|ttf)(\?\S*)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "./fonts/[name].[ext]"
						}
					}
				]
			},
			{
				test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "./img/[name].[ext]"
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			tether: "tether",
			Tether: "tether",
			"window.Tether": "tether"
		})
	]
};

module.exports = config;
