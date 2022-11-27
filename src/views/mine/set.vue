<template>
	<div class="page">

		<div class="mine_list">
			<div class="mine_li flex flex_ac">
				<div class="mine_li_name flex_grow no_shrink">头像</div>
				<van-uploader ref='uploader_port' :after-read="onRead" class="mine_li_port no_shrink dn" />
				<img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" alt=""  class="mine_li_port no_shrink" @click='chooseFile_port'>
				<img v-else src="/img/default.png" alt=""  class="mine_li_port no_shrink" @click='chooseFile_port'>

			</div>
			<div class="mine_li flex flex_ac">
				<div class="mine_li_name flex_grow no_shrink">姓名</div>
				<van-field placeholder="请填写"  class="mine_li_input" input-align='right' v-model="userInfo.nickname" />
			</div>
		</div>


		<div class="mine_list">
			<div class="mine_li flex flex_ac">
				<div class="mine_li_name flex_grow no_shrink">手机号码</div>
				<van-field placeholder="请填写" v-model="userInfo.mobile"  class="mine_li_input" input-align='right' />
			</div>
			<div class="mine_li flex flex_ac">
				<div class="mine_li_name flex_grow no_shrink">上传微信二维码</div>
				<van-uploader ref='uploader_qrcode' :after-read="onReadQrcode"  class="mine_li_img no_shrink dn"/>
				<img v-if="userInfo.qrCode" :src="userInfo.qrCode" alt=""  class="mine_li_img no_shrink" @click='chooseFile_qrcode'>
				<img v-else src="/img/二维码@2x.png" alt="" class="mine_li_img no_shrink" @click='chooseFile_qrcode'>
			</div>
		</div>

		<div class="mine_area">
			<div class="mine_area_title flex flex_ac">个人简介</div>
			<van-field
			  class='mine_area_textarea'
			  rows="10"
			  autosize
			  type="textarea"
			  placeholder="请输入个人简介"
			  v-model="userInfo.signature"
			  maxlength="200"
			  show-word-limit
			/>
		</div>

		<div class="mine_submit flex_c" @click='updateInfo'>确定修改</div>


	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios'
    import { Toast } from 'vant';

	export default {
		data() {
			return {
                userInfo:{
                    signature:'',
				},
			};
		},



		methods: {
			...wjw_com_ts,

			chooseFile_port() {
                setTimeout(()=>{
					this.$refs.uploader_port.chooseFile();
                },0)
			},

			chooseFile_qrcode() {
                //console.log('chooseFile', this.$refs);
                //this.fileList_qrcode = [];
                setTimeout(()=>{
					this.$refs.uploader_qrcode.chooseFile();
                },0)
			},

            getUserInfo() {
                let self = this;
                axios.get('account/profile').then(function (response) {
                    let data = response.data.data;
                    self.userInfo = data;
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
            },
			updateInfo(){
			    let self = this;
			    let uri ="account/update";
			 	axios.post(uri,self.userInfo).then(function (response) {
                    Toast.success('更新用户成功！');
                    self.goBack();
                }).catch(err => {
                    //var error = err.response.da;
                    let data = err.response.data;
                    Toast.fail(data.error.msg);
                    reject(err)
                });
			},
            onRead(file) {
			    let self = this;
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
				console.log(file.file);


                self.instance.post('/api/upload',formData).then(res => {
                   self.userInfo.headimgurl = res.data.url
                }).catch(err => {
                    alert(err)
                });
            },
            onReadQrcode(file) {
                let self = this;
                var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
                formData.append('file', file.file); //接口需要传的参数
                self.instance.post('/api/upload',formData).then(res => {
                    self.userInfo.qrCode = res.data.url
                }).catch(err => {
                    alert(err)
                });
            }
		},
        mounted() {
            this.getUserInfo();
        },
	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
	}

	.mine_list{
		padding: 0 calc(30 / 750 * 100vw);
		border-bottom: calc(20 / 750 * 100vw) solid  rgba(248,248,248,1);
	}
	.mine_li{
		height: calc(92 / 750 * 100vw);
		border-bottom: calc(2 / 750 * 100vw) solid  rgba(236,236,236,1);
	}
	.mine_li:last-child{
		border-bottom: none;
	}
	.mine_li_name{
		font-size:calc(28 / 750 * 100vw);
		line-height:calc(40 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.mine_li_input{
		height: 100%;
		width: 50%;
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.mine_li_port{
		width:calc(56 / 750 * 100vw);
		height:calc(56 / 750 * 100vw);
		border-radius: 50%;
	}
	.mine_li_img{
		width:calc(40 / 750 * 100vw);
		height:calc(40 / 750 * 100vw);
	}

	.mine_area{
		padding: 0 calc(30 / 750 * 100vw);
	}
	.mine_area_title{
		height: calc(90 / 750 * 100vw);
		font-size:calc(32 / 750 * 100vw);
		line-height:calc(45 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.mine_area_textarea{
		/*height:calc(448 / 750 * 100vw);*/
		border:calc(2 / 750 * 100vw) dashed rgba(222,222,222,1);
		padding: calc(16 / 750 * 100vw);
		box-sizing: border-box;

		font-size:calc(28 / 750 * 100vw);
		line-height:calc(40 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}

	.mine_submit{
		margin: calc(30 / 750 * 100vw);
		margin-top: calc(142 / 750 * 100vw);
		margin-bottom: calc(30 / 750 * 100vw);
		width:calc(690 / 750 * 100vw);
		height:calc(88 / 750 * 100vw);
		background:rgba(255,74,90,1);
		border-radius:calc(8 / 750 * 100vw);

		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}


</style>
