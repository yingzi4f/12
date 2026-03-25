import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';
import login from '../views/login.vue';
import forgot from '../views/forgot.vue';
Vue.use(VueRouter)

const routes = [
	// 主页
	{
		path: '/',
		name: 'index',
		component: index,
		meta: {
			index: 0,
			title: '首页'
		}
	},

	// 登录
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			index: 0,
			title: '登录'
		}
	},

	// 忘记密码
	{
		path: '/forgot',
		name: "forgot",
		component: forgot,
		meta: {
			index: 0,
			title: '忘记密码'
		}
	},

	// 修改密码
	{
		path: '/user/password',
		name: "password",
		component: () => import("../views/user/password.vue"),
		meta: {
			index: 0,
			title: '修改密码'
		}
	},

	// 视频播放页
	{
		path: "/media/video",
		name: "video",
		component: () => import('../views/media/video.vue'),
		meta: {
			index: 0,
			title: "视频"
		}
	},

	// 音频播放页
	{
		path: "/media/audio",
		name: "audio",
		component: () => import('../views/media/audio.vue'),
		meta: {
			index: 0,
			title: "音频"
		}
	},
	// 权限路由
	{
		path: '/auth/table',
		name: 'auth_table',
		component: () => import('../views/nav/table.vue'),
		meta: {
			index: 0,
			title: '权限列表'
		}
	},
	{
		path: '/auth/view',
		name: 'auth_view',
		component: () => import('../views/nav/view.vue'),
		meta: {
			index: 0,
			title: '权限详情'
		}
	},

	// 友情链接路由
	// {
	// 	path: '/link/table',
	// 	name: 'link_table',
	// 	component: () => import('../views/link/table.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '链接列表'
	// 	}
	// },
	// {
	// 	path: '/link/view',
	// 	name: 'link_view',
	// 	component: () => import('../views/link/view.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '链接详情'
	// 	}
	// },

	// 轮播图路由
	{
		path: '/slides/table',
		name: 'slides_table',
		component: () => import('../views/slides/table.vue'),
		meta: {
			index: 0,
			title: '轮播图列表'
		}
	},
	{
		path: '/slides/view',
		name: 'slides_view',
		component: () => import('../views/slides/view.vue'),
		meta: {
			index: 0,
			title: '轮播图详情'
		}
	},
	// 文章路由
	{
		path: '/article/table',
		name: 'article_table',
		component: () => import('../views/article/table.vue'),
		meta: {
			index: 0,
			title: '文章列表'
		}
	},
	{
		path: '/article/view',
		name: 'article_view',
		component: () => import('../views/article/view.vue'),
		meta: {
			index: 0,
			title: '文章详情'
		}
	},

	// 文章分类路由
	{
		path: '/article_type/table',
		name: 'article_type_table',
		component: () => import('../views/article_type/table.vue'),
		meta: {
			index: 0,
			title: '文章分类列表'
		}
	},
	{
		path: '/article_type/view',
		name: 'article_type_view',
		component: () => import('../views/article_type/view.vue'),
		meta: {
			index: 0,
			title: '文章分类详情'
		}
	},

	// 广告路由
	// {
	// 	path: '/ad/table',
	// 	name: 'ad_table',
	// 	component: () => import('../views/ad/table.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '广告列表'
	// 	}
	// },
	// {
	// 	path: '/ad/view',
	// 	name: 'ad_view',
	// 	component: () => import('../views/ad/view.vue'),
	// 	meta: {
	// 		index: 0,
	// 		title: '广告详情'
	// 	}
	// },
	// 论坛路由
	{
		path: '/forum/table',
		name: 'forum_table',
		component: () => import('../views/forum/table.vue'),
		meta: {
			index: 0,
			title: '论坛列表'
		}
	},
	{
		path: '/forum/view',
		name: 'forum_view',
		component: () => import('../views/forum/view.vue'),
		meta: {
			index: 0,
			title: '论坛详情'
		}
	},

	// 论坛分类路由
	{
		path: '/forum_type/table',
		name: 'forum_type_table',
		component: () => import('../views/forum_type/table.vue'),
		meta: {
			index: 0,
			title: '论坛分类列表'
		}
	},
	{
		path: '/forum_type/view',
		name: 'forum_type_view',
		component: () => import('../views/forum_type/view.vue'),
		meta: {
			index: 0,
			title: '论坛分类详情'
		}
	},
	// 公告路由
	{
		path: '/notice/table',
		name: 'notice_table',
		component: () => import('../views/notice/table.vue'),
		meta: {
			index: 0,
			title: '公告列表'
		}
	},
	{
		path: '/notice/view',
		name: 'notice_view',
		component: () => import('../views/notice/view.vue'),
		meta: {
			index: 0,
			title: '公告详情'
		}
	},
	// 评论路由
	{
		path: '/comment/table',
		name: 'comment_table',
		component: () => import('../views/comment/table.vue'),
		meta: {
			index: 0,
			title: '评论列表'
		}
	},
	{
		path: '/comment/view',
		name: 'comment_view',
		component: () => import('../views/comment/view.vue'),
		meta: {
			index: 0,
			title: '评论详情'
		}
	},
	// 用户注册路由
	{
		path: '/user_registration/table',
		name: 'user_registration_table',
		component: () => import('../views/user_registration/table.vue')
	},
	{
		path: '/user_registration/view',
		name: 'user_registration_view',
		component: () => import('../views/user_registration/view.vue')
	},
	// 客机管理路由
	{
		path: '/passenger_plane_management/table',
		name: 'passenger_plane_management_table',
		component: () => import('../views/passenger_plane_management/table.vue')
	},
	{
		path: '/passenger_plane_management/view',
		name: 'passenger_plane_management_view',
		component: () => import('../views/passenger_plane_management/view.vue')
	},
	// 航班信息路由
	{
		path: '/flight_information/table',
		name: 'flight_information_table',
		component: () => import('../views/flight_information/table.vue')
	},
	{
		path: '/flight_information/view',
		name: 'flight_information_view',
		component: () => import('../views/flight_information/view.vue')
	},
	// 疫情政策路由
	{
		path: '/epidemic_policy/table',
		name: 'epidemic_policy_table',
		component: () => import('../views/epidemic_policy/table.vue')
	},
	{
		path: '/epidemic_policy/view',
		name: 'epidemic_policy_view',
		component: () => import('../views/epidemic_policy/view.vue')
	},
	// 余额充值路由
	{
		path: '/balance_recharge/table',
		name: 'balance_recharge_table',
		component: () => import('../views/balance_recharge/table.vue')
	},
	{
		path: '/balance_recharge/view',
		name: 'balance_recharge_view',
		component: () => import('../views/balance_recharge/view.vue')
	},
	// 余额提现路由
	{
		path: '/withdrawal_of_balance/table',
		name: 'withdrawal_of_balance_table',
		component: () => import('../views/withdrawal_of_balance/table.vue')
	},
	{
		path: '/withdrawal_of_balance/view',
		name: 'withdrawal_of_balance_view',
		component: () => import('../views/withdrawal_of_balance/view.vue')
	},
	// 订单中心路由
	{
		path: '/order_center/table',
		name: 'order_center_table',
		component: () => import('../views/order_center/table.vue')
	},
	{
		path: '/order_center/view',
		name: 'order_center_view',
		component: () => import('../views/order_center/view.vue')
	},
	// 订单退票路由
	{
		path: '/order_refund/table',
		name: 'order_refund_table',
		component: () => import('../views/order_refund/table.vue')
	},
	{
		path: '/order_refund/view',
		name: 'order_refund_view',
		component: () => import('../views/order_refund/view.vue')
	},
	// 机票升舱路由
	{
		path: '/upgrade_information/table',
		name: 'upgrade_information_table',
		component: () => import('../views/upgrade_information/table.vue')
	},
	{
		path: '/upgrade_information/view',
		name: 'upgrade_information_view',
		component: () => import('../views/upgrade_information/view.vue')
	},
	// 改签申请路由
	{
		path: '/visa_change_application/table',
		name: 'visa_change_application_table',
		component: () => import('../views/visa_change_application/table.vue')
	},
	{
		path: '/visa_change_application/view',
		name: 'visa_change_application_view',
		component: () => import('../views/visa_change_application/view.vue')
	},
	// 改签付款路由
	{
		path: '/rescheduling_payment/table',
		name: 'rescheduling_payment_table',
		component: () => import('../views/rescheduling_payment/table.vue')
	},
	{
		path: '/rescheduling_payment/view',
		name: 'rescheduling_payment_view',
		component: () => import('../views/rescheduling_payment/view.vue')
	},

	// 用户路由
	{
		path: '/user/table',
		name: 'user_table',
		component: () => import('../views/user/table.vue'),
		meta: {
			index: 0,
			title: '用户列表'
		}
	},
	{
		path: '/user/view',
		name: 'user_view',
		component: () => import('../views/user/view.vue'),
		meta: {
			index: 0,
			title: '用户详情'
		}
	},
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue'),
		meta: {
			index: 0,
			title: '个人信息'
		}
	},
	// 用户组路由
	{
		path: '/user_group/table',
		name: 'user_group_table',
		component: () => import('../views/user_group/table.vue'),
		meta: {
			index: 0,
			title: '用户组列表'
		}
	},
	{
		path: '/user_group/view',
		name: 'user_group_view',
		component: () => import('../views/user_group/view.vue'),
		meta: {
			index: 0,
			title: '用户组详情'
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let token = to.query.token;
	if (token){
		$.db.set("token",token,120);
	}
	next();
})

router.afterEach((to, from, next) => {
	let title = "基于Hadoop的航班分析系统的设计与实现-admin";
	document.title = title;
})

export default router
