require("path");
// axios中只能使用get和post方法来进行请求数据
module.exports = {
    lintOnSave:false,
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        https: false,
        hotOnly: false,
        overlay: {
            warning: false,
            errors: false
        },
        proxy: {
            '/api': {
                // target: 'https://api.coindesk.com/v1', // 你请求的第三方接口
                target: 'http://wechat.howtool.cn/', // 你请求的第三方接口
                changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {  // 路径重写，
                    '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
                }
            }
        }, // 设置代理
        before: app => {}
    },
    publicPath: "/",
}
