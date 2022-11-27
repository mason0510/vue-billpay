<template>
    <div>
        授权中...
    </div>
</template>

<script>
import { getQueryString } from '@/utils/utils'
import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
import {getWxAuth}from '../../api/index'
import axios from 'axios';

export default {
  name: 'Author',
  data () {
    return {}
  },
  created () {
    //debugger
    // 判断链接有没有token参数，如果没有就跳微信授权，然后后台会重定向回来并携带token，如： www.xxxx.com/wx/author?token=xxxxxxxxx&msg=200
    if (!this.getUrlKey('code')) {
        //进行授权登录
        var host = "http://"+window.location.host;

        var toUrl = this.getUrlKey('url') || window.localStorage.getItem('beforeLoginUrl');
        let redirectUrl = host+"/weixin/auth?url="+toUrl;
        redirectUrl = encodeURIComponent(redirectUrl);
        let authorizeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfbc908f16bf393a5&redirect_uri="+redirectUrl+"&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect";
        location.href = authorizeUrl;
    } else {
        let code = this.getUrlKey('code');

        this.login(code);
        const url = window.localStorage.getItem('url')
        // 跳转
        this.$router.replace(url)
        //window.localStorage.removeItem('beforeLoginUrl')
    }
  },
  methods: {
      ...wjw_com_ts,
      async login(code) {
          let self = this;
          axios.get('/api/weixin/login/' + code+'/wxfbc908f16bf393a5').then(function (response) {
              let data = response.data.data;
              window.localStorage.setItem('token', data.token);
              let url = self.getUrlKey('url');
              //self.$router.replace(url)
              location.href = url;
          });
      }
  }
}
</script>

<style scoped>
</style>
