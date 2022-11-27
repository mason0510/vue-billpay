<template>
	<div class="page" v-wechat-title="title">

		<div class="fixed_btns z_1">
			<div class="fixed_btn_box flex flex_align_c " @click='share_txt'>
				<img src="/img/朋友圈@2x.png" alt="" class="fixed_btn_icon no_shrink">
				<div class="fixed_btn_txt">分享配文</div>
			</div>
			<div class="fixed_btn_box flex flex_align_c" @click="jump" data-url="/article/edit" :data-id='article.id'  v-if='is_self==true'>
				<img src="/img/icon_amend@2x.png" alt="" class="fixed_btn_icon no_shrink">
				<div class="fixed_btn_txt">修改文章</div>
			</div>
		</div>





		<!-- 弹出层 round -->
			<van-popup v-model="edit_wx_popup_show" class='add_wx_popup'   >
				<div class="add_wx_box ta_c">
					<img  src="/img/icon_complete@2x.png" alt="" class="edit_wx_img no_shrink">
					<div class="edit_wx_tip">更换成功</div>
					<div class="add_wx_tip">扫码领取带有您名片的文章</div>
					<img v-if="qrCode.url" :src="qrCode.url" alt="" class="add_wx_img no_shrink mt0">
					<img v-else src="/img/WechatIMG2@2x.png" alt="" class="add_wx_img no_shrink mt0">
					<div class="add_wx_tip">精准锁定客户，月开10单！</div>
				</div>
			</van-popup>

			<van-popup v-model="add_wx_popup_show" class='add_wx_popup ta_c'>
				<div class="add_wx_box">
					<img v-if="userInfo.qrCode" :src="userInfo.qrCode" alt="" class="add_wx_img no_shrink">
					<img v-else src="/img/WechatIMG2@2x.png" alt="" class="add_wx_img no_shrink">
					<div class="add_wx_tip">长按二维码添加我为好友</div>
				</div>
			</van-popup>


			<van-popup v-model="info_empty_popup_show" class='info_empty_popup add_wx_popup ta_c'>


				<div class="info_empty_box lh1" v-if='!info_empty_list_box'>
					<div class="info_empty_title ta_c">完善您的信息，让客户找到你</div>
					<div class="info_empty_list">
						<div class="info_empty_li flex" @click='info_empty_list_box=true'>
							<input type="text" class="info_empty_li_input flex_grow"
								   :value="userInfo.companyTags.length>0 ? userInfo.companyTags[0].value : '您的品牌'" disabled >
							<img src="/img/icons/icon_next.png" alt="" class="info_empty_li_icon no_shrink flex_self_c">
						</div>
						<div class="info_empty_li flex">
							<input type="text" class="info_empty_li_input flex_grow" v-model="userInfo.mobile" placeholder="手机号码">
						</div>

					</div>

					<div class="info_empty_btns flex">
						<div class="info_empty_btn info_empty_btn_false flex_grow flex_c" @click="info_empty_popup_show=false">取消</div>
						<div class="info_empty_btn info_empty_btn_ok flex_grow flex_c" @click.stop="submitMobile">保存</div>
					</div>
				</div>


				<div class="info_empty_list_box" v-if='info_empty_list_box'>
					<div class="search_box search_box1 flex ">
						<div class="search search1 search flex flex_align_c">
						    <a-icon class="search_icon" type="search" />
							<input class="search_input bg_tr bd_0 flex_grow" placeholder="搜索公司名称/品牌"  v-model.trim="keyword" />
						</div>
					</div>

					<!-- v-if="list.length>0" -->
					<div class="search_list search_list1" >

						<div class="" v-for="(item,index) in list" :key="index" >


							<div class="search_li flex flex_align_c search_li_ok " :class='{search_li_ok: item.isChecked==true}' @click='addCompany(item)'>
								<div class="flex_grow flex flex_align_c  ">
									<div class="search_li_title">{{ item.name }}</div>
									<div class="search_li_tip">
										{{ item.alternativeName.join('、') }}
									</div>
								</div>
								<img src="/img/icon_choose@2x.png" alt="" class="search_li_icon no_shrink">
							</div>

						</div>

					</div>

					<div class="classify_submit_btn classify_submit_btn1 flex_c mt0"  @click='createCompany'>创建成我的品牌</div>

				</div>
			</van-popup>


		<!-- 弹出层 round -end --------------------------------------- -->


		<div class="title mb1">{{ article.title }}</div>
		<div class="auth_infos flex flex_align_c mb1">
			<img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" alt="" class="auth_port">
			<img v-else src="@/../public/img/default.png" alt="" class="auth_port">
			<div class="auth_info flex_grow">
				<div class="auth_name">{{ userInfo.nickname }}</div>
				<div class="auth_tel">{{ userInfo.mobile }}</div>
			</div>
			<div class="auth_change_btn no_shrink flex_c"  v-if='is_self==true' @click='jump' data-url='/mine/set' >修改名片</div>
			<div class="auth_change_btn no_shrink flex_c" @click='changeToMe()' v-else >换成我的</div>
			<!--
			-->

		</div>


		<!--
		<div>传参:</div>
		<div>params:{{this.$route.params}}</div>
		<div>query:{{this.$route.query}} 获取到get参数</div>
		-->





		<!-- <video src="" class="article_video mb1">保险怎么买？教你一招</video> -->
		<!--
		 -->
		<div class="article_video mb1" v-if="false">
			<div class="article_video_title">保险怎么买？教你一招</div>
			<div class="article_video_info flex flex_grow">
				<div class="article_video_progress_box flex_grow">
					<!--
					<van-progress
						class="article_video_progress "
						:percentage="50"
						inactive
						stroke-width="3"
					/>
					-->
					<div class="article_video_progress_line">
						<div class="article_video_progress_point"></div>
					</div>

					<div class="article_video_progress_time flex flex_jc_b">
						<div class="article_video_progress_time_start">00:00</div>
						<div class="article_video_progress_time_end">15:00</div>
					</div>
				</div>
				<!-- flex_self_c -->
				<img src="@/../public/img/icon_play_red @2x.png" alt="" class="article_video_icon no_shrink " />
			</div>
		</div>


		<!-- flex -->
		<div class="article_content_wrap ">
			<!-- article_content article_content_box article-content -->
			<div class="article-content mb2" @click="clockAudio" v-html="article.content" v-cloak>
			</div>
		</div>




		<div class="flex_c mb2"  @click="jump" data-url="/article/complaint"  >
			<div class='complaint_btn flex_c'>
				<a-icon type="warning" class='complaint_icon' />
				投诉
			</div>
		</div>
		<div class="auth_infos_big mb2">
			<div class=" flex flex_align_c mb1">
				<img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" alt="" class="auth_port">
				<img v-else src="@/../public/img/default.png" alt="" class="auth_port">
				<div class="auth_info flex_grow">
					<div class="auth_name">{{ userInfo.nickname }}</div>
					<div class="auth_tel" v-if="defaultCompanyName">
						{{ defaultCompanyName }}
					</div>
				</div>
				<van-icon name="phone" class="auth_tel_btn no_shrink" @click='call_tel' />
				<a-icon type="wechat" class="auth_wx_btn no_shrink" @click='call_wx' />
			</div>
			<div class="auth_tip">
				{{ userInfo.signature }}
			</div>
		</div>
		<div class="products_box" v-if="goodsList.length>0">
			<div class="products_head flex mb1">
				<div class="products_title flex_grow">热门产品</div>
				<div class="products_more" @click="jump" data-url="/mine/product">更多</div>
			</div>
			<!--
			<div class="product_list flex">
				<div class="product_box" v-for="(goods,index) in goodsList">
					<div class="product_title">{{ goods.companyName }}</div>
					<div class="product_tip">{{ goods.name }}</div>
					<div class="product_prices">
						<span class="product_num">{{ goods.price }}</span> 元起
					</div>
				</div>
			</div>

			<div class="product_list flex flex_wrap ">
				<div class="product_box"
					v-for="(item,index) in 15" :key='index'
					v-if='index<2'
					>
					<img src="/img/default.png" alt="" class="product_li_img no_shrink">
					<div class="product_li_info">
						<div class="product_li_name">平安福满分</div>
						<div class="product_li_price">10562</div>
					</div>
				</div>
			</div>
			 -->

			<div class="product_list flex flex_wrap ">
				<div class="product_box"
					 v-for="(goods,index) in goodsList">
					<img v-if="goods.imageUrl" :src="goods.imageUrl" alt="" class="product_li_img no_shrink">
					<img v-else src="/img/default.png" alt="" class="product_li_img no_shrink">
					<div class="product_li_info">
						<div class="product_li_name">{{ goods.name }}</div>
						<div class="product_li_price">{{ goods.price }}</div>
					</div>
				</div>
			</div>



		</div>

		<div class="global_btn flex_c op_0" style="width: 0;" >换成我的</div>
		<!--  v-if='types!="member"' @click='types=="member"?"":jump($event)' data-url='/Leads/open' -->
		<div class="global_btn flex_c fixed_btn" v-if='is_self==false'  @click='changeToMe()' >换成我的</div>

	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';
    require('@/plugins/weixinAudio.js');

    var objects = [];

    // 节流函数
    const delay = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
	export default {
		data() {
			return {
				// true
                edit_wx_popup_show: false,
                add_wx_popup_show: false,
                add_wx_t_popup_show: false,
                info_empty_popup_show: false,
                info_empty_list_box: false,
                is_self: false, //是否是自己的文章
                types: this.$route.query.types || 'else',
                id: this.getUrlKey('id') || '5ee25af1f636391a6e4a05e5',
                article: {},
                userInfo: {companyTags: []},
                goodsList: [],
                timestamp: (new Date()).valueOf(),
                qrCode: {},
                keyword: '',
                search_li_ok: 0,
                list: [],
                loading: false,
                finished: false,
                articleVideoCompany:[],
                shareAccounts:[],
				title:"",
				defaultCompanyName:'',
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
		mounted: function () {
			console.log('mounted');
			this.getDetail();
		},

		methods: {
			...wjw_com_ts,
		    get_list() {
		        return false
		    },
            changeToMe() {
                var self = this;

                self.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });

                var qrCodeUri = "/api/article/video/qrCode/"+self.article.shareId+'/'+self.userInfo.appid;

                axios.get(qrCodeUri).then(function (response) {
                    console.log(response.data.data);
                    var data = response.data.data;
                    /*if (data.userId) {
                        self.changeToMeRequire();
                    }else{*/
                        self.qrCode = data;
                        self.edit_wx_popup_show = true;
                    //}
                });

            },
            changeToMeRequire() {
                var self = this;
                var uri = "article/video/change-me/"+self.article.id;
                axios.get(uri).then(function (response) {
                    var id = response.data.data;
                    var  param = {'id':id};
                    self.$toast.clear();
                    self.$router.push({ path: '/article', query: param });
                });
            },
            getDetail() {
                var self = this;

				var uri = "/api/article/show/"+self.id;
                axios.get(uri).then(function (response) {
                    var data = response.data.data;
                    var article = data;
                    if (article.tutId == article.loginId) {
                        self.is_self = true;
                        self.edit_wx_popup_show = false;
                    } else {
                        self.is_self = false;
                        self.edit_wx_popup_show = false;
                    }

					self.article = article;

					self.title = article.title;

                    self.getTutInfo();

                    //初始化分享
                    self.getSign();

                    self.getArticleGoods();
                    if (self.is_self) {
                        self.getArticleVideoCompany();
                    }
                });
            },
            getTutInfo() {
                var self = this;
                //获取推广者信息
                var uri = "/api/account/profile/"+self.article.tutId;
                axios.get(uri).then(function (response) {
                    var data = response.data.data;
                    var userInfo = data;
                    self.userInfo = userInfo;
                    if (self.is_self == true && (!userInfo.mobile)){
                        self.info_empty_popup_show = true;
					}

					//下面代码是实现，用户默认品牌
					var followCompany = self.userInfo.companyTags;
                    if (followCompany.length== 0){
						self.defaultCompanyName = '';
					}else{
                        var articleCompany = self.article.companyTags;
                        //文章Id，为空时
                        if (articleCompany.length==0){
                            self.defaultCompanyName = followCompany[0].value;
                            return;
						}
                        var followIds = [];
                        followCompany.forEach((item) => {
                            followIds.push(item.id)
                        });
                        let a = new Set(followIds);
                        let b = new Set(articleCompany);
                        var arr = Array.from(new Set([...a].filter(x => b.has(x))));
                        if (arr.length==0){
                            self.defaultCompanyName = followCompany[0].value;
                            return;
						}
						var defaultId = arr[0];
                        var index= followCompany.findIndex(item=>{
                            if(item.id==defaultId){
                                return true
                            }
                        });
                        console.log(index);
                        console.log(followCompany[index]);
                        self.defaultCompanyName = followCompany[index].value;
					}
                });
            },
            getArticleGoods() {
                var self = this;
                var uri = "/api/article/goods/"+self.article.tutId;
                if (self.article.companyTags.length > 0) {
                    var params = {companyIds: self.article.companyTags};
                    axios.post(uri, params).then(function (response) {
                        var data = response.data.data;
                        self.goodsList = data;
                    });
                }
            },
            createCustomer() {
                var self = this;
                var form = self.getUrlKey('from');
                var postData = {articleId:self.article.id,spreadId:self.article.spreadId,
                    authorId:self.article.tutId,userId:self.article.loginId,form:form,type:1};
                var url = '/api/customer-cue/store';
                axios.post(url,postData)
                    .then(function (response) {
                        var data = response.data;

                        self.doTime(self.article.spreadId,self.article.id,self.timestamp);
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
            },
            //更新访客浏览时长


		    call_tel() {

                var self = this;
			    if (!this.userInfo.mobile){
                    this.$dialog.alert({
                        message: '该用户还没有添加手机号！',
                        confirmButtonText: '知道啦',
                    }).then(() => {
                        if (self.is_self) {
                            self.$router.push({path: '/mine/set', query: {}});
                        }
                    });
				}
				//手机号码=》 this.userInfo.mobile

                this.$dialog.confirm({
                    // title: '标题',
                    message: '确定拨打电话：\n18520863910吗？',
                }).then(() => {
                        // on confirm
				}).catch(() => {
                        // on cancel
               });
		    },

		    call_wx() {
                var self = this;
                if (!this.userInfo.qrCode) {
                    this.$dialog.alert({
                        // title: '标题',
                        message: '该用户还没有添加微信！',
                        confirmButtonText: '知道啦',
                    }).then(() => {
                        if (self.is_self) {
                            self.$router.push({path: '/mine/set', query: {}});
                        }
                    }).catch();
                } else {
                    this.add_wx_popup_show = true;
                }
		    },

		    share_txt() {
                var str = this.article.describe || this.article.title;
		    	this.$dialog.alert({
		    	  title: '分享朋友圈配文',
		    	  message: str,
		    	  confirmButtonText: '复制配文',
		    	})
		    	.then(() => {
		    	    // on confirm
		    	    this.copy_str(str)
		    	});
		    },




            search() {
                var self = this;
                self.list = [];
                //self.beforeId = 0;
                self.getCompanySearch();
            },


            getCompanySearch() {
                var self = this;
                var uri = "article/video/company/search";
                var param = {keyword:this.keyword};
                axios.post(uri,param).then(function (response) {
                    var data = response.data.data;
                    self.list = data;
                });
            },

			createCompany(){
                var self = this;
                if (self.articleVideoCompany.length >= 5) {
                    this.$toast('你最多只能选择5个品牌');
                    self.info_empty_list_box = false;
                    return;
                }
                var uri = 'article/video/company/store';
                var param = {name:this.keyword};
                this.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                axios.post(uri,param).then(function (response) {
                    //self.$router.push({ path: '/classify/set', query: {} });
                    self.info_empty_list_box = false;
                    self.$toast.clear();
                    self.getArticleVideoCompany();
                });
			},
            clockAudio($event){
			    if ($(event.target).parents('.weixinAudio').length){

			        var element = $(event.target).parents('.weixinAudio');
                    var index = $(event.target).parents('.article-content').find(element).parent().index();

                    var key = objects.findIndex(item=>{
                        if(item.index==index){
                            return true
                        }
                    });

                    console.log(key);

			        if (key == -1){
						obj = $(event.target).parents('.weixinAudio').weixinAudio({
                            autoplay:true,
                        });
                        obj.weixinAudio0.currentState = 'play';
                        objects.push({index:index,obj:obj});

                        console.log(objects)

					}else{
						var obj = objects[key].obj;
			            if (obj.weixinAudio0.currentState== "pause"){
                            obj.weixinAudio0.play()
                            obj.weixinAudio0.currentState = 'play';
						}else{
                            obj.weixinAudio0.pause()
                            obj.weixinAudio0.currentState = "pause";
						}
					}

					//console.log(obj)

			        //if ()

                    /*console.log(obj.weixinAudio0.play());
                    console.log(obj);*/

                    //console.log($(event.target).parents('.weixinAudio').find('.playing'));

				}
                /*$(event.target).parents('.weixinAudio').weixinAudio({
                    autoplay:false,
                });
			    console.log($event)*/
            },
            getArticleVideoCompany() {
                var self = this;
                var uri = "article/video/company";
                axios.get(uri).then(function (response) {
                    var data = response.data.data;
                    self.articleVideoCompany = data.articleVideoCompanies;
                    //self.companies = data.companies;
                });
            },
            addCompany(item) {
                var self = this;
                if (self.articleVideoCompany.length >= 5) {
                    this.$toast('你最多只能选择5个品牌');
                    self.info_empty_list_box = false;
                    return;
                }
                var articleVideoIds = [];
                self.articleVideoCompany.forEach(function (item) {
                    articleVideoIds.push(item);
                });
                if (articleVideoIds.indexOf(item.id) != -1) {
                    //self.$router.push({ path: '/classify/set', query: {} });
					self.info_empty_list_box = false;
                    return;
                }
                this.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                var params = {status:1,companyId:item.id};
                axios.post('account/update-company',params).then(function (response) {
                    self.$toast.clear();
                    //self.$router.push({ path: '/classify/set', query: {} });
                    self.info_empty_list_box = false;
                    self.getArticleVideoCompany();
                });
            },

            submitMobile() {
                var self = this;
                var reg = /^1[3456789]\d{9}$/;
                if (!self.userInfo.mobile || !reg.test(self.userInfo.mobile)) {
                    this.$toast('请输入正确的手机号');
                    return;
                }
                var params = {mobile: self.userInfo.mobile};
                this.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });
                axios.post('account/update-mobile', params).then(function (response) {
                    self.$toast.clear();
                    self.info_empty_popup_show = false;
                });

			},
            async getSign() {
                var self = this;
                if (self.shareAccounts.length == 0) {
                    self.shareAccounts = await this.shareAccount();
                }
                var shareConf = self.shareAccounts['article'];
                var shareUrl = shareConf['domain']+self.article.shareId+'?appid=wxfbc908f16bf393a5';
                var host = location.href;
                var url = encodeURIComponent(host);
                this.getSignByAppid(shareConf['appId'],url,function (result) {
                    var data = result.data;
                    var title = self.article.title;
                    var desc = self.article.describe;
                    var imgUrl = self.article.imageUrl;
                    self.wxShareInfo(data, title, desc, shareUrl, imgUrl,self.article.id,1,shareConf['isNew']);
                    console.log(result);
                    self.createCustomer();
                });
            },
		},


	}
