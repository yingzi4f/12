<template>
	<div class="diy_edit page_order_center" id="order_center_edit">
		<div class='warp'>
			<div class='container'>
				<div class='row diy_edit_content_box'>
					<div v-if="$check_field('set','place_of_departure') || $check_field('add','place_of_departure') || $check_field('get','place_of_departure')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>出发地:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_place_of_departure" v-model="form['place_of_departure']" placeholder="请输入出发地" v-if="(form['place_of_departure'] && $check_field('set','place_of_departure')) || (!form['place_of_departure'] && $check_field('add','place_of_departure'))"  :disabled="disabledObj['place_of_departure_isDisabled']"/>
							<span v-else-if="$check_field('get','place_of_departure')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','destination') || $check_field('add','destination') || $check_field('get','destination')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>目的地:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_destination" v-model="form['destination']" placeholder="请输入目的地" v-if="(form['destination'] && $check_field('set','destination')) || (!form['destination'] && $check_field('add','destination'))"  :disabled="disabledObj['destination_isDisabled']"/>
							<span v-else-if="$check_field('get','destination')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','departure_time') || $check_field('add','departure_time') || $check_field('get','departure_time')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>出发时间:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_departure_time" v-model="form['departure_time']" placeholder="请输入出发时间" v-if="(form['departure_time'] && $check_field('set','departure_time')) || (!form['departure_time'] && $check_field('add','departure_time'))"  :disabled="disabledObj['departure_time_isDisabled']"/>
							<span v-else-if="$check_field('get','departure_time')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','arrival_time') || $check_field('add','arrival_time') || $check_field('get','arrival_time')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>到达时间:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_arrival_time" v-model="form['arrival_time']" placeholder="请输入到达时间" v-if="(form['arrival_time'] && $check_field('set','arrival_time')) || (!form['arrival_time'] && $check_field('add','arrival_time'))"  :disabled="disabledObj['arrival_time_isDisabled']"/>
							<span v-else-if="$check_field('get','arrival_time')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','flight_type') || $check_field('add','flight_type') || $check_field('get','flight_type')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>航班类型:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_flight_type" v-model="form['flight_type']" placeholder="请输入航班类型" v-if="(form['flight_type'] && $check_field('set','flight_type')) || (!form['flight_type'] && $check_field('add','flight_type'))"  :disabled="disabledObj['flight_type_isDisabled']"/>
							<span v-else-if="$check_field('get','flight_type')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','seat_type') || $check_field('add','seat_type') || $check_field('get','seat_type')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>座位类型:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_seat_type" v-model="form['seat_type']" placeholder="请输入座位类型" v-if="(form['seat_type'] && $check_field('set','seat_type')) || (!form['seat_type'] && $check_field('add','seat_type'))"  :disabled="disabledObj['seat_type_isDisabled']"/>
							<span v-else-if="$check_field('get','seat_type')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','passenger_plane_number') || $check_field('add','passenger_plane_number') || $check_field('get','passenger_plane_number')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>客机编号:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_passenger_plane_number" v-model="form['passenger_plane_number']" placeholder="请输入客机编号" v-if="(form['passenger_plane_number'] && $check_field('set','passenger_plane_number')) || (!form['passenger_plane_number'] && $check_field('add','passenger_plane_number'))"  :disabled="disabledObj['passenger_plane_number_isDisabled']"/>
							<span v-else-if="$check_field('get','passenger_plane_number')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','aircraft_model') || $check_field('add','aircraft_model') || $check_field('get','aircraft_model')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>客机型号:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_aircraft_model" v-model="form['aircraft_model']" placeholder="请输入客机型号" v-if="(form['aircraft_model'] && $check_field('set','aircraft_model')) || (!form['aircraft_model'] && $check_field('add','aircraft_model'))"  :disabled="disabledObj['aircraft_model_isDisabled']"/>
							<span v-else-if="$check_field('get','aircraft_model')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','ticket_price') || $check_field('add','ticket_price') || $check_field('get','ticket_price')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>票价:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_ticket_price" v-model="form['ticket_price']" placeholder="请输入票价" v-if="(form['ticket_price'] && $check_field('set','ticket_price')) || (!form['ticket_price'] && $check_field('add','ticket_price'))"  :disabled="disabledObj['ticket_price_isDisabled']"/>
							<span v-else-if="$check_field('get','ticket_price')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','number_of_purchased_sheets') || $check_field('add','number_of_purchased_sheets') || $check_field('get','number_of_purchased_sheets')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>购买张数:
							</span>
						</div>
						<!-- 数字 -->
						<div class="diy_field diy_number">
							<input type="number" id="form_number_of_purchased_sheets" v-model.number="form['number_of_purchased_sheets']" placeholder="请输入购买张数" v-if="(form['number_of_purchased_sheets'] && $check_field('set','number_of_purchased_sheets')) || (!form['number_of_purchased_sheets'] && $check_field('add','number_of_purchased_sheets'))" :disabled="disabledObj['number_of_purchased_sheets_isDisabled']" />
							<span v-else-if="$check_field('get','number_of_purchased_sheets')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','total_amount') || $check_field('add','total_amount') || $check_field('get','total_amount')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>总金额:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_total_amount" v-model="form['total_amount']" placeholder="请输入总金额" v-if="(form['total_amount'] && $check_field('set','total_amount')) || (!form['total_amount'] && $check_field('add','total_amount'))"  @focus="set_total_amount()" :disabled="disabledObj['total_amount_isDisabled']"/>
							<span v-else-if="$check_field('get','total_amount')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','user_account') || $check_field('add','user_account') || $check_field('get','user_account')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>用户账号:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_user_account" :disabled="disabledObj['user_account_isDisabled']" v-model="form['user_account']" v-if="(form['user_account'] && $check_field('set','user_account')) || (!form['user_account'] && $check_field('add','user_account'))" >
								<option v-for="o in list_user_user_account" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','user_account')">{{ form['user_account'] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','order_status') || $check_field('add','order_status') || $check_field('get','order_status')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>订单状态:
							</span>
						</div>
						<!-- 选项 -->
						<div class="diy_field diy_down">
							<select id="form_order_status" v-model="form['order_status']" v-if="(form['order_status'] && $check_field('set','order_status')) || (!form['order_status'] && $check_field('add','order_status'))" >
								<option v-for="o in list_order_status" :value="o">
									{{o}}
								</option>
							</select>
							<span v-else-if="$check_field('get','order_status')">{{ form['order_status'] }}</span>
						</div>
					</div>
					<!-- 座位 -->
					<div class="form-item selected_seat_box col-12 col-md-6">
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
							<div v-for="row in seatRow" :key="row">
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
					</div>
				</div>
				<div class="diy_edit_submit_box row">
					<div class="col-12">
						<div class="btn_box">
							<button class="btn_submit" @click="submit()">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_get_obj: "~/api/order_center/get_obj?",
				url_add: "~/api/order_center/add?",
				url_set: "~/api/order_center/set?",

				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},

				// 查询条件
				query: {
					"place_of_departure": "",
					"destination": "",
					"departure_time": "",
					"arrival_time": "",
					"flight_type": "",
					"seat_type": "",
					"passenger_plane_number": "",
					"aircraft_model": "",
					"ticket_price": "",
					"number_of_purchased_sheets": 0,
					"total_amount": "",
					"user_account": 0,
					"order_status": "",
					"order_center_id": 0,
					"seat": "", // 座位
				},

				obj: {
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
					"order_center_id": 0,
					"seat": "", // 座位
				},

				// 表单字段
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
					"order_center_id": 0,
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
					"total_amount_isDisabled": false,
					"user_account_isDisabled": false,
					"order_status_isDisabled": false,
				},
				// 用户列表
				list_user_user_account: [],
				//订单状态选项列表
				list_order_status: ['未出行','已结束'],

				// ID字段
				field: "order_center_id",
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
			async get_user_session_user_account(){
				var _this = this;
				var json = await this.$get("~/api/user_group/get_obj?name=用户注册");
				if(json.result && json.result.obj){
					var source_table = json.result.obj.source_table;
					var user_id = _this.$store.state.user.user_id;
					if (user_id){
						var url = "~/api/"+source_table+"/get_obj?"
						this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
							if (res.result && res.result.obj) {
								var arr = []
								for (let key in res.result.obj) {
									arr.push(key)
								}
								var arrForm = []
								for (let key in _this.form) {
									arrForm.push(key)
								}
								_this.form["user_account"] = user_id
								_this.disabledObj['user_account' + '_isDisabled'] = true
								for (var i=0;i<arr.length;i++){
                  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                    for (var j = 0; j < arrForm.length; j++) {
                      if (arr[i] === arrForm[j]) {
                        if (arr[i] !== "user_account") {
                          _this.form[arrForm[j]] = res.result.obj[arr[i]]
                          _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                          break;
                        }
                      }
                    }
                  }
								}
							}
						});
					}
				}
				else if(json.error){
					console.error(json.error);
				}
			},

			/**
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file(files, str) {
				var form = new FormData();
				form.append("file", files[0]);
				this.$post("~/api/order_center/upload?", form, (res) => {
					if (res.result) {
						this.form[str] = res.result.url;
					} else if (res.error) {
						this.$toast(res.error.message);
					}
				});
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_before(param){
				var form = $.db.get("form");
				if (form) {
          delete(form.examine_state)
          delete(form.examine_reply)
          this.obj = $.push(this.obj ,form);
					this.form = $.push(this.form ,form);
				}
				var arr = []
				for (let key in form) {
					arr.push(key)
				}
				for (var i=0;i<arr.length;i++){
					this.disabledObj[arr[i] + '_isDisabled'] = true
				}
				return param;
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json ,func){
				var form = $.db.get("form");
				var obj = Object.assign({} ,form ,this.obj);
				if (obj) {
          delete(obj.examine_state)
          delete(obj.examine_reply)
					this.obj = $.push(this.obj ,obj);
				}
				if (form) {
          delete(form.examine_state)
          delete(form.examine_reply)
					this.form = $.push(this.form ,form);
				}
				if(func){
					func(json);
				}
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
			  let seat = this.obj.seat;
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
			 * 获取所有坐座位信息
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
			this.get_user_session_user_account();
			this.get_list_user_user_account();
			this.get_list();
		},
	}
</script>

<style>

	.seat-wrapper {
	  margin-top: 20px;
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
