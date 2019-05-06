const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const devConfig = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		// devServer在dist文件夹下起一个服务器，当代码更新的时候自动打包
		contentBase: path.resolve(__dirname, '../dist'),
		port: 4000,
		open: true,
		hot: true,
		// eslint报错弹层
		overlay: true,
		// 前端路由刷新就没有了
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(le|c)ss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'less-loader',
					},
				],
			},
		],
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
};
module.exports = merge(baseConfig, devConfig);
