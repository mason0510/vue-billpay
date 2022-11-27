<template>
	<div class="page">
		<div class="form bg_white">

			<div class="form_li flex flex_ac">
				<div class="form_li_name">户名/姓名</div>
				<input type="text" v-model="form.realName" class="form_li_input flex_grow ta_r" placeholder="银行开户名/姓名" />
			</div>
			<div class="form_li flex flex_ac">
				<div class="form_li_name">卡号/账号</div>
				<input type="text" v-model="form.account" class="form_li_input flex_grow ta_r" placeholder="银行卡号/支付宝账号" />
			</div>
			<div class="form_li flex flex_ac">
				<div class="form_li_name">联系手机</div>
				<input type="text" v-model="form.mobile" class="form_li_input flex_grow ta_r" placeholder="填写手机号" />
			</div>
			<!-- /img/default.png -->
			<!-- <img src="" alt="" class="form_img no_shrink"> -->
		</div>


		<div class="type_box">

			<div class="type_title flex flex_ac">账户类型</div>


			<div class="type_list flex flex_wrap ">

				<div class="type_li flex flex_ac"
					v-for='(item, index) in bank_list' :key='index'
					>

					<van-checkbox class="type_li_check no_shrink" checked-color="#FF4A5A" icon-size='calc(36 / 750 * 100vw)'  :value='form.bankName==item.name' @click='form.bankName=item.name'  />
					<img :src="item.imageUrl" alt="" class="type_li_icon no_shrink">
					<div class="type_li_txt flex_grow">{{item.name}}</div>

				</div>


			</div>


			<div class="type_else  flex flex_ac ">
				<div class="type_else_name no_shrink">其他</div>
				<input type="text" v-model="form.bankName" class="type_else_input flex_grow" placeholder="请输入">
			</div>


			<div class="type_tip">温馨提示：请仔细核对您提现的账号信息，否则无法收到款项！</div>


		</div>



		<div class="form_submit global_btn flex_c" @click='addBank()' >添加</div>

	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios'
    import { Toast } from 'vant';

	export default {
		data() {
			return {
				form:{
                    realName:'',
                    account:'',
                    mobile:'',
                    bankName:''
				},
				bank_list: [],
			}
		},



		methods: {
			...wjw_com_ts,

		    getBankList() {
                let self = this;
                axios.get('/api/bank/list').then(function (response) {
                    let data = response.data.data;
                    self.bank_list = data;
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
		    },
            addBank() {
			    let self = this;
				if (!self.form.realName){
                    Toast.fail('请填写姓名');
				    return;
				}
                if (!self.form.account) {
                    Toast.fail('请填写账号');
                    return;
                }
                if (!self.form.mobile) {
                    Toast.fail('请填写手机号');
                    return;
                }
                if (!self.form.bankName) {
                    Toast.fail('请填写账号类型');
                    return;
                }
                axios.post('bank-account/store',self.form).then(function (response) {
                    Toast.success('添加银卡账号成功！');
                    self.goBack();
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
            }
		},
        mounted() {
            this.getBankList();
        }
	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	.page{
		/*background: #EEF0F4;*/
		overflow: hidden;
	}



	.form{
		padding-top: 40px;
		/*margin-top: calc(20 / 750 * 100vw);*/
		overflow: hidden;
		border-bottom: calc(16 / 750 * 100vw) solid  rgba(248,248,248,1);
	}
	.form_li{
		height:calc(92 / 750 * 100vw);
		margin: 0 calc(30 / 750 * 100vw);
		border-bottom: 1px solid rgba(248,248,248,1);
	}
	.form_li_name{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-right: calc(20 / 750 * 100vw);
	}
	.form_li_input{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
	}
	.form_img{
		width:calc(360 / 750 * 100vw);
		height:calc(396 / 750 * 100vw);
		background:rgba(255,196,196,1);

		display: block;
		margin: auto;


		margin-top: calc(188 / 750 * 100vw);
		margin-bottom: calc(88 / 750 * 100vw);
	}



	.type_box{
		padding: 0 calc(40 / 750 * 100vw);
	}
	.type_title{
		height: calc(92 / 750 * 100vw);
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(28 / 750 * 100vw);
	}
	.type_list{
		margin-bottom: calc(40 / 750 * 100vw);
	}
	.type_li{
		width: 50%;
		height: calc(96 / 750 * 100vw);
	}
	.type_li_check{
		margin-right: calc(32 / 750 * 100vw);
	}
	.type_li_icon{
		width: calc(48 / 750 * 100vw);
		height: calc(48 / 750 * 100vw);
		margin-right: calc(16 / 750 * 100vw);
	}
	.type_li_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(34,34,34,1);
		line-height:calc(28 / 750 * 100vw);
	}
	.type_else{
		margin-bottom: calc(64 / 750 * 100vw);
	}
	.type_else_name{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(28 / 750 * 100vw);
		margin-right: calc(24 / 750 * 100vw);
	}
	.type_else_input{
		height:calc(60 / 750 * 100vw);
		background:rgba(255,255,255,1);
		border-radius:calc(4 / 750 * 100vw);
		border:calc(1 / 750 * 100vw) solid rgba(217,217,217,1);
		padding: 0 calc(32 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		/*color:rgba(153,153,153,1);*/
	}
	.type_tip{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		/*line-height:calc(24 / 750 * 100vw);*/
	}



	.form_submit{
		margin-top: calc(68 / 750 * 100vw);
	}



</style>
