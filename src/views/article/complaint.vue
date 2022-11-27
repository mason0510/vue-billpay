<template>
	<div class="page m_lr_40">

		<div class="complaint_list">
			<div class="complaint_list_tip">请选择投诉原因</div>
			<div class="complaint_li flex flex_align_c "
					v-for="(item,index) in complaintList" :key='index'
				 	:class='item.name==form.type?"complaint_li_is":""'
				 	@click="checkedComplaint(item)"
				>
				<div class="complaint_li_txt flex_grow">{{ item.name }}</div>
				<img src="/img/icon_choose@2x.png" alt="" class="complaint_li_icon no_shrink">
			</div>
		</div>

		<div class="complaint_desc_box">
			<div class="complaint_desc_title">投诉描述</div>
			<van-field
					class='complaint_desc_area'
					v-model="form.body"
					rows="3"
					autosize
					type="textarea"
					maxlength="200"
					placeholder="请输入投诉内容"
					show-word-limit
			/>
		</div>


		<div class="complaint_img_box">
			<!-- :max-count='1' -->
			<!--<van-uploader class='complaint_img uploader' :before-delete="deleteImg" v-model="form.imageUrlArr" :after-read="onReadQrcode" upload-text='上传证据' upload-icon='plus' multiple />-->

			<!--<div class="posting-uploader">

			</div>-->

			<div class="posting-uploader-item" v-for="imageUrl in form.imageUrlArr">
				<img :src="imageUrl" alt="图片" class="imgPreview">
				<van-icon name="close" @click="deleteImg(imageUrl)" class="van-icon van-icon-clear __preview-delete"/>
			</div>
			<van-uploader :after-read="onReadQrcode" :accept="'image/*'" v-show="form.imageUrlArr.length<=4" upload-icon='plus' upload-text='上传证据'>
			</van-uploader>
		</div>



		<div class="complaint_btn classify_submit_btn flex_c mb_0" @click='submitComplain'>提交</div>


	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

	export default {
		data() {
			return {
                complaintList:[],
                form: {
                    type: '',
                    imageUrlArr:[],
                    articleVideoId:this.getUrlKey('id')||'',
                    body:'',
                    emailMobile:''
                },
			}
		},


        methods: {
            ...wjw_com_ts,

            getComplaintList() {
                let self = this;
                let uri = "/api/complaint/list";
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    //console.log(data);
                    self.complaintList = data;
                });
            },
            checkedComplaint(item) {
                this.form.type = item.name;
            },
            onReadQrcode(file) {
                let self = this;
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                self.instance.post('/api/upload',formData).then(res => {
                    //self.userInfo.qrCode = res.data.url
					self.form.imageUrlArr.push(res.data.url);
                }).catch(err => {
                    alert(err)
                });
            },
            deleteImg(file) {
                this.form.imageUrlArr.splice(this.form.imageUrlArr.indexOf(file), 1);
            },
            submitComplain() {
                let self = this;
                let uri = "/api/complaint/article/video";
                axios.post(uri, self.form).then(res => {
                    self.goBack();
                }).catch(err => {
                    alert(err)
                });
            }
        },

        mounted() {
            this.getComplaintList();
        }
    }
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}
	.m_lr_40{
		margin: 0 calc(40 / 750 * 100vw);
	}


	.complaint_list{
		margin-bottom: calc(32 / 750 * 100vw);
	}
	.complaint_list_tip{
		padding: calc(40 / 750 * 100vw) 0;
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.complaint_li{
		height: calc(92 / 750 * 100vw);
		border-bottom: 1px solid  rgba(231,231,231,1);
	}
	.complaint_li_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.complaint_li_icon{
		display: none;
		width:calc(32 / 750 * 100vw);
		height:calc(24 / 750 * 100vw);
	}
	.complaint_li_is{}
	.complaint_li_is
	.complaint_li_icon{
		display: block;
	}

	.complaint_desc_box{
		margin-bottom: calc(40 / 750 * 100vw);

	}
	.complaint_desc_title{
		padding: calc(32 / 750 * 100vw) 0;
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.complaint_desc_area{
		background:rgba(247,247,247,1);
		border-radius:calc(8 / 750 * 100vw);
		padding: 0 calc(24 / 750 * 100vw);
		padding: calc(24 / 750 * 100vw);
	}

	.complaint_img_box{
		margin-bottom: calc(152 / 750 * 100vw);

	}
	.complaint_img{}

	.complaint_btn{}
	.complaint_btn_tips{}



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
