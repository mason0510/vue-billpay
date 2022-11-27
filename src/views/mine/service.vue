<template>
	<div class="page">

		<!-- /img/default.png 椭圆形@2x (2) -->
		<img src="/img/椭圆形@2x (2).png" alt="" class="bg_img no_shrink">


		<div class="page_box ta_c">
			<img :src="qrCodeUrl" alt="" class="service_img no_shrink">
			<div class="service_title">客服二维码</div>
			<div class="service_tip">长按二维码添加客服，咨询更多详情</div>
			<div class="service_time">咨询时间：工作日9:00-21:00</div>
		</div>


	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios'

	export default {
		data() {
			return {
                qrCodeUrl:''
			};
		},



		methods: {
			...wjw_com_ts,

            qrCode() {
                let self = this;
                axios.get('/api/customer-cue/qr-code').then(function (response) {
                    let qrCodeUrl = response.data.data;
                    self.qrCodeUrl = qrCodeUrl
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
		    },
		},
        mounted() {
            this.qrCode();
        }
	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}


	.bg_img{
		position: absolute;
		top: 0;
		left: 0;

		width:100%;
		height:calc(276 / 750 * 100vw);
		/*background:linear-gradient(180deg,rgba(255,74,90,1) 0%,rgba(254,105,120,1) 100%);*/
	}
	.page_box{
		position: relative;
		overflow: hidden;
	}
	.service_img{
		width:calc(380 / 750 * 100vw);
		height:calc(380 / 750 * 100vw);
		margin-top: calc(159 / 750 * 100vw);
		margin-bottom: calc(16 / 750 * 100vw);
	}
	.service_title{
		font-size:calc(36 / 750 * 100vw);
		line-height:calc(50 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.service_tip{
		font-size:calc(28 / 750 * 100vw);
		line-height:calc(40 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-bottom: calc(16 / 750 * 100vw);
	}
	.service_time{
		font-size:calc(28 / 750 * 100vw);
		line-height:calc(40 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,164,74,1);
	}


</style>
