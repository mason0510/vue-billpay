<template>
    <div class="page">

        <div class="profit_page bg_white">

            <div>
                <div class="profit_title flex flex_ac">历史收益记录</div>


                <div class="profit_list">
                    <div class="" >

                        <div class="profit_li flex flex_ac"
                             v-for="(item,index) in incomes" :key="index"
                             @click="jump" data-url="/reward/income" :data-datetime='item.createdDate'>

                            <div class="profit_li_time flex_grow">{{ item.createdDate }}</div>
                            <div class="profit_li_num">+{{ item.price }}</div>
                            <img src="/img/icons/icon_next.png" alt="" class="profit_li_icon no_shrink">
                        </div>

                    </div>

                </div>

            </div>
        </div>


        <van-divider class="profit_list_empty" v-if='finished'>已经没有了</van-divider>

    </div>
</template>

<script>
    import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';


    export default {
        name: "income",
        data() {
            return {
                search_value: '',

                types: this.$route.query.types||'history',// history history_info invite invite_search invite_info

                list: [],
                loading: false,
                finished: false,
                incomes:[]
            };
        },

        methods:{
            ...wjw_com_ts,

            getIncome() {
                let self = this;
                var uri = "income/stat";
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    self.incomes = data.incomes;
                    //self.count = data.count;
                });
            }
        },
        mounted(){
            this.getIncome();
        }
    }
</script>

<style scoped>
    /*padding: calc(40 / 750 * 100vw);*/
    /*background: #EEF0F4;*/
    .page{
        background:rgba(248,248,248,1);
    }



    .profit_page{}
    .profit_title{
        height: calc(100 / 750 * 100vw);

        padding: 0 calc(30 / 750 * 100vw);

        font-size:calc(36 / 750 * 100vw);
        line-height:calc(50 / 750 * 100vw);
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
    }

    .profit_input_wrap{
        height: calc(120 / 750 * 100vw);
        padding: calc(30 / 750 * 100vw);
        box-sizing: border-box;
        border-bottom: 1px solid rgba(248,248,248,1);
    }
    .profit_input_box{
        height:calc(60 / 750 * 100vw);
        border-radius:calc(12 / 750 * 100vw);
        border:calc(2 / 750 * 100vw) solid rgba(238,238,238,1);
        padding-left: calc(28 / 750 * 100vw);
        box-sizing: border-box;
    }
    .profit_input_icon{
        width:calc(28 / 750 * 100vw);
        height:calc(28 / 750 * 100vw);

        font-size: calc(28 / 750 * 100vw);

        margin-right: calc(15 / 750 * 100vw);
    }
    .profit_input{
        height: 100%;
        font-size:calc(28 / 750 * 100vw);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        /*color:rgba(153,153,153,1);*/

        border: none;
        background: transparent;
    }
    .profit_input_false{
        font-size:calc(28 / 750 * 100vw);
        line-height:calc(40 / 750 * 100vw);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(79,95,170,1);
        padding: 0 calc(20 / 750 * 100vw);
    }

    .profit_list{}

    .profit_li{
        height:calc(92 / 750 * 100vw);
        border-bottom: 1px solid rgba(248,248,248,1);

        padding: 0 calc(30 / 750 * 100vw);
    }
    .profit_li_time{
        font-size:calc(28 / 750 * 100vw);
        line-height:calc(40 / 750 * 100vw);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .profit_li_num{
        font-size:calc(28 / 750 * 100vw);
        line-height:calc(40 / 750 * 100vw);
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,74,90,1);
    }
    .profit_li_icon{
        margin-left: calc(10 / 750 * 100vw);
        width:calc(9 / 750 * 100vw);
        height:calc(14 / 750 * 100vw);
    }

    .profit_area{
        padding: calc(40 / 750 * 100vw) calc(30 / 750 * 100vw);
        border-bottom: 1px solid rgba(248,248,248,1);
    }
    .profit_area_img{
        width:calc(100 / 750 * 100vw);
        height:calc(100 / 750 * 100vw);
        border-radius:calc(8 / 750 * 100vw);
        margin-right: calc(28 / 750 * 100vw);
    }
    .profit_area_info{
        width: 0;
    }
    .profit_area_name{
        font-size:calc(28 / 750 * 100vw);
        line-height:calc(40 / 750 * 100vw);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        margin-bottom: calc(12 / 750 * 100vw);
    }
    .profit_area_tip{
        font-size:calc(20 / 750 * 100vw);
        line-height:calc(28 / 750 * 100vw);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-bottom: calc(4 / 750 * 100vw);
    }
    .profit_area_nums{}
    .profit_area_num{
        font-size:calc(40 / 750 * 100vw);
        line-height:calc(56 / 750 * 100vw);
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,74,90,1);
        margin-bottom: calc(12 / 750 * 100vw);
    }
    .profit_area_btn{
        width:calc(112 / 750 * 100vw);
        height:calc(40 / 750 * 100vw);
        border-radius:calc(4 / 750 * 100vw);
        border:calc(2 / 750 * 100vw) solid rgba(255,74,90,1);

        font-size:calc(24 / 750 * 100vw);
        line-height:calc(33 / 750 * 100vw);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,74,90,1);
    }


    .profit_list_empty{
        width: calc(400 / 750 * 100vw);
        margin: auto;

        font-size:calc(24 / 750 * 100vw);
        line-height:calc(33 / 750 * 100vw);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(191,191,191,1);

        /*color: red;*/
        /*border-color: blue;*/
        border-color: rgba(191,191,191,1);

        height: 50vh;

    }
</style>
