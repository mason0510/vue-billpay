<template>
	<div class="page">
		<!--  
			Events
			事件名	说明	回调参数
			submit	提交表单且验证通过后触发	values: object
			failed	提交表单且验证不通过后触发	errorInfo: { values: object, errors: object[] }
		-->
		<van-form validate-first @submit="onSubmit" >
			<van-field
			  v-model="title"
			  name='title'
			  clearable
			  placeholder="输入标题"
			  class='title'
			/>
			<van-field
			  v-model="desc"
			  name='desc'
			  rows="4"
			  autosize
			  :border='false' 
			  type="textarea"
			  placeholder="输入文章描述（非必填）"
			  class='desc'
			/>

			<van-field name="uploader" :border='false' >
			  <template #input>
			  	<!-- capture	图片选取模式，可选值为camera(直接调起摄像头)	string	- -->
			  	<!--  :after-read='res=>{console_log("上传封面",res, uploader)}' -->
			    <van-uploader class='uploader' v-model="uploader" :max-count='1' upload-text='上传封面' upload-icon='plus' />
			  </template>
			</van-field>


			<div class="flex form_pd">
				<a-popover v-model="add_opt_show" trigger="click" placement="bottom">
				  	<template #content>
					    <div class='add_opt_box flex' @click='add_opt_show=false, add_type=="first"'>
					    	<div class="add_opt" @click='add_txt_show=true'>
						    	<van-icon class="add_opt_img add_desc_opt " name="description" />
						    	<div class="add_opt_txt">文字</div>
					    	</div>
					    	<div class="add_opt" @click='add_img_show=true, add_type=="first"'>
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

			<div class="content_list form_pd">
				<div class="content_li_wrap" 
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
				</div>
			</div>

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
				<van-button class='submit_btn'  :color="title?'rgba(255,74,90,1)':'#D9D9D9'"  native-type="submit"  @click='goBack' >保存</van-button>
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
		    @confirm='add_txt_confirm'
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
		    @confirm='add_img_confirm'
		 >
			<!--  :value="[{url:add_popup_content}]" :after-read='res=>{}' -->
		    <van-uploader v-model='add_img' class='uploader form_pd' upload-text='上传图片' upload-icon='plus' max-count='1' />
		</van-dialog>

	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';

	export default {
		data() {
			var that=this;
			return {
				title: '',
				desc: '',
				uploader: [
					// 'https://img.yzcdn.cn/vant/leaf.jpg',// 不可行
					// { url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
				],

				add_opt_show: false,
				add_txt_show: false,
				add_txt: '',
				add_img_show: false,
				add_img: [
					// { url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
				],

				
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
					// {
					// 	type: 'img',
					// 	content: 'https://img.yzcdn.cn/vant/leaf.jpg',
					// },
					// {
					// 	type: 'text',
					// 	content: '文字',
					// },
				],

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
					},
					{
						name: '插文字',
						img: '/img/icon_img/icon_font@2x.png',
						fn: res=>{
					    	console.log('插文字', res);
							this.add_txt_show=true;
							this.add_type='after';
						},
					},
					{
						name: '插图片',
						img: '/img/icon_img/icon_picture@2x.png',
						fn: res=>{
					    	console.log('插图片', res);
							this.add_img_show=true;
							this.add_type='after';
						},
					},
				],

				submit_ok: false,
			};
		},



		methods: {
			...wjw_com_ts,

			console_log(e){
				console.log(...arguments, this, this.uploader);
			},
		    get_list() {
		        return false
		    },

	        add_txt_confirm(e) {
		    	console.log('add_txt_confirm', arguments, this.add_type);
		    	if(this.add_type=='first'){
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
	        },
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
		    	this.content_list = this.content_list.map(item=>(item.hidden=false, item));
	        },
		    onSubmit(values) {
		    	console.log('submit', values);

	    		var content_list = this.content_list.filter(item=>!item.hidden);
		    	console.log('submit content_list', content_list);
	        },
		},


	}
</script>

<style scoped >
	html,.page{
		height: auto;
	}
	.page{
		/*overflow: hidden;*/
	}
	.form_pd{
		padding: calc(40 / 750 * 100vw);
	}
	.uploader .van-uploader__preview-image{
		background: #f7f8fa;
	}

	.title{
		font-size: 16px;
	}
	.desc{}
	

	.add_opt_box{}
	.add_opt{
		/*padding: calc(20 / 750 * 100vw);*/
	}
	.add_opt+.add_opt{
		margin-left: calc(20 / 750 * 100vw);
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
</style>