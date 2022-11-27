import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [


	// test ------------------------------------
	{
		path: '/',
		name: 'Home',
		redirect: '/route',
		// redirect: '/material',
	},
	{
		path: '/route',// 读取所有路由
		components: {
			default: () => import('@/router/route.vue')
		}
	},
	{
		path: '/test',// 测试页
		name: 'test',
		component: () => import('@/views/test.vue')
	},
	// test -end ------------------------------------

	{
		path: '/material',
		component: () => import('@/App.vue'),
		children: [
	        {
	          	path: '',
				component: () => import('@/views/material/material_list.vue'),
                meta:{title:'引流素材'}
	        },
	        {
	          	path: 'search',
				component: () => import('@/views/material/material_search.vue'),
                meta:{title:'搜索'}
	        },
	        {
	          	path: 'add',
				component: () => import('@/views/material/add_material.vue'),
                meta:{title:'添加文章/视频'}
	        },
	        {
	          	path: 'mine',
				component: () => import('@/views/material/mine.vue'),
                meta:{title:'我的文章/视频'}
	        },
	        {
	          	path: 'copy',
				component: () => import('@/views/material/copy.vue')
	        },

	    ],
	},

	{
		path: '/classify',
		component: () => import('@/App.vue'),
		children: [
	        {
	          	path: '',
				component: () => import('@/views/classify/filter.vue'),
                meta:{title:'品牌行业'}
	        },
	        {
	          	path: 'filter',
				component: () => import('@/views/classify/filter.vue'),
                meta:{title:'品牌行业'}
	        },
	        {
	          	path: 'set',
				component: () => import('@/views/classify/set.vue'),
                meta:{title:'设置品牌公司'}
	        },
	        {
	          	path: 'search',
				component: () => import('@/views/classify/search.vue'),
                meta:{title:'设置品牌公司'}
	        },
	        {
	          	path: 'select',
				component: () => import('@/views/classify/select.vue'),
                meta:{title:'选择关注的行业'}
	        },
	    ],
	},

	{
		path: '/article',
		component: () => import('@/App.vue'),
		children: [
	        {
	          	path: '',
				component: () => import('@/views/article/article.vue'),
	        },
	        {
	          	path: 'info',
				component: () => import('@/views/article/article.vue')
	        },
	        {
	          	path: '?types=mine',
				component: () => import('@/views/article/article.vue'),
	        },
	        {
	          	path: '?types=else',
				component: () => import('@/views/article/article.vue'),
	        },
	        {
	          	path: 'add',
				component: () => import('@/views/article/add_article.vue')
	        },
	        {
	          	path: 'edit',
				component: () => import('@/views/article/edit_article.vue')
	        },
	        {
	          	path: 'complaint',
				component: () => import('@/views/article/complaint.vue')
	        },
	        {
				path: 'video_info',
				component: () => import('@/views/article/video_info.vue')
			},

			{
				path: 'demo',
				component: () => import('@/demo.vue')
			},

	    ],
	},
	{
		path: '/weixin',
		component: () => import('@/App.vue'),
		children: [
			{
				path: 'auth',
				component: () => import('@/views/weixin/author.vue'),
                meta:{title:"正在授权"}
			},

		],
	},

	{
		path: '/Leads',
		component: () => import('@/App.vue'),
		children: [
	        {
	          	path: '',
				component: () => import('@/views/Leads/index.vue'),
                meta:{title:"客户线索"}
	        },
	        {
	          	path: '?types=member',
				component: () => import('@/views/Leads/index.vue'),
                meta:{title:"客户线索"}
	        },
	        {
	          	path: 'set',
				component: () => import('@/views/Leads/set.vue'),
                meta:{title:"消息推送配置"}
	        },
	        {
	          	path: 'info',
				component: () => import('@/views/Leads/info.vue'),
                meta:{title:"素材引流详情"}
	        },
	        {
	          	path: 'info?types=member',
				component: () => import('@/views/Leads/info.vue'),
	        },
	        {
	          	path: 'open',
				component: () => import('@/views/Leads/open.vue'),
                meta:{title:"会员特权"}
	        },

	    ],
	},




	{
		path: '/mine',
		component: () => import('@/App.vue'),
		children: [
	        {
	          	path: '',
				component: () => import('@/views/mine/index.vue'),
                meta:{title:"个人中心"}
	        },
	        {
	          	path: 'set',
				component: () => import('@/views/mine/set.vue'),
                meta:{title:"修改名片"}
	        },
	        {
	          	path: 'service',
				component: () => import('@/views/mine/service.vue'),
                meta:{title:"专属客服"}
	        },
	        {
	          	path: 'product',
				component: () => import('@/views/mine/product.vue'),
	        },
	        {
	          	path: 'good_time',
				component: () => import('@/views/mine/good_time.vue'),
                meta:{title:"早晚安"}
	        },
	        {
	          	path: 'good_time?types=night',
				component: () => import('@/views/mine/good_time.vue'),
                meta:{title:"早晚安"}
	        },

	    ],
	},



	{
		path: '/reward',
		component: () => import('@/App.vue'),
		children: [
	        {
	          	path: '',
				component: () => import('@/views/reward/index.vue'),
                meta:{title:"邀请奖励"}
	        },
	        {
	          	path: 'income_stat',
				component: () => import('@/views/reward/income_stat.vue'),
                meta:{title:"历史收益记录"}
	        },
	        {
	          	path: 'income',
				component: () => import('@/views/reward/income.vue'),
	        },
	        {
	          	path: 'invite_stat',
				component: () => import('@/views/reward/invite_stat.vue'),
                meta:{title:"邀请数据"}
	        },
	        {
	          	path: 'invite',
				component: () => import('@/views/reward/invite.vue'),
                meta:{title:"累计邀请"}
	        },
	        {
	          	path: 'invite?types=invite_info',
				component: () => import('@/views/reward/invite.vue'),
                meta:{title:"邀请记录"}
	        },

	    ],
	},


	{
		path: '/cash',
		component: () => import('@/App.vue'),
		children: [
	        {
	          	path: '',
				component: () => import('@/views/cash/index.vue'),
                meta:{title:"提现申请"}
	        },
	        {
	          	path: '?types=have',
				component: () => import('@/views/cash/index.vue'),
                meta:{title:"提现申请"}
	        },
	        {
	          	path: 'add',
				component: () => import('@/views/cash/add.vue'),
                meta:{title:"添加账户"}
	        },
	        {
	          	path: 'list',
				component: () => import('@/views/cash/list.vue'),
                meta:{title:"提现账户"}
	        },
	        {
	          	path: 'log',
				component: () => import('@/views/cash/log.vue'),
                meta:{title:"提现记录"}
	        },


	    ],
	},


	/*
	// personalcenter ------------------------------------
	{
		path: '/login',
		component: () => import('@/views/personalcenter/login.vue')
	},
	{
		path: '/userPage',
		component: () => import('@/views/personalcenter/user.vue')
	},
	// personalcenter -end ------------------------------------


	// customer ------------------------------------
	{
		path: '/customer',
		component: () => import('@/views/customer/customer.vue')
	},
	{
		path: '/non-customer',
		component: () => import('@/views/customer/non-customer.vue')
	},
	// customer -end ------------------------------------

	{
		path: '/invitation',
		component: () => import('@/views/invitation/invitation.vue')
	},
	{
		path: '/nightearly',
		component: () => import('@/views/nightearly/nightearly.vue')
	},
	*/
];

const router = new VueRouter({
    mode:'history',
	routes
});




router.beforeEach((to, from, next) => {
	//document.title = "正在加载中";
	const token = window.localStorage.getItem('token');
	if (!token && to.path !== '/weixin/auth') {
		window.localStorage.setItem('beforeLoginUrl', to.fullPath);
		next('/weixin/auth')
	} else if (token) {
		/*store.dispatch('getUserInfo').catch(err => {
			console.log(err)
			window.localStorage.removeItem('token')
			router.go(0)
		})*/
		next()
	}else {
		next()
	}
});




export default router
