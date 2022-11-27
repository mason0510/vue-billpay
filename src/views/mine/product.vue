<template>
	<div class="page">
		
		<div class="product_list_wrap">
			
			<div class="product_head flex flex_ac ">
				
				<div class="product_head_name flex_grow">全部 25</div>
				<a-popover v-model="add_opt_show" trigger="click" placement="bottomRight"  overlayClassName="product_head_popover">

				  	<template #content>

				  		<div class="product_popover_list">
					  		<div class="product_popover_li flex flex_ac ">
						  		<div class="product_popover_li_txt flex_grow">平安保险</div>
								<img src="/img/icon_choose@2x.png" alt="" class="product_popover_li_icon no_shrink">
					  		</div>
					  		<div class="product_popover_li flex flex_ac ">
						  		<div class="product_popover_li_txt flex_grow">平安保险</div>
								<img src="/img/icon_choose@2x.png" alt="" class="product_popover_li_icon no_shrink">
					  		</div>
				  		</div>

				  	</template>

				  	<div class="product_head_more_box flex flex_ac">
				  		<div class="product_head_more_txt">平安保险</div>
				  		<!--  size="12px" -->
				  		<van-icon name="arrow-down" class="product_head_more_icon no_shrink" />
				  		<!-- <img src="/img/icon_edit_gray@2x.png" alt="" class="product_head_more_icon no_shrink"> -->
				  	</div>

				</a-popover>
			</div>

			<div class="product_list flex flex_wrap ">
				<div class="product_li"
					v-for="(item,index) in 15" :key='index' 
					>
					<img src="/img/default.png" alt="" class="product_li_img no_shrink">
					<div class="product_li_info">
						<div class="product_li_name">平安福满分</div>
						<div class="product_li_price">10562</div>
					</div>
				</div>
			</div>

		</div>

		<div class="product_add flex_c">
			<img src="/img/icon_smallfunction_add@2x.png" alt="" class="product_add_icon no_shrink">
			<div class="product_add_txt">添加商品</div>
		</div>

		<!-- user_box_fixed op_0 -->
		<div class="user_box flex flex_ac bg_white"
			v-for='(item, index) in 2' :key='index'
			:class='{user_box_fixed: index, op_0: !index }'
			>
			<img src="/img/default.png" alt="" class="user_img no_shrink">
			<div class="user_name flex_grow">中国平安林大夏</div>
			<div class="user_btns flex ">
				<div class="user_btn flex_c ">
					<img src="/img/电话@2x.png" alt="" class="user_btn_icon no_shrink">
					<div class="user_btn_txt">电话</div>
				</div>
				<div class="user_btn user_btn_wx flex_c ">
					<img src="/img/微信@2x.png" alt="" class="user_btn_icon no_shrink">
					<div class="user_btn_txt">微信</div>
				</div>
			</div>


		</div>
		
	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';

	export default {
		data() {
			return {
				search_value: '',

				// true false
				add_opt_show: false,

			};
		},



		methods: {
			...wjw_com_ts,

		    get_list() {
		        return false
		    },
		},


	}
</script>

<style>
	.product_head_popover{}
	.product_head_popover .ant-popover-inner-content{
		padding: 0;
	}
