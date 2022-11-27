<template>
	<div class="page">


		<div class="reward_head_wrap">

			<!-- /img/default.png bg@2x -->
			<img src="/img/bg@2x.png" alt="" class="reward_head_bg no_shrink">
			<div class="reward_head_box">

				<div class="reward_head_title">可提现金额(元)</div>
				<div class="reward_head_num">{{ amount.money }}</div>
				<div class="reward_head_btn flex_c"
					@click="jump" data-url="/cash/add"
				>添加提现账户</div>

			</div>
		</div>

		<div class="cash_user_box bg_white  flex flex_align_c" v-if='bankAccount.account' @click='cash_user_popup_show=true' >
			<!-- <img src="/img/default.png" alt="" class="cash_user_img no_shrink"> -->
			<img :src="bankAccount.imageUrl" v-if="bankAccount.imageUrl" alt="" class="cash_user_img no_shrink">
			<img src="/img/default.png" alt="" v-else class="cash_user_img no_shrink">
			<div class="cash_user_info flex_grow">
				<div class="cash_user_name">{{ bankAccount.account }}</div>
				<div class="cash_user_tip">{{ bankAccount.bankName }}</div>
			</div>
			<div class="cash_user_more_box  flex flex_align_c">
				<div class="cash_user_more_txt">更换</div>
				<img src="/img/icons/icon_next.png" alt="" class="cash_user_more_icon no_shrink">
			</div>
		</div>


		<div class="warn_tip flex flex_align_c " v-else
			@click="jump" data-url="/cash/add"
			>
			<img src="/img/icon_prompt@3x.png" alt="" class="warn_tip_icon no_shrink">
			<div class="warn_tip_txt txt_over_ell flex_grow ">必须先添加提现账户才能申请提现</div>
		</div>

		<div class="cash_area bg_white">
			<div class="cash_area_title flex flex_ac">提现金额</div>
			<div class="cash_area_input_box flex flex_ac">
				<div class="cash_area_input_tag no_shrink">￥</div>
				<input class="cash_area_input flex_grow" placeholder="请输入" type="number" v-model.number="price"/>
				<van-icon name="clear" class="cash_area_input_icon no_shrink" @click="clearPrice"/>
			</div>
			<div class="cash_area_tip flex flex_ac">可提现金额{{ amount.money }}元</div>
		</div>


		<div class="reward_btn flex_c" @click='reward_btn'>确认提现</div>


		<div class="reward_tips">
			<div class="reward_tips_list">
				<div class="reward_tips_title">注意：</div>
				<div class="reward_tip">提现申请会在1~3个工作日内到帐，请耐心等待。</div>
			</div>
		</div>

		<van-action-sheet v-model="cash_user_popup_show" title="选择提现账户">
			<div class="cash_user_popup_content">
				<div class="cash_user_list">
					<div class="cash_user_li flex"
						v-for="(item,index) in bankAccounts" :key='index'
						@click='changeAccountChecked(item)'>
						<img :src="item.imageUrl" v-if="item.imageUrl" alt="" class="cash_user_li_img no_shrink">
						<img src="/img/default.png" v-else alt="" class="cash_user_li_img no_shrink">
						<div class="cash_user_li_info flex_grow">
							<div class="cash_user_li_name">{{ item.bankName }}</div>
							<div class="cash_user_li_tip">{{ item.account }}</div>
						</div>
						<!-- :value='true'  v-model='checked1'  -->
						<van-checkbox class="cash_user_li_check flex_self_c ov_v" checked-color="#FF4A5A" icon-size='calc(32 / 750 * 100vw)'
									  v-bind:value="isCheckedAccount(item.id)"
									  />
					</div>
				</div>
				<div class="cash_user_add_box flex_c"
					@click="jump" data-url="/cash/add">
					<img src="/img/icon_smallfunction_add@2x.png" alt="" class="cash_user_add_icon no_shrink">
					<div class="cash_user_add_txt">添加新账户</div>
				</div>

			</div>
		</van-action-sheet>



	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios'

	export default {
		data() {
			return {
				search_value: '',

				types: this.$route.query.types||'else',// mine else
				// true false
				cash_user_popup_show: false,
                checkedId: 0,
                bankAccount:{},
                bankAccounts:[],
                amount:{},
                price:''
			};
		},



		methods: {
			...wjw_com_ts,

            getList() {
                let self = this;
                axios.get('bank-account/list').then(function (response) {
                    let bankAccounts = response.data.data;
                    self.bankAccount = {};
                    if (bankAccounts.length > 0) {
                        self.bankAccount = bankAccounts[0];
                    }
                    self.bankAccounts = bankAccounts;
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
            },
            getAmountInfo() {
                let self = this;
			    axios.get('account/amount').then(function (response) {
                    let amount = response.data.data;
                    self.amount = amount;
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
			},
		    reward_btn() {
				let self = this;

                if (this.price < 100) {
                    this.$dialog.alert({message: '会员申请提现，但奖励金不满100元，弹窗提示'});
					return;
                }
                console.log(this.price);
                console.log(self.amount.money);

                let money = self.amount.money;
                let price = this.price;

                if (price > money){
                    this.$dialog.alert({message: '你提现的金额要大于你账号的金额'});
                    return;
				}

                if (this.amount.isVip == 0) {
                    this.$dialog.alert({
                        message: '提现仅限高级会员',
                    })
                        .then(() => {
                            // on confirm
                            this.jump(this.create_dataset({
                                url: '/Leads/open',
                            }))
                        });
                    return;
                }

                let bankAccountId = self.bankAccount.id;

                axios.post('withdraw/store',{price:price,bankAccountId:bankAccountId}).then(function (response) {
					self.price = '';
                    self.getAmountInfo();
                    self.$toast.success('提现申请成功！');
                    //self.goBack();
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });

		    },
            changeAccountChecked(item) {
                this.bankAccount = item;
            },
            isCheckedAccount(id) {
                return this.bankAccount.id === id ? true : false;
            },
            clearPrice() {
                this.price = "";
            }
		},
        mounted() {
            this.getList();
            this.getAmountInfo();
        },
		filters: {
            //保留2位小数点过滤器 不四舍五入
            number(value) {
                var toFixedNum = Number(value).toFixed(3);
                var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
                return realVal;
            }
        },
	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
		background:rgba(248,248,248,1);
	}

	.van-action-sheet__header{
		font-size:calc(28 / 750 * 100vw);
		/*line-height:calc(40 / 750 * 100vw);*/
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);

		background:rgba(248,248,248,1);
		/*border-radius:calc(16 / 750 * 100vw) calc(16 / 750 * 100vw) calc(0 / 750 * 100vw) calc(0 / 750 * 100vw);*/
	}

	.cash_user_popup_content{}
	.cash_user_list{
		height: calc(440 / 750 * 100vw);
		overflow: auto;
		border-bottom: 1px solid rgba(248,248,248,1);
	}
	.cash_user_li{
		margin: 0 calc(30 / 750 * 100vw);
		height:calc(120 / 750 * 100vw);
		box-sizing: border-box;
		padding: calc(20 / 750 * 100vw) 0;
		background:rgba(255,255,255,1);
		border-bottom: 1px solid rgba(248,248,248,1);
	}
	.cash_user_li_img{
		width:calc(72 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		/*background:rgba(16,142,233,1);*/
		border-radius:calc(4 / 750 * 100vw);
		margin-right: calc(25 / 750 * 100vw);
	}
	.cash_user_li_info{}
	.cash_user_li_name{
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(51 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);

		margin-bottom: calc(3 / 750 * 100vw);
	}
	.cash_user_li_tip{
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.cash_user_li_check{}
	.cash_user_add_box{
		height: calc(100 / 750 * 100vw);
	}
	.cash_user_add_icon{

		width: calc(40 / 750 * 100vw);
		height: calc(40 / 750 * 100vw);
		margin-right: calc(10 / 750 * 100vw);
	}
	.cash_user_add_txt{
		font-size:calc(28 / 750 * 100vw);
		line-height:calc(40 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,74,90,1);
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
		/*background:linear-gradient(270deg,rgba(255,74,90,1) 0%,rgba(255,97,112,1) 100%);*/
	}
	.reward_head_box{
		height:calc(340 / 750 * 100vw);
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
		border: 2px solid rgba(255,255,255,1);

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
		background:rgba(248,184,58,1);
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
		width: calc(50% - 2px );
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
	.reward_info_title_red{
		color: #FF4F5F;
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


	.reward_btn{
		margin: calc(30 / 750 * 100vw);
		width:calc(690 / 750 * 100vw);
		height:calc(88 / 750 * 100vw);
		background:rgba(255,74,90,1);
		border-radius:calc(8 / 750 * 100vw);

		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);



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




	.cash_user_box{
		padding:  calc(20 / 750 * 100vw)  calc(30 / 750 * 100vw);
		margin:  calc(20 / 750 * 100vw) 0;
	}
	.cash_user_img{
		width: calc(100 / 750 * 100vw);
		height: calc(100 / 750 * 100vw);
		/*background:rgba(16,142,233,1);*/
		border-radius: calc(4 / 750 * 100vw);
		margin-right:  calc(30 / 750 * 100vw);
	}
	.cash_user_info{}
	.cash_user_name{
		font-size: calc(34 / 750 * 100vw);
		line-height: calc(51 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);

		margin-bottom:  calc(12 / 750 * 100vw);
	}
	.cash_user_tip{
		font-size: calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.cash_user_more_box{}
	.cash_user_more_txt{
		font-size: calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		margin-right:  calc(30 / 750 * 100vw);
	}
	.cash_user_more_icon{
		width: calc(16 / 750 * 100vw);
		height: calc(25 / 750 * 100vw);
	}



	.cash_area{
		padding: 0 calc(30 / 750 * 100vw);
	}
	.cash_area_title{
		height: calc(68 / 750 * 100vw);
	}
	.cash_area_input_box{
		font-size:calc(56 / 750 * 100vw);
		line-height:calc(78 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);

		padding-bottom: calc(6 / 750 * 100vw);
		border-bottom: 2px solid rgba(238,238,238,1);
	}
	.cash_area_input_tag{}
	.cash_area_input{
		font-size:calc(56 / 750 * 100vw);
	}
	.cash_area_input_icon{
		width:calc(31 / 750 * 100vw);
		height:calc(31 / 750 * 100vw);
		font-size:calc(31 / 750 * 100vw);
		color: #D9D9D9;
	}
	.cash_area_tip{
		height: calc(66 / 750 * 100vw);
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(33 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}


</style>
