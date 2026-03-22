<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','place_of_departure') || $check_field('add','place_of_departure') || $check_field('set','place_of_departure')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出发地" prop="place_of_departure">
					<el-input id="place_of_departure" v-model="form['place_of_departure']" placeholder="请输入出发地"
							  v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','place_of_departure')) || (!form['flight_information_id'] && $check_field('add','place_of_departure'))" :disabled="disabledObj['place_of_departure_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','place_of_departure')">{{form['place_of_departure']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','destination') || $check_field('add','destination') || $check_field('set','destination')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="目的地" prop="destination">
					<el-input id="destination" v-model="form['destination']" placeholder="请输入目的地"
							  v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','destination')) || (!form['flight_information_id'] && $check_field('add','destination'))" :disabled="disabledObj['destination_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','destination')">{{form['destination']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','departure_time') || $check_field('add','departure_time') || $check_field('set','departure_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出发时间" prop="departure_time">
					<el-date-picker :disabled="disabledObj['departure_time_isDisabled']" v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','departure_time')) || (!form['flight_information_id'] && $check_field('add','departure_time'))" id="departure_time"
						v-model="form['departure_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','departure_time')">{{form['departure_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','arrival_time') || $check_field('add','arrival_time') || $check_field('set','arrival_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="到达时间" prop="arrival_time">
					<el-date-picker :disabled="disabledObj['arrival_time_isDisabled']" v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','arrival_time')) || (!form['flight_information_id'] && $check_field('add','arrival_time'))" id="arrival_time"
						v-model="form['arrival_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','arrival_time')">{{form['arrival_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','flight_type') || $check_field('add','flight_type') || $check_field('set','flight_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="航班类型" prop="flight_type">
					<el-select id="flight_type" v-model="form['flight_type']"
						v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','flight_type')) || (!form['flight_information_id'] && $check_field('add','flight_type'))">
						<el-option v-for="o in list_flight_type" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','flight_type')">{{form['flight_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','seat_type') || $check_field('add','seat_type') || $check_field('set','seat_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="座位类型" prop="seat_type">
					<el-select id="seat_type" v-model="form['seat_type']"
						v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','seat_type')) || (!form['flight_information_id'] && $check_field('add','seat_type'))">
						<el-option v-for="o in list_seat_type" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','seat_type')">{{form['seat_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','passenger_plane_number') || $check_field('add','passenger_plane_number') || $check_field('set','passenger_plane_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机编号" prop="passenger_plane_number">
					<el-select id="passenger_plane_number" v-model="form['passenger_plane_number']"
						v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','passenger_plane_number')) || (!form['flight_information_id'] && $check_field('add','passenger_plane_number'))">
						<el-option v-for="o in list_passenger_plane_number" :key="o['passenger_plane_number']" :label="o['passenger_plane_number']"
							:value="o['passenger_plane_number']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','passenger_plane_number')">{{form['passenger_plane_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','aircraft_model') || $check_field('add','aircraft_model') || $check_field('set','aircraft_model')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机型号" prop="aircraft_model">
					<el-select id="aircraft_model" v-model="form['aircraft_model']"
						v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','aircraft_model')) || (!form['flight_information_id'] && $check_field('add','aircraft_model'))">
						<el-option v-for="o in list_aircraft_model" :key="o['aircraft_model']" :label="o['aircraft_model']"
							:value="o['aircraft_model']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','aircraft_model')">{{form['aircraft_model']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','remaining_votes') || $check_field('add','remaining_votes') || $check_field('set','remaining_votes')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="剩余票数" prop="remaining_votes">
					<el-input-number id="remaining_votes" v-model.number="form['remaining_votes']"
						v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','remaining_votes')) || (!form['flight_information_id'] && $check_field('add','remaining_votes'))" :disabled="disabledObj['remaining_votes_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','remaining_votes')">{{form['remaining_votes']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','ticket_price') || $check_field('add','ticket_price') || $check_field('set','ticket_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="票价" prop="ticket_price">
					<el-input id="ticket_price" v-model="form['ticket_price']" placeholder="请输入票价"
							  v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','ticket_price')) || (!form['flight_information_id'] && $check_field('add','ticket_price'))" :disabled="disabledObj['ticket_price_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','ticket_price')">{{form['ticket_price']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','cover') || $check_field('add','cover') || $check_field('set','cover')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="封面" prop="cover">
					<el-upload :disabled="disabledObj['cover_isDisabled']" id="cover" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_cover"
						:show-file-list="false" v-if="user_group === '管理员' || (form['flight_information_id'] && $check_field('set','cover')) || (!form['flight_information_id'] && $check_field('add','cover'))">
						<img v-if="form['cover']" :src="$fullUrl(form['cover'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','cover')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['cover'])" :preview-src-list="[$fullUrl(form['cover'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" class="el_form_item_warp">
				<el-form-item label="选座" prop="seat">
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
				field: "flight_information_id",
				url_add: "~/api/flight_information/add?",
				url_set: "~/api/flight_information/set?",
				url_get_obj: "~/api/flight_information/get_obj?",
				url_upload: "~/api/flight_information/upload?",

				query: {
					"flight_information_id": 0,
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
					"remaining_votes":0, // 剩余票数
					"ticket_price":'', // 票价
					"cover":'', // 封面
					"flight_information_id": 0, // ID
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
          "remaining_votes_isDisabled": false,
					"ticket_price_isDisabled": false,
					"cover_isDisabled": false,
				},
				//航班类型选项列表
				list_flight_type: ['国内','国际'],
				//座位类型选项列表
				list_seat_type: ['经济舱','头等舱'],
				//客机编号选项列表
				list_passenger_plane_number: [],
				//客机型号选项列表
				list_aircraft_model: [],
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
			/**
			 * 获取客机编号列表
			 */
			async get_list_passenger_plane_number() {
				var json = await this.$get("~/api/passenger_plane_management/get_list?");
				if(json.result && json.result.list){
					this.list_passenger_plane_number = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			/**
			 * 获取客机型号列表
			 */
			async get_list_aircraft_model() {
				var json = await this.$get("~/api/passenger_plane_management/get_list?");
				if(json.result && json.result.list){
					this.list_aircraft_model = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			/**
			 * 上传封面
			 * @param {Object} param图片参数
			 */
			upload_cover(param){
				this.uploadFile(param.file, "cover");
			},

			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
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
        if (this.form["departure_time"].indexOf("-")===-1){
          this.form["departure_time"] = this.$toTime(parseInt(this.form["departure_time"]),"yyyy-MM-dd")
        }
        if (this.form["arrival_time"].indexOf("-")===-1){
          this.form["arrival_time"] = this.$toTime(parseInt(this.form["arrival_time"]),"yyyy-MM-dd")
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
        if(this.form["departure_time"]=="0000-00-00"){
          this.form["departure_time"] = null;
        }
				if(parseInt(this.form["departure_time"]) > 9999){
					this.form["departure_time"] = this.$toTime(parseInt(this.form["departure_time"]),"yyyy-MM-dd")
				}
        if(this.form["arrival_time"]=="0000-00-00"){
          this.form["arrival_time"] = null;
        }
				if(parseInt(this.form["arrival_time"]) > 9999){
					this.form["arrival_time"] = this.$toTime(parseInt(this.form["arrival_time"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/flight_information/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/flight_information/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/flight_information/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/flight_information/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/flight_information/view','get');
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
			  var json = await this.$get("~/api/flight_information/get_list");
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
			this.get_list_passenger_plane_number();
			this.get_list_aircraft_model();
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
