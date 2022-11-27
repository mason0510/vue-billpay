<template>
	<div class="page">

		<div class="mine_infos flex flex_ac">
			<div class="mine_port_box">
				<img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" alt="" class="mine_port no_shrink">
				<img v-else src="/img/default.png" alt="" class="mine_port no_shrink">
				<img src="img/icon_VIP@2x.png" alt="" class="mine_port_icon no_shrink">
			</div>
			<div class="mine_info lh1 flex_grow">
				<div class="mine_name">{{ userInfo.nickname }}</div>
				<div class="mine_tip">完善信息，让客户找到你</div>
			</div>
			<img src="/img/icon_img/icon_edit.png" alt="" class="mine_edit_icon no_shrink"
				@click="jump" data-url="/mine/set"
			>
		</div>



		<div class="mine_list">
			<div class="mine_li flex flex_ac" @click="jump" data-url="/classify/set"  >
				<img src="/img/icon_img/icon_brand.png" alt="" class="mine_li_img no_shrink">
				<div class="mine_li_txt flex_grow">公司简称（品牌）</div>
				<div class="mine_li_tip" v-if="userInfo.companyTags.length>0">
					<template v-for="(company,index) in userInfo.companyTags.slice(0,2)">
						{{ index>=1 ? '、'+company.value: company.value }}
					</template>

				</div>
				<img src="/img/icons/icon_next.png" alt="" class="mine_li_icon no_shrink">
			</div>
			<div class="mine_li flex flex_ac" @click="jump" data-url="/Leads/open"  >
				<img src="/img/icon_img/icon_VIP.png" alt="" class="mine_li_img no_shrink">
				<div class="mine_li_txt flex_grow">高级会员</div>
				<div class="mine_li_time" v-if="userInfo.vipTime">有效期至：{{ userInfo.vipTime|formatTimer}}</div>
				<img src="/img/icons/icon_next.png" alt="" class="mine_li_icon no_shrink">
			</div>
			<div class="mine_li flex flex_ac" @click="jump" data-url="/reward"  >
				<img src="/img/icon_invite@2x.png" alt="" class="mine_li_img no_shrink">
				<div class="mine_li_txt flex_grow">邀请奖励</div>
				<div class="mine_li_tip">收益报表</div>
				<img src="/img/icons/icon_next.png" alt="" class="mine_li_icon no_shrink">
			</div>
			<div class="mine_li flex flex_ac" @click="jump" data-url="/Leads/set"  >
				<img src="/img/icon_img/icon_notice.png" alt="" class="mine_li_img no_shrink">
				<div class="mine_li_txt flex_grow">推送设置</div>
				<img src="/img/icons/icon_next.png" alt="" class="mine_li_icon no_shrink">
			</div>
			<div class="mine_li flex flex_ac" @click="jump" data-url="/mine/service"  >
				<img src="/img/icon_img/icon_service.png" alt="" class="mine_li_img no_shrink">
				<div class="mine_li_txt flex_grow">专属客服</div>
				<img src="/img/icons/icon_next.png" alt="" class="mine_li_icon no_shrink">
			</div>
			<div class="mine_li flex flex_ac" @click="jump" data-url="/mine/product"  >
				<img src="/img/icon_img/icon_product.png" alt="" class="mine_li_img no_shrink">
				<div class="mine_li_txt flex_grow">我的产品</div>
				<img src="/img/icons/icon_next.png" alt="" class="mine_li_icon no_shrink">
			</div>
			<div class="mine_li flex flex_ac">
				<div class="mine_li_txt flex_grow">文章名片底部显示热门产品</div>
				<van-switch class="mine_li_switch" active-color='#44E4CA' inactive-color="#D9D9D9"  size='calc(40 / 750 * 100vw)'
							v-bind:value="isCheckedPush(userInfo.isBottomGoods)"
							@change="changeTitleChecked(userInfo.isBottomGoods,$event)"
							 />
			</div>


		</div>


	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios'

	export default {
		data() {
			return {
				search_value: '',
				switch1: false,
				userInfo:{}
			};
		},



		methods: {
			...wjw_com_ts,

		    getUserInfo() {
                let self = this;
                axios.get('account/profile').then(function (response) {
                    let data = response.data.data;
                    self.userInfo = data;
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
		    },
            updateBottomGoods(){
			    let isBottomGoods = this.userInfo.isBottomGoods== true ? 1 : 0;
			    let uri = "account/update-bottom-goods/"+isBottomGoods;
                axios.put(uri).then(function (response) {
                    let data = response.data.data;
                    console.log(data);
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
			},
            isCheckedPush(isBottomGoods) {
                return isBottomGoods == 1 ? true : false;
            },
            changeTitleChecked(isBottomGoods,$event){
                this.userInfo.isBottomGoods = !isBottomGoods;
                this.updateBottomGoods();
            },
		},
        mounted() {
            this.getUserInfo();
        },
		filters:{
            formatTimer: function (unixTime) {
                var d = new Date(parseInt(unixTime) * 1000); // 依情况进行更改 * 1
                return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
            }
		}

	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}



	.mine_infos{
		padding: calc(64 / 750 * 100vw) calc(40 / 750 * 100vw);
	}
	.mine_port_box{
		position: relative;
		margin-right: calc(32 / 750 * 100vw);
	}
	.mine_port{
		width: calc(120 / 750 * 100vw);
		height: calc(120 / 750 * 100vw);
		border-radius: 50%;
	}
	.mine_port_icon{
		position: absolute;
		bottom: 0;
		right: 0;
		width: calc(48 / 750 * 100vw);
		height: calc(48 / 750 * 100vw);
	}
	.mine_info{}
	.mine_name{
		font-size:calc(48 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);

		margin-bottom: calc(24 / 750 * 100vw);
	}
	.mine_tip{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.mine_edit_icon{
		width: calc(32 / 750 * 100vw);
		height: calc(32 / 750 * 100vw);
	}


	.mine_list{
		padding: 0 calc(40 / 750 * 100vw);
	}
	.mine_li{
		height: calc(120 / 750 * 100vw);
	}
	.mine_li_img{
		width: calc(64 / 750 * 100vw);
		height: calc(64 / 750 * 100vw);
		margin-right: calc(24 / 750 * 100vw);
	}
	.mine_li_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.mine_li_tip{
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.mine_li_time{
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,74,90,1);
	}
	.mine_li_icon{
		width:calc(14 / 750 * 100vw);
		height:calc(24 / 750 * 100vw);
		margin-left: calc(24 / 750 * 100vw);
	}
	.mine_li_switch{}


</style>
