<template>
	<div class="diy_home diy_list diy_rescheduling_payment" id="diy_rescheduling_payment_list">
		<!-- 列表 -->
		<div class="diy_view_list list list-x" v-if="show">
			<router-link class="diy_card goods diy_list_box_wrap" v-for="(o, i) in list" :key="i"
				:to="'/rescheduling_payment/details?rescheduling_payment_id=' + o['rescheduling_payment_id']">
				<!-- 图片 -->
				<div class="diy_list_img_box" v-if="imgList.length" >
					<div class="diy_row" v-for="(item,index) in imgList" :key="item+index" v-show="$check_field('get',item.name,'/rescheduling_payment/details') && +item.is_img_list">
						<div class="diy_title diy_list_img_title">
							<span>{{item.title}}:</span>
						</div>
						<div class="diy_field diy_img">
							<img :src="$fullUrl(o[item.name])" style="width:100%;height:100%" />
						</div>
					</div>
				</div>
				<!-- 内容 -->
				<div class="diy_list_item_box">
					<div class="diy_list_item_content" v-for="(item,index) in showItemList" :key="item+index">
						<div class="diy_row" :class="{[item.name]:true}" v-if="$check_field('get',item.name,'/rescheduling_payment/details') && +item.is_img_list">
							<div class="diy_title">
								<span>{{item.title}}:</span>
							</div>
							<div class="diy_field diy_text">
								<span v-if="item.type == 'UID'" v-text="get_user_name(o[item.name])"></span>
								<span v-else-if="item.type == '日期'" v-text="$toTime(o[item.name],'yyyy-MM-dd')"></span>
								<span v-else-if="item.type == '时间'" v-text="$toTime(o[item.name],'hh:mm:ss')"></span>
								<span v-else-if="item.type == '日长'" v-text="$toTime(o[item.name],'yyyy-MM-dd hh:mm:ss')"></span>
								<span v-else v-text="o[item.name]"></span>
							</div>
						</div>
					</div>
				</div>
			</router-link>
		</div>
		<!-- 表格 -->
		<div class="diy_view_table" v-else>
			<table class="diy_table">
				<tr class="diy_row">
					<th class="diy_title" v-if="$check_field('get','user_account')">用户账号
					</th>
					<th class="diy_title" v-if="$check_field('get','change_of_departure')">改签出发地
					</th>
					<th class="diy_title" v-if="$check_field('get','change_destination')">改签目的地
					</th>
					<th class="diy_title" v-if="$check_field('get','departure_time')">起飞时间
					</th>
					<th class="diy_title" v-if="$check_field('get','landing_time')">落地时间
					</th>
					<th class="diy_title" v-if="$check_field('get','change_flight_type')">改签航班类型
					</th>
					<th class="diy_title" v-if="$check_field('get','change_seat_type')">改签座位类型
					</th>
					<th class="diy_title" v-if="$check_field('get','change_the_passenger_plane_number')">改签客机编号
					</th>
					<th class="diy_title" v-if="$check_field('get','change_the_aircraft_model')">改签客机型号
					</th>
					<th class="diy_title" v-if="$check_field('get','ticket_price_change')">改签票价
					</th>
					<th class="diy_title" v-if="$check_field('get','number_of_changed_purchase_sheets')">改签购买张数
					</th>
					<th class="diy_title" v-if="$check_field('get','total_re_signing')">改签总计
					</th>
				</tr>
				<tr class="diy_row" v-for="(o,i) in list" :key="o+i">
					<td class="diy_field diy_uid" v-if="$check_field('get','user_account')">
						<span>
							{{ get_user_name(o['user_account']) }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','change_of_departure')">
						<span>
							{{ o["change_of_departure"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','change_destination')">
						<span>
							{{ o["change_destination"] }}
						</span>
					</td>
					<td class="diy_field diy_date" v-if="$check_field('get','departure_time')">
						<span>
							{{ $toTime(o["departure_time"] ,"yyyy-MM-dd") }}
						</span>
					</td>
					<td class="diy_field diy_date" v-if="$check_field('get','landing_time')">
						<span>
							{{ $toTime(o["landing_time"] ,"yyyy-MM-dd") }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','change_flight_type')">
						<span>
							{{ o["change_flight_type"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','change_seat_type')">
						<span>
							{{ o["change_seat_type"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','change_the_passenger_plane_number')">
						<span>
							{{ o["change_the_passenger_plane_number"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','change_the_aircraft_model')">
						<span>
							{{ o["change_the_aircraft_model"] }}
						</span>
					</td>
					<td class="diy_field diy_number" v-if="$check_field('get','ticket_price_change')">
						<span>
							{{ o["ticket_price_change"] }}
						</span>
					</td>
					<td class="diy_field diy_number" v-if="$check_field('get','number_of_changed_purchase_sheets')">
						<span>
							{{ o["number_of_changed_purchase_sheets"] }}
						</span>
					</td>
					<td class="diy_field diy_text" v-if="$check_field('get','total_re_signing')">
						<span>
							{{ o["total_re_signing"] }}
						</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				},
			},
			show: {
				type: Boolean,
				default: function(){
					return true;
				}
			}
		},
		data() {
			return {
						imgList: [
						],
						itemList: [
								{
									title: "用户账号",
									name: "user_account",
									type: "UID",
									is_img_list: "0"
								},
								{
									title: "改签出发地",
									name: "change_of_departure",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "改签目的地",
									name: "change_destination",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "起飞时间",
									name: "departure_time",
									type: "日期",
									is_img_list: "0"
								},
								{
									title: "落地时间",
									name: "landing_time",
									type: "日期",
									is_img_list: "0"
								},
								{
									title: "改签航班类型",
									name: "change_flight_type",
									type: "下拉",
									is_img_list: "0"
								},
								{
									title: "改签座位类型",
									name: "change_seat_type",
									type: "下拉",
									is_img_list: "0"
								},
								{
									title: "改签客机编号",
									name: "change_the_passenger_plane_number",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "改签客机型号",
									name: "change_the_aircraft_model",
									type: "文本",
									is_img_list: "0"
								},
								{
									title: "改签票价",
									name: "ticket_price_change",
									type: "数字",
									is_img_list: "0"
								},
								{
									title: "改签购买张数",
									name: "number_of_changed_purchase_sheets",
									type: "数字",
									is_img_list: "0"
								},
								{
									title: "改签总计",
									name: "total_re_signing",
									type: "文本",
									is_img_list: "0"
								},
						],
						richList: [
						],
				// 用户列表
				list_user_user_account: [],
			};
		},
		methods: {
			/**
			 * 获取用户注册用户列表
			 */
			async get_list_user_user_account() {
				var json = await this.$get("~/api/user/get_list?user_group=用户注册");
				if(json.result && json.result.list){
					this.list_user_user_account = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_name(id){
				var obj = this.list_user_user_account.getObj({"user_id":id});
				var ret = "";
				if(obj){
					ret = obj.nickname+"-"+obj.username;
					// if(obj.nickname){
					// 	ret = obj.nickname;
					// }
					// else{
					// 	ret = obj.username;
					// }
				}
				return ret;
			},
		},
		created() {
			this.get_list_user_user_account();
		},
		computed:{
			showItemList(){
				let arr = [];
				let _type = ["视频","音频","文件"];
				this.itemList.forEach(item => {
					if(_type.indexOf(item.type) === -1 && !!+item.is_img_list){
						arr.push(item)
					}
				})
				return arr.slice(0,4);
			}
		}
	};
</script>

<style scoped>
	.media {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 75%;
		min-height: 10rem;
	}

	.goods {
		display: flex;
		width: calc(25% - 1rem);
		margin: 0.5rem;
		padding: 0.5rem;
		flex-direction: column;
		justify-content: space-between;
		background-color: white;
		border-radius: 0.5rem;
	}

	.goods:hover {
		border: 0.2rem solid #909399;
		box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
	}

	.goods:hover img {
		filter: blur(1px);
	}

	.price {
		font-size: 1rem;
		margin-right: 3px;
	}

	.price_ago {
		text-decoration: line-through;
		font-size: 0.5rem;
		color: #999;

	}

	.title {
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 700;
		padding: .25rem;
	}

	.icon_cart {
		color: #FF5722;
		float: right;
	}

	@media (max-width: 992px) {

		.goods {
			width: calc(33% - 1rem);
			;
		}

	}

	@media (max-width: 768px) {

		.goods {
			width: calc(50% - 1rem);
			;
		}

	}
</style>

