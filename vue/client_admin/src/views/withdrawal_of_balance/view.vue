<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','account_number') || $check_field('add','account_number') || $check_field('set','account_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="账号编号" prop="account_number">
					<el-input id="account_number" v-model="form['account_number']" placeholder="请输入账号编号"
							  v-if="user_group === '管理员' || (form['withdrawal_of_balance_id'] && $check_field('set','account_number')) || (!form['withdrawal_of_balance_id'] && $check_field('add','account_number'))" :disabled="disabledObj['account_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','account_number')">{{form['account_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','account_balance') || $check_field('add','account_balance') || $check_field('set','account_balance')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="账户余额" prop="account_balance">
					<el-input id="account_balance" v-model="form['account_balance']" placeholder="请输入账户余额"
							  v-if="user_group === '管理员' || (form['withdrawal_of_balance_id'] && $check_field('set','account_balance')) || (!form['withdrawal_of_balance_id'] && $check_field('add','account_balance'))" :disabled="disabledObj['account_balance_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','account_balance')">{{form['account_balance']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','withdrawal_amount') || $check_field('add','withdrawal_amount') || $check_field('set','withdrawal_amount')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="提现金额" prop="withdrawal_amount">
					<el-input-number id="withdrawal_amount" v-model.number="form['withdrawal_amount']"
						v-if="user_group === '管理员' || (form['withdrawal_of_balance_id'] && $check_field('set','withdrawal_amount')) || (!form['withdrawal_of_balance_id'] && $check_field('add','withdrawal_amount'))" :disabled="disabledObj['withdrawal_amount_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','withdrawal_amount')">{{form['withdrawal_amount']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','withdrawal_time') || $check_field('add','withdrawal_time') || $check_field('set','withdrawal_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="提现时间" prop="withdrawal_time">
					<el-date-picker :disabled="disabledObj['withdrawal_time_isDisabled']" v-if="user_group === '管理员' || (form['withdrawal_of_balance_id'] && $check_field('set','withdrawal_time')) || (!form['withdrawal_of_balance_id'] && $check_field('add','withdrawal_time'))" id="withdrawal_time"
						v-model="form['withdrawal_time']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','withdrawal_time')">{{form['withdrawal_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','withdrawal_bank_card') || $check_field('add','withdrawal_bank_card') || $check_field('set','withdrawal_bank_card')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="提现银行卡" prop="withdrawal_bank_card">
					<el-input id="withdrawal_bank_card" v-model="form['withdrawal_bank_card']" placeholder="请输入提现银行卡"
							  v-if="user_group === '管理员' || (form['withdrawal_of_balance_id'] && $check_field('set','withdrawal_bank_card')) || (!form['withdrawal_of_balance_id'] && $check_field('add','withdrawal_bank_card'))" :disabled="disabledObj['withdrawal_bank_card_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','withdrawal_bank_card')">{{form['withdrawal_bank_card']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','user_account') || $check_field('add','user_account') || $check_field('set','user_account')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户账号" prop="user_account">
						<div v-if="user_group !== '管理员'">
							{{ get_user_session_user_account(form['user_account']) }}
							<!--<el-input id="business_name" v-model="form['user_account']" placeholder="请输入用户账号"-->
							<!--v-if="user_group === '管理员' || (form['withdrawal_of_balance_id'] && $check_field('set','user_account')) || (!form['withdrawal_of_balance_id'] && $check_field('add','user_account'))" :disabled="disabledObj['user_account_isDisabled']"></el-input>-->
							<!--<div v-else-if="$check_field('get','user_account')">{{form['user_account']}}</div>-->
							<el-select v-if="user_group === '管理员' || (form['withdrawal_of_balance_id'] && $check_field('set','user_account')) || (!form['withdrawal_of_balance_id'] && $check_field('add','user_account'))" id="user_account" v-model="form['user_account']" :disabled="disabledObj['user_account_isDisabled']">
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
				field: "withdrawal_of_balance_id",
				url_add: "~/api/withdrawal_of_balance/add?",
				url_set: "~/api/withdrawal_of_balance/set?",
				url_get_obj: "~/api/withdrawal_of_balance/get_obj?",
				url_upload: "~/api/withdrawal_of_balance/upload?",

				query: {
					"withdrawal_of_balance_id": 0,
				},

				form: {
					"account_number":'', // 账号编号
					"account_balance":'', // 账户余额
					"withdrawal_amount":0, // 提现金额
					"withdrawal_time":'', // 提现时间
					"withdrawal_bank_card":'', // 提现银行卡
					"user_account": 0, // 用户账号
					"withdrawal_of_balance_id": 0, // ID

				},
				disabledObj:{
					"account_number_isDisabled": false,
					"account_balance_isDisabled": false,
          "withdrawal_amount_isDisabled": false,
					"withdrawal_time_isDisabled": false,
					"withdrawal_bank_card_isDisabled": false,
					"user_account_isDisabled": false,
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
        if (this.form["withdrawal_time"].indexOf("-")===-1){
          this.form["withdrawal_time"] = this.$toTime(parseInt(this.form["withdrawal_time"]),"yyyy-MM-dd")
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
        if(this.form["withdrawal_time"]=="0000-00-00"){
          this.form["withdrawal_time"] = null;
        }
				if(parseInt(this.form["withdrawal_time"]) > 9999){
					this.form["withdrawal_time"] = this.$toTime(parseInt(this.form["withdrawal_time"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/withdrawal_of_balance/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/withdrawal_of_balance/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/withdrawal_of_balance/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/withdrawal_of_balance/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/withdrawal_of_balance/view','get');
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
