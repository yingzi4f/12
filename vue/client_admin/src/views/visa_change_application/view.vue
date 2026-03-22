<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','place_of_departure') || $check_field('add','place_of_departure') || $check_field('set','place_of_departure')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出发地" prop="place_of_departure">
					<el-input id="place_of_departure" v-model="form['place_of_departure']" placeholder="请输入出发地"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','place_of_departure')) || (!form['visa_change_application_id'] && $check_field('add','place_of_departure'))" :disabled="disabledObj['place_of_departure_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','place_of_departure')">{{form['place_of_departure']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','destination') || $check_field('add','destination') || $check_field('set','destination')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="目的地" prop="destination">
					<el-input id="destination" v-model="form['destination']" placeholder="请输入目的地"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','destination')) || (!form['visa_change_application_id'] && $check_field('add','destination'))" :disabled="disabledObj['destination_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','destination')">{{form['destination']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','departure_time') || $check_field('add','departure_time') || $check_field('set','departure_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="出发时间" prop="departure_time">
					<el-input id="departure_time" v-model="form['departure_time']" placeholder="请输入出发时间"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','departure_time')) || (!form['visa_change_application_id'] && $check_field('add','departure_time'))" :disabled="disabledObj['departure_time_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','departure_time')">{{form['departure_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','arrival_time') || $check_field('add','arrival_time') || $check_field('set','arrival_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="到达时间" prop="arrival_time">
					<el-input id="arrival_time" v-model="form['arrival_time']" placeholder="请输入到达时间"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','arrival_time')) || (!form['visa_change_application_id'] && $check_field('add','arrival_time'))" :disabled="disabledObj['arrival_time_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','arrival_time')">{{form['arrival_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','flight_type') || $check_field('add','flight_type') || $check_field('set','flight_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="航班类型" prop="flight_type">
					<el-input id="flight_type" v-model="form['flight_type']" placeholder="请输入航班类型"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','flight_type')) || (!form['visa_change_application_id'] && $check_field('add','flight_type'))" :disabled="disabledObj['flight_type_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','flight_type')">{{form['flight_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','seat_type') || $check_field('add','seat_type') || $check_field('set','seat_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="座位类型" prop="seat_type">
					<el-input id="seat_type" v-model="form['seat_type']" placeholder="请输入座位类型"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','seat_type')) || (!form['visa_change_application_id'] && $check_field('add','seat_type'))" :disabled="disabledObj['seat_type_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','seat_type')">{{form['seat_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','passenger_plane_number') || $check_field('add','passenger_plane_number') || $check_field('set','passenger_plane_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机编号" prop="passenger_plane_number">
					<el-input id="passenger_plane_number" v-model="form['passenger_plane_number']" placeholder="请输入客机编号"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','passenger_plane_number')) || (!form['visa_change_application_id'] && $check_field('add','passenger_plane_number'))" :disabled="disabledObj['passenger_plane_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','passenger_plane_number')">{{form['passenger_plane_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','aircraft_model') || $check_field('add','aircraft_model') || $check_field('set','aircraft_model')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机型号" prop="aircraft_model">
					<el-input id="aircraft_model" v-model="form['aircraft_model']" placeholder="请输入客机型号"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','aircraft_model')) || (!form['visa_change_application_id'] && $check_field('add','aircraft_model'))" :disabled="disabledObj['aircraft_model_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','aircraft_model')">{{form['aircraft_model']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','ticket_price') || $check_field('add','ticket_price') || $check_field('set','ticket_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="票价" prop="ticket_price">
					<el-input id="ticket_price" v-model="form['ticket_price']" placeholder="请输入票价"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','ticket_price')) || (!form['visa_change_application_id'] && $check_field('add','ticket_price'))" :disabled="disabledObj['ticket_price_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','ticket_price')">{{form['ticket_price']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','number_of_purchased_sheets') || $check_field('add','number_of_purchased_sheets') || $check_field('set','number_of_purchased_sheets')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="购买张数" prop="number_of_purchased_sheets">
					<el-input id="number_of_purchased_sheets" v-model="form['number_of_purchased_sheets']" placeholder="请输入购买张数"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','number_of_purchased_sheets')) || (!form['visa_change_application_id'] && $check_field('add','number_of_purchased_sheets'))" :disabled="disabledObj['number_of_purchased_sheets_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','number_of_purchased_sheets')">{{form['number_of_purchased_sheets']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','total_amount') || $check_field('add','total_amount') || $check_field('set','total_amount')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="总金额" prop="total_amount">
					<el-input id="total_amount" v-model="form['total_amount']" placeholder="请输入总金额"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','total_amount')) || (!form['visa_change_application_id'] && $check_field('add','total_amount'))" :disabled="disabledObj['total_amount_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','total_amount')">{{form['total_amount']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','user_account') || $check_field('add','user_account') || $check_field('set','user_account')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户账号" prop="user_account">
						<div v-if="user_group !== '管理员'">
							{{ get_user_session_user_account(form['user_account']) }}
							<!--<el-input id="business_name" v-model="form['user_account']" placeholder="请输入用户账号"-->
							<!--v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','user_account')) || (!form['visa_change_application_id'] && $check_field('add','user_account'))" :disabled="disabledObj['user_account_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','user_account')">{{form['user_account']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','user_account')) || (!form['visa_change_application_id'] && $check_field('add','user_account'))" id="user_account" v-model="form['user_account']" :disabled="disabledObj['user_account_isDisabled']">
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
			<el-col v-if="user_group === '管理员' || $check_field('get','application_time') || $check_field('add','application_time') || $check_field('set','application_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="申请时间" prop="application_time">
					<el-date-picker :disabled="disabledObj['application_time_isDisabled']" v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','application_time')) || (!form['visa_change_application_id'] && $check_field('add','application_time'))" id="application_time"
						v-model="form['application_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','application_time')">{{form['application_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','change_destination') || $check_field('add','change_destination') || $check_field('set','change_destination')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签目的地" prop="change_destination">
					<el-input id="change_destination" v-model="form['change_destination']" placeholder="请输入改签目的地"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','change_destination')) || (!form['visa_change_application_id'] && $check_field('add','change_destination'))" :disabled="disabledObj['change_destination_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','change_destination')">{{form['change_destination']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','number_of_changed_signatures') || $check_field('add','number_of_changed_signatures') || $check_field('set','number_of_changed_signatures')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签张数" prop="number_of_changed_signatures">
					<el-input id="number_of_changed_signatures" v-model="form['number_of_changed_signatures']" placeholder="请输入改签张数"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','number_of_changed_signatures')) || (!form['visa_change_application_id'] && $check_field('add','number_of_changed_signatures'))" :disabled="disabledObj['number_of_changed_signatures_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','number_of_changed_signatures')">{{form['number_of_changed_signatures']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','change_departure_time') || $check_field('add','change_departure_time') || $check_field('set','change_departure_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签出发时间" prop="change_departure_time">
					<el-input id="change_departure_time" v-model="form['change_departure_time']" placeholder="请输入改签出发时间"
							  v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','change_departure_time')) || (!form['visa_change_application_id'] && $check_field('add','change_departure_time'))" :disabled="disabledObj['change_departure_time_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','change_departure_time')">{{form['change_departure_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','reason_for_change') || $check_field('add','reason_for_change') || $check_field('set','reason_for_change')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签原因" prop="reason_for_change">
					<el-input type="textarea" id="reason_for_change" v-model="form['reason_for_change']" placeholder="请输入改签原因"
						v-if="user_group === '管理员' || (form['visa_change_application_id'] && $check_field('set','reason_for_change')) || (!form['visa_change_application_id'] && $check_field('add','reason_for_change'))" :disabled="disabledObj['reason_for_change_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','reason_for_change')">{{form['reason_for_change']}}</div>
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
				field: "visa_change_application_id",
				url_add: "~/api/visa_change_application/add?",
				url_set: "~/api/visa_change_application/set?",
				url_get_obj: "~/api/visa_change_application/get_obj?",
				url_upload: "~/api/visa_change_application/upload?",

				query: {
					"visa_change_application_id": 0,
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
					"number_of_purchased_sheets":'', // 购买张数
					"total_amount":'', // 总金额
					"user_account": 0, // 用户账号
					"application_time":'', // 申请时间
					"change_destination":'', // 改签目的地
					"number_of_changed_signatures":'', // 改签张数
					"change_departure_time":'', // 改签出发时间
					"reason_for_change":'', // 改签原因
					"visa_change_application_id": 0, // ID

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
					"application_time_isDisabled": false,
					"change_destination_isDisabled": false,
					"number_of_changed_signatures_isDisabled": false,
					"change_departure_time_isDisabled": false,
					"reason_for_change_isDisabled": false,
				},
				// 用户列表
				list_user_user_account: [],
				// 用户组
				group_user_user_account: "",
			}
		},
		methods: {
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
        if (this.form["application_time"].indexOf("-")===-1){
          this.form["application_time"] = this.$toTime(parseInt(this.form["application_time"]),"yyyy-MM-dd")
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
        if(this.form["application_time"]=="0000-00-00"){
          this.form["application_time"] = null;
        }
				if(parseInt(this.form["application_time"]) > 9999){
					this.form["application_time"] = this.$toTime(parseInt(this.form["application_time"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/visa_change_application/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/visa_change_application/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/visa_change_application/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/visa_change_application/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/visa_change_application/view','get');
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

		},
		created() {
			this.get_list_user_user_account();
			this.get_group_user_user_account();
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
</style>
