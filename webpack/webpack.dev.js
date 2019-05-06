const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const baseConfig = require('./webpack.base.js');
const { HOST } = require('./env.js');

const port = 4000;
const devConfig = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		// devServer在dist文件夹下起一个服务器，当代码更新的时候自动打包
		contentBase: path.resolve(__dirname, '../dist'),
		host: HOST,
		port,
		open: true,
		hot: true,
		// eslint报错弹层
		overlay: true,
		// 前端路由刷新就没有了
		historyApiFallback: true,
		clientLogLevel: 'none',
		// 让NotifierPlugin起作用
		quiet: true,
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
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new NotifierPlugin({
			compilationSuccessInfo: {
				messages: [`You application is running here http://${HOST}:${port}`],
			},
			onErrors: (severity, errors) => {
				if (severity !== 'error') {
					return;
				}
				const error = errors[0];
				notifier.notify({
					title: 'Webpack error',
					message: `${severity}: ${error.name}`,
					subtitle: error.file || '',
				});
			},
			clearConsole: true,
		}),
	],
};
module.exports = merge(baseConfig, devConfig);
