const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		lodash: ['lodash'],
		react: ['react', 'react-dom'],
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
