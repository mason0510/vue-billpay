<template>
    <div class="page" v-wechat-title="title">

        <!-- 弹出层 round -->
        <van-popup v-model="edit_wx_popup_show" class='add_wx_popup'>
            <div class="add_wx_box ta_c">
                <img src="/img/icon_complete@2x.png" alt="" class="edit_wx_img no_shrink">
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


        <!-- icon_play_white@2x -->
        <swiper class='box-swiper' :options="swiperOption" @slideChange='change' ref='mySwiper'>
            <swiper-slide v-for='(item,index) in lists' :key='index' >
                <div class="video_box">
                    <video id="myVideo"
                           preload
                           ref='video'
                           :src="item.videoUrl"
                           :poster="item.imageUrl"
                           x5-video-player-type="h5"
                           playsinline
                           webkit-playsinline="true"
                           class="video_img no_shrink video-js vjs-default-skin vjs-big-play-centered"
                           @click='pauseVideo'
                           @ended="videoEnd"
                           :class="{landscape:landscape}"
                           @timeupdate="time"
                    >

                    </video>

                    <transition name='boom'>
                        <div class="bg" @click="playVideo" v-show="!playing">
                            <img class="icon-play" src='/img/play.svg'/>
                        </div>
                    </transition>

                    <!--<img :src="video.imageUrl" alt="" class="video_img no_shrink" />-->
                </div>
            </swiper-slide>
        </swiper>

        <div class="author_info_box bxz flex fixed">
            <img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" alt="" class="author_img no_shrink"/>
            <img v-else src="/img/default.png" alt="" class="author_img no_shrink"/>
            <div class="author_info flex_grow flex flex_column flex_jc_b ">
                <div class="author_name">{{ userInfo.nickname }}</div>
                <div class="author_tel" v-if="userInfo.mobile">{{ userInfo.mobile }}</div>
            </div>
            <div class="author_btn flex_c flex_self_c" v-if='is_self==true' @click='jump' data-url='/mine/set'>修改名片
            </div>
            <div class="author_btn flex_c flex_self_c" @click='changeToMe()' v-else>换成我的</div>
        </div>


        <div class="video_info_box fixed box">
            <div class="video_title">@{{ userInfo.nickname }}</div>
            <div class="video_tip">{{ thisVideo.title }}</div>
        </div>

        <!--<div class="video_edit_btn fixed flex_c" @click='edit_wx_popup_show=true, types="mine" ' v-if='types=="else"'>免费变我的视频</div>-->


        <div class="video_btns fixed">
            <div class="video_btn">
                <img src="/img/icon_cat@2x.png" alt="" class="video_btn_img no_shrink"/>
                <div class="video_btn_txt">热卖</div>
            </div>
            <div class="video_btn ">
                <img src="/img/icon_tele_white@2x.png" alt="" class="video_btn_img no_shrink video_btn_tel"
                     @click="call_tel"/>
                <div class="video_btn_txt">电话</div>
            </div>
            <div class="video_btn ">
                <img src="/img/icon_wechat_white@2x.png" alt="" class="video_btn_img no_shrink video_btn_wx"
                     @click="call_wx"/>
                <div class="video_btn_txt">微信</div>
            </div>
            <div class="video_btn">
                <img src="/img/朋友圈@2x.png" alt="" class="video_btn_img no_shrink"/>
                <div class="video_btn_txt">分享</div>
            </div>
        </div>

        <div class="global_btn flex_c fixed_btn" v-if='is_self==false'  @click='changeToMe()' >换成我的</div>

    </div>
</template>

