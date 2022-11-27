<template>
	<div class="page">


		<div class="search_box flex ">
			<div class="search flex flex_align_c">
			    <a-icon class="search_icon" type="search" />
				<input class="search_input bg_tr bd_0 flex_grow" placeholder="搜索公司名称/品牌"  v-model.trim="keyword" />
			</div>
			<div class='search_false no_shrink flex_grow flex_c' @click="jump" data-url="/classify/set">取消</div>
		</div>

		<div class="search_list" v-if="list.length>0">

			<div class="" v-for="(item,index) in list" :key="index" >


				<div class="search_li flex flex_align_c search_li_ok " :class='{search_li_ok: item.isChecked==true}' @click='addCompany(item)'>
					<div class="flex_grow flex flex_align_c  ">
						<div class="search_li_title">{{ item.name }} </div>
						<div class="search_li_tip">
							{{ item.alternativeName.join('、') }}
						</div>
					</div>
					<img src="/img/icon_choose@2x.png" alt="" class="search_li_icon no_shrink">
				</div>

			</div>

		</div>


		<div class="search_list_empty">
			<div>找不到品牌？换个关键词试试！</div>
			<div>如果还找不到，可点击下方按钮，创建品牌！</div>
		</div>

		<div class="classify_submit_btn flex_c mb_0"  @click='createCompany'>创建成我的品牌</div>

		<div class="classify_submit_tips flex_c" @click='jump' data-url='/classify/select'>
			<span class="classify_submit_tip">我没有公司，</span>
			<span class="classify_submit_tip_red">去选行业 >></span>
		</div>



	</div>
</template>

<script>
    import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

    // 节流函数
    const delay = (function() {
        let timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    export default {
        data() {
            return {
                keyword: '',

                search_li_ok: 0,


                list: [],
                loading: false,
                finished: false,
                articleVideoCompany:[]

            };
        },
        watch: {
            //watch title change
            keyword() {
                delay(() => {
                    this.search();
                }, 300);
            },
        },


        methods: {
            ...wjw_com_ts,

            search() {
                let self = this;
                self.list = [];
                //self.beforeId = 0;
                self.getCompanySearch();
            },


            getCompanySearch() {
                let self = this;
				let uri = "article/video/company/search";
				let param = {keyword:this.keyword};
                axios.post(uri,param).then(function (response) {
                    let data = response.data.data;
                    self.list = data;
                });
            },

			createCompany(){
                let self = this;
                if (self.articleVideoCompany.length >= 5) {
                    this.$toast('你最多只能选择5个品牌');
                    return;
                }
             	let uri = 'article/video/company/store';
                let param = {name:this.keyword};
                this.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                axios.post(uri,param).then(function (response) {
                    self.$router.push({ path: '/classify/set', query: {} });
                    self.$toast.clear();
                });
			},
            getArticleVideoCompany() {
                let self = this;
                let uri = "article/video/company";
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    self.articleVideoCompany = data.articleVideoCompanies;
                    //self.companies = data.companies;
                });
            },
            addCompany(item) {
                let self = this;
                if (self.articleVideoCompany.length >= 5) {
                    this.$toast('你最多只能选择5个品牌');
                    return;
                }
                var articleVideoIds = [];
                self.articleVideoCompany.forEach(function (item) {
                    articleVideoIds.push(item);
                });
                if (articleVideoIds.indexOf(item.id) != -1) {
                    self.$router.push({ path: '/classify/set', query: {} });
                    return;
                }
                this.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                let params = {status:1,companyId:item.id};
                axios.post('account/update-company',params).then(function (response) {
                    self.$toast.clear();
                    self.$router.push({ path: '/classify/set', query: {} });
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



	.search_list{
		margin: 0 calc(40 / 750 * 100vw);
	}
	.search_li{
		height: calc(92 / 750 * 100vw);
		border-bottom: calc(1 / 750 * 100vw) solid #E7E7E7;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
	}
	.search_li_title{
		font-size:calc(28 / 750 * 100vw);
		margin-right: calc(20 / 750 * 100vw);
		color: #333333;
	}
	.search_li_tip{
		font-size:calc(24 / 750 * 100vw);
		color:rgba(51,51,51,1);
		color: #CCCCCC;
	}
	.search_li_icon{
		display: none;
		width: calc(32 / 750 * 100vw);
		height: calc(24 / 750 * 100vw);
	}
	.search_li_ok{}
	.search_li_ok
	.search_li_title{
		color: #FF4A5A;
	}
	.search_li_ok
	.search_li_icon{
		display: block;
	}
	.search_list_empty{
		text-align: center;
		padding-top: calc(120 / 750 * 100vw);
		padding-bottom: calc(200 / 750 * 100vw);
		font-size:calc(24 / 750 * 100vw);
		line-height:calc(40 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}



</style>
