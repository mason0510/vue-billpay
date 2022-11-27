<template>
	<div class="page">


		<div class="bg_white">
			<div class="cash_user_add_wrap"
				@click="jump" data-url="/cash/add"
				>
				<div class="cash_user_add_box flex_c">
					<img src="/img/icon_smallfunction_add@2x.png" alt="" class="cash_user_add_icon no_shrink">
					<div class="cash_user_add_txt">添加新账户</div>
				</div>
			</div>
			<div class="cash_user_list">
				<div class="cash_user_li flex"
					v-for="(item,index) in bankAccounts" :key='index'>
					<img v-if="item.imageUrl" :src="item.imageUrl" alt="" class="cash_user_li_img no_shrink">
					<img v-else src="/img/default.png" alt="" class="cash_user_li_img no_shrink">
					<div class="cash_user_li_info flex_grow">
						<div class="cash_user_li_name">{{ item.bankName }}</div>
						<div class="cash_user_li_tip">{{ item.account }}</div>
					</div>
					<div class="cash_user_li_btn flex_c flex_self_c" @click="deleteBank(item)">删除</div>
				</div>
			</div>
		</div>



	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios'
    import { Toast,Dialog } from 'vant';

	export default {
		data() {
			return {
				search_value: '',
				bankAccounts:[]
			};
		},

		methods: {
			...wjw_com_ts,

            getList() {
                let self = this;
                axios.get('bank-account/list').then(function (response) {
                    let data = response.data.data;
					self.bankAccounts = data;
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
            },
            deleteBank(item) {
                let self = this;
                Dialog.confirm({
                    title: '删除',
                    message: '你确定要删除此银行卡账户',
                }).then(() => {
                    self.requireDelete(item.id);
                }).catch(() => {
                    return false;
                });
            },
			requireDelete(id){
			    let self = this;
			    let uri = "bank-account/"+id;
                axios.delete(uri).then(function (response) {
                    self.getList();
                    Toast.success('删除银卡账号成功！');
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
			}
		},
        mounted() {
            this.getList();
        }
	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	.page{
		background: #EEF0F4;
	}



	.cash_user_popup_content{}
	.cash_user_list{
		overflow: auto;
		border-top: 1px solid rgba(248,248,248,1);
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
	.cash_user_li_btn{
		width:calc(96 / 750 * 100vw);
		height:calc(40 / 750 * 100vw);
		border-radius:calc(8 / 750 * 100vw);
		border:calc(2 / 750 * 100vw) solid rgba(255,74,90,1);

		font-size:calc(24 / 750 * 100vw);
		line-height:calc(33 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,74,90,1);

	}
	.cash_user_add_wrap{
		padding: calc(28 / 750 * 100vw) calc(30 / 750 * 100vw);
	}
	.cash_user_add_box{
		height: calc(84 / 750 * 100vw);
		border-radius:calc(8 / 750 * 100vw);
		border:2px dashed rgba(217,217,217,1);
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


</style>
