const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: './src/test/main.tsx',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    watch: true,

    devtool: 'eval',

    context: path.resolve(__dirname, './../'),

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    transpileOnly: true
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "index.ejs",
            inject: false
        })
    ]
};