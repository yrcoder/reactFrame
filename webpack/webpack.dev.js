const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		// devServer在dist文件夹下起一个服务器，当代码更新的时候自动打包
		contentBase: path.resolve(__dirname, '../dist'),
		port: 4000,
		open: true,
		hot: true,
		// eslint报错弹层
		overlay: true,
	},
	module: {
		rules: [
			{
				test: /\.(le|c)ss$/,
				include: path.resolve(__dirname, '../src'),
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							// modules: true,
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
	plugins: [new webpack.HotModuleReplacementPlugin()],
};
module.exports = merge(baseConfig, devConfig);