<script>
    import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';


    import 'swiper/css/swiper.css'
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'


    export default {
        components: {
            Swiper,
            SwiperSlide
        },
        data() {
            return {

                swiperOption: {
                    direction: 'vertical'
                },
                search_value: '',
                add_wx_popup_show: false,
                // true
                edit_wx_popup_show: false,
                types: this.$route.query.types || 'else',// mine else
                id: this.getUrlKey('id') || '5ed687a589d2df04a9623365',
                userInfo: {},
                thisVideo: {},
                is_self: false, //是否是自己的视频
                qrCode: {},
                lists: [],
                current: 0,
                playing: false,
                progress: 0,
                landscape: false,
                shareAccounts: [],
                timestamp: (new Date()).valueOf(),
                title:""
            };
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            },
            player() {
                return this.video[this.current];
            }
        },
        watch: {
            lists(newValue, oldValue) {
                this.$nextTick(() => {
                    this.video = this.$refs.video;
                })
            }
        },


        methods: {
            ...wjw_com_ts,
            getVideo() {
                let self = this;
                var uri = "/api/video/show/" + self.id;

                if (self.lists.length>0){
                    return;
                }
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    //console.log(data)
                    let video = data.thisVideo;
                    if (video.tutId == video.loginId) {
                        self.is_self = true;
                        self.add_wx_popup_show = false;
                    } else {
                        self.is_self = false;
                        self.add_wx_popup_show = false;
                    }
                    self.thisVideo = video;
                    self.getTutInfo();
                    self.lists = data.videos;
                    self.openVideo();
                    self.getSign();

                    self.title = video.title;

                });
            },
            getTutInfo() {
                let self = this;
                //获取推广者信息
                var uri = "/api/account/profile/" + self.thisVideo.tutId;
                axios.get(uri).then(function (response) {
                    let data = response.data.data;
                    let userInfo = data;
                    self.userInfo = userInfo;
                });
            },
            changeToMe() {
                let self = this;


                self.$toast.loading({
                    forbidClick: true,
                    loadingType: 'spinner',
                });

                let qrCodeUri = "/api/article/video/qrCode/" + self.thisVideo.shareId + '/' + self.userInfo.appid;

                axios.get(qrCodeUri).then(function (response) {
                    console.log(response.data.data);
                    let data = response.data.data;
                    /*if (data.userId) {
                        self.changeToMeRequire();
                    } else {*/
                        self.qrCode = data;
                        self.edit_wx_popup_show = true;
                    //}
                });

            },
            changeToMeRequire() {
                let self = this;
                let uri = "article/video/change-me/" + self.thisVideo.id + '/2';
                axios.get(uri).then(function (response) {
                    let id = response.data.data;
                    let param = {'id': id};
                    self.$toast.clear();
                    self.$router.push({path: '/article/video_info', query: param});
                });
            },
            openVideo() {
                setTimeout(() => {
                    this.playVideo();
                }, 200)
            },
            call_tel() {
                let self = this;
                if (!this.userInfo.mobile) {
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
                    message: '确定拨打电话：\n' + this.userInfo.mobile + '吗？',
                }).then(() => {
                    // on confirm
                }).catch(() => {
                    // on cancel
                });
            },
            call_wx() {
                let self = this;
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
            change() {
                this.landscape = false;
                let index = this.swiper.activeIndex;
                this.thisVideo = this.lists[index];

                this.playing ? this.player.pause() : this.playing = !this.playing;
                this.current = index;
                this.player.play();
                this.landscape = true;

                this.title = this.thisVideo.title;



                let self = this;
                let uri = "article/video/change-me/" + self.thisVideo.id + '/2';
                axios.get(uri).then(function (response) {
                    let id = response.data.data;
                    //self.$router.push({path: '/article/video_info', query: {'id':id}});

                    self.thisVideo.shareId = id;
                    self.getSign();
                });
            },
            playVideo() {
                this.playing = true;
                this.player.play();
            },
            pauseVideo() {
                this.playing = false;
                this.player.pause()
            },
            videoEnd() {
                this.playing = false;
            },
            time() {
                let h = this.player.videoHeight;
                let w = this.player.videoWidth;
                if (h && w) {
                    h > w ? this.landscape = 0 : this.landscape = true
                }
                let duration = this.player.duration;
                let currentTime = this.player.currentTime;
                this.progress = ((currentTime / duration).toFixed(2)) * 100 + '%';
            },
            async getSign() {
                let self = this;
                if (self.shareAccounts.length == 0) {
                    self.shareAccounts = await this.shareAccount();
                }
                let shareConf = self.shareAccounts['video'];
                let shareUrl = shareConf['domain']+self.thisVideo.shareId+"?appid=wxfbc908f16bf393a5";
                let host = location.href;
                var url = encodeURIComponent(host);
                this.getSignByAppid(shareConf['appId'],url,function (result) {
                    let data = result.data;
                    var title = self.thisVideo.title;
                    var desc = self.thisVideo.describe;
                    var imgUrl = self.thisVideo.imageUrl;
                    self.wxShareInfo(data, title, desc, shareUrl, imgUrl,self.thisVideo.id,2,false);
                    console.log(result);
                    self.createCustomer();
                });
            },


            createCustomer() { //创建数据
                let self = this;
                let form = self.getUrlKey('from');
                if (form) {
                    let postData = {
                        articleId: self.thisVideo.id, spreadId: self.thisVideo.spreadId,
                        authorId: self.thisVideo.tutId, userId: self.thisVideo.loginId, form: form, type: 2
                    };
                    let url = '/api/customer-cue/store';
                    axios.post(url, postData)
                        .then(function (response) {
                            let data = response.data;
                            self.doTime(self.thisVideo.spreadId, self.thisVideo.id, self.timestamp);
                        })
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                }
            },
        },
        mounted() {
            this.getVideo();
        },
    }
