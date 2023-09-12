const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.ts",//指定入口文件
    output: {// 指定打包文件
        path: path.resolve(__dirname, "dist"),//指定打包文件所在目录"./dist"
        filename: "bundle.js",
        clean: true,
        environment:{
            arrowFunction:false
        }
    },
    module: {// 指定打包时要用到的模块
        rules: [//加载规则
            {
                test: /\.ts$/,//规则生效的文件
                use: [
                    {//只写"babel-loader"也是可以的
                        loader: "babel-loader",
                        options: {
                            presets:[
                                [
                                    "@babel/preset-env",
                                    {
                                        targets:{
                                            "chrome":"58",
                                            "ie":"9"
                                        },
                                        "corejs":"3",
                                        "useBuiltIns":"usage", //按需加载
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'],//要使用的loader
                exclude: /node-modules/ //排除掉的文件
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader",'postcss-loader'],// use 数组里面 Loader 执行顺序是从右到左
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader",'postcss-loader'],
            }
        ]
    },
    plugins: [//配置webpack插件
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),

        })
    ],
    devServer: {
        // 开发服务器
        host: "0.0.0.0", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
    },
    resolve: {
        // 设置可引用的模块
        extensions: ['.ts', '.js']
    }

}