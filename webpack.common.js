const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
	entry: './index.tsx',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src')
		},
		fallback: {
			path: 'path-browserify'
		}
	},
	plugins: [new CleanWebpackPlugin()]
}
