const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: "development",
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'js/[name].[chunkhash].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)/,
                use: {
                    loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],

            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({ bowsers: ['last 5 version'] })
                            ]
                        }
                    },
                    { loader: "less-loader", options: { javascriptEnabled: true } },
                ],
                include: [/antd/],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            localIdentName: '[name__[local]--[hash:base64:5]',
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 5 version']
                                })
                            ]
                        }
                    },
                    { loader: 'less-loader', options: { javascriptEnabled: true } },
                ],
                exclude: [/antd/],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({ browsers: ['last 5 version'] })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        publicPath: '/',
                        name: "images/[name].[ext]",
                        limit: 1000
                    }
                }]
            },
            {
                test: /\.(woff|svg|eot|woff2|tff)$/,
                use: 'url-loader',
                exclude: /node-modules/
            }, {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [{
                    loader: 'json-loader'
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.html"
        }),
        //new CleanWebpackPlugin(['../dist'],{allowExternal:true})
    ],
    devServer: {
        contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "public")],
        port: 8080,
        historyApiFallback: true,
        inline: true
    },
}