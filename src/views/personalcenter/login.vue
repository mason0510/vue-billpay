<template>
    <div class="page">
        <!---->
        <!--登录的标蓝-->
        <div class="row" style="margin-top: 32px;">
            <!--内容部分-->
            <!-- 左对齐 -->
            <van-cell is-link @click="showPopup">展示弹出层</van-cell>
            <van-popup v-model="show">我是内容</van-popup>
        </div>
    </div>
</template>


<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Login",
        components:{

        },

        methods:{
            ...mapActions(['setUser','login']),
            handleLogin(){
                axios.get('',{params:{email:this.email,password:this.password}}).then(resp=>{
                    console.log(resp.data.data);
                    //不影响运行 此法作用域检查
                    this.setUser(resp.data.data);
                    this.$router.push('/personalcenter');
                });
            }
        },
        computed:{
            ...mapGetters(['username'])//等于从路由获取
        },
        data(){
            return {
                email:'',
                password:'',
            }
        }
    }
</script>

<style scoped>

</style>