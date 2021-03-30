const projectSettings = require('./projectSettings');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: 'dist',
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new CopyWebpackPlugin([{
            from: 'build/assets',
            to: 'assets'
        }]),
        new HTMLWebpackPlugin({
            template: 'build/index.html',
            filename: 'index.html',
            ...projectSettings,
        })
    ]
}
