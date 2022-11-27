<template>
  <div id="app" v-wechat-title="$route.meta.title">
  	<!-- <body > -->
	  	<!-- 引入app页面 次数 -->
	    <router-view :key='key_fn' />
	    <router-view name='footer' />
  	<!-- </body> -->
  </div>
</template>
<script>

</script>

<script>

	export default {
		name: 'App',
		computed: {

		    key_fn() {
				return this.$route.name?this.$route.name+ +new Date():this.$route+ +new Date();
		    },

		},


	}
</script>
<style >
	/*calc(222 / 750 * 100vw)*/
	body{
		height: auto !important;
	}
	input{
		background: transparent;
		border: none;
		height: 100%;
	}


	/* 按钮 */
	.global_btn{
		margin: calc(30 / 750 * 100vw);
		width:calc(690 / 750 * 100vw);
		height:calc(88 / 750 * 100vw);
		background:rgba(255,74,90,1);
		border-radius:calc(8 / 750 * 100vw);

		font-size:calc(36 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);

	}

	/*
		<div class="relative   no_shrink ">
			<img class="news_img no_shrink video_img" :src="video.imageUrl" />
			<div class=" play_box mask_bg ">
				<img src="@/../public/img/icon_play_white@2x.png" alt="" class="play_icon">
			</div>
		</div>
	*/
	.play_box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.play_icon{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;


		width: calc(120 / 750 * 100vw);
		height: calc(120 / 750 * 100vw);

	}

	.play_icon2{
		width: calc(64 / 750 * 100vw);
		height: calc(64 / 750 * 100vw);

	}




	/* 警告提示 */
	.warn_tip{
		/*width:calc(750 / 750 * 100vw);*/
		height:calc(72 / 750 * 100vw);
		padding: 0 calc(40 / 750 * 100vw);
		background:rgba(255,164,74,0.1);
		background: #FEF5EB;
		top: 0;
	}
	.warn_tip_icon{
		width: calc(36 / 750 * 100vw);
		height: calc(36 / 750 * 100vw);
		margin-right: calc(16 / 750 * 100vw);
	}
	.warn_tip_txt{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,164,74,1);
	}
	.warn_tip_close{
		width: calc(28 / 750 * 100vw);
		height: calc(28 / 750 * 100vw);
	}
	.page{
		min-height: 100vh;
	}




	/* vant -------------------------- */

	.van-list__loading,
	.van-list__finished-text{
		width: 100%;
	}


	div.van-uploader__preview-image{
		width: 100%;
		height: 100%;
		border-radius: 0;
	}
	div.van-uploader__preview{
		margin: 0;
	}

	.van-dialog{
		/*border-radius: calc(8 / 750 * 100vw);*/
		/*width: calc(540 / 750 * 100vw);*/
	}


</style>
