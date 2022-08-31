const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

module.exports = {
    entry: "./src/index",
    mode: 'development',
    resolve: {
        extensions: [".js", ".jsx"],
    },
    target: "web",
    devServer: {
        port: 8080,
    },
    output: {
        publicPath: 'http://localhost:8080/',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                user: 'user@http://localhost:8081/remoteEntry.js'
            },
            shared: packageJson.dependencies
        })
    ]
}