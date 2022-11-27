<template>
	<div class="page">


		<div class="reward_head_wrap">

			<!-- /img/default.png -->
			<img src="/img/椭圆形@2x.png" alt="" class="reward_head_bg no_shrink">
			<div class="reward_head_box">

				<div class="reward_head_title">累计收益(元)</div>
				<div class="reward_head_num">{{ incomeData.totalPrice }}</div>
				<div class="reward_head_btn flex_c" @click="jump" data-url="/reward/income_stat">查看收益来源</div>

				<div class="reward_info_service flex_c"
					@click="jump" data-url="/mine/service"
					>
					<img src="/img/客服@2x.png" alt="" class="reward_info_service_img no_shrink">
				</div>

				<div class="reward_opts flex flex_ac">
					<div class="reward_opt" @click="jump" data-url="/reward/income_stat" >
						<img src="/img/收益@2x.png" alt="" class="reward_opt_img no_shrink">
						<div class="reward_opt_txt">收益记录</div>
					</div>
					<div class="reward_opt" @click="jump" data-url="/cash/log" >
						<img src="/img/提现@2x.png" alt="" class="reward_opt_img no_shrink">
						<div class="reward_opt_txt">提现记录</div>
					</div>
					<div class="reward_opt" @click="jump" data-url="/reward/invite_stat" >
						<img src="/img/邀请@2x.png" alt="" class="reward_opt_img no_shrink">
						<div class="reward_opt_txt">邀请数据</div>
					</div>
				</div>

			</div>
		</div>

		<div class="reward_infos flex flex_wrap flex_ac ta_c">
			<div class="reward_info flex flex_column flex_jc_c">
				<div class="reward_info_title">今日收益（元）</div>
				<div class="reward_info_num">{{ incomeData.dayPrice }}</div>
			</div>
			<div class="reward_info_line no_shrink"></div>
			<div class="reward_info  flex flex_column flex_jc_c">
				<div class="reward_info_title">本月收益（元）</div>
				<div class="reward_info_num">{{ incomeData.monthPrice }}</div>
			</div>
			<div class="reward_info  flex flex_column flex_jc_c">
				<div class="reward_info_title ">可提现（元）</div>
				<div class="reward_info_num reward_info_red">{{ incomeData.money }}</div>
			</div>
			<div class="reward_info_line no_shrink"></div>
			<div class="reward_info  flex flex_column flex_jc_c">
				<div class="reward_info_title">结算中（元）</div>
				<div class="reward_info_num">{{ incomeData.withdrawMoney }}</div>
			</div>
		</div>


		<div class="reward_btn flex_c" @click='reward_btn'>申请提现</div>


		<div class="reward_tips">
			<div class="reward_tips_list">
				<div class="reward_tips_title">奖励金说明：</div>
				<div class="reward_tip">1、每邀请一名好友注册并付费，你将获得最高100元奖励，奖励规则：奖励金=付费金额×30%</div>
				<div class="reward_tip">2、奖励金满100元可提现，提现仅限高级会员。</div>
			</div>

			<div class="reward_tips_list">
				<div class="reward_tips_title">邀请方法：</div>
				<div class="reward_tip">1、分享专属渠道码海报，请好友扫码关注并开通会员。</div>
				<div class="reward_tip">2、分享文章/视频/早晚安给好友，好友通过点击底部换名片进行关注并开通会员。</div>
			</div>

		</div>



	</div>
</template>

