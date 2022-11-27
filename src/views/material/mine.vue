<template>
	<div class="page">

		<!-- flex_grow  -->
		<van-tabs class="sort_bar flex_grow"
				  v-model="tabIndex"
				  sticky
				  animated
				  swipeable
				  title-active-color='#FF4A5A'
				  title-inactive-color='#666666'
				  background='transparent'
				  @change='changeTab'

				lineWidth='calc(32 / 750 * 100vw)'
		>
			<!-- van-tab -->
			<van-tab v-for="(item,index) in sort" :key='index'>
				<template #title>
					<div class='sort_item'>{{ item }}</div>
				</template>
			</van-tab>
		</van-tabs>

		<van-list
			class="new_list"
			v-model="list_loading"
			:finished="list_finished"
			finished-text="只有这么多哦！"
			@load="getAccountArticleVideo"
		>

			<div class="new_li flex flex flex_jc_b" v-for="(item,index) in list" :key='index' @click="jump" :data-url="item.type==1 ? '/article': '/article/video_info' " :data-id='item.articleVideoId'>
				<div class="new_info flex_grow flex flex_column">
					<!-- <div class="new_title txt_over_ell">{{news.title}}</div> -->
					<!-- flex_grow -->
					<div class="new_txt ">{{ item.title }}</div>
					<div class="new_tips flex flex_align_c ">
						<span class="new_num">2020-04-02 15:28</span>
						<img src="/img/icon_delete_gray@2x.png" alt="" class="del_icon" @click.stop='deleteItem(item)'>
					</div>
				</div>

				<div class="relative no_shrink" v-if="item.type==2">
					<img class="news_img no_shrink" :src="item.imageUrl" />
					<div class=" play_box">
						<img src="@/../public/img/icon_play_white@2x.png" alt="" class="play_icon play_icon2">
					</div>
				</div>
				<img v-else class="news_img no_shrink" :src="item.imageUrl" />
			</div>

			<!--<div class="new_li flex flex flex_jc_b" v-for="(news,index) in list" :key='index+"video_list"' @click="jump" data-url="/article" :data-id='news.informationId' >
				<div class="new_info flex_grow flex flex_column">
					&lt;!&ndash; <div class="new_title txt_over_ell">{{news.title}}</div> &ndash;&gt;
					&lt;!&ndash; flex_grow &ndash;&gt;
					<div class="new_txt ">{{news.txt}}</div>
					<div class="new_tips flex flex_align_c ">
						<span class="new_num">2020-04-02 15:28</span>
						<img src="/img/icon_delete_gray@2x.png" alt="" class="del_icon" @click.stop='del_material'>
					</div>
				</div>
				<div class="relative   no_shrink ">
					<img class="news_img no_shrink" :src="news.img" />
					<div class=" play_box  ">
						<img src="@/../public/img/icon_play_white@2x.png" alt="" class="play_icon play_icon2">
					</div>
				</div>
			</div>-->


		</van-list>

	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';


	export default {
		data() {
			return {
				search_value: '',
				sort: [
                    '创建的',
                    '复制的',
                    '分享的',
				],
				tabIndex:0,
                formType: 1,

				list_loading: false,
				list_finished: false,
				list: [],
                beforeCreatedAt:0
			};
		},



		methods: {
			...wjw_com_ts,


            changeTab() { //却换选择
                //this.formType = this.tabIndex + 1;
                this.formType = this.tabIndex == 2 ?  this.tabIndex+2 : this.tabIndex + 1;
                this.beforeCreatedAt = 0;
                this.list = [];
                this.list_finished = false;
            },
            getAccountArticleVideo() {
                let self = this;
				let uri = "account/article/video";
				let params = {formType:self.formType,beforeCreatedAt:self.beforeCreatedAt};
                axios.post(uri, params).then(function (response) {
                    let data = response.data.data;
                    self.list = [...self.list,...data.articleVideos];
                    self.beforeCreatedAt = data.beforeCreatedAt;
                    self.list_loading = false;
                    data.articleVideos.length==0 && (self.list_finished=true);
                });

            },
            deleteItem(item) {
			    let self = this;
		    	this.$dialog.confirm({
		    	  // title: '标题',
		    	  message: '确定删除该文章？\n同时删除分享记录吗？',
		    	}).then(() => {
                      self.deleteRequire(item);
		    	  })
		    	  .catch(() => {
		    	    // on cancel
		    	  });
		    },
            deleteRequire(item) {
			    let self = this;
                let uri = "account/article/video/" + item.articleVideoId;
                axios.delete(uri).then(function (response) {
                    self.list.splice(self.list.indexOf(item), 1);
                    self.$toast.success("删除成功！");
                });
            }
		},


	}
</script>

<style scoped >
	.page{
		/*background: #EEF0F4;*/
	}

	.head{

	}
	.menu_bar{

	}
	.menu_item{

	}
	.menu_bar [aria-selected="true"] .van-tab__text{
		/*width:calc(72 / 750 * 100vw);*/
		/*height:calc(36 / 750 * 100vw);*/
		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.head_btns{

	}
	.search_btn{
		width:calc(222 / 750 * 100vw);
		height:calc(72 / 750 * 100vw);
		background:rgba(247,247,247,1);
		border-radius:calc(40 / 750 * 100vw);
		margin-right: calc(32 / 750 * 100vw);
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
		/*width: 0;*/
	}
	.sort_item{
		/*width:calc(112 / 750 * 100vw);*/
		/*padding: 0 calc(20 / 750 * 100vw);*/
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
	}
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
		display: inline-block;
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

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;

		/*height:calc(96 / 750 * 100vw);*/
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		/*font-weight: bold;*/
		color:rgba(51,51,51,1);
		line-height:calc(48 / 750 * 100vw);
	}
	.new_tips{
		margin-top: calc(32 / 750 * 100vw);

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
	}

	.news_img {
		width: calc(240 / 750 * 100vw);
		height: calc(160 / 750 * 100vw);
		/*vertical-align: top;*/
		margin-left: calc(32 / 750 * 100vw);
	}
</style>
