<template>
    <div class="page">

        <div class="profit_page bg_white">

            <div v-if='types=="invite_search"'>


                <div class="profit_input_wrap">
                    <div class="profit_input_box flex flex_ac">
                        <!-- <img src="/img/default.png" alt="" class="profit_input_icon no_shrink"> -->
                        <van-icon name="search" class="profit_input_icon no_shrink"/>
                        <input type="text" class="profit_input flex_grow" placeholder="请输入昵称" v-model.trim="keyword" >
                        <div class="profit_input_false" @click.stop="keyword=''">取消</div>
                    </div>
                </div>


                <div class="profit_list">


                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text=""
                            @load="getInvitationList"
                    >
                        <div class="" v-for="(item,index) in list" :key="index">

                            <div class="profit_area flex flex_ac">
                                <img v-if="item.imageUrl" :src="item.imageUrl" alt="" class="profit_area_img no_shrink">
                                <img v-else src="/img/default.png" alt="" class="profit_area_img no_shrink">
                                <div class="profit_area_info flex_grow">
                                    <div class="profit_area_name">{{ item.nickname }}</div>
                                    <div class="profit_area_tip txt_over_ell">注册时间：{{ item.createdAt| formatTimer('yyyy-MM-dd hh:mm:ss')}}</div>
                                    <div class="profit_area_tip txt_over_ell" v-if="item.vipTime">开通时间：{{ item.vipTime| formatTimer('yyyy-MM-dd hh:mm:ss')}}</div>
                                </div>
                            </div>

                        </div>

                    </van-list>


                </div>

            </div>

            <div v-if='types=="invite_info"'>


                <div class="profit_title flex flex_ac">{{ dateTime }} 邀请注册</div>


                <div class="profit_list">


                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text=""
                            @load="getInvitationList">

                        <div class="" v-for="(item,index) in list" :key="index">
                            <div class="profit_area flex flex_ac">
                                <img v-if="item.imageUrl" :src="item.imageUrl" alt="" class="profit_area_img no_shrink">
                                <img v-else src="/img/default.png" alt="" class="profit_area_img no_shrink">
                                <div class="profit_area_info flex_grow">
                                    <div class="profit_area_name">{{ item.nickname }}</div>
                                    <div class="profit_area_tip txt_over_ell">注册时间：{{ item.createdAt| formatTimer('yyyy-MM-dd hh:mm:ss')}}</div>
                                    <div class="profit_area_tip txt_over_ell" v-if="item.vipTime">开通时间：{{ item.vipTime| formatTimer('yyyy-MM-dd hh:mm:ss')}}</div>
                                </div>
                            </div>
                        </div>

                    </van-list>


                </div>

            </div>

        </div>


        <van-divider class="profit_list_empty" v-if='finished'>已经没有了</van-divider>

    </div>
</template>

<script>
    import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

    //节流函数
    const delay = (function() {
        let timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    export default {
        name: "invite",
        data() {
            return {
                types: this.$route.query.types || 'invite_search',// history history_info invite invite_search invite_info
                list: [],
                loading: false,
                finished: false,
                dateTime:this.$route.query.datetime || '',
                beforeId:0,
                keyword:''
            };
        },
        watch: {
            //watch title change
            keyword() {
                delay(() => {
                    this.search();
                }, 300);
            },
        },
        methods:{
            ...wjw_com_ts,

            search() {
                let self = this;
                self.list = [];
                self.beforeId = 0;
                self.getInvitationList();
            },
            getInvitationList() {
                let self = this;
                let uri = "invitation/list";
                let param = {beforeId:self.beforeId,dateTime:self.dateTime,keyword:self.keyword};
                axios.post(uri,param).then(function (response) {
                    let data = response.data.data;
                    self.list = [...self.list,...data.invitations];
                    self.loading=false;
                    self.beforeId = data.invitationBefore;
                    data.invitations.length==0&&(self.finished=true);
                });
            },
        },
        mounted() {
            //this.getInvitationList();
        },
        filters:{
            formatTimer: function (unixTime,fmt) {
                var date = new Date(unixTime*1000);
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                var o = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for (var k in o) {
                    if (new RegExp('('+k+')').test(fmt)) {
                        var str = o[k] + '';
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
                    }
                }
                return fmt;
            }
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
