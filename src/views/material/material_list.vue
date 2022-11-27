<template>
	<div class="page">

		<div class="fixed_btns">
			<div class="fixed_btn_box flex flex_align_c">
				<img src="/img/icon_update@2x.png" alt="" class="fixed_btn_icon no_shrink">
				<div class="fixed_btn_txt" @click="nextBatch">换一批</div>
			</div>
			<div class="fixed_btn_box flex flex_align_c" @click="jump2" data-url="/material/add" v-if='menu_index==0'>
				<img src="/img/icon_add@2x.png" alt="" class="fixed_btn_icon no_shrink">
				<div class="fixed_btn_txt">添加文章</div>
			</div>
			<div class="fixed_btn_box flex flex_align_c" @click="jump2" data-url="/material/add" v-if='menu_index==1'>
				<img src="/img/icon_add@2x.png" alt="" class="fixed_btn_icon no_shrink">
				<div class="fixed_btn_txt">添加视频</div>
			</div>
		</div>


		<div class="head flex flex_align_c">
			<!-- @change='articleBefore=videoBefore="",get_list()' -->
			<van-tabs class='menu_bar flex_grow'
				v-model="menu_index"
				@change='sort_index=0, change_get_list()'
				title-active-color='#333333'
				title-inactive-color='#999999'
				background='transparent'
				lineWidth='calc(32 / 750 * 100vw)'
				lineHeight='calc(4 / 750 * 100vw)'
				color='#FF4A5A'
				:border='false'
				>
				<!--

					:title-style='
						(
						menu_index==index
						?
							"font-size:calc(32 / 750 * 100vw);color:rgba(51,51,51,1);font-weight:500;"
						:
							""
						)
						+
						"font-family:PingFangSC-Medium,PingFang SC;"
					'
				 -->
				<van-tab class='menu_item'
					v-for="(menu_item,index) in menu"
					:key='index+"menu"'
					:title="menu_item"
					:class='{menu_item_now:menu_index==index}'
				></van-tab>
			</van-tabs>

			<!-- <div class="head_btns no_shrink flex flex_jc_e"> -->
				<a-button class='search_btn no_shrink flex flex_align_c' icon="search" @click="jump2" data-url="/material/search">搜索</a-button>

				<!--
				<div class="search_btn no_shrink flex flex_align_c search_btn2">
					<a-icon type="search" class="search_btn_icon" />
					<span class="search_btn_txt">搜索</span>
				</div>
				 -->



				<a-button class='edit_btn no_shrink' type="danger" @click="jump2" data-url="/classify/set">设置品牌</a-button>
			<!-- </div> -->

		</div>


		<div class="sort_box flex flex_jc_b">
			<!-- flex_grow  -->
			<van-tabs class="sort_bar flex_grow"
				v-model="sort_index"
				@change='change_get_list'
				sticky
				animated
				swipeable
				title-active-color='#FF4A5A'
				title-inactive-color='#666666'
				background='transparent'
				:border='false'
				lineHeight='0'
				>
				<!-- van-tab -->

				<!--
				<van-tab  key=''>
					<template #title><div class='sort_item'>推荐</div></template>
				</van-tab>
				-->

				<!-- title-style='color: blue;' 自定义标题样式 -->
				<!-- <van-tab  v-for="(sort_item,index) in sort" :key='index' > -->
				<van-tab class="sort_van_tab"  v-for="(sort_item,index) in (sort=(menu_index==0?article_sort:video_sort),sort)" :key='index+"sort"'  >
				    <template class="sort_van_tab_template" #title><div class='sort_item sort_van_tab_template_div' :class='{sort_item_now:sort_index==index}'>{{sort_item.value}}</div></template>
				</van-tab>
				<!-- <div class='sort_item' v-for="(sort_item,index) in sort" :key='index' :title="sort_item"></div> -->
			</van-tabs>


			<a-icon class="sort_more no_shrink flex_c" type="menu" @click="jump2" data-url="/classify" />
		</div>

		<van-list
			v-if='menu_index==0'
			class="new_list"
			v-model="article_list_loading"
			:finished="article_list_finished"
			finished-text="没有更多了"
			@load="get_article_list"
			>

			<div class="new_li flex flex flex_jc_b" v-for="(news,index) in article_list" :key='index+"article_list"' @click.stop="jumpArticle(news.id)" data-url="/article" :data-id='news.id'>
				<div class="new_info flex_grow flex flex_column">
					<!-- <div class="new_title txt_over_ell">{{news.title}}</div> -->
					<!-- flex_grow -->
					<div class="new_txt txt_over_ell_2">{{news.title}}</div>
					<div class="flex_grow"></div>
					<div class="new_tips">
						<img src="@/../public/img/share.png" alt="" class="new_icon">
						<span class="new_num">{{news.shareNum}}人分享</span>
					</div>
				</div>
				<img class="news_img no_shrink" :src="news.imageUrl" />
			</div>
		</van-list>

		<!-- flex flex_wrap -->
		<van-list
			v-if='menu_index==1'
			class="new_list flex flex_wrap "
			v-model="video_list_loading"
			:finished="video_list_finished"
			finished-text="没有更多了"
			@load="get_video_list"
			>

			<!-- ib -->
			<div class="new_li video_li flex flex_column  " v-for="(video,index) in video_list" :key='index+"video_list"' @click.stop="jumpVideo(video.id)"  :data-id='video.id'>

				<div class="relative   no_shrink ">
					<img class="news_img no_shrink video_img" :src="video.imageUrl" />
					<div class=" play_box  ">
						<img src="@/../public/img/icon_play_white@2x.png" alt="" class="play_icon play_icon2 ">
					</div>
				</div>
				<!-- <div class="new_title txt_over_ell">{{news.title}}</div> -->
				<!-- flex_grow -->
				<div class="new_info video_info flex_grow flex flex_column ">
					<div class="new_txt txt_over_ell_3 video_txt">{{video.title}}</div>
					<div class="flex_grow"></div>
					<div class="new_tips video_tips">
						<img src="@/../public/img/share.png" alt="" class="new_icon">
						<span class="new_num">{{ video.shareNum }}人分享</span>
					</div>
				</div>
			</div>
		</van-list>

	</div>