</script>

<style>
	/*@import '@/../public/common/wx_link.css';*/
	/*import '@/../public/common/wx_link.css';*/
	/*C:\Users\BXPC-004\Desktop\项目\00-其他\开单有招\01-微信公众号h5\code2\src\views\article\article.vue*/
	/*@import '../../../public/common/wx_link.css';*/
</style>

<style scoped >
	@import '../../../public/common/wx_link.css';

	.page{
		/*background: #EEF0F4;*/
		padding: calc(40 / 750 * 100vw);
	}


	[v-cloak]{
		display: none;
	}

	.fixed_btns{
		position: fixed;
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

	.add_wx_popup{
		border-radius:calc(8 / 750 * 100vw);
	}
	.add_wx_box{
		overflow: hidden;
		padding: 0 calc(105 / 750 * 100vw);
	}
	.add_wx_img{
		width: calc(350 / 750 * 100vw);
		height: calc(350 / 750 * 100vw);
		margin-top: calc(80 / 750 * 100vw);
	}
	.add_wx_tip{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		margin: calc(40 / 750 * 100vw) 0 ;
	}
	.edit_wx_img{
		width: calc(80 / 750 * 100vw);
		height: calc(80 / 750 * 100vw);
		margin-top: calc(64 / 750 * 100vw);
	}
	.edit_wx_tip{
		margin-top: calc(24 / 750 * 100vw);
		font-size: calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}



	.title{
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(48 / 750 * 100vw);
	}
	.auth_infos{
		background:rgba(255,74,90,1);
		border-radius:calc(8 / 750 * 100vw);
		padding: calc(30 / 750 * 100vw);
	}
	.auth_port{
		width:calc(98 / 750 * 100vw);
		height:calc(98 / 750 * 100vw);
		background:rgba(255,255,255,1);
		border-radius: 50%;
	}
	.auth_info{
		height: 100%;
		margin-left: calc(22 / 750 * 100vw);
	}
	.auth_name{
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.auth_tel{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.auth_change_btn{
		width:calc(144 / 750 * 100vw);
		height:calc(64 / 750 * 100vw);
		background:rgba(255,164,74,1);
		border-radius:calc(32 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.article_video{
		width:calc(670 / 750 * 100vw);
		height:calc(188 / 750 * 100vw);
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);

		padding: 0 calc(32 / 750 * 100vw);
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.article_video_title{
		line-height: calc(84 / 750 * 100vw);
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.article_video_info{
	}
	.article_video_progress_box{
		margin-right: calc(40 / 750 * 100vw);
	}
	.article_video_progress{}
	.article_video_progress_line{
		height: 2px;
		background: #E7E7E7;
		position: relative;
		margin: calc(22 / 750 * 100vw) 0;
	}
	.article_video_progress_point{
		position: absolute;
		left: 0;
		width: 5px;
		height: 5px;
		top: -1px;
		border-radius: 50%;
		background: #CCCCCC;
	}
	.article_video_progress_time{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.article_video_progress_time_start{}
	.article_video_progress_time_end{}
	.article_video_icon{
		width: calc(48 / 750 * 100vw);
		height: calc(48 / 750 * 100vw);
	}




	.article_content{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:calc(45 / 750 * 100vw);


		/*width: calc((750 - 40 * 2) / 750 * 100vw);*/

	}
	/*
	.article_content img{
		max-width: 100%;
		max-width: calc((750 - 40 * 2) / 750 * 100vw);
	}
	*/
	.article_content_box img{
		max-width: 100%;
		max-width: calc((750 - 40 * 2) / 750 * 100vw);
	}
	.complaint_btn{
		width:calc(188 / 750 * 100vw);
		height:calc(64 / 750 * 100vw);
		background:rgba(255,164,74,0.1);
		border-radius:calc(35 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,164,74,1);

		line-height: initial;
	}
	.complaint_icon{
		font-size: calc(36 / 750 * 100vw);
		margin-right: calc(16 / 750 * 100vw);
		color: #FFA44A;
	}

	.auth_infos_big{
		background:rgba(79,95,170,1);
		border-radius:calc(8 / 750 * 100vw);
		padding: calc(30 / 750 * 100vw);
	}
	.auth_tel_btn{
		/*width: calc(36 / 750 * 100vw);*/
		/*height: calc(36 / 750 * 100vw);*/
		font-size: calc(36 / 750 * 100vw);
		font-size: calc(45 / 750 * 100vw);
		color: #FFA44A;
	}
	.auth_wx_btn{
		color: #FFA44A;
		/*width: calc(45 / 750 * 100vw);*/
		/*height: calc(36 / 750 * 100vw);*/
		font-size: calc(36 / 750 * 100vw);
		font-size: calc(45 / 750 * 100vw);
		margin-left: calc(64 / 750 * 100vw);
	}
	.auth_tip{
		margin-top: calc(32 / 750 * 100vw);
		border-top: 1px solid rgba(255,255,255,0.15);
		padding-top: calc(32 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:calc(45 / 750 * 100vw);
	}
	.products_box{

	}
	.products_head{

	}
	.products_title{
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(32 / 750 * 100vw);
	}
	.products_more{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:calc(28 / 750 * 100vw);
	}






	.product_list{
	}
	.product_li{
		margin-top: calc(30 / 750 * 100vw);
		margin-left: calc(30 / 750 * 100vw);
		width:calc(50% - 30 / 750 * 100vw);
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);
		overflow: hidden;
	}

	.product_box{
		width:calc(319 / 750 * 100vw);
		/*height:calc(200 / 750 * 100vw);*/
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);
		/*padding: calc(32 / 750 * 100vw);*/
	}
	.product_box+
	.product_box{
		margin-left: calc(32 / 750 * 100vw);
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


	.fixed_btn{
		position: fixed;
		bottom: 0;
		left: 0;
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




	.info_empty_popup{
		width:calc(540 / 750 * 100vw);
		overflow: hidden;

	}


	.info_empty_box{}

	.info_empty_title{
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(3,3,3,1);
		line-height:calc(32 / 750 * 100vw);
		margin-top: calc(48 / 750 * 100vw);
		margin-bottom: calc(40 / 750 * 100vw);
	}
	.info_empty_list{
		margin: 0 calc(32 / 750 * 100vw);
		height: calc(240 / 750 * 100vw);
	}
	.info_empty_li{
		height: calc(90 / 750 * 100vw);
		border-bottom: 1px solid rgba(217,217,217,1);
	}
	.info_empty_li_input::placeholder{
		color: #CCCCCC;
	}
	.info_empty_li_input{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.info_empty_li_icon{
		width:calc(14 / 750 * 100vw);
		height:calc(24 / 750 * 100vw);
	}
	.info_empty_btns{
		border-top: calc(1 / 750 * 100vw) solid #D9D9D9;
		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		height: calc(87 / 750 * 100vw);
	}
	.info_empty_btn{}
	.info_empty_btn+
	.info_empty_btn{
		border-left: calc(2 / 750 * 100vw) solid #D9D9D9;
	}
	.info_empty_btn_false{
		color: #999999;
	}
	.info_empty_btn_ok{
		color: #FF4A5A;
	}


	.info_empty_list_box{
		padding: 0 calc(32 / 750 * 100vw);
		overflow: hidden;
	}
	.search_box1
	,.search1
	,.search_list1
	/*,.classify_submit_btn1*/
	{
		margin: 0;
		padding: 0;

	}
	.search_box1{
		margin-top: calc(48 / 750 * 100vw);
	}
	.search1{
		width:calc(470 / 750 * 100vw);
		width: auto;
		flex-grow: 1;
	}
	.search_list1{
		height:calc(360 / 750 * 100vw);
	}
	.classify_submit_btn1{
		width:calc(380 / 750 * 100vw);
		margin-left: auto;
		margin-right: auto;

	}



</style>
<style scoped>




	.mb1{
		margin-bottom: calc(40 / 750 * 100vw);
	}
	.mb2{
		margin-bottom: calc(80 / 750 * 100vw);
	}
	.mt0{
		margin-top: 0;
	}
	.mb_0{
		margin-bottom: 0;
	}

</style>
<style>
	.product_list{

	}
	.product_box{
		width:calc(319 / 750 * 100vw);
		/*height:calc(200 / 750 * 100vw);*/
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);
		padding: calc(32 / 750 * 100vw);
	}
	.product_box+
	.product_box{
		margin-left: calc(32 / 750 * 100vw);
	}
	.product_title{
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:calc(32 / 750 * 100vw);
	}
	.product_tip{
		font-size:calc(24 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		margin-bottom: calc(32 / 750 * 100vw);
	}
	.product_prices{
		width:calc(98 / 750 * 100vw);
		/*height:calc(32 / 750 * 100vw);*/
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,74,90,1);
		font-size:calc(24 / 750 * 100vw);
	}
	.product_num {
		font-size: calc(32 / 750 * 100vw);
	}
</style>

<style>
	.db {
		display: block;
	}

	.weixinAudio {
		line-height: 1.5;
	}

	.audio_area {
		display: inline-block;
		width: 100%;
		vertical-align: top;
		margin: 0px 1px 0px 0;
		font-size: 0;
		position: relative;
		font-weight: 400;
		text-decoration: none;
		-ms-text-size-adjust: none;
		-webkit-text-size-adjust: none;
		text-size-adjust: none;
	}

	.audio_wrp {
		border: 1px solid #ebebeb;
		background-color: #fcfcfc;
		overflow: hidden;
		padding: 12px 20px 12px 12px;
	}

	.audio_play_area {
		float: left;
		margin: 9px 22px 10px 5px;
		font-size: 0;
		width: 18px;
		height: 25px;
	}

	.playing .audio_play_area .icon_audio_default {
		display: block;
	}

	.audio_play_area .icon_audio_default {
		background: transparent url(/img/iconloop.png) no-repeat 0 0;
		width: 18px;
		height: 25px;
		vertical-align: middle;
		display: inline-block;
		-webkit-background-size: 54px 25px;
		background-size: 54px 25px;
		background-position: -36px center;
	}

	.audio_play_area .icon_audio_playing {
		background: transparent url(/img/iconloop.png) no-repeat 0 0;
		width: 18px;
		height: 25px;
		vertical-align: middle;
		display: inline-block;
		-webkit-background-size: 54px 25px;
		background-size: 54px 25px;
		-webkit-animation: audio_playing 1s infinite;
		background-position: 0px center;
		display: none;
	}

	.audio_area .pic_audio_default {
		display: none;
		width: 18px;
	}

	.tips_global {
		color: #8c8c8c;
	}

	.audio_area .audio_length {
		float: right;
		font-size: 14px;
		margin-top: 3px;
		margin-left: 1em;
	}

	.audio_info_area {
		overflow: hidden;
	}

	.audio_area .audio_title {
		font-weight: 400;
		font-size: 17px;
		margin-top: -2px;
		margin-bottom: -3px;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
	}

	.audio_area .audio_source {
		font-size: 14px;
	}

	.audio_area .progress_bar {
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: #0cbb08;
		height: 2px;
	}

	.playing .audio_play_area .icon_audio_default {
		display: none;
	}

	.playing .audio_play_area .icon_audio_playing {
		display: inline-block;
	}

	@-webkit-keyframes audio_playing {
		30% {
			background-position: 0px center;
		}
		31% {
			background-position: -18px center;
		}
		61% {
			background-position: -18px center;
		}
		61.5% {
			background-position: -36px center;
		}
		100% {
			background-position: -36px center;
		}
	}

</style>
