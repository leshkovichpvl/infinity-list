const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.ts',
        InfiniteList: './src/InfiniteList.tsx',
        LoadableDataObject: './src/LoadableDataObject.ts',
        LoadableDataRecord: './src/LoadableDataObject.ts'
    },

    devtool: false,

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './../dist'),
        libraryTarget: 'umd',
        library: 'bookie-infinity-list'
    },

    context: path.resolve(__dirname, './../'),

    watch: false,

    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: 'tsconfig.build.json'
                },
                include: [
                    path.resolve(__dirname, "./../src")
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    plugins: [
        new CleanWebpackPlugin('./../dist', {
            allowExternal: true
        })
    ]
};