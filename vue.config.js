/* eslint-disable camelcase */
/* eslint-disable no-undef */
// vue.config.js
const path = require("path");
// const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    // publicPath: "./", //hash模式下配置此项
    // publicPath: "https://mbdp02.bdstatic.com/static/treasure/",
    publicPath: process.env.NODE_ENV === "production" ? "/baidu_yiliao" : "/", //history模式下配置此项
    outputDir: "treasure",
    indexPath: "index.html",
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "宝藏天津",
            // chunks: []
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
        // subpage: "src/main.js"
    },
    lintOnSave: "default",
    runtimeCompiler: true,
    productionSourceMap: false,
    css: {
        extract: true, //将所有css改为内联模块
        sourceMap: false,
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/css/index.scss";` //配置全局scss
            },
            postcss: {
                plugins: [
                    require("autoprefixer")({
                        overrideBrowserslist: ["last 15 versions"]
                    }),
                    require("postcss-url")(),
                    require("postcss-import")()
                ]
            }
        }
        // 因为配置了loaderOptions.css, 尽管requireModuleExtension的值为默认值，我们也需要指出
        // requireModuleExtension: false
    },
    devServer: {
        open: true,
        inline: true, // 开启实时刷新
        host: "0.0.0.0",
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: {
            "/api": {
                // target: "http://192.168.1.180:3001",
                target: "http://engineer.benbun.com/baidu/baozangtianjin/web/api/",
                secure: false, // 如果是https接口，需要配置这个参数为true
                ws: true,
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true
                pathRewrite: {
                    "^/api": ""
                } //'/api' 为匹配项，target 为被请求的地址，因为请求的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的，所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '' 或者 '/'。如果本身的接口地址就有 '/api‘ 这种通用前缀，就可以把 pathRewrite 删掉。
            },
            "/foo": {
                target: "http//:www.baidu.com"
            }
        }
        // overlay: {
        //     warnings: false,
        //     errors: false,
        // },
    },
    configureWebpack: (config) => {
        console.log("config :>> ", config);
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.mode = "production";

            // 将每个依赖包打包成单独的js文件
            const optimization = {
                // runtimeChunk: {
                //     name: "manifest"
                // },
                splitChunks: {
                    // cacheGroups: {
                    //     styles: {
                    //         name: "styles",
                    //         test: /\.(scss|sass|less|css)$/,
                    //         chunks: "all",
                    //         minChunks: 1,
                    //         reuseExistingChunk: true
                    //     }
                    // },
                    // chunks: "all",
                    // maxInitialRequests: Infinity,
                    // minSize: 20000, // 依赖包超过20000bit将被单独打包
                    chunks: "all", // 仅提取按需载入的module
                    minSize: 30000, // 提取出的新chunk在两次压缩(打包压缩和服务器压缩)之前要大于30kb
                    maxSize: 0, // 提取出的新chunk在两次压缩之前要小于多少kb，默认为0，即不做限制
                    minChunks: 5, // 被提取的chunk最少需要被多少chunks共同引入
                    maxAsyncRequests: 5, // 最大按需载入chunks提取数
                    maxInitialRequests: 3, // 最大初始同步chunks提取数
                    automaticNameDelimiter: "~", // 默认的命名规则（使用~进行连接）
                    name: true,
                    cacheGroups: {
                        defalut: false,
                        vendors: false,
                        // defaultVendors: {
                        //     filename: "[name].bundle.js"
                        // },
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                                return `npm.${packageName.replace("@", "")}`;
                            }
                        },
                        common: {
                            chunks: "all",
                            test: /[\\/]src[\\/]js[\\/]/,
                            name: "common",
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 60
                        }
                    }
                },
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        parallel: true,
                        sourceMap: true,
                        terserOptions: {
                            warnings: false,
                            compress: {
                                drop_console: true, // 注释console
                                drop_debugger: true, // 注释debugger
                                pure_funcs: ["console.log"]
                            }
                        }
                    })
                ]
            };
            Object.assign(config, {
                optimization
            });
        } else {
            // 为开发环境修改配置...
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "./src"),
                    "@c": path.resolve(__dirname, "./src/components"),
                    "@p": path.resolve(__dirname, "./src/pages"),
                    "@v": path.resolve(__dirname, "./src/views"),
                    "@i": path.resolve(__dirname, "./src/assets/images/")
                } // 别名配置
            }
        });
    }
    // chainWebpack: (config) => {
    //     config.plugins.delete("prefetch");
    //     config.plugins.delete("preload");
    //     // 开启图片压缩
    //     config.module
    //         .rule("images")
    //         .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //         .use("url-loader")
    //         .loader("url-loader")
    //         .options({
    //             limit: 10240 // 图片小于10k转为base64,默认4k
    //         })
    //         .end()
    //         .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //         .use("image-webpack-loader")
    //         .loader("image-webpack-loader")
    //         .options({ bypassOnDebug: true })
    //         .end();
    //     // 配置Jquery
    //     config.plugin("provide").use(webpack.ProvidePlugin, [
    //         {
    //             $: "jquery",
    //             jQuery: "jquery",
    //             "window.jQuery": "jquery",
    //             Popper: ["popper.js", "default"]
    //         }
    //     ]);
    //     // 开启js、css 文件的 gzip 压缩。
    //     // 注意，gzip 压缩需要后端配合使用。如果后端没有开发 gzip 。请关闭功能。
    //     // 更多相关知识请查阅： https://blog.csdn.net/weixin_44869002/article/details/106717640
    //     // if (process.env.NODE_ENV === "production") {
    //     //     config.plugin("compressionPlugin").use(
    //     //         new CompressionPlugin({
    //     //             test: /\.js$|\.html$|.\css/, // 匹配文件名
    //     //             threshold: 10240, // 对超过10k的数据压缩
    //     //             deleteOriginalAssets: false // 不删除源文件
    //     //         })
    //     //     );
    //     // }
    // }
};
