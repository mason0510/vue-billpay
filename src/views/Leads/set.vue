<template>
	<div class="page">


		<div class="set_title">谁看我消息提醒设置</div>
		<div class="set_list">

			<van-radio-group v-model="seeMe" @change="changeSeeMeChecked">
			<div class="set_li flex flex_ac">
				<!-- 通过icon-size属性可以自定义图标的大小 -->
				<van-radio class="set_li_check" checked-color="#FF4A5A" icon-size='calc(36 / 750 * 100vw)'
							  name="0"
				>
					<div class="flex">
						<div class="set_li_txt no_shrink">立即提醒我</div>
					</div>
				</van-radio>
			</div>
			<div class="set_li flex flex_ac">
				<van-radio class="set_li_check" checked-color="#FF4A5A"
							  icon-size='calc(36 / 750 * 100vw)'
							  name="1"
				>
					<div class="flex">
						<div class="set_li_txt no_shrink">勿扰模式</div>
						<div class="set_li_tip no_shrink">（5分钟汇总提醒，23:00-5:30不提醒）</div>
					</div>
				</van-radio>
			</div>
			<div class="set_li flex flex_ac">
				<van-radio class="set_li_check" checked-color="#FF4A5A" icon-size='calc(36 / 750 * 100vw)'
							name="2"
				>
					<div class="flex">
						<div class="set_li_txt no_shrink">关闭消息提醒</div>
					</div>
				</van-radio>
			</div>
			</van-radio-group>

		</div>

		<div class="hot_title">热门文章推送</div>
		<div class="hot_list">


			<div class="hot_li flex set_li flex flex_ac" v-for="(item,index) in pushSettings">
				<div class="hot_li_txt set_li_txt no_shrink">{{ item.title }}</div>
				<div class="hot_li_tip flex_grow set_li_tip no_shrink">（{{ item.startTime }}-{{ item.endTime }}推送）</div>
				<!--
					自定义大小
					通过size属性自定义开关的大小
					自定义颜色
					active-color属性表示打开时的背景色，inactive-color表示关闭时的背景色
					active-color="#07c160" inactive-color="#ee0a24"
				-->
				<van-switch class="hot_li_check" active-color='#44E4CA' inactive-color="#D9D9D9"  size='calc(40 / 750 * 100vw)'
							v-bind:value="isCheckedPush(item.id)"
							@change="changeTitleChecked(item,$event)" />
			</div>


		</div>

	</div>
</template>

<script>
	import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

	export default {
		data() {
			return {
				search_value: '',
                seeMe:"0",
                pushSettings:[],
                regularIds:[]
			};
		},



		methods: {
			...wjw_com_ts,

		    getPushSetting() {
                let self = this;
                axios.get('account/push/setting').then(function (response) {
                    let data = response.data.data;
                    self.pushSettings = data.messages;
                    self.regularIds = data.regularIds;
                    self.seeMe = data.seeMe+"";
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
		    },
            changeTitleChecked(item,$event){
                if (this.regularIds.indexOf(item.id) === -1) {
                    this.regularIds.push(item.id);
                } else {
                    this.regularIds.splice(this.regularIds.indexOf(item.id), 1);
                }
                this.setPush();
            },
            isCheckedPush(id){
                let self = this;
                var _listItem = self.regularIds;
                return _listItem.indexOf(id) != -1 ? true : false;
			},
            setPush() {
                let self = this;
                axios.post('account/push/setting',{regularIds:self.regularIds}).then(function (response) {
                    let data = response.data.data;
                    console.log(data);
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
            },
            changeSeeMeChecked(){
			    console.log(this.seeMe);
			    let uri = "account/push/see/"+this.seeMe;
                axios.put(uri).then(function (response) {
                    let data = response.data.data;
                    console.log(data);
                }).catch(err => {
                    Toast.fail('系统异常');
                    reject(err)
                });
			}
		},
        mounted() {
            this.getPushSetting();
        }

	}
</script>

<style scoped >
	/*padding: calc(40 / 750 * 100vw);*/
	/*background: #EEF0F4;*/
	.page{
		padding: calc(40 / 750 * 100vw);
	}


	.set_title{
		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);

		padding: calc(40 / 750 * 100vw) 0;
	}
	.set_list{}
	.set_li{
		height: calc(80 / 750 * 100vw);

	}
	.set_li_check{
		/*font-size: calc(36 / 750 * 100vw);*/

	}
	.set_li_txt{


		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;

		color: #333333;

		/*margin-right: calc(20 / 750 * 100vw);*/
	}
	.set_li_tip{


		font-size:calc(28 / 750 * 100vw);
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;

		color: #999999;
	}

	.hot_title{
		margin-top: calc(40 / 750 * 100vw);
	}
	.hot_list{}
	.hot_li{}
	.hot_li_txt{}
	.hot_li_tip{}
	.hot_li_check{}


</style>
