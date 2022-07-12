const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const { DefinePlugin } = require('webpack')

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
			'@': path.resolve(__dirname, 'src'),
			assets: path.resolve(__dirname, 'assets')
		},
		fallback: {
			path: 'path-browserify'
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new DefinePlugin({
			'process.env.COGNITO_USER_POOL': JSON.stringify(process.env.COGNITO_USER_POOL),
			'process.env.COGNITO_CLIENT_ID': JSON.stringify(process.env.COGNITO_CLIENT_ID)
		})
	]
}
