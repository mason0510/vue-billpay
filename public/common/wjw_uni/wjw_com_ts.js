// module.exports = {
// exports.default = {

var wx = require('@/plugins/jweixin-1.6.0.js');
import axios from 'axios';

export default  {


    console_log(){
        console.log('执行 console.log', arguments);
        console.log(...arguments);
    },


    setTimeout(fn, time){
        console.log('执行 setTimeout', arguments);
        setTimeout(fn, time||0);
    },

    dataset(e) {
        // console.log('设置自定义参数', e);
        if (e) {
            let param = e.currentTarget.dataset.param;
            param && (param = JSON.parse(param));
            let obj = {
                ...e.detail,
                ...e.currentTarget.dataset,
                // ...e.currentTarget.dataset.param,
            };
            param && (obj = { ...obj, ...param });
            return obj;
        } else {
            return {};
        }
    },

    // 创建dataset
    create_dataset: function create_dataset(obj) {
        console.log('创建dataset', obj);
        return {
            currentTarget: {
                dataset: obj
            },
            detail: {
                value:obj,
            },
        };

    },

    //  @click='jump' data-url='/material'
    /*
        this.jump(this.create_dataset({
            url: '',
            https_param: {}, undefined
            method: 'get',
            back_fn: res => {
                this.setData({
                    navlist: res.data
                })
            }
        }))
    */
    jump(e) {
        console.log('this', this);
        // const obj: any = this.dataset(e);
        const obj = this.dataset(e);
        console.log('页面跳转', e, e.currentTarget.dataset.url, obj);

        const fixedparamarr = ['url', 'time', 'type', 'check', 'phonecheck', 'param']; //固定参数数组
        const {
            url,
            time = 0,
            type,
            check,
            phonecheck,
        } = obj;
        if (!url) {
            console.log('无跳转页面', url);
            return
        }

        // let param = '?'; //存储拼接的参数
        let param = {}; //存储拼接的参数
        for (const i in obj) {
            if (fixedparamarr.indexOf(i) != -1) {
                continue
            }

            // if (param != '?') {
            // 	param += '&'
            // }
            // param += `${i}=${obj[i]}`;
            // (param as any)[i] = obj[i];
            param[i] = obj[i];
        }
        // if (param == '?') {
        // 	param = '';
        // }

        // console.log('跳转地址: ', url + param);
        console.log('跳转地址: ', url, param);
        // delayJump(type == 3 ? url : (url + param), time, type);
        this.$router.push({ path: url, query: param })
    },
    //  @click='goBack'
    goBack(e) {
        console.log('goBack 返回上一页', e);
        if (this.$router){
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    },

    copy_str(str){
        if(typeof str=='object'){
            var obj = this.dataset(str);
            str = obj.str||obj.txt;
        }

        // document.execCommand("Copy"); // 执行浏览器复制命令
        // var str = '123';
        var input = document.createElement('input');
        // 1.移动端ios-点击复制时屏幕下方会出现白屏抖动，仔细看是拉起键盘又瞬间收起
        // 只读
        input.setAttribute('readonly', 'readonly');


        input.setAttribute('value', str);
        document.body.appendChild(input);
        input.select();


        // 没有选中全部内容
        input.setSelectionRange(0, str.length);
        if (document.execCommand('copy')) {
            //         document.execCommand('copy');
            console.log(document.execCommand('copy'), '复制成功');
        }
        document.body.removeChild(input);
    },
    getUrlKey: function (name) { //获取key方法
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },

    rem_to_vw: function rem_to_vw(str){
        str || ( str = '.set_rem{ 1.3rem 0.3rem 0rem .3rem;}');
        var arr = str.split(/(\d*\.*\d+)rem/);
        var new_str = '';
        for(var i=0; i<arr.length; i+=2){
            if(arr[i+1]===undefined){
                console.log('continue', i+2+'/'+arr.length);
                new_str+=arr[i];
                continue;
            }
            new_str+=arr[i]+'calc( '+arr[i+1]+' / 7.5 * 100vw)';
        }
        return  new_str;
    },

    px_to_vw: function px_to_vw(str){

        // 使用: article.content = self.px_to_vw(article.content);

        // setTimeout(function(){
        //  console.log('mounted setTimeout');
        //  $('.article_content img').attr('style',  'width: 100% !important;')
        // },0)

        str || ( str = '.set_rem{ 1.3px 0.3px 0px .3px;}');
        var arr = str.split(/(\d*\.*\d+)px/);
        var new_str = '';
        for(var i=0; i<arr.length; i+=2){
            if(arr[i+1]===undefined){
                console.log('continue', i+2+'/'+arr.length);
                new_str+=arr[i];
                continue;
            }
            arr[i+1]<=750
            ?
            (new_str+=arr[i]+'calc( '+arr[i+1]+' / 750 * 100vw)')
            :
            (new_str+=arr[i]+'100%')
            ;
        }
        return  new_str;
    },


    // 微信分享
    wxShareInfo: function (data, title, desc, link, imgUrl, articleId = '', type = 1, isNew = false) {
        wx.config({
            debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, //必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, //必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'updateAppMessageShareData', 'updateTimelineShareData'] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2
        });
        wx.ready(function () {
            var shareData = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: function (res) {
                },
                error: function (res) {
                }
            };

            var oldShareData = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                /*trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                    alert('用户点击分享到朋友');
                },*/
                success: function (res) {
                    var uri = 'article/video/share/'+articleId+'/'+type;
                    axios.get(uri).then(function (response) {});
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            };

            /*alert("isNew");
            alert(isNew);*/
            if (isNew == false) {
                wx.onMenuShareTimeline(oldShareData);
                wx.onMenuShareAppMessage(oldShareData);
                //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
            } else {
                wx.updateAppMessageShareData(shareData);
                //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
                wx.updateTimelineShareData(shareData);
            }

        });
        wx.error(function (res) {
            console.log(res.errMsg)
        });
    },
    shareAccount() { //获取分享账号
        return new Promise((resolve, reject) => {
            var uri = '/api/share/account';
            axios.get(uri).then(function (response) {
                let data = response.data.data;
                resolve(data);
            });
        })
    },

    getSignByAppid(appid, url, callback) {
        var uri = "/api/sign/" + appid + "?url=" + url;
        axios.post(uri, {
            withCredentials: false
        }).then(function (response) {
            var result = response.data;
            callback && callback(result);
        }).catch(function (error) {
            //errorBack && errorBack(error)
            var data = error.response.data;
            console.log(data);
            this.$toast.success("分享初始化失败！")
        });
    },


    //更新访客浏览时长
    doTime: function(spreadId,articleVideoId,timestamp) {
        var self = this;
        setInterval(function() {
            self.updateCustomer(spreadId,articleVideoId,timestamp);
        }, 2000)
    },
    //更新客户信息
    updateCustomer:function (spreadId,articleVideoId,timestamp) {
        var postData = {articleId:articleVideoId,
            timestamp:timestamp};
        var url = '/api/customer-cue/update/'+spreadId;
        axios.put(url,postData)
            .then(function (response) {
                let data = response.data;
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },

    async jumpVideo(id) {
        var self = this;
        var uri = "article/video/change-me/" + id + '/2';
        var shareConf = self.shareAccounts['video'];
        axios.get(uri).then(function (response) {
            let id = response.data.data;
            let shareUrl = shareConf['domain'] + id+"?appid=wxfbc908f16bf393a5";
            location.href = shareUrl;
        });
    },
    async jumpArticle(id) {
        var self = this;
        var uri = "article/video/change-me/" + id + '/1';
        var shareConf = self.shareAccounts['article'];
        axios.get(uri).then(function (response) {
            var id = response.data.data;
            var shareUrl = shareConf['domain'] + id+"?appid=wxfbc908f16bf393a5";
            location.href = shareUrl;
        });
    }

}