<script>
    import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

    export default {
        data() {
            return {
                incomeData:{}
            };
        },


        methods: {
            ...wjw_com_ts,

            getAccountIncome() {
                let self = this;
                var uri = "account/income";
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    self.incomeData = data;
                });
            },


            reward_btn() {

                this.$dialog.alert({
                    // title: '标题',
                    message: '奖励金满100元可提现，提现仅限高级会员',
                    // 此处判断会员
                    confirmButtonText: true?'开通会员':'知道了',

                    className: 'dialog',
                })
                    .then(() => {
                        // on confirm
                        // @click="jump" data-url="/reward/profit?types=all"
                        this.jump(this.create_dataset({
                            url: '/cash',
                        }))
                    });
            },


        },
        mounted() {
			this.getAccountIncome();
        }
    }
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
		background:rgba(248,248,248,1);
	}



	.reward_head_wrap{
		position: relative;
	}
	.reward_head_bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height:calc(340 / 750 * 100vw);
		background:linear-gradient(270deg,rgba(255,74,90,1) 0%,rgba(255,97,112,1) 100%);
	}
	.reward_head_box{
		position: relative;
		overflow: hidden;
		text-align: center;
	}
	.reward_head_title{
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(33 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);

		margin-top: calc(60 / 750 * 100vw);
	}
	.reward_head_num{
		font-size:calc(48 / 750 * 100vw);
		line-height:calc(67 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		margin-top: calc(16 / 750 * 100vw);
	}
	.reward_head_btn{
		margin: auto;
		/*min-width:calc(168 / 750 * 100vw);*/
		display: inline-flex;
		padding: 0 calc(12 / 750 * 100vw);
		height:calc(48 / 750 * 100vw);
		border-radius:calc(24 / 750 * 100vw);
		border:calc(2 / 750 * 100vw) solid rgba(255,255,255,1);

		font-size:calc(24 / 750 * 100vw);
		/*line-height:calc(33 / 750 * 100vw);*/
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}

	.reward_info_service{
		position: absolute;
		right: 0;
		top: calc(58 / 750 * 100vw);

		width:calc(68 / 750 * 100vw);
		height:calc(40 / 750 * 100vw);
		background:rgba(255,255,255,0.83);
		/*border-radius:calc(20 / 750 * 100vw) 0;*/
		border-top-left-radius: calc(20 / 750 * 100vw);
		border-bottom-left-radius: calc(20 / 750 * 100vw);
	}
	.reward_info_service_img{
		width:calc(32 / 750 * 100vw);
		height:calc(32 / 750 * 100vw);
		/*background:rgba(255,74,90,1);*/
	}

	.reward_opts{
		/*width:calc(690 / 750 * 100vw);*/
		margin: 0 calc(30 / 750 * 100vw);
		margin-top: calc(40 / 750 * 100vw);
		margin-bottom: calc(30 / 750 * 100vw);


		height:calc(160 / 750 * 100vw);
		background:rgba(255,255,255,1);
		box-shadow:calc(0 / 750 * 100vw) calc(6 / 750 * 100vw) calc(20 / 750 * 100vw) calc(0 / 750 * 100vw) rgba(242,208,208,0.5);
		border-radius:calc(8 / 750 * 100vw);
	}
	.reward_opt{
		text-align: center;
		flex-grow: 1;
	}
	.reward_opt_img{
		width:calc(70 / 750 * 100vw);
		height:calc(70 / 750 * 100vw);
		/*background:rgba(248,184,58,1);*/
		margin-bottom: calc(13 / 750 * 100vw);
	}
	.reward_opt_txt{
		font-size:calc(28 / 750 * 100vw);
		line-height:calc(40 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}

	.reward_infos{
		/*width:calc(690 / 750 * 100vw);*/
		margin: 0 calc(30 / 750 * 100vw);
		margin-bottom: calc(30 / 750 * 100vw);
		/*height:calc(364 / 750 * 100vw);*/
		background:rgba(255,255,255,1);
		border-radius:calc(8 / 750 * 100vw);
	}
	.reward_info{
		height:calc(182 / 750 * 100vw);
		width: calc(50% - 2px);
		flex-shrink: 1;

	}
	.reward_info_title{
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(33 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-bottom: calc(13 / 750 * 100vw);
	}
	.reward_info_num{
		font-size:calc(48 / 750 * 100vw);
		line-height:calc(67 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);

	}
	.reward_info_line{
		width:calc(2 / 750 * 100vw);
		height:calc(80 / 750 * 100vw);
		background:rgba(232,232,232,1);
	}
	.reward_info_red{
		color: #FF4F5F;
	}


	.reward_btn{
		margin: auto;
		width:calc(690 / 750 * 100vw);
		height:calc(88 / 750 * 100vw);
		background:rgba(255,74,90,1);
		border-radius:calc(8 / 750 * 100vw);

		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);

		margin-bottom: calc(30 / 750 * 100vw);


	}


	.reward_tips{
		padding: 0 calc(30 / 750 * 100vw);
		padding-bottom: calc(30 / 750 * 100vw);


		font-size:calc(24 / 750 * 100vw);
		line-height:calc(33 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.reward_tips_list{}
	.reward_tips_list+
	.reward_tips_list{
		margin-top: calc(45 / 750 * 100vw);
	}
	.reward_tips_title{
		margin-bottom: calc(9 / 750 * 100vw);
	}
	.reward_tip{}


</style>
<style>
	.dialog{
		border-radius: calc(8 / 750 * 100vw);
		width: calc(540 / 750 * 100vw);
		/*height: calc(345 / 750 * 100vw);*/
	}


</style>
