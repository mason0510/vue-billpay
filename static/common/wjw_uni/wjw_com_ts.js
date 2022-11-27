// module.exports = {
// exports.default = {
export default  {

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
    setTimeout(fn, time){
        console.log('执行 setTimeout');
        setTimeout(fn, time||0);
    },
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
    goBack(e) {
        if (this.$router){
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    },
}
