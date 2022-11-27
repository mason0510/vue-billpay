<template>
    <div>
        <button v-on:click="wxlogin">wxlogin</button>
    </div>

</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                info: null,
                appid: "wxa662030865c7d7aa",
                url: "http://wex.howtool.cn/"
            }
        },
        mounted() {
            this.getUrlParams(decodeURI(window.location.href))
        },
        methods: {
            wxlogin: function (event) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.url}&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect`

            },
            // 返回首页
            goBack () {
                if (typeof WeixinJSBridge === 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
                    }
                } else {
                    WeixinJSBridge.call('closeWindow') // eslint-disable-line
                }
            },
            onBridgeReady () {
                WeixinJSBridge.call('hideOptionMenu') // eslint-disable-line
            },
            // 切割处理参数
            getUrlParams (url) {
                let webpageUrl = window.webpageUrl
                let params = {}
                let arr = {}
                if (url.split('?')) {
                    arr = url.split('?')
                }
                if (arr.length <= 1) {
                    // 微信公众号首页进入
                    let httpUrl = encodeURIComponent(webpageUrl)
                    // let http = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window.appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
                    // window.location.href = http
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.url}&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect`

                } else {
                    // 扫描pc端二维码进入携带参数的情况
                    arr = arr[1].split('&')
                    for (let i = 0, l = arr.length; i < l; i++) {
                        let a = arr[i].split('=')
                        params[a[0]] = a[1]
                    }
                    // 有参数
                    if (params && params.cityId) {
                        webpageUrl += '?'
                        Object.keys(params).forEach(function (key) {
                            webpageUrl += `${key}=` + `${params[key]}&`
                        })
                        webpageUrl = webpageUrl.substring(0, webpageUrl.length - 1)
                    }
                    // 通过PC端扫码跳过来的情况下保存城市和小区信息
                    let httpUrl = encodeURIComponent(webpageUrl)
                    let http = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window.AppID}&redirect_uri=${httpUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
                    window.location.href = http
                }
            }

        }
    }
</script>

<style scoped>

</style>