</template>
<!--
<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";

	@Component
	export default class About extends Vue {
		// data
		data() {
			return {
				menu: [
					'文章',
					'视频',
				],

				menu_index: 1,
				sort: [
					'推荐',
					'中国平安',
					'中国平安',
					'中国平安',
					'中国平安',
				],
				sort_index: 1,

				list_loading: false,
				list_finished: true,
				list: [
					//
					{
						title: '家具企业工伤风险高',
						txt: '43岁的张文军本是东莞市厚镇街的一名家具厂工人，2016年，在厂里操作机器时，他被刀片43岁的张文军本是东莞市厚镇街的一名家具厂工人',
						img: '//webh5.wangjiangwei.top/logo/default.png',
					},
				],

			};
		}


		// methods
		get_list() {
			return false
		}


	}
</script>
 -->

<script>
	 import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';		//引入axios

	export default {
		// data
		data() {
			return {
				menu: [
					'文章',
					'视频',
				],
                menu_index: this.getUrlKey('menu_index') || 0,
                sort: [],
                article_sort: [],
                video_sort: [],
                sort_index: 0,

                companyId: '',
                industryId: '',
                article_list_loading: false,
                articleBefore:'',
                article_list_finished: false,
                article_list:[],

                video_list_loading: false,
                videoBefore:'',
                video_list_finished: false,
                video_list:[],
                shareAccounts:[],
			};
		},
        beforeCreate: function () {
		    let self = this;
            var uri = '/api/share/account';
            axios.get(uri).then(function (response) {
                let data = response.data.data;
                self.shareAccounts = data;
            });
		},
		created(){
			// this.get_list();
		},

        mounted() {
            this.get_sort_list();
        },



		// 方法
        methods: {
            ...wjw_com_ts,

            jump2(e) {
                console.log('页面跳转');
                this.jump(e);
            },
            nextBatch(){
                if (this.menu[this.menu_index] == '文章') {
                    this.article_list = [];
                    this.get_article_list();
                }
                if (this.menu[this.menu_index] == '视频') {
                    this.video_list = [];
                    this.get_video_list();
                }
			},
            get_sort_list() {
                var that = this;
                axios.get('article/video/tabs').then(function (response) {
                    console.log(response.data.data);
                    var data = response.data.data || {};
                    data.companyTabs.map(item => item.type = 'company');
                    data.articleCategoryTabs.map(item => item.type = 'artic');
                    data.videoCategoryTabs.map(item => item.type = 'video');

                    that.article_sort = [
                        //
                        {value: '推荐',},
                        ...data.companyTabs,
                        ...data.articleCategoryTabs,
                    ];
                    that.video_sort = [
                        //
                        {value: '推荐',},
                        ...data.companyTabs,
                        ...data.videoCategoryTabs,
                    ];

                    that.get_list();

                });
            },


            change_get_list() {
                console.log('切换分类');
                /*
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                */
                /*
                    menu: [
                        '文章',
                        '视频',
                    ],
                    menu_index: 0,
                */
                if (this.menu[this.menu_index] == '文章') {
                    this.articleBefore = '';
                    this.article_list_finished = false;
                    this.article_list = [];
                    this.article_list_loading = true;
                    this.get_article_list();
                }
                if (this.menu[this.menu_index] == '视频') {
                    this.videoBefore = '';
                    this.video_list_finished = false;
                    this.video_list = [];
                    this.video_list_loading = true;
                    this.get_video_list();
                }

            },


            get_list() {
                console.log('获取分类成功后, 打开列表加载');
                var that = this;
                /*if (this.menu[this.menu_index] == '文章'){
                    this.get_article_list();
				}
                if (this.menu[this.menu_index] == '视频') {
                    this.get_video_list();
                }*/
            },

            // getList
            get_article_list() {
                let self = this;
                // let params = {articleBefore:self.articleBefore,companyId:self.companyId,industryId:self.industryId};
                let params = {articleBefore: self.articleBefore,};
                var sort_obj = this.sort[this.sort_index] || {};
                if (sort_obj.type == 'artic' || sort_obj.type == 'video') {
                    params.industryId = sort_obj.id;
                }
                if (sort_obj.type == 'company') {
                    params.companyId = sort_obj.id;
                }

                axios.post('article/list', params).then(function (response) {
                    let data = response.data.data;
                    self.article_list = [...self.article_list, ...data.articles];
                    self.articleBefore = data.articleBefore;
                    self.article_list_loading = false;
                    data.articles.length == 0 && (self.article_list_finished = true);
                });
            },
            get_video_list() {
                let self = this;
                // let params = {videoBefore:self.videoBefore,companyId:self.companyId,industryId:self.industryId};
                let params = {videoBefore: self.videoBefore,};
                var sort_obj = this.sort[this.sort_index] || {};
                if (sort_obj.type == 'artic' || sort_obj.type == 'video') {
                    params.industryId = sort_obj.id;
                }
                if (sort_obj.type == 'company') {
                    params.companyId = sort_obj.id;
                }

                axios.post('video/list', params).then(function (response) {
                    let data = response.data.data;
                    // self.video_list = data.videos;
                    self.video_list = [...self.video_list, ...data.videos];
                    self.videoBefore = data.videoBefore;
                    self.video_list_loading = false;
                    data.videos.length == 0 && (self.video_list_finished = true);
                });
            },
        },

	}
