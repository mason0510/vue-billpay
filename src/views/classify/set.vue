<template>
	<div class="page">


		<div class="search_box flex "  @click='jump' data-url='/classify/search' >
			<div class="search flex flex_align_c">
			    <a-icon class="search_icon" type="search" />
				<input class="search_input bg_tr bd_0 flex_grow" placeholder="搜索公司名称/品牌"  />
			</div>
			<div class='search_false no_shrink flex_grow flex_c'>取消</div>
		</div>



		<div class="classify_box">
			<div class="classify_title_box flex flex_align_c">
				<div class="classify_title ">我的品牌</div>
				<div class="classify_tip">（多选）</div>
			</div>
			<div class="classify_list flex flex_wrap">
				<div class="classify_li bxz flex_c" v-for="(item,index) in articleVideoCompany" :key='index'>
					<div>{{ item.value }}</div>
					<img src="/img/icon_clear away_red@2x.png" alt="" class="classify_li_icon no_shrink" @click="deleteCompany(item)">
				</div>
			</div>
		</div>

		<div class="recommend_box">
			<div class="classify_title_box">
				<div class="recommend_title classify_title ">热门品牌</div>
			</div>
			<div class="recommend_list flex flex_wrap">
				<div class="recommend_li bxz classify_li flex_c classify_li_no"
					v-for="(item,index) in companies" :key='index' @click="addCompany(item)">{{ item.value }}</div>

			</div>
		</div>

		<!-- <div class="classify_submit_btn flex_c mb_0" @click='jump' data-url='/material'>完成</div> -->
		<div class="classify_submit_btn flex_c mb_0" @click='jump' data-url='/material'>完成</div>

		<div class="classify_submit_tips flex_c" @click='jump' data-url='/classify/select'>
			<span class="classify_submit_tip">我没有公司，</span>
			<span class="classify_submit_tip_red">去选行业 >></span>
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
                articleVideoCompany:[],
                companies:[]
			};
		},



		methods: {
			...wjw_com_ts,

            getArticleVideoCompany() {
                let self = this;
                let uri = "article/video/company";
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    self.articleVideoCompany = data.articleVideoCompanies;
                    self.companies = data.companies;
                });
            },
            deleteCompany(item) {
			    let self = this;
                self.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
			    let params = {status:0,companyId:item.id};
				axios.post('account/update-company',params).then(function (response) {
                    self.articleVideoCompany.splice(self.articleVideoCompany.indexOf(item), 1);
                    self.$toast.clear();
                });
            },
            addCompany(item) {
                let self = this;
                if (self.articleVideoCompany.length >= 5) {
                    this.$toast('你最多只能选择5个品牌');
                    return;
                }
                if (JSON.stringify(self.articleVideoCompany).indexOf(JSON.stringify(item)) != -1) {
                    return;
                }
                this.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                let params = {status:1,companyId:item.id};
                axios.post('account/update-company',params).then(function (response) {
                    self.$toast.clear();
                    self.articleVideoCompany.push(item);
                });
            }
		},
        mounted() {
            this.getArticleVideoCompany();
        }
	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}

	.search_box{
		padding: calc(40 / 750 * 100vw);
	}
	.search{
		width:calc(590 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		background:rgba(247,247,247,1);
		border-radius:calc(40 / 750 * 100vw);

		box-sizing: border-box;
	}
	.search_icon{
		margin: 0 calc(32 / 750 * 100vw);

		width:calc(28 / 750 * 100vw);
		height:calc(28 / 750 * 100vw);
		font-size: calc(28 / 750 * 100vw);
		color:rgba(204,204,204,1);
		font-weight: bold;
	}
	.search_input::placeholder{
		color:rgba(204,204,204,1);
	}
	.search_input{
		font-size: calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		/*color:rgba(204,204,204,1);*/
	}
	.search_false{
		border: 0;
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}



	.classify_box{}
	.classify_title_box{
		padding: calc(40 / 750 * 100vw);
	}
	.classify_title{
		font-size:calc(32 / 750 * 100vw);
		line-height:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.classify_tip{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		margin-left: calc(16 / 750 * 100vw);
	}
	.classify_title_icon{
		width: calc(32 / 750 * 100vw);
		height: calc(32 / 750 * 100vw);
	}
	.classify_list{}
	.classify_li{
		padding: 0 calc(24 / 750 * 100vw);
		height:calc(48 / 750 * 100vw);
		background:rgba(255,74,90,0.1);
		border-radius:calc(32 / 750 * 100vw);
		border:1px solid rgba(255,74,90,1);

		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,74,90,1);

		margin-left: calc(40 / 750 * 100vw);
		margin-bottom: calc(40 / 750 * 100vw);
	}
	.classify_li_icon{
		width: calc(28 / 750 * 100vw);
		height: calc(28 / 750 * 100vw);
		margin-left: calc(24 / 750 * 100vw);
	}
	.classify_li_no{
		background:rgba(247,247,247,1);
		border: none;

		color:rgba(102,102,102,1);
	}

	.recommend_box{}
	.recommend_title{}
	.recommend_list{}
	.recommend_li{}

	.classify_submit_btn{
		margin: calc(40 / 750 * 100vw);
		height:calc(88 / 750 * 100vw);
		background:rgba(255,74,90,1);
		border-radius:calc(8 / 750 * 100vw);

		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);

		margin-top: calc(250 / 750 * 100vw);
		margin-top: calc(100 / 750 * 100vw);

	}
	.classify_submit_btn_fixed{
		position: fixed;
		left: 0;
		width: 100%;
		right: 0;
		width: calc(670 / 750 * 100vw);
		margin: auto;
		bottom: calc(138 / 750 * 100vw);
	}
	.mb_0{
		margin-bottom: 0;
	}

	.classify_submit_tips{
		padding: calc(48 / 750 * 100vw);
		text-align: center;

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color: #999999;

	}
	.classify_submit_tip{}
	.classify_submit_tip_red{
		color: #FF4A5A;

	}



</style>
