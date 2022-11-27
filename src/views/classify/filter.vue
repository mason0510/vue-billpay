<template>
	<div class="page">

		<div class="classify_box">
			<div class="classify_title_box flex">
				<div class="classify_title flex_grow">公司/品牌</div>
				<img src="/img/icon_edit_gray@2x.png" alt="" class="classify_title_icon no_shrink" @click='jump' data-url='/classify/set'>
			</div>
			<div class="classify_list flex flex_wrap">
				<div class="classify_li bxz flex_c " v-for="(item,index) in articleVideoCompany" :key='index' @click='jump' data-url='/classify/set'>{{ item.value }}</div>
			</div>
		</div>

		<div class="recommend_box">
			<div class="classify_title_box">
				<div class="recommend_title classify_title">关注的行业</div>
			</div>
			<div class="recommend_list flex flex_wrap ">
				<div v-for="(item,index) in articleVideoIndustry" class="recommend_li bxz classify_li flex_c"
					 :class="{'classify_li_no':item.isChecked==false}" @click="checkedItem(item)">{{ item.value }}
				</div>
			</div>
		</div>

		<!-- <div class="classify_submit_btn flex_c" @click='jump' data-url='/material'>保存</div> -->
		<div class="classify_submit_btn flex_c" @click='jump' data-url='/material'>保存</div>



	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

	export default {
		data() {
			return {
				search_value: '',
				articleVideoIndustry:[],
                articleVideoCompany:[]
			};
		},



		methods: {
			...wjw_com_ts,

            getArticleVideoIndustry() { //获取文章视频分类
                let self = this;
                let uri = "article/video/industry";
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                   	self.articleVideoIndustry = data;
                });
            },
            checkedItem(item) {
                let isChecked = !item.isChecked;
                let status = isChecked == true ? 1: 0;
                let param = {status:status,industryId:item.id};
                axios.post('account/update-industry',param).then(function (response) {
                    item.isChecked = isChecked;
                });
            },
            getArticleVideoCompany() {
			    let self = this;
                let uri = "article/video/company";
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    self.articleVideoCompany = data.articleVideoCompanies;
                });
            }
        },
        mounted() {
            this.getArticleVideoIndustry();
            this.getArticleVideoCompany();
        }
    }
</script>

<style scoped >


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



</style>
