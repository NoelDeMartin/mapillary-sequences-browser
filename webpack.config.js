const webpack = require('webpack');
const path = require('path');
const ClearPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const inProduction = process.env.NODE_ENV === 'production';

const scssLoaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: path.resolve(__dirname, 'src/styles'),
            },
        },
    },
    'sass-loader',
];

module.exports = {

    entry: {
        app: [
            './src/app.ts',
            './src/app.scss',
        ],
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },

            {
                test: /\.ts$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    },
                    'tslint-loader',
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                scss: scssLoaders,
                            },
                        },
                    },
                    'eslint-loader',
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.scss$/,
                use: scssLoaders,
                exclude: /node_modules/,
            },

            {
                test: /\.svg$/,
                loader: 'url-loader',
            },

        ],

    },

    plugins: [
        new ClearPlugin(['build'], {
            dist: __dirname,
            verbose: true,
            dry: false,
        }),
        new MiniCssExtractPlugin('app.css'),
        new webpack.LoaderOptionsPlugin({minimize: inProduction}),
    ],

    resolve: {
        extensions: ['*', '.js', '.ts'],
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },

};
