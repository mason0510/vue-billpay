<template>
  <div class="box">
    <div class="home">
      <div class="home-head">
        <!-- <img src="img/logo.jpg" class="home-head-img va_m"> -->
        <span class="home-head-title va_m">项目页面</span>
      </div>
      <div class="home-lists">
        <div class="home-list">
          
          <div
            v-for="(route,index) of routes"
            :key="index"
            :style='route.children?"margin: calc(50 * 2 / 750 * 100vw) 0;":""'
            >

            <!-- <div v-if='route.children'>{{route.path}}</div> -->
            
            <router-link
  			      v-if='no_page.indexOf(route.path)==-1&&route.path'
              tag="div"
              :to="route.path"
              class="home-li"
            >
              <div class="home-li-name txt_over_ell">{{ route.path }}</div>
              <svg viewBox="0 0 1024 1024" class="home-li-icon">
                <path
                  fill="#B6C3D2"
                  d="M601.1 556.5L333.8 289.3c-24.5-24.5-24.5-64.6 0-89.1s64.6-24.5 89.1 0l267.3 267.3c24.5 24.5 24.5 64.6 0 89.1-24.5 24.4-64.6 24.4-89.1-.1z"
                />
                <path
                  fill="#B6C3D2"
                  d="M690.2 556.5L422.9 823.8c-24.5 24.5-64.6 24.5-89.1 0s-24.5-64.6 0-89.1l267.3-267.3c24.5-24.5 64.6-24.5 89.1 0 24.5 24.6 24.5 64.6 0 89.1z"
                />
              </svg>
            </router-link>
            
            <router-link
              v-for="(route_children,index_children) of route.children"
              :key="index_children"
              v-if='no_page.indexOf(route_children.path)==-1&&route_children.path'
              tag="div"
              :to="route.path+'/'+route_children.path"
              class="home-li"
            >
              <div class="home-li-name txt_over_ell">{{ route.path+'/'+route_children.path }}</div>
              <svg viewBox="0 0 1024 1024" class="home-li-icon">
                <path
                  fill="#B6C3D2"
                  d="M601.1 556.5L333.8 289.3c-24.5-24.5-24.5-64.6 0-89.1s64.6-24.5 89.1 0l267.3 267.3c24.5 24.5 24.5 64.6 0 89.1-24.5 24.4-64.6 24.4-89.1-.1z"
                />
                <path
                  fill="#B6C3D2"
                  d="M690.2 556.5L422.9 823.8c-24.5 24.5-64.6 24.5-89.1 0s-24.5-64.6 0-89.1l267.3-267.3c24.5-24.5 64.6-24.5 89.1 0 24.5 24.6 24.5 64.6 0 89.1z"
                />
              </svg>
            </router-link>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    // console.log('this.$router.options.routes', this.$router.options.routes)
    return {
      routes: this.$router.options.routes,
      no_page: [
        //   
        '/',
        '/route',
        '/test',
      ],
    }
  },
  created() {
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
/*
            px => rem
            100vw == 设计稿满屏宽 750px
            46px
            calc(46 * 2 / 750 * 100vw)
            当前满屏宽 375px 
        */
.dn,
.d-n,
.d-none,
.d_n {
  display: none !important;
}
.db,
.d-b,
.d-block,
.d_b {
  display: block !important;
}
.di,
.d-i,
.d-inline,
.d_i {
  display: inline !important;
}
.dib,
.d-ib,
.d-inline-block,
.d_ib {
  display: inline-block !important;
}
.va_m,
.va-m,
.v-m {
  vertical-align: middle !important;
}
.txt_over_ell {
  white-space: nowrap;
  /* 有效 */
  word-break: break-all;
  /* 无 长 数字/单词 换行效果 */ /* word-wrap:break-word; */ /* text-wrap:unrestricted; */
  overflow: hidden;
  text-overflow: ellipsis;
}

.home {
  width: calc(335 * 2 / 750 * 100vw);
  margin: auto;
  padding: calc(46 * 2 / 750 * 100vw) 0;
  background: #fff;
}
.home-head {
  padding-left: calc(16 * 2 / 750 * 100vw);
  margin-bottom: calc(32 * 2 / 750 * 100vw);

  /*针对标注行高不为1的情况*/
  /*line-height: calc(19 * 2 / 750 * 100vw);*/
  /*font-size: calc(14 * 2 / 750 * 100vw);*/
  margin-bottom: calc((32 - (19 - 14) / 2) * 2 / 750 * 100vw);
}
.home-head-img {
  width: calc(32 * 2 / 750 * 100vw);
  height: calc(32 * 2 / 750 * 100vw);
}
.home-head-title {
  margin-left: calc(16 * 2 / 750 * 100vw);
  font-weight: 500;
  /*vertical-align: middle;*/
  font-size: calc(32 * 2 / 750 * 100vw);
  line-height: 1;
}
.home-head-tips {
  margin-top: calc(16 * 2 / 750 * 100vw);
  font-weight: normal;
  color: rgba(69, 90, 100, 0.6);
  font-size: calc(14 * 2 / 750 * 100vw);
  line-height: 1;

  /*针对标注行高不为1的情况*/
  line-height: calc(19 * 2 / 750 * 100vw);
}
.home-head-tip {
}

.home-lists {
}
.home-list {
}
.home-list + .home-list {
  margin-top: calc(16 * 2 / 750 * 100vw);
}
.home-list-head {
  padding-left: calc(16 * 2 / 750 * 100vw);
  color: rgba(69, 90, 100, 0.6);
  font-size: calc(14 * 2 / 750 * 100vw);
  line-height: calc(36 * 2 / 750 * 100vw);
}
.home-list-head-title {
}
.home-li {
  /*width: calc(335 * 2 / 750 * 100vw);*/
  padding-left: calc(20 * 2 / 750 * 100vw);

  color: #323233;
  font-weight: 500;
  font-size: calc(14 * 2 / 750 * 100vw);
  min-height: calc(40 * 2 / 750 * 100vw);
  /*line-height: calc(40 * 2 / 750 * 100vw);*/
  background: #f7f8fa;

  border-radius: calc(99 * 2 / 750 * 100vw);

  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;

  margin-top: calc(12 * 2 / 750 * 100vw);
}
.home-li + .home-li {
  /*margin-top: calc(12 * 2 / 750 * 100vw);*/
}
.home-li-name {
  flex-grow: 1;
  flex-shrink: 1;
  width: 0;
}
.home-li-icon {
  flex-grow: 0;
  flex-shrink: 0;
  width: calc(16 * 2 / 750 * 100vw);
  height: calc(16 * 2 / 750 * 100vw);

  font-size: calc(16 * 2 / 750 * 100vw);
  line-height: calc(16 * 2 / 750 * 100vw);

  margin: 0 calc(16 * 2 / 750 * 100vw);
}
</style>