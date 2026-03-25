import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue'
import login from '../views/account/login.vue';

Vue.use(VueRouter)

const routes = [
	// 主页ss
	{
		path: '/',
		name: 'index',
		component: index
	},
	// 登录
	{
		path: '/account/login',
		name: 'login',
		component: login
	},
	// 忘记密码
	{
		path: '/account/forgot',
		name: 'forgot',
		component: () => import('../views/account/forgot.vue')
	},
	// 注册账号
	{
		path: '/account/register',
		name: 'register',
		component: () => import('../views/account/register.vue')
	},
	// 媒体图片
	{
		path: '/media/image',
		name: 'media_image',
		component: () => import('../views/media/image.vue')
	},
	// 音乐
	{
		path: '/media/music',
		name: 'media_music',
		component: () => import('../views/media/music.vue')
	},
	// 媒体视频
	{
		path: '/media/video',
		name: 'media_video',
		component: () => import('../views/media/video.vue')
	},
	// 文章路由
	{
		path: '/article/list',
		name: 'article_list',
		component: () => import('../views/article/list.vue')
	},
	{
		path: '/article/details',
		name: 'article_details',
		component: () => import('../views/article/details.vue')
	},
	// 浏览网站
	// 论坛路由
	{
		path: '/forum/list',
		name: 'forum_list',
		component: () => import('../views/forum/list.vue')
	},

	{
		path: '/forum/details',
		name: 'forum_details',
		component: () => import('../views/forum/details.vue')
	},

	{
		path: '/forum/view',
		name: 'forum_view',
		component: () => import('../views/forum/view.vue')
	},
	// 公告路由
	{
		path: '/notice/list',
		name: 'notice_list',
		component: () => import('../views/notice/list.vue')
	},
	{
		path: '/notice/details',
		name: 'notice_details',
		component: () => import('../views/notice/details.vue')
	},
	//航班信息列表路由
	{
		path: '/flight_information/list',
		name: '/flight_information_list',
		component: () => import('../views/flight_information/list.vue')
	},
	//航班信息详情路由
	{
		path: '/flight_information/details',
		name: '/flight_information_details',
		component: () => import('../views/flight_information/details.vue')
	},
	//航空购票路由
	{
		path: '/flight/booking',
		name: 'flight_booking',
		component: () => import('../views/flight/booking.vue')
	},
	//选座页面路由
	{
		path: '/flight/seat-selection',
		name: 'seat_selection',
		component: () => import('../views/flight/seat_selection.vue')
	},
	//航空信息路由
	{
		path: '/flight/info',
		name: 'flight_info',
		component: () => import('../views/flight/info.vue')
	},
	//余额充值添加路由
	{
		path: '/balance_recharge/edit',
		name: '/balance_recharge_edit',
		component: () => import('../views/balance_recharge/edit.vue')
	},
	//订单中心添加路由
	{
		path: '/order_center/edit',
		name: '/order_center_edit',
		component: () => import('../views/order_center/edit.vue')
	},

	// 用户路由
	{
		path: '/user/index',
		name: 'user_index',
		component: () => import('../views/user/index.vue')
	},
	// 基本信息
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue')
	},
	// 找回密码
	{
		path: '/user/password',
		name: 'user_password',
		component: () => import('../views/user/password.vue')
	},
	// 我的订单
	{
		path: '/user/order',
		name: 'user_order',
		component: () => import('../views/user/order.vue')
	},

	// 搜索
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/search/index.vue')
	},
	// 局部搜索
	{
		path: '/search/details',
		name: 'search_details',
		component: () => import('../views/search/details.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.afterEach((to, from, next) => {
	let title = "基于Hadoop的航班分析系统的设计与实现-home";
	document.title = title;
	document.logo = "基于Hadoop的航班分析系统的设计与实现"
})

export default router
