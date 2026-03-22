<template>
  <div class="page_search">
	<div class="warp">
	  <div class="container">
		<div class="row">
		  <div class="col-12">
			<div class="card_result_search">
			  <div class="title">搜索结果</div>
				<!-- 文章搜索结果 -->
			  <list_result_search
				:list="result_article"
				title="新闻资讯"
				source_table="article"
			  ></list_result_search>
				<!-- 论坛搜索结果 -->
			  <list_result_search
				:list="result_forum"
				title="在线留言"
				source_table="forum"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/user_registration/list', 'get')"
				:list="result_user_registration_id"
				title="用户注册身份证"
				source_table="user_registration"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/user_registration/list', 'get')"
				:list="result_user_registration_full_name"
				title="用户注册姓名"
				source_table="user_registration"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/flight_information/list', 'get')"
				:list="result_flight_information_place_of_departure"
				title="航班信息出发地"
				source_table="flight_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/flight_information/list', 'get')"
				:list="result_flight_information_destination"
				title="航班信息目的地"
				source_table="flight_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/flight_information/list', 'get')"
				:list="result_flight_information_departure_time"
				title="航班信息出发时间"
				source_table="flight_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/flight_information/list', 'get')"
				:list="result_flight_information_flight_type"
				title="航班信息航班类型"
				source_table="flight_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/epidemic_policy/list', 'get')"
				:list="result_epidemic_policy_region_name"
				title="疫情政策地区名称"
				source_table="epidemic_policy"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_center/list', 'get')"
				:list="result_order_center_place_of_departure"
				title="订单中心出发地"
				source_table="order_center"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_center/list', 'get')"
				:list="result_order_center_destination"
				title="订单中心目的地"
				source_table="order_center"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_center/list', 'get')"
				:list="result_order_center_departure_time"
				title="订单中心出发时间"
				source_table="order_center"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_center/list', 'get')"
				:list="result_order_center_arrival_time"
				title="订单中心到达时间"
				source_table="order_center"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_center/list', 'get')"
				:list="result_order_center_flight_type"
				title="订单中心航班类型"
				source_table="order_center"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_refund/list', 'get')"
				:list="result_order_refund_place_of_departure"
				title="订单退票出发地"
				source_table="order_refund"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_refund/list', 'get')"
				:list="result_order_refund_destination"
				title="订单退票目的地"
				source_table="order_refund"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_refund/list', 'get')"
				:list="result_order_refund_departure_time"
				title="订单退票出发时间"
				source_table="order_refund"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_refund/list', 'get')"
				:list="result_order_refund_arrival_time"
				title="订单退票到达时间"
				source_table="order_refund"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/order_refund/list', 'get')"
				:list="result_order_refund_flight_type"
				title="订单退票航班类型"
				source_table="order_refund"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/upgrade_information/list', 'get')"
				:list="result_upgrade_information_place_of_departure"
				title="机票升舱出发地"
				source_table="upgrade_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/upgrade_information/list', 'get')"
				:list="result_upgrade_information_destination"
				title="机票升舱目的地"
				source_table="upgrade_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/upgrade_information/list', 'get')"
				:list="result_upgrade_information_departure_time"
				title="机票升舱出发时间"
				source_table="upgrade_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/upgrade_information/list', 'get')"
				:list="result_upgrade_information_arrival_time"
				title="机票升舱到达时间"
				source_table="upgrade_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/upgrade_information/list', 'get')"
				:list="result_upgrade_information_flight_type"
				title="机票升舱航班类型"
				source_table="upgrade_information"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/visa_change_application/list', 'get')"
				:list="result_visa_change_application_place_of_departure"
				title="改签申请出发地"
				source_table="visa_change_application"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/visa_change_application/list', 'get')"
				:list="result_visa_change_application_destination"
				title="改签申请目的地"
				source_table="visa_change_application"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/visa_change_application/list', 'get')"
				:list="result_visa_change_application_departure_time"
				title="改签申请出发时间"
				source_table="visa_change_application"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/visa_change_application/list', 'get')"
				:list="result_visa_change_application_arrival_time"
				title="改签申请到达时间"
				source_table="visa_change_application"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/visa_change_application/list', 'get')"
				:list="result_visa_change_application_flight_type"
				title="改签申请航班类型"
				source_table="visa_change_application"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/rescheduling_payment/list', 'get')"
				:list="result_rescheduling_payment_change_of_departure"
				title="改签付款改签出发地"
				source_table="rescheduling_payment"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/rescheduling_payment/list', 'get')"
				:list="result_rescheduling_payment_change_destination"
				title="改签付款改签目的地"
				source_table="rescheduling_payment"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/rescheduling_payment/list', 'get')"
				:list="result_rescheduling_payment_departure_time"
				title="改签付款起飞时间"
				source_table="rescheduling_payment"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/rescheduling_payment/list', 'get')"
				:list="result_rescheduling_payment_landing_time"
				title="改签付款落地时间"
				source_table="rescheduling_payment"
			  ></list_result_search>
			  <list_result_search
				v-if="$check_action('/rescheduling_payment/list', 'get')"
				:list="result_rescheduling_payment_change_flight_type"
				title="改签付款改签航班类型"
				source_table="rescheduling_payment"
			  ></list_result_search>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import mixin from "../../mixins/page.js";
