<template>
	<div class="page">

		<!--  :style="{ height: '30%' }" -->
		<van-popup class="edit_tip_popup bg_tr ta_c" v-model="edit_tip_popup_show" position="bottom" >
			<div class="edit_tip_popup_box" @click="edit_tip_popup_show=false" >
				<img src="/img/icon_gestures@2x.png" alt="" class="edit_tip_popup_img no_shrink">
				<div class="edit_tip_popup_txt">想改哪里点哪里</div>
			</div>
		</van-popup>




		<!--
			Events
			事件名	说明	回调参数
			submit	提交表单且验证通过后触发	values: object
			failed	提交表单且验证不通过后触发	errorInfo: { values: object, errors: object[] }
		-->
		<van-form validate-first @submit="onSubmit" >


			<div class="top_tip flex flex_align_c " v-if='top_tip_show'>
				<img src="/img/icon_prompt@3x.png" alt="" class="top_tip_icon no_shrink">
				<div class="top_tip_txt txt_over_ell flex_grow ">点击标题、文字和图片可对其进行修改！</div>
				<img src="/img/icon_close@3x.png" alt="" class="top_tip_close no_shrink" @click='top_tip_show=false'>
			</div>

			<!--
			<div class="article_title_box">
				<div class="article_title">{{ form.title }}</div>
				<div class="article_tips flex flex_align_c">
					<div class="article_tip txt_wrap flex_grow">{{ form.describe }}</div>
					<img :src="form.imageUrl" alt="" class="article_img no_shrink ">
				</div>
			</div>

			<div class="article_title_box">
				<textarea class="article_title" v-model='form.title' rows='2'></textarea>
				<div class="article_tips flex flex_align_c">
					<textarea class="article_tip txt_wrap flex_grow" v-model='form.describe'></textarea>
					<img :src="form.imageUrl" alt="" class="article_img no_shrink dn">
					<van-uploader class='article_img no_shrink uploader' v-model="uploader" :max-count='1' upload-text='上传封面' upload-icon='plus' />
				</div>
			</div>
			 -->


			<div class="article_title_box">
				<!--
					:autosize='{ maxHeight:  "calc(48 * 2 / 750 * 100vw)" }'
					rows='1'
				 -->
				<van-field
				  type='textarea'
				  v-model="form.title"
				  rows='2'
				  name='title'
				  :border='false'
				  clearable
				  placeholder="输入标题"
				  class='article_title title'
				/>
				<div class="article_tips flex flex_align_c">
					<van-field
					  v-model="form.describe"
					  name='form.describe'
					  :border='false'
					  type="textarea"
					  placeholder="输入文章描述（非必填）"
					  class='article_tip desc'
					/>

					<!-- <van-uploader  class='article_img no_shrink uploader' v-model="uploader" :max-count='1' upload-text='上传封面' upload-icon='plus' /> -->

					<van-uploader ref='uploader_imageUrl'  :after-read="onHeaderImageUrl" class="article_img no_shrink dn"/>
					<img v-if="form.imageUrl" :src="form.imageUrl" alt=""  class="article_img no_shrink" @click='chooseFile_imageUrl'>
					<img v-else src="/img/default.png" alt=""  class="article_img no_shrink" @click='chooseFile_imageUrl'>

				</div>
			</div>

			<!--
			<van-field
			  v-model="title"
			  name='title'
			  clearable
			  placeholder="输入标题"
			/>
			<van-field
			  v-model="desc"
			  name='desc'
			  rows="4"
			  autosize
			  :border='false'
			  type="textarea"
			  placeholder="输入文章描述（非必填）"
			/>

			<van-field name="uploader" :border='false' >
			  <template #input>
			    <van-uploader class='uploader' v-model="uploader" :max-count='1' upload-text='上传封面' upload-icon='plus' />
			  </template>
			</van-field>
			-->


			<div class="flex form_pd flex_c">
				<a-popover v-model="add_opt_show" trigger="click" placement="bottom">
				  	<template #content>
					    <div class='add_opt_box flex' @click='add_opt_show=false,add_type="first",1'>
					    	<div class="add_opt" @click='add_txt_show=true'>
						    	<van-icon class="add_opt_img add_desc_opt " name="description" />
						    	<div class="add_opt_txt">文字</div>
					    	</div>
					    	<div class="add_opt" @click='add_img_show=true'>
						    	<van-icon class="add_opt_img add_img_opt" name="photo" />
						    	<div class="add_opt_txt">图片</div>
					    	</div>
					    </div>
				  	</template>
				   	<!--  @click='add_opt_show=true' -->
				   	<div class="add_area_btn flex_c">
				   		<van-icon class="add_area_icon" name="plus" />
				   		<span class="add_area_txt">添加文字/图片</span>
				   	</div>
				</a-popover>
			</div>

			<!--
			<div class="content_list form_pd" >
			</div>
			 -->
			<div class="dn">
				<div id="content_li_wrap" >
					<div class="content_li_wrap">
						<div class="content_li content_li_active form_pd" >

							<!-- <div class="content_li_txt" >content_li_txt</div> -->

						</div>

						<div class="content_li_opts flex flex_jc_a">
							<div class="content_li_opt ta_c"
				                v-for='(item, index) in content_li_opts' :key='index'
				                @click='item.fn'
								>
								<img class="content_li_opt_img" :src='item.img' />
								<div class="content_li_opt_name">{{item.name}}</div>
							</div>
						</div>

					</div>
				</div>
			 </div>

			<!-- article_content article_content_box article-content -->
			<div class="content_list article-content form_pd" v-html="form.content" @click="editContent($event)">
				<!--<div class="content_li_wrap"
			        v-for='(content, index) in content_list' :key='index'
			        v-if='!content.hidden'
					>
					<div class="content_li" :class='content_li_active==index?"content_li_active form_pd":""' @click='content_li_active=index'>

						<div class="content_li_txt" v-if='content.type=="text"' v-text='content.content'></div>
						<img class="content_li_img width_percent" :src='content.content'  v-if='content.type=="img"' />

					</div>
					<div class="content_li_opts flex flex_jc_a" v-if='content_li_active==index'>
						<div class="content_li_opt ta_c"
			                v-for='(item, index) in content_li_opts' :key='index'
			                v-if='!(content.type=="img"&&item.name=="编辑")'
			                @click='item.fn'
							>
							<img class="content_li_opt_img" :src='item.img' />
							<div class="content_li_opt_name">{{item.name}}</div>
						</div>
					</div>
				</div>-->


			</div>

			<div class="dn">
				<div
					class="form_btns flex op_0 form_btns_placeholder"
					>
					<van-button class='back_btn'  color="#D9D9D9" plain @click.prevent >撤销删除</van-button>
					<!-- submit_ok title -->
					<van-button class='submit_btn'  :color="title?'rgba(255,74,90,1)':'#D9D9D9'"  @click.prevent >保存</van-button>
				</div>
				<div
					class="form_btns flex fixed"
					>
					<van-button class='back_btn'  color="#D9D9D9" plain @click.prevent='del_back' >撤销删除</van-button>
					<!-- submit_ok title -->
					<van-button class='submit_btn'  :color="title?'rgba(255,74,90,1)':'#D9D9D9'"  native-type="submit"  @click='submitArticle'>保存</van-button>
				</div>
			</div>


			<div
				class="form_btns flex op_0 form_btns_placeholder "
				style='padding: 0;width: 100%;bottom: 0;'
				>
				<van-button class='back_btn flex_grow'  style='margin: 0;background: #EEEEEE;border: none;border-radius: 0;'  color="#D9D9D9" plain @click.prevent >撤销删除</van-button>
				<!-- submit_ok title -->
				<van-button class='submit_btn flex_grow'  style='border: none;border-radius: 0;'  :color="title?'rgba(255,74,90,1)':'#D9D9D9'"  @click="submitArticle" >保存</van-button>
			</div>
			<div
				class="form_btns flex fixed flex_grow"
				style='padding: 0;width: 100%;bottom: 0;'
				>
				<van-button class='back_btn flex_grow' style='margin: 0;background: #EEEEEE;border: none;border-radius: 0;' color="#D9D9D9" plain @click.prevent='del_back' >撤销删除</van-button>
				<!-- submit_ok title -->
				<van-button class='submit_btn flex_grow' style='border: none;border-radius: 0;'   :color="title?'rgba(255,74,90,1)':'#D9D9D9'"  native-type="submit"  @click='submitArticle' >保存</van-button>
			</div>

			<!-- 测试
				type 规定按钮的类型
					button
					reset
					submit

			<button>button标签 默认 触发</button>
			<button @click.prevent >@click.prevent 不触发</button>
			<button type='button'  >type='button' 不触发</button>
			<button type='123'  >type='123' 触发 </button>
			-->


		</van-form>



		<van-dialog v-model="add_txt_show" title="文字" show-cancel-button
		    @confirm='add_txt_confirm' @cancel='add_txt=""'
		>
		  <van-field
		    v-model="add_txt"
		    name='add_txt'
		    rows="4"
		    autosize
		    :border='false'
		    type="textarea"
		    placeholder="输入文字"
		  />
		</van-dialog>

		<!--  :value="add_popup_type=='img'" @cancel='add_popup_type=""' -->
		<van-dialog class='ta_c' v-model='add_img_show' title="图片" show-cancel-button
		    @confirm='add_img_confirm' @cancel='add_img=""'
		 >
			<!--  :value="[{url:add_popup_content}]" :after-read='res=>{}' -->
		    <van-uploader v-model='add_img' :after-read="onReadImg" class='uploader form_pd' upload-text='上传图片' upload-icon='plus' max-count='1' />
		</van-dialog>

	    <!-- @confirm='add_img_confirm' @cancel='edit_html=""'  -->
		<van-dialog class='ta_c' v-model='edit_html_show' title="html" show-cancel-button
		    @confirm='edit_html_confirm' @cancel='edit_html=""'
		 	>
			<div id='edit_html' class="article-content" v-html='edit_html' contenteditable
				style="
					max-height: 60vh;
					overflow: auto;
				"
			></div>
		</van-dialog>

	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

	export default {
		data() {
			var that=this;
			return {

				// true false
				edit_tip_popup_show: true,
				top_tip_show: true,


				title: '',
				desc: '',
				uploader: [
					// 'https://img.yzcdn.cn/vant/leaf.jpg',// 不可行
					{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
				],

				add_opt_show: false,
				add_txt_show: false,
				add_txt: '',
				add_img_show: false,
				add_img: [
					// { url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
				],

				edit_html_show: false,
				edit_html: '',


				/*// 弹窗判断合并
					add_popup_type: 'img',// img text
					add_popup_content: '',
					// 页面
					<van-dialog  :value="add_popup_type=='img'" @cancel='add_popup_type=""' >
					<van-uploader :value="[{url:add_popup_content}]" :after-read='(...arg)=>{
						// 此处未确认
						arg[0]=={
							content: "data:image/png;base64,i..."
							file: File文件对象
							status: ""
						}
					}' />
				*/

				add_type: 'first',
				/*
					first -> 插入第一个位置
					after -> 插入当前位置后面
					now -> 修改当前
				*/


				content_li_active: -1,
				content_list: [
					//
					{
						type: 'img',
						content: 'https://img.yzcdn.cn/vant/leaf.jpg',
					},
					{
						type: 'text',
						content: '文字',
					},
				],

				del_index: 0,

				content_li_opts: [
					//
					{
						name: '删除',
						img: '/img/icon_img/icon_dalete@2x.png',
						fn: res=>{
					    	console.log('删除', res);

					    	// this.content_list.splice(this.content_li_active, 1);

							this.content_list[
								this.content_li_active
							].hidden=true;


					    	this.content_li_active = -1;
						},
						fn: res=>{
					    	console.log('删除', res);

					    	// this.edit_el.parents('.content_li_wrap').remove();


					    	// 隐藏, 状态为待删除, 保存时再做删除处理
					    	this.del_index++;
					    	$('.content_list .content_li_wrap .content_li>*').addClass('dn');
					    	$('.content_list .content_li_wrap .content_li>*').attr('del_index', this.del_index);

					    	// 2.移除选中
					    	$('.content_list .content_li_wrap').length
					    	&&
					    	$('.content_list .content_li_wrap .content_li>*').unwrap();
					    	$('.content_list .content_li_wrap>*').unwrap();
					    	$('.content_list .content_li_opts').remove();




				    		// form.content .content_list
		    				this.form.content = $('.content_list').html();
						},
					},
					{
						name: '编辑',
						img: '/img/icon_img/icon_edit@2x.png',
						fn: res=>{
					    	console.log('编辑', res);
							this.add_type='now';

							var content=
								this.content_list[
									this.content_li_active
								]
							;
							// this[

							// 	this.content_list[
							// 		this.content_li_active
							// 	].type=='img'
							// 	?
							// 		'add_img_show'
							// 	:
							// 		'add_txt_show'
							// ]=true;

							if(content.type=='img'){
								this.add_img_show=true;
								this.add_img=[
									{
										...content,
										url:
											content.content
											||''
										,
									}
								];
							}else{
								this.add_txt_show=true;
								this.add_txt=content.content||'';
							}
						},
						fn: res=>{
					    	console.log('编辑', res);
					    	this.edit_html =  this.edit_el.html();
					    	this.edit_html_show = true;
		    				this.form.content = $('.content_list').html();
						},
					},
					{
						name: '插文字',
						img: '/img/icon_img/icon_font@2x.png',
						fn: res=>{
					    	console.log('插文字', res);
							this.add_txt_show=true;
							this.add_type='after';
						},
						// fn: res=>{
					 //    	console.log('插文字', res);
						// },
					},
					{
						name: '插图片',
						img: '/img/icon_img/icon_picture@2x.png',
						fn: res=>{
					    	console.log('插图片', res);
							this.add_img_show=true;
							this.add_type='after';
						},
						// fn: res=>{
					 //    	console.log('插图片', res);
						// },
					},
				],

				form:{
				   	title:'',
                    describe:'',
					imageUrl:'',
					content:''
				},
				id:this.getUrlKey('id') || '5e9daba379c28e60b9465115',
				submit_ok: false,
			};
		},



		methods: {
			...wjw_com_ts,

		    get_list() {
		        return false
		    },

            onReadImg(file) {
                let self = this;
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                self.instance.post('/api/upload',formData).then(res => {
                    console.log(self.add_img);
                    self.add_img = [];
                    self.add_img.push({'content':res.data.url,'file':file.file});
                }).catch(err => {
                    self.alert("图片上传失败")
                });
            },

            onHeaderImageUrl(file) {
                let self = this;
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                self.instance.post('/api/upload',formData).then(res => {
                    self.form.imageUrl = res.data.url
                }).catch(err => {
                    alert(err)
                });
            },


			chooseFile_imageUrl() {
                setTimeout(()=>{
					this.$refs.uploader_imageUrl.chooseFile();
                },0)
			},

            editContent($event){
                console.log(event.target.parentNode);
			  	console.log($event);


			  	// 3.判断触发元素是否在选中元素中
			  	// if(
				  // 	$(event.target).parents('.content_li_wrap').length
				  // 	||
				  // 	$(event.target).is('.content_li_wrap')
			  	// ){
			  	// 	console.log('判断触发元素是否在选中元素中', $(event.target), $(event.target).is('.content_li_opt'));

			  		// 4.判断选项
				  	if($(event.target).is('.content_li_opt')||$(event.target).parents('.content_li_opt').length){
				  		var opt =
				  			$(event.target).is('.content_li_opt')
				  			?
					  			$(event.target)
				  			:
				  				$(event.target).parents('.content_li_opt')
				  			;
				  		console.log('判断选项', opt.text());

					    this.edit_el =  opt.parents('.content_li_wrap')
				  			.children('.content_li');

				  		this.content_li_opts.find(item=>item.name==opt.text())
				  		.fn.call(this);

				  		return
				  	}






			  	// 	return
			  	// }



			  	// 2.移除选中
			  	$('.content_list .content_li_wrap').length
			  	&&
			  	$('.content_list .content_li_wrap .content_li>*').unwrap();
			  	$('.content_list .content_li_wrap>*').unwrap();
			  	$('.content_list .content_li_opts').remove();



			  	// 1.选中
			  	$(event.target).parents('.content_list').length
			  	&&
			  	$(event.target).wrap( $('#content_li_wrap').html() );



			},

			/*
	        add_txt_confirm(e) {
		    	console.log('add_txt_confirm', arguments, this.add_type);
		    	if(this.add_type=='first'){

		    		// form.content .content_list


		    		this.content_list.unshift({
		    			type: 'text',
		    			content: this.add_txt,
		    		});
		    	}
		    	if(this.add_type=='now'){
		    		this.content_list[this.content_li_active].content=this.add_txt;
		    	}
		    	if(this.add_type=='after'){
		    		this.content_list.splice(this.content_li_active+1,0,{
		    			type: 'text',
		    			content: this.add_txt,
		    		})
		    	}

		    	this.add_txt = '';
	        },
			*/

	        add_txt_confirm(e) {
		    	console.log('add_txt_confirm', arguments, this.add_type);
		    	var txt_html = `<div>${this.add_txt}</div>`
		    	if(this.add_type=='first'){

		    		// form.content .content_list
		    		console.log('add_txt_confirm txt_html', txt_html);
		    		// this.form.content =  txt_html+this.form.content;
		    		$('.content_list').prepend(txt_html);

		    	}
		    	if(this.add_type=='after'){
		    		this.edit_el.parents('.content_li_wrap').after(txt_html)
		    	}

		    	this.add_txt = '';
		    	this.form.content = $('.content_list').html();
	        },

		    /*
	        add_img_confirm(e) {
		    	console.log('add_img_confirm', arguments, this.add_type, this.add_img);
		    	if(!this.add_img.length){
		    		return;
		    	}
		    	var content = this.add_img[0].content;
		    	if(this.add_type=='first'){
		    		this.content_list.unshift({
		    			...content,
		    			type: 'img',
		    			content: content,
		    		});
		    	}
		    	if(this.add_type=='now'){
		    		this.content_list[this.content_li_active].content=content;
		    	}
		    	if(this.add_type=='after'){
		    		this.content_list.splice(this.content_li_active+1,0,{
		    			type: 'img',
		    			content: content,
		    		})
		    	}
		    	this.add_img = '';
		    	this.form.content = $('.content_list').html();
	        },
		    */
	        add_img_confirm(e) {
		    	console.log('add_img_confirm', arguments, this.add_type, this.add_img);
		    	if(!this.add_img.length){
		    		return;
		    	}
		    	console.log(this.add_img);
		    	var content = this.add_img[0].content;
		    	var img_html = `<img src='${content}' style='width: 100%;height:auto;' />`
		    	if(this.add_type=='first'){
		    		// this.form.content =  img_html+this.form.content;
		    		$('.content_list').prepend(img_html);
		    	}
		    	if(this.add_type=='after'){
		    		this.edit_el.parents('.content_li_wrap').after(img_html)
		    	}
		    	this.add_img = [];
		    	this.form.content = $('.content_list').html();
	        },

	        edit_html_confirm(e) {
		    	console.log('edit_html_confirm', arguments, $('#edit_html').html());

		    	// this.edit_el.html($('#edit_html').html());// 不可行
		    	// console.log('edit_html_confirm this.edit_el', this.edit_el);

	    		$('.content_list .content_li').html($('#edit_html').html());
			    this.form.content = $('.content_list').html();
		    	this.edit_html = '';
	        },

	        /* Uploader 文件上传
		        //upLoaderImg.js
					import axios from 'axios'		//引入axios
					import { Toast } from 'vant'	//引入Toast
			        function upLoaderImg (file) {	//file为 你读取成功的回调文件信息
			        	//new 一个FormData格式的参数
			        	let params = new FormData()
			        	params.append('file', file)
			        	let config = {
			                headers: { //添加请求头
			                  	'Content-Type': 'multipart/form-data'
			                }
			          	}
			        	return new Promise((resolve, reject) => {
			        		//把 uploadUrl 换成自己的 上传路径
			        		axios.post('uploadUrl', params, config).then(res => {
			        	        if (res && res.data && res.data.status === 1) {				//如果为真 resolve出去
			        	        	resolve(res.data)
			        	        } else {
			        	        	//否则 Toast 提示
			        	        	Toast.fail(res.data && (res.data.msg))
			        	        	reject(res.data)
			        	        }
			                }).catch(err => {
			                  	Toast.fail('系统异常')
			                  	reject(err)
			            	});
			        	})
			        }
			        export default upLoaderImg
		        //upLoaderImg.js -end ---------------

				<van-uploader
					:after-read="afterRead"
					:before-read="beforeRead"
				  	v-model="fileList"
				  	multiple
				  	:max-count="1"
				/>

				beforeRead (file) {	//上传之前校验
					if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
						Toast('只允许上传jpg/png格式的图片！')
						return false
					}
					return true
				},
				async afterRead (file) {	//文件读取完成后的回调函数
					let uploadImg = await upLoaderImg(file.file)//使用上传的方法。file.file
					console.log(uploadImg)
				}
	        */

	        // 撤销删除
		    del_back(e) {
		    	console.log('del_back', e, this);
		    	// this.content_list = this.content_list.map(item=>(item.hidden=false, item));

		    	if(this.del_index){
					$('[del_index='+this.del_index+']').removeClass('dn');
					this.del_index--;
		    	}

	        },
		    onSubmit(values) {
		    	console.log('submit', values);

	    		var content_list = this.content_list.filter(item=>!item.hidden);
		    	console.log('submit content_list', content_list);
	        },

            getArticle() {
                let self = this;
                var uri = "/api/article/show/"+self.id;
                axios.get(uri).then(function (response) {
                    let article = response.data.data;
        			// article.content = self.px_to_vw(article.content);
                    self.form = article;
                });
            },
            submitArticle() {

            	// 2.移除选中
            	$('.content_list .content_li_wrap').length
            	&&
            	$('.content_list .content_li_wrap .content_li>*').unwrap();
            	$('.content_list .content_li_wrap>*').unwrap();
            	$('.content_list .content_li_opts').remove();

            	$('.dn').remove();

		    	this.form.content = $('.content_list').html();




		        let self = this;
                var form = {
                    title:this.form.title,
                    describe:this.form.describe,
                    imageUrl:this.form.imageUrl,
                    body:this.form.content
				};
				var uri = "article/"+this.id;
                axios.put(uri,form).then(function (response) {
                    let data = response.data.data;
                    let  param = {'id':data.id};
                    self.$router.push({ path: '/article', query: param });
                });

                //console.log(this.form.content);
            }
		},
        mounted() {
            this.getArticle();
        }
	}
</script>

<style scoped >

	@import '../../../public/common/wx_link.css';

	html,.page{
		height: auto;
	}
	.page{
		/*overflow: hidden;*/
	}


	.edit_tip_popup{}
	.edit_tip_popup_box{
		padding-top: calc(100 / 750 * 100vw);
	}
	.edit_tip_popup_img{
		width: calc(88 / 750 * 100vw);
		height: calc(112 / 750 * 100vw);
		margin-bottom: calc(40 / 750 * 100vw);

		/*transition: transform .3s inf;*/
		/*animation: infinite;*/
		animation: edit_tip_popup_img 1s linear 0s infinite alternate;

		position: relative;
	}
	@keyframes edit_tip_popup_img
	{
		from {
			top: calc(-30 / 750 * 100vw);
		}
		to{
			top: calc(+30 / 750 * 100vw);
		}
	}
	.edit_tip_popup_txt{
		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		margin-bottom: calc(100 / 750 * 100vw);
	}











	.form_pd{
		padding: calc(40 / 750 * 100vw);
	}
	.uploader .van-uploader__preview-image{
		background: #f7f8fa;
	}

	.add_opt_box{}
	.add_opt{
		/*padding: calc(20 / 750 * 100vw);*/
	}
	.add_opt+.add_opt{
		margin-left: calc(50 / 750 * 100vw);
	}
	.add_opt_img{
		border-radius: 50%;
		padding: calc(10 / 750 * 100vw);
		font-size: calc(40 / 750 * 100vw);
	}
	.add_desc_opt{
		border: 1px solid #4185FF;
		color: #4185FF;
	}
	.add_img_opt{
		border: 1px solid #55C919;
		color: #55C919;
	}
	.add_opt_txt{
		text-align: center;
	}

	.add_area_btn{
		height: calc(64 / 750 * 100vw);
		background:rgba(255,74,90,0.1);
		border-radius:32px;
		padding: 0 calc(16 / 750 * 100vw);

		font-size:calc(28 / 750 * 100vw);
		/*line-height:calc(28 / 750 * 100vw);*/
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,74,90,1);
	}
	.add_area_icon{
		/*width:36px;*/
		/*height:36px;*/
		font-size: calc(36 / 750 * 100vw);
		background:rgba(255,74,90,1);
		margin-right: calc(16 / 750 * 100vw);
		color: white;
		border-radius: 50%;
	}
	.add_area_txt{}






	.content_list{
		margin-top: calc(40 / 750 * 100vw);
	}
	.content_li_wrap{}
	.content_li{
		border-radius:calc(8 / 750 * 100vw);
		border:calc(1 / 750 * 100vw) dashed rgba(255,74,90,1);
		border-color: transparent;
		margin-bottom: calc(40 / 750 * 100vw);
	}
	.content_li_active{
		background:rgba(255,74,90,0.1);
		border-color: rgba(255,74,90,1);
	}
	.content_li_txt{
		font-size:calc(28 / 750 * 100vw);
		line-height:calc(45 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.content_li_img{}
	.content_li_opts{
		margin: calc(32 / 750 * 100vw) 0;
	}
	.content_li_opt{}
	.content_li_opt_img{
		width: calc(64 / 750 * 100vw);
		height: calc(64 / 750 * 100vw);
		/*border-radius: 50%;*/
		/*background: #EC4053;*/
		text-align: center;
		margin-bottom: calc(16 / 750 * 100vw);
	}
	.content_li_opt_name{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}








	.form_btns{
		bottom: calc(138 / 750 * 100vw);
		left: 0;
		padding: 0 calc(40 / 750 * 100vw);
	}
	.form_btns_placeholder{
		margin-top: calc(40 / 750 * 100vw);
		margin-bottom: calc(138 / 750 * 100vw);
	}
	.back_btn{
		margin-right: calc(32 / 750 * 100vw);
		width: calc(240 / 750 * 100vw);
	}
	.submit_btn{
		width: calc(398 / 750 * 100vw);
	}
	.submit_btn_show{
		background: rgba(255,74,90,1);
	}











	.top_tip{
		/*width:calc(750 / 750 * 100vw);*/
		height:calc(72 / 750 * 100vw);
		padding: 0 calc(40 / 750 * 100vw);
		background:rgba(255,164,74,0.1);
		background: #FEF5EB;
		top: 0;
		position: sticky;
		z-index: 1;
	}
	.top_tip_icon{
		width: calc(36 / 750 * 100vw);
		height: calc(36 / 750 * 100vw);
		margin-right: calc(16 / 750 * 100vw);
	}
	.top_tip_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,164,74,1);
	}
	.top_tip_close{
		width: calc(28 / 750 * 100vw);
		height: calc(28 / 750 * 100vw);
	}



	.article_title_box{
		padding: calc(40 / 750 * 100vw);
	}
	.article_title{
		/*height:96px;*/
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:calc(48 / 750 * 100vw);

		display: block;
	    width: auto;
	    width: 100%;
	    border: none;
	    padding: 0;
	    /*min-height: calc(48 / 750 * 100vw);*/
	    /*height: calc(48 / 750 * 100vw);*/
	}
	.article_tips{}
	.article_tip{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);


		display: block;
	    width: auto;
	    width: 100%;
	    border: none;
	    padding: 0;
	}
	.article_img{
		width: calc(120 / 750 * 100vw);
		height: calc(120 / 750 * 100vw);
		border-radius: calc(10 / 750 * 100vw);
		margin-left: calc(20 / 750 * 100vw);


	    padding: 0;
	    overflow: visible;
	}









</style>
