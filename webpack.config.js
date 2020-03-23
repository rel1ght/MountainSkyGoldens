const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = function() {
	return {
		mode: "development",
		entry: {
			babel: "babel-polyfill",
			index: "./src/js/index.js",
			ourdogs: "./src/js/ourdogs.js"
		},
		output: {
			path: path.resolve(__dirname + "../dist"),
			filename: "[name].bundle.js",
			publicPath: "/"
		},
		watch: true,
		watchOptions: {
			aggregateTimeout: 300, // Process all changes which happened in this time into one rebuild
			poll: 1000, // Check for changes every second,
			ignored: /node_modules/
			// ignored: [
			//   '**/*.scss', '/node_modules/'
			// ]
		},
		devtool: "source-maps",
		devServer: {
			contentBase: path.join(__dirname, "src"),
			watchContentBase: true,
			hot: true,
			open: true,
			inline: true
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/index.html"),
				chunks: "index"
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/ourdogs.html"),
				filename: "ourdogs.html",
				chunks: "ourdogs"
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/About.html"),
				filename: "about.html"
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/Contact.html"),
				filename: "contact.html"
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/Adopt.html"),
				filename: "adopt.html"
			}),
			new webpack.HotModuleReplacementPlugin()
		],
		node: {
			tls: "mock",
			fs: "empty",
			net: "mock",
			dns: "mock"
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ["style-loader", "css-loader", "sass-loader"]
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"]
				},
				{
					test: /\.(eot|woff|otf|woff2|ttf)(\?\S*)?$/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: "./fonts",
								name: "[name].[ext]"
							}
						}
					]
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"]
						}
					}
				},
				{
					test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: "./img",
								name: "[name].[ext]"
							}
						}
					]
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader"
							// options: { attrs: ["img:src", "link:href"] }
						}
					]
				}
			]
		}
	};
};
