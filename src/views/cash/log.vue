<template>
	<div class="page">

		<div class="log_list bg_white">
			<van-list
			  v-model="loading"
			  :finished="finished"
			  finished-text="没有更多了"
			  @load="getWithdrawList"
			>
				<div class="" v-for="(item,index) in list" :key="index" >
					<!-- flex_ac -->
					<div class="log_li flex ">
						<div class="log_li_name flex_grow">￥{{ item.price }}</div>
						<div class="log_li_tip ta_r">
							<div v-if="item.status==0" class="log_li_tip2">提现中… </div>
							<div v-else-if="item.status==1" class="log_li_tip1">提现成功 </div>
							<div v-else class="log_li_tip3">提现失败 </div>
							<div class="log_li_time">{{item.createdAt}}</div>
							
						</div>
					</div>
					<!--<div class="log_li flex flex_ac">
						<div class="log_li_name flex_grow">￥108.36</div>
						<div class="log_li_tip log_li_tip2">提现中… </div>
					</div>
					<div class="log_li flex flex_ac">
						<div class="log_li_name flex_grow">￥108.36</div>
						<div class="log_li_tip log_li_tip3">提现失败 </div>
					</div>-->
				</div>

			</van-list>

		</div>


	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

	export default {
		data() {
			return {
				search_value: '',

				list: [],
				loading: false,
				finished: false,
                withdrawBefore:0
			};
		},



		methods: {
			...wjw_com_ts,

            getWithdrawList() {

			    let self = this;
                let params = {page:self.page,withdrawBefore:self.withdrawBefore};

                axios.post('withdraw/list', params).then(function (response) {
                    let data = response.data.data;
                    // self.video_list = data.videos;
                    let list = data.withdraws;
                    self.withdrawBefore = data.withdrawBefore;

                    list.forEach(function (item) {
                        self.list.push(item);
                    });
                    self.loading = false;

                    list.length == 0 && (self.finished = true);
                });
            }

		},

	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	.page{
		background: #EEF0F4;
		overflow: hidden;
	}


	.log_list{
		margin-top:  calc(20 / 750 * 100vw);
	}
	.log_li{
		/*height: calc(92 / 750 * 100vw);*/
		padding: 0  calc(30 / 750 * 100vw);
		padding: calc(30 / 750 * 100vw);
		border-bottom: 1px solid rgba(248,248,248,1);

		/*line-height: calc(40 / 750 * 100vw);*/
	}
	.log_li_name{
		font-size: calc(28 / 750 * 100vw);
		line-height: calc(40 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.log_li_tip{
		font-size: calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		line-height: calc(40 / 750 * 100vw);
	}
	.log_li_tip1{
		color:rgba(68,228,202,1);
	}
	.log_li_tip2{
		color: #4A5AFF;
	}
	.log_li_tip3{
		color: #FFA44A;
	}
	.log_li_time{
		margin-top: calc(24 / 750 * 100vw);

		font-size: calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}


</style>
