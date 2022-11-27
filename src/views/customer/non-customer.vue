<template>
    <div>
        <div class="content">
            <p style="font-size: 12px;">
                12
            </p>
            <p>
                今日客户引流
            </p>
        </div>

        <div class="whiteline"></div>

        <div class="content2">
            <p>
                118
            </p>
            <p style="font-size: 12px;">
                累计客户引流
            </p>
        </div>

        <div class="whiteline"></div>

        <div>
            <button class="transparentbutton">
                <span style="color: red;">	提醒设置	</span>
            </button>

        </div>
    </div>

<!--    客户线索-->
<!--    <CustomerList :data="customerList"/>-->

    </div>
</template>

<script>
    import CustomerList from "./customerList";
    export default {
        name: "customer",
        components: {CustomerList},
        data() {
            return {
                title: '',
                customerList: []
            }
        },
        mounted() {
            //发起请求,当数据请求回来的时候,我要将数据渲染到页面上 axios
            // axios.get('').then(resp=>{
            //     this.customerList = resp.data.data
            // });
        }
    }
</script>

<style scoped>
    .content {
        float: left;
        width: auto;
        height: 30px;
    }
    .content2 {
        float: left;
        width: auto;
        height: 30px;
        margin-left: 30px;
    }


    .whiteline {
        margin-top: 30px;
        margin-left: 20px;
        float: left;
        width: 1px;
        height: 20px;
        background: darkgray;
    }
</style>