import list_result_search from "../../components/diy/list_result_search.vue";

export default {
  mixins: [mixin],
  data() {
	return {
	  "query": {
		word: "",
	  },
	  "result_article": [],
	  "result_forum": [],
			"result_user_registration_id":[],
			"result_user_registration_full_name":[],
			"result_flight_information_place_of_departure":[],
			"result_flight_information_destination":[],
			"result_flight_information_departure_time":[],
			"result_flight_information_flight_type":[],
			"result_epidemic_policy_region_name":[],
			"result_order_center_place_of_departure":[],
			"result_order_center_destination":[],
			"result_order_center_departure_time":[],
			"result_order_center_arrival_time":[],
			"result_order_center_flight_type":[],
			"result_order_refund_place_of_departure":[],
			"result_order_refund_destination":[],
			"result_order_refund_departure_time":[],
			"result_order_refund_arrival_time":[],
			"result_order_refund_flight_type":[],
			"result_upgrade_information_place_of_departure":[],
			"result_upgrade_information_destination":[],
			"result_upgrade_information_departure_time":[],
			"result_upgrade_information_arrival_time":[],
			"result_upgrade_information_flight_type":[],
			"result_visa_change_application_place_of_departure":[],
			"result_visa_change_application_destination":[],
			"result_visa_change_application_departure_time":[],
			"result_visa_change_application_arrival_time":[],
			"result_visa_change_application_flight_type":[],
			"result_rescheduling_payment_change_of_departure":[],
			"result_rescheduling_payment_change_destination":[],
			"result_rescheduling_payment_departure_time":[],
			"result_rescheduling_payment_landing_time":[],
			"result_rescheduling_payment_change_flight_type":[],
	};
  },
  methods: {
	/**
	 * 获取文章
	 */
	get_article() {
	  this.$get("~/api/article/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_article = json.result.list;
		}
	  });
	},
	/**
	 * 获取在线留言
	 */
	get_forum() {
	  this.$get("~/api/forum/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_forum = json.result.list;
		}
	  });
	},
	/**
	 * 获取id
	 */
	get_user_registration_id(){
		this.$get("~/api/user_registration/get_list?like=0", { page: 1, size: 10, "id": this.query.word }, (json) => {
		  if (json.result) {
			var result_user_registration_id = json.result.list;
			result_user_registration_id.map(o => o.title = o['id'])
	  			this.result_user_registration_id = result_user_registration_id
		 	}
		});
	},
	/**
	 * 获取full_name
	 */
	get_user_registration_full_name(){
		this.$get("~/api/user_registration/get_list?like=0", { page: 1, size: 10, "full_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_user_registration_full_name = json.result.list;
			result_user_registration_full_name.map(o => o.title = o['full_name'])
	  			this.result_user_registration_full_name = result_user_registration_full_name
		 	}
		});
	},
	/**
	 * 获取place_of_departure
	 */
	get_flight_information_place_of_departure(){
		this.$get("~/api/flight_information/get_list?like=0", { page: 1, size: 10, "place_of_departure": this.query.word }, (json) => {
		  if (json.result) {
			var result_flight_information_place_of_departure = json.result.list;
			result_flight_information_place_of_departure.map(o => o.title = o['place_of_departure'])
	  			this.result_flight_information_place_of_departure = result_flight_information_place_of_departure
		 	}
		});
	},
	/**
	 * 获取destination
	 */
	get_flight_information_destination(){
		this.$get("~/api/flight_information/get_list?like=0", { page: 1, size: 10, "destination": this.query.word }, (json) => {
		  if (json.result) {
			var result_flight_information_destination = json.result.list;
			result_flight_information_destination.map(o => o.title = o['destination'])
	  			this.result_flight_information_destination = result_flight_information_destination
		 	}
		});
	},
	/**
	 * 获取departure_time
	 */
	get_flight_information_departure_time(){
		this.$get("~/api/flight_information/get_list?like=0", { page: 1, size: 10, "departure_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_flight_information_departure_time = json.result.list;
			result_flight_information_departure_time.map(o => o.title = o['departure_time'])
	  			this.result_flight_information_departure_time = result_flight_information_departure_time
		 	}
		});
	},
	/**
	 * 获取flight_type
	 */
	get_flight_information_flight_type(){
		this.$get("~/api/flight_information/get_list?like=0", { page: 1, size: 10, "flight_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_flight_information_flight_type = json.result.list;
			result_flight_information_flight_type.map(o => o.title = o['flight_type'])
	  			this.result_flight_information_flight_type = result_flight_information_flight_type
		 	}
		});
	},
	/**
	 * 获取region_name
	 */
	get_epidemic_policy_region_name(){
		this.$get("~/api/epidemic_policy/get_list?like=0", { page: 1, size: 10, "region_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_epidemic_policy_region_name = json.result.list;
			result_epidemic_policy_region_name.map(o => o.title = o['region_name'])
	  			this.result_epidemic_policy_region_name = result_epidemic_policy_region_name
		 	}
		});
	},
	/**
	 * 获取place_of_departure
	 */
	get_order_center_place_of_departure(){
		this.$get("~/api/order_center/get_list?like=0", { page: 1, size: 10, "place_of_departure": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_center_place_of_departure = json.result.list;
			result_order_center_place_of_departure.map(o => o.title = o['place_of_departure'])
	  			this.result_order_center_place_of_departure = result_order_center_place_of_departure
		 	}
		});
	},
	/**
	 * 获取destination
	 */
	get_order_center_destination(){
		this.$get("~/api/order_center/get_list?like=0", { page: 1, size: 10, "destination": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_center_destination = json.result.list;
			result_order_center_destination.map(o => o.title = o['destination'])
	  			this.result_order_center_destination = result_order_center_destination
		 	}
		});
	},
	/**
	 * 获取departure_time
	 */
	get_order_center_departure_time(){
		this.$get("~/api/order_center/get_list?like=0", { page: 1, size: 10, "departure_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_center_departure_time = json.result.list;
			result_order_center_departure_time.map(o => o.title = o['departure_time'])
	  			this.result_order_center_departure_time = result_order_center_departure_time
		 	}
		});
	},
	/**
	 * 获取arrival_time
	 */
	get_order_center_arrival_time(){
		this.$get("~/api/order_center/get_list?like=0", { page: 1, size: 10, "arrival_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_center_arrival_time = json.result.list;
			result_order_center_arrival_time.map(o => o.title = o['arrival_time'])
	  			this.result_order_center_arrival_time = result_order_center_arrival_time
		 	}
		});
	},
	/**
	 * 获取flight_type
	 */
	get_order_center_flight_type(){
		this.$get("~/api/order_center/get_list?like=0", { page: 1, size: 10, "flight_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_center_flight_type = json.result.list;
			result_order_center_flight_type.map(o => o.title = o['flight_type'])
	  			this.result_order_center_flight_type = result_order_center_flight_type
		 	}
		});
	},
	/**
	 * 获取place_of_departure
	 */
	get_order_refund_place_of_departure(){
		this.$get("~/api/order_refund/get_list?like=0", { page: 1, size: 10, "place_of_departure": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_refund_place_of_departure = json.result.list;
			result_order_refund_place_of_departure.map(o => o.title = o['place_of_departure'])
	  			this.result_order_refund_place_of_departure = result_order_refund_place_of_departure
		 	}
		});
	},
	/**
	 * 获取destination
	 */
	get_order_refund_destination(){
		this.$get("~/api/order_refund/get_list?like=0", { page: 1, size: 10, "destination": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_refund_destination = json.result.list;
			result_order_refund_destination.map(o => o.title = o['destination'])
	  			this.result_order_refund_destination = result_order_refund_destination
		 	}
		});
	},
	/**
	 * 获取departure_time
	 */
	get_order_refund_departure_time(){
		this.$get("~/api/order_refund/get_list?like=0", { page: 1, size: 10, "departure_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_refund_departure_time = json.result.list;
			result_order_refund_departure_time.map(o => o.title = o['departure_time'])
	  			this.result_order_refund_departure_time = result_order_refund_departure_time
		 	}
		});
	},
	/**
	 * 获取arrival_time
	 */
	get_order_refund_arrival_time(){
		this.$get("~/api/order_refund/get_list?like=0", { page: 1, size: 10, "arrival_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_refund_arrival_time = json.result.list;
			result_order_refund_arrival_time.map(o => o.title = o['arrival_time'])
	  			this.result_order_refund_arrival_time = result_order_refund_arrival_time
		 	}
		});
	},
	/**
	 * 获取flight_type
	 */
	get_order_refund_flight_type(){
		this.$get("~/api/order_refund/get_list?like=0", { page: 1, size: 10, "flight_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_order_refund_flight_type = json.result.list;
			result_order_refund_flight_type.map(o => o.title = o['flight_type'])
	  			this.result_order_refund_flight_type = result_order_refund_flight_type
		 	}
		});
	},
	/**
	 * 获取place_of_departure
	 */
	get_upgrade_information_place_of_departure(){
		this.$get("~/api/upgrade_information/get_list?like=0", { page: 1, size: 10, "place_of_departure": this.query.word }, (json) => {
		  if (json.result) {
			var result_upgrade_information_place_of_departure = json.result.list;
			result_upgrade_information_place_of_departure.map(o => o.title = o['place_of_departure'])
	  			this.result_upgrade_information_place_of_departure = result_upgrade_information_place_of_departure
		 	}
		});
	},
	/**
	 * 获取destination
	 */
	get_upgrade_information_destination(){
		this.$get("~/api/upgrade_information/get_list?like=0", { page: 1, size: 10, "destination": this.query.word }, (json) => {
		  if (json.result) {
			var result_upgrade_information_destination = json.result.list;
			result_upgrade_information_destination.map(o => o.title = o['destination'])
	  			this.result_upgrade_information_destination = result_upgrade_information_destination
		 	}
		});
	},
	/**
	 * 获取departure_time
	 */
	get_upgrade_information_departure_time(){
		this.$get("~/api/upgrade_information/get_list?like=0", { page: 1, size: 10, "departure_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_upgrade_information_departure_time = json.result.list;
			result_upgrade_information_departure_time.map(o => o.title = o['departure_time'])
	  			this.result_upgrade_information_departure_time = result_upgrade_information_departure_time
		 	}
		});
	},
	/**
	 * 获取arrival_time
	 */
	get_upgrade_information_arrival_time(){
		this.$get("~/api/upgrade_information/get_list?like=0", { page: 1, size: 10, "arrival_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_upgrade_information_arrival_time = json.result.list;
			result_upgrade_information_arrival_time.map(o => o.title = o['arrival_time'])
	  			this.result_upgrade_information_arrival_time = result_upgrade_information_arrival_time
		 	}
		});
	},
	/**
	 * 获取flight_type
	 */
	get_upgrade_information_flight_type(){
		this.$get("~/api/upgrade_information/get_list?like=0", { page: 1, size: 10, "flight_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_upgrade_information_flight_type = json.result.list;
			result_upgrade_information_flight_type.map(o => o.title = o['flight_type'])
	  			this.result_upgrade_information_flight_type = result_upgrade_information_flight_type
		 	}
		});
	},
	/**
	 * 获取place_of_departure
	 */
	get_visa_change_application_place_of_departure(){
		this.$get("~/api/visa_change_application/get_list?like=0", { page: 1, size: 10, "place_of_departure": this.query.word }, (json) => {
		  if (json.result) {
			var result_visa_change_application_place_of_departure = json.result.list;
			result_visa_change_application_place_of_departure.map(o => o.title = o['place_of_departure'])
	  			this.result_visa_change_application_place_of_departure = result_visa_change_application_place_of_departure
		 	}
		});
	},
	/**
	 * 获取destination
	 */
	get_visa_change_application_destination(){
		this.$get("~/api/visa_change_application/get_list?like=0", { page: 1, size: 10, "destination": this.query.word }, (json) => {
		  if (json.result) {
			var result_visa_change_application_destination = json.result.list;
			result_visa_change_application_destination.map(o => o.title = o['destination'])
	  			this.result_visa_change_application_destination = result_visa_change_application_destination
		 	}
		});
	},
	/**
	 * 获取departure_time
	 */
	get_visa_change_application_departure_time(){
		this.$get("~/api/visa_change_application/get_list?like=0", { page: 1, size: 10, "departure_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_visa_change_application_departure_time = json.result.list;
			result_visa_change_application_departure_time.map(o => o.title = o['departure_time'])
	  			this.result_visa_change_application_departure_time = result_visa_change_application_departure_time
		 	}
		});
	},
	/**
	 * 获取arrival_time
	 */
	get_visa_change_application_arrival_time(){
		this.$get("~/api/visa_change_application/get_list?like=0", { page: 1, size: 10, "arrival_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_visa_change_application_arrival_time = json.result.list;
			result_visa_change_application_arrival_time.map(o => o.title = o['arrival_time'])
	  			this.result_visa_change_application_arrival_time = result_visa_change_application_arrival_time
		 	}
		});
	},
	/**
	 * 获取flight_type
	 */
	get_visa_change_application_flight_type(){
		this.$get("~/api/visa_change_application/get_list?like=0", { page: 1, size: 10, "flight_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_visa_change_application_flight_type = json.result.list;
			result_visa_change_application_flight_type.map(o => o.title = o['flight_type'])
	  			this.result_visa_change_application_flight_type = result_visa_change_application_flight_type
		 	}
		});
	},
	/**
	 * 获取change_of_departure
	 */
	get_rescheduling_payment_change_of_departure(){
		this.$get("~/api/rescheduling_payment/get_list?like=0", { page: 1, size: 10, "change_of_departure": this.query.word }, (json) => {
		  if (json.result) {
			var result_rescheduling_payment_change_of_departure = json.result.list;
			result_rescheduling_payment_change_of_departure.map(o => o.title = o['change_of_departure'])
	  			this.result_rescheduling_payment_change_of_departure = result_rescheduling_payment_change_of_departure
		 	}
		});
	},
	/**
	 * 获取change_destination
	 */
	get_rescheduling_payment_change_destination(){
		this.$get("~/api/rescheduling_payment/get_list?like=0", { page: 1, size: 10, "change_destination": this.query.word }, (json) => {
		  if (json.result) {
			var result_rescheduling_payment_change_destination = json.result.list;
			result_rescheduling_payment_change_destination.map(o => o.title = o['change_destination'])
	  			this.result_rescheduling_payment_change_destination = result_rescheduling_payment_change_destination
		 	}
		});
	},
	/**
	 * 获取departure_time
	 */
	get_rescheduling_payment_departure_time(){
		this.$get("~/api/rescheduling_payment/get_list?like=0", { page: 1, size: 10, "departure_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_rescheduling_payment_departure_time = json.result.list;
			result_rescheduling_payment_departure_time.map(o => o.title = o['departure_time'])
	  			this.result_rescheduling_payment_departure_time = result_rescheduling_payment_departure_time
		 	}
		});
	},
	/**
	 * 获取landing_time
	 */
	get_rescheduling_payment_landing_time(){
		this.$get("~/api/rescheduling_payment/get_list?like=0", { page: 1, size: 10, "landing_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_rescheduling_payment_landing_time = json.result.list;
			result_rescheduling_payment_landing_time.map(o => o.title = o['landing_time'])
	  			this.result_rescheduling_payment_landing_time = result_rescheduling_payment_landing_time
		 	}
		});
	},
	/**
	 * 获取change_flight_type
	 */
	get_rescheduling_payment_change_flight_type(){
		this.$get("~/api/rescheduling_payment/get_list?like=0", { page: 1, size: 10, "change_flight_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_rescheduling_payment_change_flight_type = json.result.list;
			result_rescheduling_payment_change_flight_type.map(o => o.title = o['change_flight_type'])
	  			this.result_rescheduling_payment_change_flight_type = result_rescheduling_payment_change_flight_type
		 	}
		});
	},

  },
  components: { list_result_search },
	created(){
    this.query.word = this.$route.query.word || "";
  },
  mounted() {
	this.get_article();
	this.get_forum();
		this.get_user_registration_id();
		this.get_user_registration_full_name();
		this.get_flight_information_place_of_departure();
		this.get_flight_information_destination();
		this.get_flight_information_departure_time();
		this.get_flight_information_flight_type();
		this.get_epidemic_policy_region_name();
		this.get_order_center_place_of_departure();
		this.get_order_center_destination();
		this.get_order_center_departure_time();
		this.get_order_center_arrival_time();
		this.get_order_center_flight_type();
		this.get_order_refund_place_of_departure();
		this.get_order_refund_destination();
		this.get_order_refund_departure_time();
		this.get_order_refund_arrival_time();
		this.get_order_refund_flight_type();
		this.get_upgrade_information_place_of_departure();
		this.get_upgrade_information_destination();
		this.get_upgrade_information_departure_time();
		this.get_upgrade_information_arrival_time();
		this.get_upgrade_information_flight_type();
		this.get_visa_change_application_place_of_departure();
		this.get_visa_change_application_destination();
		this.get_visa_change_application_departure_time();
		this.get_visa_change_application_arrival_time();
		this.get_visa_change_application_flight_type();
		this.get_rescheduling_payment_change_of_departure();
		this.get_rescheduling_payment_change_destination();
		this.get_rescheduling_payment_departure_time();
		this.get_rescheduling_payment_landing_time();
		this.get_rescheduling_payment_change_flight_type();
  },
  watch: {
	$route() {
	  $.push(this.query, this.$route.query);
	  this.get_article();
	  this.get_forum();
	  this.get_user_registration_id();
	  this.get_user_registration_full_name();
	  this.get_flight_information_place_of_departure();
	  this.get_flight_information_destination();
	  this.get_flight_information_departure_time();
	  this.get_flight_information_flight_type();
	  this.get_epidemic_policy_region_name();
	  this.get_order_center_place_of_departure();
	  this.get_order_center_destination();
	  this.get_order_center_departure_time();
	  this.get_order_center_arrival_time();
	  this.get_order_center_flight_type();
	  this.get_order_refund_place_of_departure();
	  this.get_order_refund_destination();
	  this.get_order_refund_departure_time();
	  this.get_order_refund_arrival_time();
	  this.get_order_refund_flight_type();
	  this.get_upgrade_information_place_of_departure();
	  this.get_upgrade_information_destination();
	  this.get_upgrade_information_departure_time();
	  this.get_upgrade_information_arrival_time();
	  this.get_upgrade_information_flight_type();
	  this.get_visa_change_application_place_of_departure();
	  this.get_visa_change_application_destination();
	  this.get_visa_change_application_departure_time();
	  this.get_visa_change_application_arrival_time();
	  this.get_visa_change_application_flight_type();
	  this.get_rescheduling_payment_change_of_departure();
	  this.get_rescheduling_payment_change_destination();
	  this.get_rescheduling_payment_departure_time();
	  this.get_rescheduling_payment_landing_time();
	  this.get_rescheduling_payment_change_flight_type();
	},
  },
};
</script>

<style scoped>
.card_search {
  text-align: center;
}
.card_result_search>.title {
  text-align: center;
  padding: 10px 0;
}
</style>
