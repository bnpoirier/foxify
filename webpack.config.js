const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = (process.env.NODE_ENV == 'production');

const configuration = {
    mode: isProduction ? 'production' : 'development',
    entry: './resources/js/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/assets/js'),
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '../[path]/[name].[ext]',
                        context: 'resources'
                    },
                }]
            },
            {
                test: /\.ejs$/,
                use: [

                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css',
            chunkFilename: "../css/[id].css"
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [
                    'default', 
                    { 
                        discardComments: { 
                            removeAll: true 
                        } 
                    }
                ],
            }
        })
    ]
}

module.exports = configuration;