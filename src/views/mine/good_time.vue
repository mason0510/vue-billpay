<template>
	<div class="page">

		<van-overlay :show="isClock">
			<div class="wrapper">
				<img :src="'/img/clock.jpg'" alt="" class="no_shrink block" >
			</div>

		</van-overlay>

		<img :src="goodMNight.imageUrl" alt="" class="good_time_img no_shrink">
		<!-- <img src="/img/default.png" alt="" class="good_time_music no_shrink"> -->
		<img :class="isStop ? '': 'circle'" :src="isStop==true ?'/img/music.png': '/img/music_pause.gif'" alt="" class="good_time_music no_shrink" @click="isStop = !isStop">
		<audio ref="audio" id="media" loop="loop" :src="goodMNight.audioUrl" controls autoplay="autoplay" hidden="true"></audio>

		<div class="user_box flex">

			<img :src="userInfo.headimgurl" alt="" class="user_img no_shrink">

			<div class="user_info flex_grow">
				<div class="user_name">{{ userInfo.nickname }}</div>
				<div class="user_tip">{{ goodMNight.wxView }} 人正在共同打卡</div>
			</div>
		</div>



		<div class="good_time_info ta_c">

			<div class="good_time_title">{{ goodMNight.title }}</div>
			<div class="good_time_day">第 {{ goodMNight.logCount }} 天</div>
			<div class="good_time_time flex_c">
				<div class="good_time_time_div">{{ goodMNight.dateDay }}/{{ goodMNight.weekName }}</div>
				<div class="good_time_time_bar"></div>
				<div class="good_time_time_div">{{ goodMNight.lunar }}</div>
			</div>
			<div class="good_time_tip ta_l" v-html="goodMNight.content"></div>

		</div>

	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

    var wx = require('@/plugins/jweixin-1.6.0.js');

	export default {
		data() {
			return {
				types: this.$route.query.types||'morning',// morning night
                goodMNight:{},
                userInfo:{},
                isStop: false,
                shareAccounts:{},
                timestamp: (new Date()).valueOf(),
				id:this.getUrlKey('id') || '',
                isClock:false,
			};
		},
        beforeCreate() {
		    //获取配置信息
			let self = this;
            this.shareAccount().then(res => {
                self.shareAccounts = res;
            });
        },
        watch: {
            isStop () {
                if (this.isStop) {
                    this.$refs.audio.pause()
                } else {
                    this.$refs.audio.play()
                }
            },
        },
        methods: {
            ...wjw_com_ts,
            getGoodMNight() {
                let self = this;
                let uri = "good/morning/night";
                if (self.id) {
                    uri = uri + "/" + self.id;
                }
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    self.goodMNight = data;
                    self.getTutInfo();
                    self.getSign();
                    self.clock();
                });
            },
            getTutInfo() {
                let self = this;
                //获取推广者信息
                var uri = "/api/account/profile/"+self.goodMNight.tutId;
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    let userInfo = data;
                    self.userInfo = userInfo;
                });
            },
            getSign() {
                let self = this;
                let shareConf = self.shareAccounts['mNight'];
                let shareUrl = shareConf['domain']+self.goodMNight.shareId+"?appid=wxfbc908f16bf393a5";
                let host = location.href;
                var url = encodeURIComponent(host);
                this.getSignByAppid(shareConf['appId'],url,function (result) {
                    let data = result.data;
                    var title = self.goodMNight.title;
                    var desc = self.goodMNight.content;
                    var imgUrl = self.goodMNight.imageUrl;
                    self.wxShareInfo(data, title, desc, shareUrl, imgUrl,self.goodMNight.id,3,false);
                    self.createCustomer();
                });
            },
            createCustomer() { //创建数据
                let self = this;
                let form = self.getUrlKey('from');
                if (form) {
                    let postData = {
                        articleId: self.goodMNight.id, spreadId: self.goodMNight.spreadId,
                        authorId: self.goodMNight.tutId, userId: self.goodMNight.loginId, form: form, type: 3};
                    let url = '/api/customer-cue/store';
                    axios.post(url, postData)
                        .then(function (response) {
                            let data = response.data;
                            self.doTime(self.goodMNight.spreadId, self.goodMNight.id, self.timestamp);
                        })
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                }
            },
            clock() {
                let self = this;
                if(self.goodMNight.first == true){
                    self.isClock = true;
                    setTimeout(() => {
                        self.isClock = false;
                    }, 2000);
                }
            }
        },
        mounted() {
            this.getGoodMNight();

            wx.ready(function() {
                document.getElementById("media").play();
                document.getElementById("media").volume = 0.8;
            });
            document.addEventListener(
                "WeixinJSBridgeReady",
                function() {
                    document.getElementById("media").play();
                },
                false
            );
        }
	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
		position: relative;
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.block {
		width: 120px;
		height: 120px;
	}

	.circle {
		animation: goCircle 4.1s infinite linear !important;
	}

	.good_time_img{
		width: calc(750 / 750 * 100vw);
		height: calc(560 / 750 * 100vw);
	}
	.good_time_music{
		position: absolute;
		top: calc(30 / 750 * 100vw);
		right: calc(26 / 750 * 100vw);

		width:calc(66 / 750 * 100vw);
		height:calc(66 / 750 * 100vw);

		border-radius: 50%;

		/*background:rgba(1,1,1,0.15);*/
	}
	.user_box{
		margin: auto;
		margin-top: calc(-44 / 750 * 100vw);
		position: relative;
		margin-bottom: calc(30 / 750 * 100vw);


		width:calc(670 / 750 * 100vw);
		/*height:calc(120 / 750 * 100vw);*/

		padding: calc(24 / 750 * 100vw) calc(34 / 750 * 100vw);

		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);
	}
	.user_img{
		width:calc(72 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		border-radius: 50%;
		margin-right: calc(26 / 750 * 100vw);

	}
	.user_info{}
	.user_name{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(40 / 750 * 100vw);
		margin-bottom: calc(6 / 750 * 100vw);
	}
	.user_tip{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:calc(33 / 750 * 100vw);
	}
	.good_time_info{
		margin: auto;
		margin-bottom: calc(36 / 750 * 100vw);
		width:calc(670 / 750 * 100vw);
		height:calc(504 / 750 * 100vw);
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);

		overflow: hidden;
	}
	.good_time_title{
		margin-top: calc(26 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:calc(40 / 750 * 100vw);
	}
	.good_time_day{
		font-size:calc(48 / 750 * 100vw);
		font-family:PingFangSC-Semibold,PingFang SC;
		font-weight:600;
		color:rgba(255,164,74,1);
		line-height:calc(67 / 750 * 100vw);
		margin-bottom: calc(19 / 750 * 100vw);
	}
	.good_time_time{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:calc(33 / 750 * 100vw);
		margin-bottom: calc(47 / 750 * 100vw);
	}
	.good_time_time_bar{
		width:calc(2 / 750 * 100vw);
		height:calc(18 / 750 * 100vw);
		background:rgba(224,224,224,1);
	}
	.good_time_time_div{
		padding: 0 calc(22 / 750 * 100vw);
	}
	.good_time_tip{
		margin: auto;
		width:calc(650 / 750 * 100vw);
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:calc(40 / 750 * 100vw);
	}

</style>
