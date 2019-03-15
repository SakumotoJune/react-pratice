const path = require('path');//node.js自带路径参数
const DIST_PATH = path.resolve(__dirname,'../dist');//生产目录
const APP_PATH = path.resolve(__dirname,'../src');//源文件目录

module.exports = {
    entry:{
        app:'./app/index.js',
    },
    output:{
        filename:'js/bundle.js',
        path: DIST_PATH
    },
    moudle:{
        rules:[
            {
                test:/\.js?$/,
                use:"babel-loader",
                include:APP_PATH
            }
        ]
    }
};