const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWbpackPlugin = require('add-asset-html-webpack-plugin');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const { APIURL, SSOURL } = require('./env');

const NODE_ENV = process.env.NODE_ENV || 'prod';
const getVendors = () => {
	const vendorPlugin = [];
	const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
	files.forEach((file) => {
		if (/.*\.dll.js/.test(file)) {
			vendorPlugin.push(
				new AddAssetHtmlWbpackPlugin({
					filepath: path.resolve(__dirname, '../dll', file),
				}),
			);
		}
		if (/.*\.manifest.json/.test(file)) {
			vendorPlugin.push(
				new webpack.DllReferencePlugin({
					manifest: path.resolve(__dirname, '../dll', file),
				}),
			);
		}
	});
	return vendorPlugin;
};
const getAlias = () => {
	const srcFile = fs.readdirSync(path.resolve(__dirname, '../src'));
	const aliasConfig = {};
	srcFile.forEach((fileName) => {
		aliasConfig[fileName] = path.resolve(__dirname, `../src/${fileName}`);
	});
	return aliasConfig;
};

module.exports = {
	entry: {
		main: './src/index.jsx',
	},
	output: {
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].js',
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
		// tree shaking
		usedExports: true,
		// 代码分割
		splitChunks: {
			chunks: 'all',
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		mainFiles: ['index'],
		alias: getAlias(),
	},
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				// exclude: /node_modules/,
				// include: [
				// 	path.resolve(__dirname, '../node_modules/antd'),
				// 	path.resolve(__dirname, '../src'),
				// ],
				include: [path.resolve(__dirname, '../src')],
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'eslint-loader',
					},
				],
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[hash].[ext]',
						outputPath: 'images/',
						limit: 2048,
					},
				},
			},
			{
				test: /\.(eot|ttf|svg|woff)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'iconfont/',
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
			APIURL: JSON.stringify(APIURL[NODE_ENV]),
			SSOURL: JSON.stringify(SSOURL[NODE_ENV]),
		}),
		...getVendors(),
		// 打包分析
		// new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
	],
};