</script>

<style scoped >
	.page{
		/*background: #EEF0F4;*/
	}


	.fixed_btns{
		position: fixed;
		z-index: 2;
		bottom: 0;
		right: 0;
		margin-right: calc(52 / 750 * 100vw);
		margin-bottom: calc(138 / 750 * 100vw);
	}
	.fixed_btn_box{
		width:calc(208 / 750 * 100vw);
		box-sizing: border-box;
		padding-left: calc(18 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		background:rgba(74,90,255,1);
		border-radius:calc(36 / 750 * 100vw);
		margin-bottom: calc(32 / 750 * 100vw);
	}
	.fixed_btn_icon{
		width: calc(44 / 750 * 100vw);
		height: calc(44 / 750 * 100vw);
		margin-right: calc(16 / 750 * 100vw);
	}
	.fixed_btn_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:calc(28 / 750 * 100vw);
	}

	.head{

	}
	.menu_bar{

	}
	.menu_bar >>> .van-tabs__nav{
		padding: 0 calc(20 / 750 * 100vw);
		margin-left: calc(40 / 750 * 100vw);
		margin-right: calc(64 / 750 * 100vw);
	}
	.menu_item{

	}
	.menu_bar >>> .van-tab{
		flex-basis: auto !important;
		padding: 0 ;
	}
	.menu_bar >>> .van-tab+.van-tab{
		margin-left: calc(64 / 750 * 100vw);
	}
	.menu_bar >>> [aria-selected="true"] .van-tab__text{
		/*width:calc(72 / 750 * 100vw);*/
		/*height:calc(36 / 750 * 100vw);*/
		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.menu_item_now{
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		/*color: yellow;*/
	}
	.menu_bar >>> .van-tabs__line{
		bottom: 0;
	}


	.head_btns{

	}
	.search_btn{
		width:calc(222 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		background:rgba(247,247,247,1);
		border-radius:calc(40 / 750 * 100vw);
		margin-right: calc(32 / 750 * 100vw);

		box-sizing: border-box;
		border: none;
		color: #CCCCCC;
		padding: 0;
		padding-left: calc(32 / 750 * 100vw);
	}
	.search_btn >>> .anticon svg{
		vertical-align: top;
	}
	.search_btn2{
		text-align: left;
	}
	.search_btn_icon{
		width:calc(28 / 750 * 100vw);
		height:calc(28 / 750 * 100vw);
		color:rgba(204,204,204,1);
		margin-right: calc(24 / 750 * 100vw);
	}
	.search_btn_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(204,204,204,1);
	}

	.edit_btn{
		margin-right: calc(32 / 750 * 100vw);
		width:calc(160 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		background:rgba(255,74,90,1);
		border-radius:calc(40 / 750 * 100vw);
		border:calc(1 / 750 * 100vw) solid rgba(255,74,90,1);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);

		padding: 0;

	}
	.sort_box{
		/*overflow: scroll;*/
	}
	.sort_bar{
		width: 0;
	}
	.sort_bar >>> .van-tabs__nav{
		padding: 0 calc(20 / 750 * 100vw);
	}
	.sort_bar >>> .van-tab{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;

		flex-basis: auto !important;
		padding: 0 calc(20 / 750 * 100vw);
	}
	.sort_item{
		/*width:calc(112 / 750 * 100vw);*/
		/*padding: 0 calc(20 / 750 * 100vw);*/
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
	}
	.sort_item_now{}
	.sort_more{
		padding: 0 calc(40 / 750 * 100vw);
	}

	/* new_list */
	.new_list {}

	.new_li {
		padding: calc(56 / 750 * 100vw) calc(40 / 750 * 100vw) calc(24 / 750 * 100vw);
		border-top: calc(1 / 750 * 100vw) solid rgba(245, 245, 245, 1);
	}

	.new_info {
		/*display: inline-block;*/
		width:calc(398 / 750 * 100vw);
		/*height: calc(174 / 750 * 100vw);*/
		vertical-align: top;
	}

	.new_title {
		font-size: calc(28 / 750 * 100vw);
		line-height: 1;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(22, 22, 22, 1);

		margin-bottom: calc(27 / 750 * 100vw);
	}

	.new_txt {

		/*
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		*/

		/*height:calc(96 / 750 * 100vw);*/
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(48 / 750 * 100vw);
	}
	.new_tips{

	}
	.new_icon{
		width: calc(28 / 750 * 100vw);
		height: calc(28 / 750 * 100vw);
		margin-right: calc(20 / 750 * 100vw);
	}
	.del_icon{
		width: calc(22 / 750 * 100vw);
		height: calc(24 / 750 * 100vw);
		margin-left: calc(20 / 750 * 100vw);
	}
	.new_num{
		height:calc(24 / 750 * 100vw);
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:calc(24 / 750 * 100vw);
		line-height:calc(28 / 750 * 100vw);
		vertical-align: middle;
	}

	.news_img {
		width: calc(240 / 750 * 100vw);
		height: calc(160 / 750 * 100vw);
		/*vertical-align: top;*/
		margin-left: calc(32 / 750 * 100vw);
		object-fit: cover;
	}

	.video_li{
		overflow: hidden;
		padding: 0;
		width:calc(319 / 750 * 100vw);
		/*height:calc(474 / 750 * 100vw);*/
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);
		margin-top: calc(32 / 750 * 100vw);
		margin-left: calc(32 / 750 * 100vw);
	}
	.video_img{
		margin-left: 0;
		width: 100%;
		/*width:calc(319 / 750 * 100vw);*/
		height:calc(240 / 750 * 100vw);
	}
	.video_info{
		margin: calc(24 / 750 * 100vw);
		width: auto;
	}
	.video_txt{
		margin-bottom: calc(32 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(42 / 750 * 100vw);

	}
	.video_tips{}



</style>
