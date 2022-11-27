<template>
    <div class="page">

        <div class="search_box flex ">
            <div class="search flex flex_align_c">
                <a-icon class="search_icon" type="search"/>
                <input class="search_input bg_tr bd_0 flex_grow" required placeholder="输入关键字搜索文章或视频" v-model.trim="keyword"/>

                <i class="van-icon van-icon-clear" @click="clearKeyword"  v-if="keyword"></i>
            </div>

            <div class='search_false no_shrink flex_grow flex_c' @click='jump($event)' data-url='/material'>取消</div>
        </div>

        <div v-if="isShow">
            <div class="menu_box flex">
                <van-tabs class='menu_bar '
                          v-model="menu_index"
                          @change='changeTab'
                          title-active-color='#333333'
                          title-inactive-color='#999999'
                          background='transparent'
                          lineWidth='calc(32 / 750 * 100vw)'
                          lineHeight='calc(4 / 750 * 100vw)'
                          color='#FF4A5A'
                          :border='false'
                >
                    <van-tab class='menu_item' v-for="(menu_item,index) in menu" :key='index'
                             :title="menu_item"></van-tab>
                </van-tabs>
            </div>

            <div class="new_list_empty flex_c " v-if='article_list.length==0 && video_list.length==0'>
                <div>
                    <div>没有搜索到内容</div>
                    <div>换个关键词试试吧</div>
                </div>
            </div>

            <van-list
                    v-if="menu_index==0"
                    class="new_list"
                    v-model="article_list_loading"
                    :finished="article_list_finished"
                    finished-text="没有更多了"
                    @load="get_article_list"
            >

                <div class="new_li flex flex flex_jc_b" v-for="(item,index) in article_list" :key='index' @click="jump"
                     data-url="/article" :data-id='item.id'>
                    <div class="new_info  flex flex_column">
                        <!-- <div class="new_title txt_over_ell">{{news.title}}</div> -->
                        <!-- flex_grow -->
                        <div class="new_txt ">{{ item.title }}</div>
                        <div class="new_tips">
                            <img src="@/../static/img/share.png" alt="" class="new_icon">
                            <span class="new_num">{{ item.shareNum }}人分享</span>
                        </div>
                    </div>
                    <img class="news_img no_shrink" :src="item.imageUrl"/>
                </div>
            </van-list>

            <!-- v-if='menu_index==1' -->
            <van-list
                    v-if="menu_index==1"
                    class="new_list flex flex_wrap"
                    v-model="video_list_loading"
                    :finished="video_list_finished"
                    finished-text="没有更多了"
                    @load="get_video_list"
            >

                <div class="new_li video_li" v-for="(item,index) in video_list" :key='index' @click="jump2"
                     data-url="/article/video_info" :data-id='item.id'>
                    <img class="news_img no_shrink video_img" :src="item.imageUrl"/>
                    <!-- <div class="new_title txt_over_ell">{{news.title}}</div> -->
                    <!-- flex_grow -->
                    <div class="new_info video_info">
                        <div class="new_txt txt_over_ell_3 video_txt">{{ item.title }}</div>
                        <div class="new_tips video_tips">
                            <img src="@/../public/img/share.png" alt="" class="new_icon">
                            <span class="new_num">{{ item.shareNum }}人分享</span>
                        </div>
                    </div>
                </div>
            </van-list>

        </div>

    </div>
</template>

