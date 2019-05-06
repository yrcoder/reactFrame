const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		other: ['lodash', 'axios', 'query-string'],
		react: [
			'react',
			'react-dom',
			'mobx',
			'mobx-react',
			'react-router',
			'react-router-config',
			'react-router-dom',
		],
	},
	output: {
		filename: '[name].dll.js',
		chunkFilename: '[name].dll.chunk.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]',
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		}),
	],
};