</script>

<style scoped>
    /*padding: calc(40 / 750 * 100vw);*/
    /*background: #EEF0F4;*/
    .page {
        margin: 0;
    }

    .box-swiper {
        width: 100vw;
        height: 100vh;
        background: #000;
        overflow: hidden;
    }

    .video_box {
        margin: 0;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .video_img {
        margin: 0;

        height: 100%;
        width: 100%;

        objectFit: contain;
        /*width: 100vw;
        height: 100vh;*/
    }

    .bg {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        /*width:1.5rem;*/
    }

    .bg .icon-play {
        animation: zoom .1s;
        width: 1.5rem;
        opacity: .3;
    }

    .author_info_box {
        position: absolute;
        width: 100%;
        padding: calc(31 / 750 * 100vw) calc(40 / 750 * 100vw);
        top: 0;
        left: 0;
        z-index: 999;
    }

    .author_img {
        width: calc(98 / 750 * 100vw);
        height: calc(98 / 750 * 100vw);
        border-radius: 50%;
        margin-right: calc(22 / 750 * 100vw);
    }

    .author_info {
    }

    .author_name {
        font-size: calc(32 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    .author_tel {
        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    .author_btn {
        /*width:calc(144 / 750 * 100vw);*/
        padding: calc(16 / 750 * 100vw);
        height: calc(64 / 750 * 100vw);
        background: rgba(255, 164, 74, 1);
        border-radius: calc(32 / 750 * 100vw);

        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    .video_info_box {
        width: 100%;
        padding-left: calc(40 / 750 * 100vw);
        bottom: calc(160 / 750 * 100vw);
        left: 0;
        position: absolute;
        z-index: 999;
    }

    .video_title {
        font-size: calc(36 / 750 * 100vw);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
    }

    .video_tip {
        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-top: calc(24 / 750 * 100vw);
    }

    .video_edit_btn {
        bottom: 0;
        left: 0;
        margin: 0 calc(40 / 750 * 100vw);
        margin-bottom: calc(50 / 750 * 100vw);
        width: calc(670 / 750 * 100vw);
        height: calc(88 / 750 * 100vw);
        background: rgba(255, 74, 90, 1);
        border-radius: calc(8 / 750 * 100vw);

        font-size: calc(36 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);

    }

    .video_btns {
        bottom: 0;
        right: 0;
        padding-right: calc(40 / 750 * 100vw);
        padding-bottom: calc(160 / 750 * 100vw);
        z-index: 999;
    }

    .video_btn {
        margin-top: calc(64 / 750 * 100vw);
    }

    .video_btn_img {
        width: calc(60 / 750 * 100vw);
        height: calc(60 / 750 * 100vw);
        margin-bottom: calc(16 / 750 * 100vw);
    }

    .video_btn_txt {
        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    .video_btn_tel {
        width: calc(56 / 750 * 100vw);
        height: calc(56 / 750 * 100vw);
    }

    .video_btn_wx {
        width: calc(70 / 750 * 100vw);
        height: calc(56 / 750 * 100vw);
    }

    .add_wx_popup {
        border-radius: calc(8 / 750 * 100vw);
    }

    .add_wx_box {
        overflow: hidden;
        padding: 0 calc(105 / 750 * 100vw);
    }

    .add_wx_img {
        width: calc(350 / 750 * 100vw);
        height: calc(350 / 750 * 100vw);
        margin-top: calc(80 / 750 * 100vw);
    }

    .add_wx_tip {
        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin: calc(40 / 750 * 100vw) 0;
    }

    .edit_wx_img {
        width: calc(80 / 750 * 100vw);
        height: calc(80 / 750 * 100vw);
        margin-top: calc(64 / 750 * 100vw);
    }

    .mt0 {
        margin-top: 0;
    }

    .edit_wx_tip {
        margin-top: calc(24 / 750 * 100vw);
        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
    }


</style>
