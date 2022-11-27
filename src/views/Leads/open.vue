<template>
	<div class="page">
		<div class="open_config_list p_lr_40">
			<div class="open_config_li set_li flex flex_ac"
				v-for="item in introItems">
				<!-- v-model="checked1" -->
				<van-checkbox class="open_config_li_check set_li_check" checked-color="#FF4A5A" icon-size='calc(36 / 750 * 100vw)'  :value=true >
					<div class="flex">
						<div class="set_li_txt no_shrink">{{ item }}</div>
					</div>
				</van-checkbox>
			</div>
		</div>

		<div class="open_list p_lr_40">
			<div class="open_list_head lh1"></div>

			<div class="open_li box flex flex_ac" v-for="(item,index) in serviceList">
				<img :src="item.imageUrl" alt="" class="open_li_img no_shrink">
				<div class="open_li_infos flex_grow">
					<div class="open_li_info flex">
						<div class="open_li_time">
							<span class="open_li_info_bg open_li_title">{{ item.title }}</span>
							<!--<span class="">{{ item.unitText }}</span>-->
						</div>
						<div class="open_li_num">
							<span class="open_li_info_bg">{{ item.price }}</span>
							<span class="">元</span>
						</div>
					</div>
					<div class="open_li_tip">{{ item.describe }}</div>
				</div>
				<div class="open_li_btn flex_c" @click="payService(item.id)">立即开通</div>
			</div>

			<div class="open_list_head lh1">
				<div class="open_list_tip">*会员服务开通后不支持退款哦！</div>
			</div>

		</div>

		<div class="open_vip_time" v-if="isVip">会员有效期至：{{ vipTime | formatTimer }}</div>
	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

	export default {
		data() {
			return {
				search_value: '',
				checked1: false,
				serviceList:[],
                introItems:[],
				isVip:0,
				vipTime:0
			};
		},


        methods: {
            ...wjw_com_ts,

            getServiceList() {
                let self = this;
                axios.get('/api/service/list').then(function (response) {
                    let data = response.data.data;
                    self.serviceList = data.priceSettings;
                    self.introItems = data.introItems;
                });
            },
            getProfile() {
                var self = this;
                //获取推广者信息
                var uri = "account/profile";
                axios.get(uri).then(function (response) {
                    var data = response.data.data;
					self.isVip = data.isVip;
					self.vipTime = data.vipTime;
                });
            },

            payService(id) {
                let self = this;
                self.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                axios.post('order/create',{goodsId:id,type:1}).then(function (response) {
                    self.$toast.clear();
                    let data = response.data.data;
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": data.appId,     //公众号名称，由商户传入
                            "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
                            "nonceStr": data.nonceStr,   //随机串
                            "package": data.package,
                            "signType": data.signType,   //微信签名方式：
                            "paySign": data.paySign,    //微信签名
                        },
                        function (res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                console.log("支付成功！");
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            }
                        });
                }).catch(err => {
                    let data = err.response.data;
                    this.$toast.fail(data.error.msg);
                    reject(err)
                });
            }
        },
        filters: {
            formatTimer: function (unixTime) {
                var d = new Date(parseInt(unixTime) * 1000); // 依情况进行更改 * 1
                return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
            }
        },
        mounted() {
            this.getServiceList();
            this.getProfile();
        }
	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}
	.p_lr_40{
		padding: 0 calc(40 / 750 * 100vw);
	}

	.open_vip_time {
		margin-top: calc(40 / 750 * 100vw);
		font-size: calc(24 / 750 * 100vw);
		text-align: center;
		color: #FF4A5A;
	}

	.set_list{}
	.set_li{
		height: calc(80 / 750 * 100vw);

	}
	.set_li_check{
		/*font-size: calc(36 / 750 * 100vw);*/

	}
	.set_li_txt{


		font-size:calc(30 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;

		color: #333333;

		/*margin-right: calc(20 / 750 * 100vw);*/
	}
	.set_li_tip{


		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;

		color: #999999;
	}


	.open_config_list{
		border-bottom: calc(16 / 750 * 100vw) solid rgba(247,247,247,1);
	}
	.open_config_li{}
	.open_config_li_check{}


	.open_list{}
	.open_list_head{
		height: calc(40 / 750 * 100vw);
	}
	.open_list_title{
		padding-top: calc(48 / 750 * 100vw);
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);

		margin-bottom: calc(16 / 750 * 100vw);
	}
	.open_list_tip{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.open_li{
		height:calc(168 / 750 * 100vw);
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);

		margin-bottom: calc(32 / 750 * 100vw);
		padding: calc(32 / 750 * 100vw);
	}
	.open_li_img{
		width: calc(48 / 750 * 100vw);
		height: calc(44 / 750 * 100vw);
		margin-right: calc(32 / 750 * 100vw);
	}
	.open_li_infos{}
	.open_li_info{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,74,90,1);
	}
	.open_li_title{
		color: #696969;
	}
	.open_li_info_bg{
		font-size: calc(48 / 750 * 100vw);

	}
	.open_li_time{
		margin-right: calc(20 / 750 * 100vw);
	}
	.open_li_num{}
	.open_li_tip{
		margin-top: calc(16 / 750 * 100vw);

		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.open_li_btn{
		width:calc(168 / 750 * 100vw);
		height:calc(64 / 750 * 100vw);
		background:rgba(255,74,90,1);
		border-radius:calc(8 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}



</style>
