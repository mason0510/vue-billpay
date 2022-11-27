<template>
    <!--以下为列表-->
    <div>
        <div />
        <div>
            <div>
                <span>两分钟前</span>
                <span style="float: right;">累计来访三次</span>
            </div>
            <div class="divs">
                <div class="imgs"><img src="" alt=""></div>
                <div class="infos">
                    <h3>平安李大霄</h3>
                    <h3>13888888888</h3>
                    <p>广东深圳</p>
                </div>
                <button class="transparentbutton">去找Ta</button>
            </div>


            <div >
                <img style="width: 20px;height: 20px;float: left;"/>
                <p>不是保险太贵,而是在您没给保险的地位</p>
            </div>

            <div class="nav_left_item_pic_right"></div>
            <span style="float: left;">阅读5分25秒</span>
            <span style="float: right;">来源:朋友圈</span>
        </div>
</template>

<script>
    export default {
        name: "item_customer",
        props:['history']
    }
</script>

<style scoped>

</style>