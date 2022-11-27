<template>
    <div class="page">
        <head-display/>

        <!--        <公司简介-->
<!--        <div>-->
<!--            <div class="itemleft">-->
<!--                <img src="../../../public/img/icon_img/icon_brand.png"/>-->
<!--                <span style="margin-left:24px ">公司简介(品牌)</span>-->
<!--                <span class="font_style" style="margin-left:104px">泰康人寿中国平安</span>-->
<!--                <img class="iconnext" src="../../../public/img/icons/icon_next.png">-->
<!--            </div>-->
<!--        </div>-->

<!--        &lt;!&ndash;        高级会员&ndash;&gt;-->
<!--        <div class="itemleft">-->
<!--                <img src="@/../public/img/icon_img/icon_VIP.png"/>-->
<!--                <span style="margin-top: 18px;margin-left:24px;font-size: 28px">高级会员</span>-->
<!--                <span class="font_style_data" style="margin-left:104px;">有效日期至2020年-04-05</span>-->
<!--        </div>-->

<!--        &lt;!&ndash;        邀请奖励&ndash;&gt;-->
<!--        <div class="itemleft">-->
<!--                <span class="invite"/>-->
<!--                <span style="margin-top: 18px;margin-left:24px;font-size: 28px">邀请奖励 </span>-->
<!--                <span style="color:red;font-size: 28px;">收益报表</span>-->
<!--                <img class="iconnext" src="../../../public/img/icons/icon_next.png"/>-->
<!--        </div>-->

<!--        &lt;!&ndash;        推送设置&ndash;&gt;-->
<!--        <div class="itemleft">-->
<!--                <img src="@/../public/img/icon_img/icon_notice.png"/>-->
<!--                <span style="margin-left: 24px">推送设置</span>-->
<!--                <img class="iconnext" src="../../../public/img/icons/icon_next.png"/>-->
<!--        </div>-->


<!--        &lt;!&ndash;        专属客服&ndash;&gt;-->
<!--        <div class="itemleft">-->
<!--                <img src="@/../public/img/icon_img/icon_service.png"/>-->
<!--                <span style="margin-left:24px;font-size: 28px">专属客服</span>-->
<!--                <img class="iconnext" src="../../../public/img/icons/icon_next.png"/>-->
<!--        </div>-->

<!--        &lt;!&ndash;        我的产品&ndash;&gt;-->
<!--        <div class="itemleft">-->
<!--                <img src="@/../public/img/icon_img/icon_product.png"/>-->
<!--                <span style="margin-top: 18px;margin-left:24px;font-size: 28px">我的产品</span>-->
<!--                <img class="iconnext" src="../../../public/img/icons/icon_next.png"/>-->
<!--        </div>-->

<!--&lt;!&ndash;        //底部&ndash;&gt;-->
<!--        <div style="display: inline-block;margin-top: 80px">-->
<!--            <span class="font_black_style">文章名片底部显示热门产品</span>-->
<!--            <div style="margin-left:270px;vertical-align: middle;float: right">-->
<!--                <van-switch v-model="checked"/>-->
<!--            </div>-->
<!--        </div>-->

    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    // import HeadDisplay from "@/personalcenter/headdisplay";
    import HeadDisplay from "../personalcenter/headdisplay"

    export default {
        name: "User",
        data() {
            return {
                name: this.$store.state.username,
                checked: true,
            }
        },
        methods: {},
        components: {HeadDisplay},
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style scoped>
    .itemleft {
        margin-top: 18px;
        margin-left: 24px;
        font-size: 28px;
        display: inline-block;
    }

    .user_item_name {
        width: 336px;
        height: 48px;
        font-size: 48px;
        font-family: PingFangSC-Medium, PingFang SC, serif;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 48px;
    }

    .ellipse_icon {
        width: 48px;
        height: 48px;
        background: rgba(255, 164, 74, 1);
    }

    .iconnext{
        width:auto;
        height:auto;
        background:rgba(255,255,255,1);
        float: right;
        margin-right: 40px;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 24px;
    }

    .font_style {
        width:264px;
        height:24px;
        font-size:24px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:24px;
    }

    .font_style_data {
        width: 241px;
        height: 28px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 74, 90, 1);
        line-height: 28px;
    }


    .font_black_style {
        margin-left: 40px;
        width: 336px;
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        float: left;
    }

    .ellipse {
        width: 64px;
        height: 40px;
        background: rgba(217, 217, 217, 1);
        border-radius: 20px;
    }

    .switch_Ellipse {
        width: 28px;
        height: 28px;
        background: rgba(255, 255, 255, 1);
    }

    .invite {
        width: 64px;
        height: 64px;
        background: rgba(255, 74, 90, 0.1);
    }

    #box1 {
        width: 600px;
        height: 600px;
        background: green;
        position: relative
    }

    #box1 #box2 {
        width: 200px;
        height: 200px;
        background: red;
        position: absolute;
        right: 0;
        bottom: 0
    }

</style>