const merge = require('webpack-merge');
const baseWebpackConfig = repuire('./webpack.base.conf');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig,{
    mode: 'production'
    /*plugins:[
        new HtmlWebpackPlugin({
            template:'public/index.html',
            title:'PresBAyter',
            minify:{
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
    ]*/
});