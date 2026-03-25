<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','place_of_departure') || $check_field('add','place_of_departure') || $check_field('set','place_of_departure')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出发地" prop="place_of_departure">
					<el-input id="place_of_departure" v-model="form['place_of_departure']" placeholder="请输入出发地"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','place_of_departure')) || (!form['order_center_id'] && $check_field('add','place_of_departure'))" :disabled="disabledObj['place_of_departure_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','place_of_departure')">{{form['place_of_departure']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','destination') || $check_field('add','destination') || $check_field('set','destination')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="目的地" prop="destination">
					<el-input id="destination" v-model="form['destination']" placeholder="请输入目的地"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','destination')) || (!form['order_center_id'] && $check_field('add','destination'))" :disabled="disabledObj['destination_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','destination')">{{form['destination']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','departure_time') || $check_field('add','departure_time') || $check_field('set','departure_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出发时间" prop="departure_time">
					<el-input id="departure_time" v-model="form['departure_time']" placeholder="请输入出发时间"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','departure_time')) || (!form['order_center_id'] && $check_field('add','departure_time'))" :disabled="disabledObj['departure_time_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','departure_time')">{{form['departure_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','arrival_time') || $check_field('add','arrival_time') || $check_field('set','arrival_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="到达时间" prop="arrival_time">
					<el-input id="arrival_time" v-model="form['arrival_time']" placeholder="请输入到达时间"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','arrival_time')) || (!form['order_center_id'] && $check_field('add','arrival_time'))" :disabled="disabledObj['arrival_time_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','arrival_time')">{{form['arrival_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','flight_type') || $check_field('add','flight_type') || $check_field('set','flight_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="航班类型" prop="flight_type">
					<el-input id="flight_type" v-model="form['flight_type']" placeholder="请输入航班类型"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','flight_type')) || (!form['order_center_id'] && $check_field('add','flight_type'))" :disabled="disabledObj['flight_type_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','flight_type')">{{form['flight_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','seat_type') || $check_field('add','seat_type') || $check_field('set','seat_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="座位类型" prop="seat_type">
					<el-input id="seat_type" v-model="form['seat_type']" placeholder="请输入座位类型"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','seat_type')) || (!form['order_center_id'] && $check_field('add','seat_type'))" :disabled="disabledObj['seat_type_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','seat_type')">{{form['seat_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','passenger_plane_number') || $check_field('add','passenger_plane_number') || $check_field('set','passenger_plane_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机编号" prop="passenger_plane_number">
					<el-input id="passenger_plane_number" v-model="form['passenger_plane_number']" placeholder="请输入客机编号"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','passenger_plane_number')) || (!form['order_center_id'] && $check_field('add','passenger_plane_number'))" :disabled="disabledObj['passenger_plane_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','passenger_plane_number')">{{form['passenger_plane_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','aircraft_model') || $check_field('add','aircraft_model') || $check_field('set','aircraft_model')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机型号" prop="aircraft_model">
					<el-input id="aircraft_model" v-model="form['aircraft_model']" placeholder="请输入客机型号"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','aircraft_model')) || (!form['order_center_id'] && $check_field('add','aircraft_model'))" :disabled="disabledObj['aircraft_model_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','aircraft_model')">{{form['aircraft_model']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','ticket_price') || $check_field('add','ticket_price') || $check_field('set','ticket_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="票价" prop="ticket_price">
					<el-input id="ticket_price" v-model="form['ticket_price']" placeholder="请输入票价"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','ticket_price')) || (!form['order_center_id'] && $check_field('add','ticket_price'))" :disabled="disabledObj['ticket_price_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','ticket_price')">{{form['ticket_price']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','number_of_purchased_sheets') || $check_field('add','number_of_purchased_sheets') || $check_field('set','number_of_purchased_sheets')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买张数" prop="number_of_purchased_sheets">
					<el-input-number id="number_of_purchased_sheets" v-model.number="form['number_of_purchased_sheets']"
						v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','number_of_purchased_sheets')) || (!form['order_center_id'] && $check_field('add','number_of_purchased_sheets'))" :disabled="disabledObj['number_of_purchased_sheets_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','number_of_purchased_sheets')">{{form['number_of_purchased_sheets']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','total_amount') || $check_field('add','total_amount') || $check_field('set','total_amount')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="总金额" prop="total_amount">
					<el-input id="total_amount" v-model="form['total_amount']" placeholder="请输入总金额"
							  v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','total_amount')) || (!form['order_center_id'] && $check_field('add','total_amount'))"  @focus="set_total_amount()" :disabled="disabledObj['total_amount_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','total_amount')">{{form['total_amount']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','user_account') || $check_field('add','user_account') || $check_field('set','user_account')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户账号" prop="user_account">
						<div v-if="user_group !== '管理员'">
							{{ get_user_session_user_account(form['user_account']) }}
							<!--<el-input id="business_name" v-model="form['user_account']" placeholder="请输入用户账号"-->
							<!--v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','user_account')) || (!form['order_center_id'] && $check_field('add','user_account'))" :disabled="disabledObj['user_account_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','user_account')">{{form['user_account']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','user_account')) || (!form['order_center_id'] && $check_field('add','user_account'))" id="user_account" v-model="form['user_account']" :disabled="disabledObj['user_account_isDisabled']">
								<el-option v-for="o in list_user_user_account" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','user_account')" id="user_account" v-model="form['user_account']" :disabled="true">
								<el-option v-for="o in list_user_user_account" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="user_account" v-model="form['user_account']" :disabled="disabledObj['user_account_isDisabled']">
							<el-option v-for="o in list_user_user_account" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','order_status') || $check_field('add','order_status') || $check_field('set','order_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="订单状态" prop="order_status">
					<el-select id="order_status" v-model="form['order_status']"
						v-if="user_group === '管理员' || (form['order_center_id'] && $check_field('set','order_status')) || (!form['order_center_id'] && $check_field('add','order_status'))">
						<el-option v-for="o in list_order_status" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','order_status')">{{form['order_status']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" class="el_form_item_warp">
				<el-form-item label="已选座位" prop="seat">
					<div v-if="form.seat" style="margin-bottom: 10px; padding: 10px; background: #f0f9ff; border-radius: 4px; border: 1px solid #409eff;">
						<strong style="color: #409eff;">{{ formatSeatDisplay(form.seat) }}</strong>
					</div>
					<div v-else style="margin-bottom: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px; color: #999;">
						未选择座位
					</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" class="el_form_item_warp">
				<el-form-item label="座位图" prop="seat">
				  <div class="seat-wrapper">
					<div class="illustration">
					  <div class="illustration-img-wrapper unselected-seat"></div>
					  <span class="illustration-text">可选</span>
					  <div class="illustration-img-wrapper selected-seat"></div>
					  <span class="illustration-text">已选</span>
					  <div class="illustration-img-wrapper bought-seat"></div>
					  <span class="illustration-text">不可选</span>
					  <div class="btn-buy" @click="buySeat">选定座位</div>
					</div>
					<div class="inner-seat-wrapper" ref="innerSeatWrapper">
					  <div v-for="row in seatRow">
						<!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
						<div
						  v-for="col in seatCol"
						  v-if="seatArray.length > 0"
						  class="seat"
						  :style="{ width: seatSize + 'px', height: seatSize + 'px' }"
						>
						  <div
							class="inner-seat"
							@click="handleChooseSeat(row - 1, col - 1)"
							v-if="seatArray[row - 1][col - 1] !== -1"
							:class="
							  seatArray[row - 1][col - 1] === 2
								? 'bought-seat'
								: seatArray[row - 1][col - 1] === 1
								? 'selected-seat'
								: 'unselected-seat'
							"
						  ></div>
						</div>
					  </div>
					</div>
				  </div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item>
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "order_center_id",
				url_add: "~/api/order_center/add?",
				url_set: "~/api/order_center/set?",
				url_get_obj: "~/api/order_center/get_obj?",
				url_upload: "~/api/order_center/upload?",

				query: {
					"order_center_id": 0,
				},

				form: {
					"place_of_departure":'', // 出发地
					"destination":'', // 目的地
					"departure_time":'', // 出发时间
					"arrival_time":'', // 到达时间
					"flight_type":'', // 航班类型
					"seat_type":'', // 座位类型
					"passenger_plane_number":'', // 客机编号
					"aircraft_model":'', // 客机型号
					"ticket_price":'', // 票价
					"number_of_purchased_sheets":0, // 购买张数
					"total_amount":'', // 总金额
					"user_account": 0, // 用户账号
					"order_status":'', // 订单状态
					"order_center_id": 0, // ID
					"seat": "", // 座位

				},
				disabledObj:{
					"place_of_departure_isDisabled": false,
					"destination_isDisabled": false,
					"departure_time_isDisabled": false,
					"arrival_time_isDisabled": false,
					"flight_type_isDisabled": false,
					"seat_type_isDisabled": false,
					"passenger_plane_number_isDisabled": false,
					"aircraft_model_isDisabled": false,
					"ticket_price_isDisabled": false,
          "number_of_purchased_sheets_isDisabled": false,
					"total_amount_isDisabled": false,
					"user_account_isDisabled": false,
					"order_status_isDisabled": false,
				},
				// 用户列表
				list_user_user_account: [],
				// 用户组
				group_user_user_account: "",
				//订单状态选项列表
				list_order_status: ['未出行','已结束'],
				//影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
				seatArray: [],
				//影院座位行数
				seatRow: 5,
				//影院座位列数
				seatCol: 8,
				//座位尺寸
				seatSize: "",
				seatArr: [],
				list_: [],
				seatList: "",
			}
		},
		methods: {
			set_total_amount(){
				this.form.total_amount =this.form.ticket_price * this.form.number_of_purchased_sheets
			},
			/**
			 * 获取用户注册用户列表
			 */
			async get_list_user_user_account() {
                // if(this.user_group !== "管理员" && this.form["user_account"] === 0) {
                //     this.form["user_account"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=用户注册");
                if(json.result && json.result.list){
                    this.list_user_user_account = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
			/**
			 * 获取用户注册用户组
			 */
			async get_group_user_user_account() {
				this.form["user_account"] = this.user.user_id;
				var json = await this.$get("~/api/user_group/get_obj?name=用户注册");
				if(json.result && json.result.obj){
					this.group_user_user_account = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_user_account(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_user_account.source_table+"/get_obj?"
				this.$get(url, user_id, function(res) {
					if (res.result && res.result.obj) {
						var arr = []
						for (let key in res.result.obj) {
							arr.push(key)
						}
						var arrForm = []
						for (let key in _this.form) {
							arrForm.push(key)
						}
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                for (var j = 0; j < arrForm.length; j++) {
                  if (arr[i] === arrForm[j]) {
                    if (arr[i] !== "user_account") {
                      _this.form[arrForm[j]] = res.result.obj[arr[i]]
                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                      break;
                    } else {
                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                    }
                  }
                }
              }
						}
					}
				});
			},
			get_user_user_account(id){
				var obj = this.list_user_user_account.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},

			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
				// 获取缓存数据附加
				form = $.db.get("form");
				$.push(this.form ,form);
				/**
				* 请求列表前
				* @param {Object} param
				*/
				var user_group = this.user.user_group;
				if (user_group !== "管理员") {
					switch (user_group) {
						case "用户账号":
							if(param["user_account"] > 0){
								param["user_account"] = this.user.user_id;
							}
							break;
					}
				}
				if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
							}
						})
					})
				}
				$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){
				// 获取订单详情后，初始化座位图
				if (json.result && json.result.obj) {
					this.initOrderSeat(json.result.obj);
				}
				if(func){
					func(json);
				}
			},

			// 初始化订单座位图
			initOrderSeat(order) {
				// 获取所有已售座位
				this.$get("~/api/order_center/get_list", {}, (res) => {
					if (res.result && res.result.list) {
						let seatArr = "";
						let list = res.result.list;

						// 收集所有已售座位（排除当前订单）
						for (let j = 0; j < list.length; j++) {
							let seat = list[j].seat;
							// 跳过当前订单的座位（这些座位应该显示为已选，不是已售）
							if (list[j].order_center_id !== order.order_center_id && seat != null && seat != "") {
								if (seatArr == "") {
									seatArr = seat + "";
								} else {
									seatArr = seatArr + "," + seat;
								}
							}
						}
						this.seatList = seatArr;
					}
					this.initSeatArrayWithOrder(order);
				});
			},

			// 初始化座位数组（包含当前订单的座位）
			initSeatArrayWithOrder(order) {
				let seatList = this.seatList;
				let seatArr = seatList.split(",");
				if (seatList == "" || seatList == null) {
					seatArr = [];
				}
				this.seatArr = seatArr;

				// 创建5行8列的座位数组
				let seatArray = Array(this.seatRow)
					.fill(0)
					.map(() => Array(this.seatCol).fill(0));

				// 标记已售座位（红色）
				for (let j = 0; j < seatArr.length; j++) {
					let i = Math.floor(seatArr[j] / 8);
					let x = seatArr[j] % 8;
					if (i < this.seatRow && x < this.seatCol) {
						seatArray[i][x] = 2;
					}
				}

				// 标记当前订单的座位为已选（绿色）
				if (order.seat) {
					let orderSeats = order.seat.split(",");
					for (let k = 0; k < orderSeats.length; k++) {
						let seatIndex = parseInt(orderSeats[k]);
						if (!isNaN(seatIndex)) {
							// 注意：前端选座用的是6列布局，这里需要适配
							let i = Math.floor(seatIndex / 6);
							let x = seatIndex % 6;
							if (i < this.seatRow && x < 6) {
								seatArray[i][x] = 1; // 标记为已选
							}
						}
					}
				}

				this.seatArray = seatArray;

				// 计算座位尺寸
				this.$nextTick(() => {
					if (this.$refs.innerSeatWrapper) {
						this.seatSize = parseInt(
							parseInt(
								window.getComputedStyle(this.$refs.innerSeatWrapper).width,
								10
							) / this.seatCol,
							10
						);
					}
				});
			},

			// 格式化座位显示
			formatSeatDisplay(seatStr) {
				if (!seatStr) return '-';

				try {
					const seatIndices = seatStr.split(',');
					const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
					const seatNames = [];

					seatIndices.forEach(index => {
						const num = parseInt(index.trim());
						if (!isNaN(num)) {
							const row = Math.floor(num / 6) + 1;
							const col = num % 6;
							const seatName = `${row}${columns[col]}`;
							seatNames.push(seatName);
						}
					});

					return seatNames.length > 0 ? seatNames.join(', ') : seatStr;
				} catch (e) {
					console.error('座位格式化错误:', e);
					return seatStr;
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/order_center/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/order_center/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/order_center/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/order_center/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/order_center/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},
			// 选座
			//选定且购买座位
			buySeat: function () {
			  //遍历seatArray，将值为1的座位变为2
			  let oldArray = this.seatArray.slice();
			  for (let i = 0; i < this.seatRow; i++) {
				for (let j = 0; j < this.seatCol; j++) {
				  if (oldArray[i][j] === 1) {
					oldArray[i][j] = 2;
				  }
				}
			  }
			  this.seatArray = oldArray;
			  let string = "";
			  for (let x = 0; x < oldArray.length; x++) {
				let array = oldArray[x];
				for (let j = 0; j < array.length; j++) {
				  if (oldArray[x][j] === 2) {
					if (string == "") {
					  string = "" + (x * 8 + j);
					} else {
					  string = string + "," + (x * 8 + j);
					}
				  }
				}
			  }
			  // 对比判断哪些是新增的座位
			  let seat = this.form.seat;
			  let seatB = "";
			  if (string != "" && string != null) {
				let stringList = string.split(",");
				let seatList = this.seatList;
				if (seatList.length != 0) {
				  let seatListArr = seatList.split(",");
				  for (let v = 0; v < stringList.length; v++) {
					if (
					  seatListArr.indexOf(stringList[v]) == -1 &&
					  seat.indexOf(stringList[v]) == -1
					) {
					  if (seat == "" || seat == null) {
						seat = stringList[v] + "";
						seatB = seat;
					  } else {
						if (seat.indexOf(stringList[v]) == -1) {
						  seat = seat + "," + stringList[v];
						  if (seatB == "" || seatB == null) {
							seatB = stringList[v];
						  } else {
							seatB = seatB + "," + stringList[v];
						  }
						}
					  }
					}
				  }
				} else {
				  seat = string;
				}
			  }

			  if (this.form.seat == "") {
				this.form.seat = seat;
			  } else {
				if (seatB != "") {
				  this.form.seat = this.form.seat + "," + seatB;
				}
			  }
			  this.seatList = string;
			},
			//处理座位选择逻辑
			handleChooseSeat: function (row, col) {
			  let seatValue = this.seatArray[row][col];
			  let newArray = this.seatArray;
			  //如果是已购座位，直接返回
			  if (seatValue === 2) return;
			  //如果是已选座位点击后变未选
			  if (seatValue === 1) {
				newArray[row][col] = 0;
			  } else if (seatValue === 0) {
				newArray[row][col] = 1;
			  }
			  //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
			  this.seatArray = newArray.slice();
			},
			/**
			 * 获取所有座位
			 */
			async get_list() {
			  var json = await this.$get("~/api/order_center/get_list");
			  if (json.result && json.result.list) {
				this.list_ = json.result.list;
			  } else if (json.error) {
				console.error(json.error);
			  }
			  console.log(json);
			  let list = json.result.list;
			  if (list != null && list.length != 0) {
				let seatArr = "";
				for (let j = 0; j < list.length; j++) {
				  let seat = list[j].seat;
				  if (seat != null && seat != "") {
					if (seatArr == "") {
					  seatArr = seat + "";
					} else {
					  seatArr = seatArr + "," + seat;
					}
				  }
				}
				this.seatList = seatArr;
			  }
			  this.initSeatArray(5, 8);
			},

			//初始座位数组
			initSeatArray: function () {
			  let seatList = this.seatList;
			  let seatArr = seatList.split(",");
			  if (seatList == "" || seatList == null) {
				seatArr = [];
			  }
			  this.seatArr = seatArr;

			  let seatArray = Array(this.seatRow)
				.fill(0)
				.map(() => Array(this.seatCol).fill(0));
			  this.seatArray = seatArray;
			  for (let j = 0; j < seatArr.length; j++) {
				let i = Math.floor(seatArr[j] / 8);
				let x = seatArr[j] % 8;
				seatArray[i][x] = 2;
			  }
			  this.seatSize = this.$refs.innerSeatWrapper
				? parseInt(
					parseInt(
					  window.getComputedStyle(this.$refs.innerSeatWrapper).width,
					  10
					) / this.seatCol,
					10
				  )
				: 0;
			},

		},
		created() {
			this.get_list_user_user_account();
			this.get_group_user_user_account();
			this.get_list();
		},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	.seat-wrapper {
	height: 370px;
	width: 500px;
	border: 1px dotted #c5c5c5;
	/* margin: 0 auto; */
	position: relative;
	overflow: hidden;
	}

	.inner-seat-wrapper {
	position: absolute;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
	}
	.seat {
	float: left;
	display: flex;
	justify-content: center;
	align-items: center;
	}
	.inner-seat {
	width: 80%;
	height: 80%;
	cursor: pointer;
	}

	.btn-wrapper {
	margin: 20px auto;
	width: 1000px;
	height: 30px;
	text-align: center;
	}

	.btn-buy {
	height: 100%;
	line-height: 35px;
	font-size: 15px;
	border-radius: 5px;
	padding: 0 5px;
	background-color: #ffa349;
	color: #ffffff;
	display: inline-block;
	cursor: pointer;
	margin: 5px;
	}

	.illustration {
	position: absolute;
	left: 10px;
	top: 20px;
	height: 35px;
	width: 300px;
	}

	.illustration-img-wrapper {
	width: 25px;
	height: 25px;
	position: relative;
	top: 50%;
	display: inline-block;
	transform: translateY(-50%);
	margin-left: 10px;
	}

	.illustration-text {
	display: inline-block;
	height: 100%;
	line-height: 35px;
	font-size: 14px;
	position: relative;
	top: -2px;
	}
    .selected-seat {
	background: url("/img/selected2.png") center center no-repeat;
	background-size: 100% 100%;
	}

	.unselected-seat {
	background: url("/img/unselected2.png") center center no-repeat;
	background-size: 100% 100%;
	}

	.bought-seat {
	background: url("/img/bought2.png") center center no-repeat;
	background-size: 100% 100%;
	}
</style>
