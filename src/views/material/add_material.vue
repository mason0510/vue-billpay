<template>
	<div class="page">
		<div class="opts">
			<!-- :style="{backgroundImage: opt.bg_img}" -->
			<div class="opt_box  flex flex_align_c " 
				v-for="(opt,index) in list" :key='index' 
				:style="{backgroundColor:opt.bg_color}" 
				@click='jump' :data-url='opt.url'
				>
				<!-- <img :src="require('@/../public/img/add_material_bg1.png')" class="bg_img" alt="" v-if='opt.bg_img'> -->
				<img :src="opt.bg_img" class="bg_img" alt="" v-if='opt.bg_img'>
				<div class="opt_info">
					<div class="opt_name">{{opt.title}}</div>
					<div class="opt_tip">{{opt.txt}}</div>
				</div>
			</div>

			<!-- 测试 --------------------- -->
			<!-- 
			<div class="opt_box  flex flex_align_c " 
				>
				<img src="../../../public/img/add_material_bg2.png" class="bg_img" alt="">
			</div>
			<div class="opt_box  flex flex_align_c " 
				>
				<img :src="require('@/../public/img/add_material_bg1.png')" class="bg_img" >
			</div>
			<div class="opt_box  flex flex_align_c " 
				>
				<img src="@/../public/img/add_material_bg1.png" class="bg_img" >
			</div>


			<img src="http://webh5.wangjiangwei.top/logo/lianmaile.ico" class="bg_img" >
			<img src="http://webh5.wangjiangwei.top/logo/123.ico" class="bg_img" >
			 -->
			<!-- <img :src="require('http://webh5.wangjiangwei.top/logo/lianmaile.ico')" class="bg_img" > -->
			<!-- 测试 --------------------- -->






		</div>
	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';

	export default {
		data() {
			return {
				list: [
					//
					{
						title: '复制文章/视频链接',
						txt: '支持公众号、抖音、快手',
						// bg_img: '@/../public/img/add_material_bg1.png',
						bg_img: '/img/add_material_bg1.png',
					},
					{
						title: '编辑文章',
						txt: '自由编辑文字内容和图片',
						// bg_img: '@/../public/img/add_material_bg2.png',
						bg_img: '/img/add_material_bg2.png',
						url: '/article/add',
					},
					{
						title: '我的文章/视频',
						txt: '写过的、分享过的素材都在这里',
						bg_color: '#FFA44A',
						url: '/material/mine',
					},


					/* 测试
					{
						bg_img: '@/../public/img/add_material_bg1.png',
					},
					{
						bg_img: '/img/add_material_bg2.png',
					},
					{
						bg_img: '../../../public/img/add_material_bg2.png',
					},
					// {
					// 	bg_img: require('/img/add_material_bg2.png'),// 报错
					// },
					// {
					// 	bg_img: require('/public/img/add_material_bg2.png'),
					// },
					*/




				],
			};
		},



		methods: {
			...wjw_com_ts,
		},


	}
</script>

<style scoped >
	.page{
		background: white;
		padding: calc(40 / 750 * 100vw);
	}
	.opts{

	}
	.opt_box{
		height: calc(280 / 750 * 100vw);
		position: relative;
		margin-bottom: calc(40 / 750 * 100vw);
		border-radius: calc(8 / 750 * 100vw);
	}
	.bg_img{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
	}
	.opt_info{
		position: relative;
		z-index: 1;
		margin-left: calc(40 / 750 * 100vw);
	}
	.opt_name{
		font-size:calc(32 / 750 * 100vw);
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-bottom: calc(24 / 750 * 100vw);
	}
	.opt_tip{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
</style>