const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	optimization: {
		minimizer: [new OptimizeCssAssetsWebpackPlugin({})],
	},
	module: {
		rules: [
			{
				test: /\.(le|c)ss$/,
				include: path.resolve(__dirname, '../src'),
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'less-loader',
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[name].chunk.[hash].css',
		}),
	],
};
module.exports = merge(baseConfig, prodConfig);