</style>
<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}


	
	.product_list_wrap{
		border-top: calc(20 / 750 * 100vw) solid #EEF0F4;
	}
	.product_head{
		height: calc(90 / 750 * 100vw);
		padding: 0 calc(30 / 750 * 100vw);
		border-bottom: 1px solid #EEF0F4;
	}
	.product_head_name{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(40 / 750 * 100vw);
	}

	.product_head_more_box{}
	.product_head_more_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(40 / 750 * 100vw);
		margin-right: calc(12 / 750 * 100vw);
	}
	.product_head_more_icon{
		width:calc(20 / 750 * 100vw);
		/*height:calc(12 / 750 * 100vw);*/
		font-size: calc(12 / 750 * 100vw);
		color: #EEF0F4;
	}
	.product_head_popover{}
	.product_head_popover .ant-popover-inner-content{
		padding: 0;
	}

	.product_popover_list{
		border-radius: calc(8 / 750 * 100vw);
		background: white;
	}
	.product_popover_li{
		width: calc(300 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		box-sizing: border-box;
		padding: 0 calc(20 / 750 * 100vw);
		background:rgba(255,255,255,1);
		border-bottom: 1px solid #EEF0F4;
	}
	.product_popover_li:last-child{
		border: none;
	}
	.product_popover_li_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(40 / 750 * 100vw);
	}
	.product_popover_li_icon{
		width:calc(30 / 750 * 100vw);
		height:calc(25 / 750 * 100vw);
	}
	
	.product_list{
	}
	.product_li{
		margin-top: calc(30 / 750 * 100vw);
		margin-left: calc(30 / 750 * 100vw);
		width:calc(330 / 750 * 100vw);
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);
		overflow: hidden;
	}
	.product_li_img{
		width:100%;
		height:calc(200 / 750 * 100vw);
		background:rgba(207,107,107,1);
	}
	.product_li_info{
		padding: calc(15 / 750 * 100vw) calc(20 / 750 * 100vw);
	}
	.product_li_name{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(33 / 750 * 100vw);
		margin-bottom: calc(3 / 750 * 100vw);
	}
	.product_li_price{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,74,90,1);
		line-height:calc(40 / 750 * 100vw);
	}

	.product_add{
		position: fixed;
		right: 0;
		bottom: calc(150 / 750 * 100vw);

		padding: 0 calc(22 / 750 * 100vw);
		box-sizing: border-box;

		min-width:calc(160 / 750 * 100vw);
		height:calc(60 / 750 * 100vw);
		background:rgba(255,255,255,1);
		box-shadow:calc(0 / 750 * 100vw) calc(4 / 750 * 100vw) calc(8 / 750 * 100vw) calc(0 / 750 * 100vw) rgba(187,183,183,0.5);
		border-radius:calc(30 / 750 * 100vw) calc(0 / 750 * 100vw) calc(0 / 750 * 100vw) calc(30 / 750 * 100vw);
		border:calc(2 / 750 * 100vw) solid rgba(255,74,90,1);

		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,74,90,1);
		line-height:calc(33 / 750 * 100vw);
	}
	.product_add_icon{
		width: calc(24 / 750 * 100vw);
		height: calc(24 / 750 * 100vw);
		margin-right: calc(20 / 750 * 100vw);
	}
	.product_add_txt{}

	.user_box{
		height: calc(120 / 750 * 100vw);
		padding: 0 calc(30 / 750 * 100vw);
	}
	.user_box_fixed{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.user_img{
		width:calc(72 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		border-radius: 50%;
		margin-right: calc(12 / 750 * 100vw);
	}
	.user_name{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(40 / 750 * 100vw);
	}
	.user_btns{}
	.user_btn{
		width:calc(140 / 750 * 100vw);
		height:calc(60 / 750 * 100vw);
		border-radius:calc(8 / 750 * 100vw);
		border:calc(2 / 750 * 100vw) solid rgba(255,74,90,1);
		margin-left: calc(30 / 750 * 100vw);
	}
	.user_btn_icon{
		width:calc(31 / 750 * 100vw);
		height:calc(31 / 750 * 100vw);
		color:rgba(255,74,90,1);
		margin-right: calc(7 / 750 * 100vw);
	}
	.user_btn_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,74,90,1);
		line-height:calc(40 / 750 * 100vw);
	}
	.user_btn_wx{
		border-color: #FFA44A;
	}
	.user_btn_wx 
	.user_btn_icon{
		color: #FFA44A;
	}
	.user_btn_wx 
	.user_btn_txt{
		color: #FFA44A;
	}



</style>