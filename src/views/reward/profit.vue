<template>
	<div class="page">
		
		<div class="profit_page bg_white">


			<!-- 总体模板 -->
			<div class="dn">

				<div class="profit_title flex flex_ac">历史收益记录</div>


				<div class="profit_input_wrap">
					<div class="profit_input_box flex flex_ac">
						<!-- <img src="/img/default.png" alt="" class="profit_input_icon no_shrink"> -->
						<van-icon name="search"class="profit_input_icon no_shrink" />
						<input type="text" class="profit_input flex_grow" placeholder="请输入昵称" >
						<div class="profit_input_false">取消</div>
					</div>
				</div>


				<div class="profit_list">

					<div class="profit_li flex flex_ac"
						v-for="(item,index) in 5" :key='index+"profit_li"' 
						>
						<div class="profit_li_time flex_grow">2020-02-20</div>
						<div class="profit_li_num">+100</div>
						<img src="/img/icons/icon_next.png" alt="" class="profit_li_icon no_shrink">
					</div>



					<div class="profit_area flex flex_ac"
						v-for="(item,index) in 5" :key='index+"profit_area"' 
						>
						<img src="/img/default.png" alt="" class="profit_area_img no_shrink">
						<div class="profit_area_info flex_grow">
							<div class="profit_area_name">平安人寿李大霄</div>
							<div class="profit_area_tip txt_over_ell">注册时间：2020-02-21 05:12:30</div>
							<div class="profit_area_tip txt_over_ell">开通时间：2020-02-21 05:12:30</div>
						</div>
						<div class="profit_area_nums ">
							<div class="profit_area_num">+108.80</div>
							<div class="profit_area_btn flex_c float_r">3年期</div>
						</div>
					</div>


				</div>

			</div>


			<div v-if='types=="all"'>



				<div class="profit_title flex flex_ac">总收益来源</div>


				<div class="profit_list">


					<van-list
					  v-model="loading"
					  :finished="finished"
					  finished-text=""
					  @load="onLoad"
					>
						<div class="" v-for="item in list" :key="item" >
							

							<div class="profit_area flex flex_ac"
								v-for="(item,index) in 5" :key='index+"history_info"' 
								>
								<img src="/img/default.png" alt="" class="profit_area_img no_shrink">
								<div class="profit_area_info flex_grow">
									<div class="profit_area_name">平安人寿李大霄</div>
									<div class="profit_area_tip txt_over_ell">注册时间：2020-02-21 05:12:30</div>
									<div class="profit_area_tip txt_over_ell">开通时间：2020-02-21 05:12:30</div>
								</div>
								<div class="profit_area_nums ">
									<div class="profit_area_num">+108.80</div>
									<div class="profit_area_btn flex_c float_r">3年期</div>
								</div>
							</div>

							<div class="profit_area flex flex_ac"
								v-for="(item,index) in 5" :key='index+"history_info"' 
								>
								<img src="/img/default.png" alt="" class="profit_area_img no_shrink">
								<div class="profit_area_info flex_grow">
									<div class="profit_area_name">平安人寿李大霄</div>
									<div class="profit_area_tip txt_over_ell">注册时间：2020-02-21 05:12:30</div>
									<div class="profit_area_tip txt_over_ell">开通时间：2020-02-21 05:12:30</div>
								</div>
								<div class="profit_area_nums ">
									<div class="profit_area_num">+108.80</div>
									<div class="profit_area_btn flex_c float_r">团队</div>
								</div>
							</div>

						</div>

					</van-list>


				</div>
				
			</div>

			<div v-if='types=="history"'>



				<div class="profit_title flex flex_ac">历史收益记录</div>


				<div class="profit_list">


					<van-list
					  v-model="loading"
					  :finished="finished"
					  finished-text=""
					  @load="onLoad"
					>
						<div class="" v-for="item in list" :key="item" >
							
							<div class="profit_li flex flex_ac"
								v-for="(item,index) in 5" :key='index+"history"' 
								@click="jump" data-url="/reward/profit?types=history_info" 
								>
								<div class="profit_li_time flex_grow">2020-02-20</div>
								<div class="profit_li_num">+100</div>
								<img src="/img/icons/icon_next.png" alt="" class="profit_li_icon no_shrink">
							</div>

						</div>

					</van-list>


				</div>
				
			</div>

			<div v-if='types=="history_info"'>



				<div class="profit_title flex flex_ac">2020-02-20 收益来源</div>


				<div class="profit_list">


					<van-list
					  v-model="loading"
					  :finished="finished"
					  finished-text=""
					  @load="onLoad"
					>
						<div class="" v-for="item in list" :key="item" >
							
							<div class="profit_area flex flex_ac"
								v-for="(item,index) in 5" :key='index+"history_info"' 
								>
								<img src="/img/default.png" alt="" class="profit_area_img no_shrink">
								<div class="profit_area_info flex_grow">
									<div class="profit_area_name">平安人寿李大霄</div>
									<div class="profit_area_tip txt_over_ell">注册时间：2020-02-21 05:12:30</div>
									<div class="profit_area_tip txt_over_ell">开通时间：2020-02-21 05:12:30</div>
								</div>
								<div class="profit_area_nums ">
									<div class="profit_area_num">+108.80</div>
									<div class="profit_area_btn flex_c float_r">3年期</div>
								</div>
							</div>

						</div>

					</van-list>



				</div>
				
			</div>



			<div v-if='types=="invite"'>



				<div class="profit_title flex flex_ac">邀请注册人数</div>


				<div class="profit_list">


					<div class="profit_li flex flex_ac"
						@click="jump" data-url="/reward/profit?types=invite_search" 
						>
						<div class="profit_li_time flex_grow">累计邀请注册</div>
						<div class="profit_li_num">1125</div>
						<img src="/img/icons/icon_next.png" alt="" class="profit_li_icon no_shrink">
					</div>



					<van-list
					  v-model="loading"
					  :finished="finished"
					  finished-text=""
					  @load="onLoad"
					>
						<div class="" v-for="item in list" :key="item" >
							
							<div class="profit_li flex flex_ac"
								v-for="(item,index) in 5" :key='index+"invite"' 
								@click="jump" data-url="/reward/profit?types=invite_info" 
								>
								<div class="profit_li_time flex_grow">2020-02-20</div>
								<div class="profit_li_num">100</div>
								<img src="/img/icons/icon_next.png" alt="" class="profit_li_icon no_shrink">
							</div>
						</div>

					</van-list>



				</div>
				
			</div>

			<div v-if='types=="invite_search"'>



				<div class="profit_input_wrap">
					<div class="profit_input_box flex flex_ac">
						<!-- <img src="/img/default.png" alt="" class="profit_input_icon no_shrink"> -->
						<van-icon name="search"class="profit_input_icon no_shrink" />
						<input type="text" class="profit_input flex_grow" placeholder="请输入昵称" >
						<div class="profit_input_false">取消</div>
					</div>
				</div>


				<div class="profit_list">


					<van-list
					  v-model="loading"
					  :finished="finished"
					  finished-text=""
					  @load="onLoad"
					>
						<div class="" v-for="item in list" :key="item" >
							
							<div class="profit_area flex flex_ac"
								v-for="(item,index) in 5" :key='index+"invite_search"' 
								>
								<img src="/img/default.png" alt="" class="profit_area_img no_shrink">
								<div class="profit_area_info flex_grow">
									<div class="profit_area_name">平安人寿李大霄</div>
									<div class="profit_area_tip txt_over_ell">注册时间：2020-02-21 05:12:30</div>
								</div>
							</div>

						</div>

					</van-list>




				</div>
				
			</div>

			<div v-if='types=="invite_info"'>



				<div class="profit_title flex flex_ac">2020-02-20 邀请注册</div>


				<div class="profit_list">


					<van-list
					  v-model="loading"
					  :finished="finished"
					  finished-text=""
					  @load="onLoad"
					>
						<div class="" v-for="item in list" :key="item" >
							

							<div class="profit_area flex flex_ac"
								v-for="(item,index) in 5" :key='index+"invite_info"' 
								>
								<img src="/img/default.png" alt="" class="profit_area_img no_shrink">
								<div class="profit_area_info flex_grow">
									<div class="profit_area_name">平安人寿李大霄</div>
									<div class="profit_area_tip txt_over_ell">注册时间：2020-02-21 05:12:30</div>
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

	export default {
		data() {
			return {
				search_value: '',

				types: this.$route.query.types||'history',// history history_info invite invite_search invite_info 


				list: [],
				loading: false,
				finished: false,


			};
		},



		methods: {
			...wjw_com_ts,

		    get_list() {
		        return false
		    },


		    onLoad() {
		      // 异步更新数据
		      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
		      setTimeout(() => {
		        for (let i = 0; i < 10; i++) {
		          this.list.push(this.list.length + 1);
		        }

		        // 加载状态结束
		        this.loading = false;

		        // 数据全部加载完成
		        if (this.list.length >= 40) {
		          this.finished = true;
		        }
		      }, 1000);
		    },


		},


	}
</script>

<style scoped >
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