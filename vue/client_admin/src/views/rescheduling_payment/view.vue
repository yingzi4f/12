<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','user_account') || $check_field('add','user_account') || $check_field('set','user_account')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户账号" prop="user_account">
						<el-select v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','user_account')) || (!form['rescheduling_payment_id'] && $check_field('add','user_account'))" id="user_account" v-model="form['user_account']" :disabled="disabledObj['user_account_isDisabled']">
							<el-option v-for="o in list_user_user_account" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
						<el-select v-else-if="$check_field('get','user_account')" id="user_account" v-model="form['user_account']" :disabled="true">
							<el-option v-for="o in list_user_user_account" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','change_of_departure') || $check_field('add','change_of_departure') || $check_field('set','change_of_departure')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签出发地" prop="change_of_departure">
					<el-input id="change_of_departure" v-model="form['change_of_departure']" placeholder="请输入改签出发地"
							  v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','change_of_departure')) || (!form['rescheduling_payment_id'] && $check_field('add','change_of_departure'))" :disabled="disabledObj['change_of_departure_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','change_of_departure')">{{form['change_of_departure']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','change_destination') || $check_field('add','change_destination') || $check_field('set','change_destination')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签目的地" prop="change_destination">
					<el-input id="change_destination" v-model="form['change_destination']" placeholder="请输入改签目的地"
							  v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','change_destination')) || (!form['rescheduling_payment_id'] && $check_field('add','change_destination'))" :disabled="disabledObj['change_destination_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','change_destination')">{{form['change_destination']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','departure_time') || $check_field('add','departure_time') || $check_field('set','departure_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="起飞时间" prop="departure_time">
					<el-date-picker :disabled="disabledObj['departure_time_isDisabled']" v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','departure_time')) || (!form['rescheduling_payment_id'] && $check_field('add','departure_time'))" id="departure_time"
						v-model="form['departure_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','departure_time')">{{form['departure_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','landing_time') || $check_field('add','landing_time') || $check_field('set','landing_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="落地时间" prop="landing_time">
					<el-date-picker :disabled="disabledObj['landing_time_isDisabled']" v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','landing_time')) || (!form['rescheduling_payment_id'] && $check_field('add','landing_time'))" id="landing_time"
						v-model="form['landing_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','landing_time')">{{form['landing_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','change_flight_type') || $check_field('add','change_flight_type') || $check_field('set','change_flight_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签航班类型" prop="change_flight_type">
					<el-select id="change_flight_type" v-model="form['change_flight_type']"
						v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','change_flight_type')) || (!form['rescheduling_payment_id'] && $check_field('add','change_flight_type'))">
						<el-option v-for="o in list_change_flight_type" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','change_flight_type')">{{form['change_flight_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','change_seat_type') || $check_field('add','change_seat_type') || $check_field('set','change_seat_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签座位类型" prop="change_seat_type">
					<el-select id="change_seat_type" v-model="form['change_seat_type']"
						v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','change_seat_type')) || (!form['rescheduling_payment_id'] && $check_field('add','change_seat_type'))">
						<el-option v-for="o in list_change_seat_type" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','change_seat_type')">{{form['change_seat_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','change_the_passenger_plane_number') || $check_field('add','change_the_passenger_plane_number') || $check_field('set','change_the_passenger_plane_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签客机编号" prop="change_the_passenger_plane_number">
					<el-input id="change_the_passenger_plane_number" v-model="form['change_the_passenger_plane_number']" placeholder="请输入改签客机编号"
							  v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','change_the_passenger_plane_number')) || (!form['rescheduling_payment_id'] && $check_field('add','change_the_passenger_plane_number'))" :disabled="disabledObj['change_the_passenger_plane_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','change_the_passenger_plane_number')">{{form['change_the_passenger_plane_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','change_the_aircraft_model') || $check_field('add','change_the_aircraft_model') || $check_field('set','change_the_aircraft_model')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签客机型号" prop="change_the_aircraft_model">
					<el-input id="change_the_aircraft_model" v-model="form['change_the_aircraft_model']" placeholder="请输入改签客机型号"
							  v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','change_the_aircraft_model')) || (!form['rescheduling_payment_id'] && $check_field('add','change_the_aircraft_model'))" :disabled="disabledObj['change_the_aircraft_model_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','change_the_aircraft_model')">{{form['change_the_aircraft_model']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','ticket_price_change') || $check_field('add','ticket_price_change') || $check_field('set','ticket_price_change')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签票价" prop="ticket_price_change">
					<el-input-number id="ticket_price_change" v-model.number="form['ticket_price_change']"
						v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','ticket_price_change')) || (!form['rescheduling_payment_id'] && $check_field('add','ticket_price_change'))" :disabled="disabledObj['ticket_price_change_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','ticket_price_change')">{{form['ticket_price_change']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','number_of_changed_purchase_sheets') || $check_field('add','number_of_changed_purchase_sheets') || $check_field('set','number_of_changed_purchase_sheets')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签购买张数" prop="number_of_changed_purchase_sheets">
					<el-input-number id="number_of_changed_purchase_sheets" v-model.number="form['number_of_changed_purchase_sheets']"
						v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','number_of_changed_purchase_sheets')) || (!form['rescheduling_payment_id'] && $check_field('add','number_of_changed_purchase_sheets'))" :disabled="disabledObj['number_of_changed_purchase_sheets_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','number_of_changed_purchase_sheets')">{{form['number_of_changed_purchase_sheets']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','total_re_signing') || $check_field('add','total_re_signing') || $check_field('set','total_re_signing')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="改签总计" prop="total_re_signing">
					<el-input id="total_re_signing" v-model="form['total_re_signing']" placeholder="请输入改签总计"
							  v-if="user_group === '管理员' || (form['rescheduling_payment_id'] && $check_field('set','total_re_signing')) || (!form['rescheduling_payment_id'] && $check_field('add','total_re_signing'))"  @focus="set_total_re_signing()" :disabled="disabledObj['total_re_signing_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','total_re_signing')">{{form['total_re_signing']}}</div>
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
				field: "rescheduling_payment_id",
				url_add: "~/api/rescheduling_payment/add?",
				url_set: "~/api/rescheduling_payment/set?",
				url_get_obj: "~/api/rescheduling_payment/get_obj?",
				url_upload: "~/api/rescheduling_payment/upload?",

				query: {
					"rescheduling_payment_id": 0,
				},

				form: {
					"user_account": 0, // 用户账号
					"change_of_departure":'', // 改签出发地
					"change_destination":'', // 改签目的地
					"departure_time":'', // 起飞时间
					"landing_time":'', // 落地时间
					"change_flight_type":'', // 改签航班类型
					"change_seat_type":'', // 改签座位类型
					"change_the_passenger_plane_number":'', // 改签客机编号
					"change_the_aircraft_model":'', // 改签客机型号
					"ticket_price_change":0, // 改签票价
					"number_of_changed_purchase_sheets":0, // 改签购买张数
					"total_re_signing":'', // 改签总计
					"rescheduling_payment_id": 0, // ID

				},
				disabledObj:{
					"user_account_isDisabled": false,
					"change_of_departure_isDisabled": false,
					"change_destination_isDisabled": false,
					"departure_time_isDisabled": false,
					"landing_time_isDisabled": false,
					"change_flight_type_isDisabled": false,
					"change_seat_type_isDisabled": false,
					"change_the_passenger_plane_number_isDisabled": false,
					"change_the_aircraft_model_isDisabled": false,
          "ticket_price_change_isDisabled": false,
          "number_of_changed_purchase_sheets_isDisabled": false,
					"total_re_signing_isDisabled": false,
				},
				// 用户列表
				list_user_user_account: [],
				//改签航班类型选项列表
				list_change_flight_type: ['国内','国际'],
				//改签座位类型选项列表
				list_change_seat_type: ['经济舱','头等舱'],
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
			set_total_re_signing(){
				this.form.total_re_signing =this.form.ticket_price_change * this.form.number_of_changed_purchase_sheets
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
        if (this.form["departure_time"].indexOf("-")===-1){
          this.form["departure_time"] = this.$toTime(parseInt(this.form["departure_time"]),"yyyy-MM-dd")
        }
        if (this.form["landing_time"].indexOf("-")===-1){
          this.form["landing_time"] = this.$toTime(parseInt(this.form["landing_time"]),"yyyy-MM-dd")
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
        if(this.form["landing_time"]=="0000-00-00"){
          this.form["landing_time"] = null;
        }
				if(parseInt(this.form["landing_time"]) > 9999){
					this.form["landing_time"] = this.$toTime(parseInt(this.form["landing_time"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/rescheduling_payment/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/rescheduling_payment/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/rescheduling_payment/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/rescheduling_payment/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/rescheduling_payment/view','get');
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
