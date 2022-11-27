<template>
	<div class="page">

		<div class="article_box flex">
			<div class="article_info flex flex_column">
				<div class="article_title flex_grow">{{ articleVideo.title }}</div>
				<div class="article_read flex">
					<img src="/img/icon_eye@2x.png" alt="" class="article_read_icon no_shrink">
					<div class="article_read_num">{{ articleVideo.wxView }}次阅读</div>
				</div>
			</div>
			<img v-if="articleVideo.imageUrl" :src="articleVideo.imageUrl" alt="" class="article_img no_shrink">
			<img v-else src="/img/default.png" alt="" class="article_img no_shrink">
		</div>

		<div class="leads_list" @click='isVip==1?"":jump($event)' data-url='/Leads/open'>


			<van-list
			  v-model="loading"
			  :finished="finished"
			  finished-text="没有更多了"
			  @load="getCustomerCueList">

				<div class="" v-for="(item,index) in customerList" :key="index" >


					<div class="leads_li">

						<div class="leads_li_time">2分钟前</div>

						<div class="leads_li_info_box flex lh1" v-if='isVip==1'>
							<img v-if="item.headimgurl" :src="item.headimgurl" alt="" class="leads_li_img no_shrink">
							<img v-else src="/img/default.png" alt="" class="leads_li_img no_shrink">
							<div class="leads_li_info flex_grow">
								<div class="leads_li_name">{{ item.nickname }}</div>
								<div class="leads_li_tel">{{ item.mobile }}</div>
								<div class="leads_li_addr">所在地：{{ item.locationName }}</div>
							</div>
							<div class="leads_li_btn flex_self_c flex_c" @click='findHer(item)' >去找Ta</div>
						</div>

						<div class="leads_li_info_box flex lh1" v-else>
							<img src="/img/头像@2x.png" alt="" class="leads_li_img no_shrink">
							<div class="leads_li_info flex_grow">
								<div class="leads_li_name">开通会员可查看姓名</div>
								<div class="leads_li_tel">开通会员可查看电话</div>
								<div class="leads_li_addr">开通会员可查看所在地</div>
							</div>
							<div class="leads_li_btn flex_self_c flex_c">去找Ta</div>
						</div>


						<!--<div class="leads_li_article flex flex_align_c"
							>
							<img src="/img/icon_text@2x.png" alt="" class="leads_li_article_icon no_shrink">
							<div class="leads_li_article_txt flex_grow txt_over_ell ">{{ item.title }}</div>
							<img src="/img/icon_next@2x.png" alt="" class="leads_li_article_more no_shrink">
						</div>-->
						<div class="leads_li_tips flex flex_align_c">
							<div class="leads_li_reads flex">
								<div>阅读 </div>
								<div class="leads_li_read_red">5分25秒</div>
							</div>
							<div class="leads_li_num flex flex_grow">
								<div>累计</div>
								<div class="leads_li_num_red">{{ item.vxNumber }}</div>
								<div>次来访</div>
							</div>
							<div class="leads_li_tip">来源：{{ item.from }}</div>
						</div>
					</div>

				</div>

			</van-list>

		</div>



		<!-- 弹窗 -->
		<van-dialog
			v-model="find_show"
			title="线索提示"
			class=' '
			confirm-button-text='知道啦'
			confirm-button-color='#FF4A5A'
			>
			<div class="find_box">
				<div class="find_title_tip ta_c">已复制客户昵称</div>
				<div class="find_txt">{{ nickname }}可能是你的微信好友或者微信群好友！</div>
				<div class="find_txt_tip">客户昵称已复制成功，请回到微信页，点击搜索并长按粘贴，若用户不在您的好友列表，可在您分享的微信群中查找！</div>
			</div>
		</van-dialog>


	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

    export default {
        data() {
            return {
                // true false
                find_show: false,
                id: this.getUrlKey('id'),
				type:this.getUrlKey('articleType'),
                isVip: 0,
                list: [],
                loading: false,
                finished: false,
                customerData: {},
                beforeUpdatedAt: 0,
                customerList: [],
                nickname:'',
				articleVideo:{}
            }
        },



		methods: {
			...wjw_com_ts,

            findHer(item) {
                this.nickname = item.nickname;
                this.find_show = true;
            },

            getProfile() {
                let self = this;
                let uri = "account/profile";
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    self.isVip = data.isVip;
                });
            },
            getCustomerCueList() {
                let uri = 'customer-cue/list';
                let self = this;
                axios.post(uri, {beforeUpdatedAt: self.beforeUpdatedAt, articleId: self.id}).then(function (response) {
                    let data = response.data.data;
                    self.customerList = [...self.customerList, ...data.customerCues];
                    self.beforeUpdatedAt = data.beforeUpdatedAt;
                    self.loading = false;
                    data.customerCues.length == 0 && (self.finished = true);
                });
            },
            getArticleVideo() {
			    let self = this;
                let uri = "/api/article/video/show/" + self.id+'?type='+self.type;
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    self.articleVideo = data;
                });
            }

        },
        mounted() {
            this.getProfile();
            //this.getCustomerCueList();
            this.getArticleVideo();
        }

	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}


	.article_box{
		padding: calc(40 / 750 * 100vw);
		border-bottom: calc(16 / 750 * 100vw) solid rgba(247,247,247,1);
	}
	.article_info{}
	.article_title{
		font-size:calc(32 / 750 * 100vw);
		line-height:calc(48 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.article_read{}
	.article_read_icon{
		width: calc(40 / 750 * 100vw);
		height: calc(28 / 750 * 100vw);
		margin-right: calc(16 / 750 * 100vw);
	}
	.article_read_num{
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.article_img{
		width:calc(160 / 750 * 100vw);
		height:calc(160 / 750 * 100vw);
		border-radius: calc(8 / 750 * 100vw);
		margin-left: calc(32 / 750 * 100vw);
	}


	.leads_infos{
		height: calc(172 / 750 * 100vw);
		position: relative;
		border-bottom: calc(16 / 750 * 100vw) solid rgba(247,247,247,1);
	}
	.leads_info{
		width: calc(240 / 750 * 100vw);
		height: 100%;
	}
	.leads_info_num{
		height: calc(104 / 750 * 100vw);
		font-size:calc(48 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,74,90,1);
	}
	.leads_info_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.leads_info_btn{
		min-width:calc(196 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		background:rgba(255,164,74,0.1);
		border-radius:calc(36 / 750 * 100vw) calc(0 / 750 * 100vw) calc(0 / 750 * 100vw) calc(36 / 750 * 100vw);
		position: absolute;
		right: 0;
		bottom: calc(40 / 750 * 100vw);
		padding-left: calc(40 / 750 * 100vw);
	}
	.leads_info_btn_icon{
		margin-right: calc(16 / 750 * 100vw);
		width: calc(36 / 750 * 100vw);
		height: calc(36 / 750 * 100vw);
	}
	.leads_info_btn_txt{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,164,74,1);
		padding-right: calc(24 / 750 * 100vw);
	}

	.leads_list{
		padding: calc(48 / 750 * 100vw) calc(40 / 750 * 100vw);
		overflow: hidden;
	}
	.leads_li{
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);
		padding: 0 calc(32 / 750 * 100vw);
		margin-bottom: calc(32 / 750 * 100vw);
	}
	.leads_li_time{
		padding: calc(32 / 750 * 100vw) 0;
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.leads_li_info_box{
		margin-bottom: calc(50 / 750 * 100vw);
	}
	.leads_li_img{
		width:calc(120 / 750 * 100vw);
		height:calc(120 / 750 * 100vw);
		margin-right: calc(24 / 750 * 100vw);
		border-radius: 50%;
	}
	.leads_li_info{}
	.leads_li_name{
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		margin-bottom: calc(16 / 750 * 100vw);
	}
	.leads_li_tel{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,164,74,1);
		margin-bottom: calc(16 / 750 * 100vw);
	}
	.leads_li_addr{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.leads_li_btn{
		width:calc(144 / 750 * 100vw);
		height:calc(64 / 750 * 100vw);
		background:rgba(255,74,90,1);
		border-radius:calc(8 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.leads_li_article{
		padding-bottom: calc(40 / 750 * 100vw);
		border-bottom: calc(1 / 750 * 100vw) solid rgba(217,217,217,1);
	}
	.leads_li_article_icon{
		width: calc(30 / 750 * 100vw);
		height: calc(36 / 750 * 100vw);
		margin-right: calc(16 / 750 * 100vw);
	}
	.leads_li_article_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.leads_li_article_more{
		width: calc(14 / 750 * 100vw);
		height: calc(24 / 750 * 100vw);
	}
	.leads_li_tips{
		height: calc(88 / 750 * 100vw);
	}
	.leads_li_reads{
		width:calc(200 / 750 * 100vw);
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.leads_li_read_red{
		color: #FF4A5A;
		margin-left: calc(20 / 750 * 100vw);
	}
	.leads_li_num{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.leads_li_num_red{
		color: #FF4A5A;
	}
	.leads_li_tip{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}



	.find_box{
		padding: 0 calc(40 / 750 * 100vw);
	}
	.find_title_tip{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(68,228,202,1);
		margin-bottom: calc(40 / 750 * 100vw);
		margin-top: calc(48 / 750 * 100vw);
	}
	.find_txt{
		font-size:calc(28 / 750 * 100vw);
		line-height:calc(45 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);

		margin-bottom: calc(24 / 750 * 100vw);
	}
	.find_txt_tip{
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(38 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);

		margin-bottom: calc(64 / 750 * 100vw);
	}

</style>
