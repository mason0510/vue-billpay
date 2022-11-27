import axios from 'axios';
// @ts-ignore
import qs from 'qs'
import router from '../router'
// http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const token = window.localStorage.getItem('token');
        //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93ZWNoYXQuaG93dG9vbC5jblwvbXBcL2xvZ2luXC90ZXN0XC9vdXpDYnRfR3B3ejFVRXhJMUp3R19kNjdjcjRVIiwiaWF0IjoxNTkxMjY4MjM4LCJleHAiOjE1OTc3NDgyMzgsIm5iZiI6MTU5MTI2ODIzOCwianRpIjoiR0JaOWlSQnMwV1dsamhwRiIsInN1YiI6MTIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.8v2xcmm2y1w8LYN-4DnEfWs6ZtqpOBoQT9-wlOgZb_Y';//window.localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer '+token;
        }
        let url = config.url;
        if (url != null && url.indexOf('/api/') === -1) {
            config.baseURL = axios.defaults.baseURL + '/mp';
        }
        if (config.method === 'post' || config.method == 'put') {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            console.log("请求错误");
            console.log(error.response.status);
            switch (error.response.status) {
                case 401:
                    let url = location.href;
                    //跳转到授权页
                    router.push({path: '/weixin/auth', query: {'url':url}});
                    // store.dispatch('logout');
                    console.log("401");
                    break;
                /*case 404:
                    router.push('/Error/Error404');
                    break;
                case 500:
                    router.push('/Error/Error500');*/
            }

        }
        return Promise.reject(error);// 返回接口返回的错误信息
    });



export default axios;
