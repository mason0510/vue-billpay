import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'lib-flexible/flexible.js';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import 'vant/lib/index.css';
import vant, {Dialog} from 'vant';
Dialog.setDefaultOptions({
	confirmButtonColor: '#FF4A5A',
})
import '@/../public/common/wjw_uni/wjw_com.css';
import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts';
Object.assign(Vue.prototype, wjw_com_ts);
import 'lib-flexible'
import { Switch } from 'vant';


Vue.use(require('vue-wechat-title'));



//axios
// @ts-ignore
import axios from '@/plugins/axios'
Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://wechat.howtool.cn';  //关键代码

var instance = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
Vue.prototype.instance = instance;

Vue.config.productionTip = false;
Vue.use(vant);
Vue.use(Antd);
Vue.use(Switch);
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
