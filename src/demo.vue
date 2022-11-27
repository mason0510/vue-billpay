<template>
    <div>
       <p style="color: red">测试消息开始<br/>
           {{info}}
        <p >测试消息结束</p>
    </div>
</template>

<script >
    import axios from "./plugins/axios"
    import actionhelper from "@/utils/ActionHelper"
    import test from "@/views/test";
    export default {
        name: "demo",
        data(){
            return{
                info:null
            }
        },
        mounted() {
            axios
                .post('/article/list')
                .then(response => (this.info = response.data))
            }
    }
</script>

<style scoped>

</style>