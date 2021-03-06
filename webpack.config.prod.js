const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = function (env, argv) {
	return {
		mode: "production",
		entry: {
			index: "./src/js/index.js",
			ourdogs: "./src/js/ourdogs.js",
			about: "./src/js/about.js",
			contact: "./src/js/contact.js",
			adopt: "./src/js/adopt.js",
			deposit: "./src/js/deposit.js",
			contract: "./src/js/about.js",
		},
		output: {
			path: path.resolve(__dirname + "/dist"),
			filename: "js/[name].bundle.js",
			publicPath: "./",
		},
		optimization: {
			minimizer: [new OptimizeCSSAssetsPlugin(), new UglifyJsPlugin()],
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
					// test: { test: /ourdogs/, name: "ourdogs", chunks: "all" }
				},
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/index.html"),
				chunks: ["index"],
				filename: "index.html",
				favicon: "src/img/favicon.ico",
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/ourdogs.html"),
				chunks: ["ourdogs"],
				filename: "ourdogs.html",
				favicon: "src/img/favicon.ico",
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/About.html"),
				chunks: ["about"],
				filename: "about.html",
				favicon: "src/img/favicon.ico",
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/Contact.html"),
				chunks: ["contact"],
				filename: "contact.html",
				favicon: "src/img/favicon.ico",
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/Adopt.html"),
				chunks: ["adopt"],
				filename: "adopt.html",
				favicon: "src/img/favicon.ico",
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/adoptSubmitted.html"),
				chunks: ["adopt"],
				filename: "adoptsubmitted.html",
				favicon: "src/img/favicon.ico",
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/deposit.html"),
				chunks: ["deposit"],
				filename: "deposit.html",
				favicon: "src/img/favicon.ico",
			}),
			new HtmlWebpackPlugin({
				title: "Mountain Sky Goldens",
				template: path.resolve("./src/contract.html"),
				chunks: ["contract"],
				filename: "contract.html",
				favicon: "src/img/favicon.ico",
			}),
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css",
			}),
			// new CopyWebpackPlugin([
			// 	{ from: "./src/ourdogs.html", to: "./ourdogs.html" }
			// ]),
			new MinifyPlugin(),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new BrotliPlugin({
				asset: "[path].br[query]",
				test: /\.(js|css|html|svg)$/,
				threshold: 10240,
				minRatio: 0.8,
			}),
		],

		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						"style-loader",
						//MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(eot|woff|otf|woff2|ttf)(\?\S*)?$/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: "./fonts",
								name: "[name].[ext]",
							},
						},
					],
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				},
				{
					test: /\.(jpg|jpeg|gif|png|svg|webp|ico)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: "./img",
								name: "[name].[ext]",
							},
						},
						// {
						// 	loader: "image-webpack-loader",
						// 	options: {
						// 		mozjpeg: {
						// 			progressive: false,
						// 			quality: 45
						// 		},
						// 		// optipng.enabled: false will disable optipng
						// 		optipng: {
						// 			enabled: false
						// 		},
						// 		pngquant: {
						// 			quality: "65-90",
						// 			speed: 4
						// 		},
						// 		gifsicle: {
						// 			interlaced: true,
						// 			optimizationLevel: 3
						// 		},
						// 		// the webp option will enable WEBP
						// 		webp: {
						// 			quality: 20
						// 		}
						// 	}
						// }
					],
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader",
							options: { attrs: ["img:src", "link:href"] },
						},
					],
				},
			],
		},
	};
};
