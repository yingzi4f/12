<template>
	<el-menu class="side el-menu-vertical-demo" default-active="/" @open="handleOpen" @close="handleClose"
		background-color="#545c64" text-color="#fff" active-text-color="#38f" :collapse="isCollapse" :router="true">
		<el-menu-item index="/">
			<i class="el-icon-s-home"></i>
			<span slot="title">首页</span>
		</el-menu-item>
		<el-submenu index="web"
			v-show="user_group == '管理员' || $check_group(['/nav/table','/link/table','/notice/table','/slides/table','/ad/table','/message/table'])">
			<template slot="title"><i class="el-icon-data-board"></i><span>站点管理</span></template>
			<!-- <el-menu-item v-show="user_group == '管理员' || $check_action('/auth/table')" index="/auth/table">
				<span>权限管理</span>
			</el-menu-item> -->
			<!-- <el-menu-item v-show="user_group == '管理员' || $check_action('/link/table')" index="/link/table">
				<span>友情链接</span>
			</el-menu-item> -->
			<el-menu-item v-show="user_group == '管理员' || $check_action('/slides/table')" index="/slides/table">
				<span>轮播图</span>
			</el-menu-item>
			<!-- <el-menu-item v-show="user_group == '管理员' || $check_action('/ad/table')" index="/ad/table">
				<span>广告</span>
			</el-menu-item> -->
			<el-menu-item v-show="user_group == '管理员' || $check_action('/notice/table')" index="/notice/table">
				<span>公告栏</span>
			</el-menu-item>
		</el-submenu>

		<!-- 航班管理 -->
		<el-submenu index="flight"
			v-show="user_group == '管理员' || $check_group(['/flight_information/table','/order_center/table'])">
			<template slot="title"><i class="el-icon-s-order"></i><span>航班管理</span></template>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/flight_information/table')" index="/flight_information/table">
				<span>航班信息</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/order_center/table')" index="/order_center/table">
				<span>订单中心</span>
			</el-menu-item>
		</el-submenu>

		<!-- 用户管理 -->
		<el-submenu index="user"
			v-show="user_group == '管理员' || $check_group(['/user/table','/user_group/table','/auth/table'
			,'/user_registration/table','/passenger_plane_management/table','/balance_recharge/table'
			,'/withdrawal_of_balance/table','/upgrade_information/table','/visa_change_application/table'
			,'/rescheduling_payment/table'
			])">
			<template slot="title"><i class="el-icon-user-solid"></i><span>管理用户</span></template>
			<el-menu-item index="/user/table" v-show="user_group == '管理员'"><span>管理员</span></el-menu-item>
			<el-menu-item index="/user_registration/table" v-show="user_group == '管理员' || $check_action('/user_registration/table')"><span>用户注册</span></el-menu-item>
			<!-- 用户相关功能 -->
			<el-menu-item v-show="user_group == '管理员' || $check_action('/passenger_plane_management/table')" index="/passenger_plane_management/table">
				<span>客机管理</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/balance_recharge/table')" index="/balance_recharge/table">
				<span>余额充值</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/withdrawal_of_balance/table')" index="/withdrawal_of_balance/table">
				<span>余额提现</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/upgrade_information/table')" index="/upgrade_information/table">
				<span>机票升舱</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/visa_change_application/table')" index="/visa_change_application/table">
				<span>改签申请</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/rescheduling_payment/table')" index="/rescheduling_payment/table">
				<span>改签付款</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="content"
			v-show="$check_group(['/forum/table','/forum_type/table','/article/table','/article_type/table','/exam/table'])">
			<template slot="title"><i class="el-icon-chat-line-round"></i><span>内容管理</span></template>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/forum/table')" index="/forum/table">
				<!-- <span>论坛</span> -->
				<span>{{$page_title("/forum/table") || "论坛"}}</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/forum_type/table')" index="/forum_type/table">
				<!-- <span>论坛类型</span> -->
				<span>{{$page_title("/forum_type/table") || "论坛分类"}}</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/article/table')" index="/article/table">
				<!-- <span>文章</span> -->
				<span>{{$page_title("/article/table") || "文章"}}</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/article_type/table')"
				index="/article_type/table">
				<!-- <span>文章类型</span> -->
				<span>{{$page_title("/article_type/table") || "文章分类"}}</span>
			</el-menu-item>
		</el-submenu>

		<!-- 其他管理 - 排除疫情政策 -->
		<el-submenu index="more" v-show="otherAuth.length">
			<template slot="title"><i class="el-icon-copy-document"></i><span>其他管理</span></template>
			<el-menu-item v-for="(o, idx) in otherAuth" v-show="$check_action(o.path)" :index="o.path">
				<span>{{o.page_title}}</span>
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		props: {
			isCollapse: {
				trye: Boolean,
				default: false
			}
		},
		data: function() {
			return {
				user_group: this.$store.state.user.user_group
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},

			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},

		},
		computed: {
			// 其他未分类的管理 - 排除疫情政策和已分类的菜单
			otherAuth() {
				var tables = this.$store.state.web.auth;
				var lt = [];

				// 已分类的表名列表
				let classifiedList = [
					"slides",           // 轮播图 - 站点管理
					"notice",           // 公告栏 - 站点管理
					"flight_information", // 航班信息 - 航班管理
					"order_center",     // 订单中心 - 航班管理
					"user",             // 管理员 - 用户管理
					"user_registration", // 用户注册 - 用户管理
					"passenger_plane_management", // 客机管理 - 用户管理
					"balance_recharge",  // 余额充值 - 用户管理
					"withdrawal_of_balance", // 余额提现 - 用户管理
					"upgrade_information", // 机票升舱 - 用户管理
					"visa_change_application", // 改签申请 - 用户管理
					"rescheduling_payment", // 改签付款 - 用户管理
					"forum",            // 论坛 - 内容管理
					"forum_type",       // 论坛分类 - 内容管理
					"article",          // 文章 - 内容管理
					"article_type",     // 文章分类 - 内容管理
					"exam",             // 考试
					"comment"           // 评论
				];

				for (var i = 0; i < tables.length; i++) {
					var o = tables[i];
					if (o.path.indexOf("/table") !== -1) {
						// 排除疫情政策
						if (o.table_name === "epidemic_policy") {
							continue;
						}
						// 排除已分类的菜单
						if (classifiedList.indexOf(o.table_name) === -1) {
							lt.push(o);
						}
					}
				}
				return lt;
			}
		}
	}
</script>


<style scoped="scoped">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 16rem;
	}

	.side {
		float: left;
		background: #545c64;
		color: #fff;
		overflow-y: scroll;
		height: 100vh;
	}
	.side::-webkit-scrollbar{
		display: none;
	}
</style>
