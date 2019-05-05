const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const AddAssetHtmlWbpackPlugin = require('add-asset-html-webpack-plugin');

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
		alias: {
			'@': path.resolve(__dirname, '../src'),
			views: path.resolve(__dirname, '../src/views'),
			stores: path.resolve(__dirname, '../src/stores'),
			components: path.resolve(__dirname, '../src/components'),
			decorator: path.resolve(__dirname, '../src/decorator'),
			styles: path.resolve(__dirname, '../src/styles'),
			images: path.resolve(__dirname, '../src/images'),
			constant: path.resolve(__dirname, '../src/constant'),
			utils: path.resolve(__dirname, '../src/utils'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				include: path.resolve(__dirname, '../src'),
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
		...getVendors(),
		new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
	],
};