<script>
    import wjw_com_ts from '@/../public/common/wjw_uni/wjw_com_ts.js';
    import axios from 'axios';

    //节流函数
    const delay = (function () {
        let timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    export default {
        data() {
            return {
                keyword: '',
                menu: [
                    '文章',
                    '视频',
                ],
                menu_index: 0,

                article_list_loading: false,
                articleBefore: 0,
                article_list_finished: false,
                article_list: [],

                video_list_loading: false,
                videoBefore: 0,
                video_list_finished: false,
                video_list: [],
                isShow:false

            };
        },
        watch: {
            //watch title change
            keyword() {
                delay(() => {
                    this.search();
                }, 200);
            },
        },


        methods: {
            ...wjw_com_ts,

            clearKeyword() {
                this.keyword = "";
            },
            changeTab() {
                if (this.menu_index == 0) {
                    this.article_list_loading = false;
                    this.articleBefore = 0;
                    this.article_list_finished = false;
                    this.article_list = [];
                }else if (this.menu_index == 1) {
                    this.video_list_loading = true;
                    this.videoBefore = 0;
                    this.video_list_finished = false;
                    this.video_list = [];
                    this.get_video_list();
                }

                //this.search();
            },
            search() {
                if (!this.keyword) {
                    this.isShow = false;
                    return;
                }
                this.isShow = true;
                if (this.menu_index == 0){
                    this.articleBefore = 0;
                    this.article_list = [];
                    this.article_list_loading = true;
                    this.article_list_finished = false;
                    if(this.article_list_loading==true){
                        this.get_article_list();
                    }

                }else{
                    this.video_list_loading = false;
                    this.videoBefore = 0;
                    this.video_list_finished = true;
                    this.video_list = [];
                    this.get_video_list();
                }
            },
            get_video_list() {
                let self = this;
                if (self.keyword) {
                    let params = {videoBefore: self.videoBefore, keyword: self.keyword};
                    axios.post('video/list', params).then(function (response) {
                        let data = response.data.data;
                        // self.video_list = data.videos;
                        self.video_list = [...self.video_list, ...data.videos];
                        self.videoBefore = data.videoBefore;
                        self.video_list_loading = false;
                        data.videos.length == 0 && (self.video_list_finished = true);
                    });
                }

            },
            // getList
            get_article_list() {
                let self = this;
                if (self.keyword) {
                    let params = {articleBefore: self.articleBefore, keyword: self.keyword};
                    axios.post('article/list', params).then(function (response) {
                        let data = response.data.data;
                        self.article_list = [...self.article_list, ...data.articles];
                        self.articleBefore = data.articleBefore;
                        self.article_list_loading = false;
                        data.articles.length == 0 && (self.article_list_finished = true);
                    });
                }
            },
            jump2(e) {
                this.jump(e);
            },
        },


    }
</script>

<style scoped>
    .page {
        /*background: #EEF0F4;*/
    }

    .van-icon{
        right:3vw;
        font-size: calc(40 / 750 * 100vw);
    }

    .search_input:focus + .van-field__clear {
        display: block;
    }

    .search_box {
        padding: calc(40 / 750 * 100vw);
    }

    .search {
        width: calc(590 / 750 * 100vw);
        height: calc(72 / 750 * 100vw);
        background: rgba(247, 247, 247, 1);
        border-radius: calc(40 / 750 * 100vw);

        font-size: calc(28 / 750 * 100vw);
        box-sizing: border-box;
        color: #CCCCCC;
    }

    .search_icon {
        margin: 0 calc(32 / 750 * 100vw);
    }

    .search_input {
        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        /*color:rgba(204,204,204,1);*/
    }

    /*::-webkit-input-placeholder*/
    .search_input::placeholder {
        color: #CCCCCC;
    }

    .search_false {
        border: 0;
        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
    }

    .menu_box {
    }

    .menu_bar {
        /*width: calc(300 / 750 * 100vw);*/
    }

    .menu_bar >>> .van-tabs__nav {
        padding: 0 calc(20 / 750 * 100vw);
        margin-left: calc(40 / 750 * 100vw);
        margin-right: calc(64 / 750 * 100vw);
    }

    .menu_item {

    }

    .menu_bar >>> .van-tab {
        flex-basis: auto !important;
        padding: 0;
    }

    .menu_bar >>> .van-tab + .van-tab {
        margin-left: calc(64 / 750 * 100vw);
    }

    .menu_bar >>> [aria-selected="true"] .van-tab__text {
        /*width:calc(72 / 750 * 100vw);*/
        /*height:calc(36 / 750 * 100vw);*/
        font-size: calc(36 / 750 * 100vw);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
    }

    .menu_item_now {
        font-size: calc(32 / 750 * 100vw);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        color: yellow;
    }

    .menu_bar >>> .van-tabs__line {
        bottom: 0;
    }

    .head_btns {

    }

    .search_btn {
        width: calc(222 / 750 * 100vw);
        height: calc(72 / 750 * 100vw);
        background: rgba(247, 247, 247, 1);
        border-radius: calc(40 / 750 * 100vw);
        margin-right: calc(32 / 750 * 100vw);
    }

    .edit_btn {
        margin-right: calc(32 / 750 * 100vw);
        width: calc(160 / 750 * 100vw);
        height: calc(72 / 750 * 100vw);
        background: rgba(255, 74, 90, 1);
        border-radius: calc(40 / 750 * 100vw);
        border: calc(1 / 750 * 100vw) solid rgba(255, 74, 90, 1);

        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);

        padding: 0;

    }

    .sort_box {
        /*overflow: scroll;*/
    }

    .sort_bar {
        width: 0;
    }

    .sort_item {
        /*width:calc(112 / 750 * 100vw);*/
        /*padding: 0 calc(20 / 750 * 100vw);*/
        font-size: calc(28 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
    }

    .sort_more {
        padding: 0 calc(40 / 750 * 100vw);
    }

    /* new_list */
    .new_list_empty {
        font-size: calc(24 / 750 * 100vw);
        line-height: calc(40 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);

        height: calc(100vh - 150px);
    }

    .new_list {
    }

    .new_li {
        padding: calc(56 / 750 * 100vw) calc(40 / 750 * 100vw) calc(24 / 750 * 100vw);
        border-bottom: calc(1 / 750 * 100vw) solid rgba(245, 245, 245, 1);
        min-height: 100px;  /*限制最小高度*/
    }

    .new_info {
        display: inline-block;
        width: calc(398 / 750 * 100vw);
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
        font-size: calc(32 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: calc(48 / 750 * 100vw);
    }

    .new_tips {

    }

    .new_icon {
        width: calc(28 / 750 * 100vw);
        height: calc(28 / 750 * 100vw);
    }

    .new_num {
        height: calc(24 / 750 * 100vw);
        font-size: calc(24 / 750 * 100vw);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: calc(24 / 750 * 100vw);
    }

    .news_img {
        width: calc(240 / 750 * 100vw);
        height: calc(160 / 750 * 100vw);
        /*vertical-align: top;*/
        /*margin-left: calc(32 / 750 * 100vw);*/
    }

    .video_li {
        overflow: hidden;
        padding: 0;
        width: calc(319 / 750 * 100vw);
        /*height:calc(474 / 750 * 100vw);*/
        background: rgba(247, 247, 247, 1);
        border-radius: calc(8 / 750 * 100vw);
        margin-top: calc(32 / 750 * 100vw);
        margin-left: calc(32 / 750 * 100vw);
    }

    .video_img {
        margin-left: 0;
        width: 100%;
        /*width:calc(319 / 750 * 100vw);*/
        height: calc(240 / 750 * 100vw);
    }

    .video_info {
        margin: calc(24 / 750 * 100vw);
        width: auto;
    }

    .video_txt {
        margin-bottom: calc(32 / 750 * 100vw);
    }

    .video_tips {
    }

    .van-list__finished-text {
        width: 100%;
    }


</style>
