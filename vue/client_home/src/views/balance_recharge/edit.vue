<template>
	<div class="diy_edit page_balance_recharge" id="balance_recharge_edit">
		<div class='warp'>
			<div class='container'>
				<div class='row diy_edit_content_box'>
					<div v-if="$check_field('set','account_number') || $check_field('add','account_number') || $check_field('get','account_number')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>账号编号:
							</span>
						</div>
						<!-- 文本 -->
						<div class="diy_field diy_text">
							<input type="text" id="form_account_number" v-model="form['account_number']" placeholder="请输入账号编号" v-if="(form['account_number'] && $check_field('set','account_number')) || (!form['account_number'] && $check_field('add','account_number'))"  :disabled="disabledObj['account_number_isDisabled']"/>
							<span v-else-if="$check_field('get','account_number')">{{ form[''] }}</span>
						</div>
					</div>
					<div v-if="$check_field('set','recharge_amount') || $check_field('add','recharge_amount') || $check_field('get','recharge_amount')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>充值金额:
							</span>
						</div>
						<!-- 数字 -->
						<div class="diy_field diy_number">
							<input type="number" id="form_recharge_amount" v-model.number="form['recharge_amount']" placeholder="请输入充值金额" v-if="(form['recharge_amount'] && $check_field('set','recharge_amount')) || (!form['recharge_amount'] && $check_field('add','recharge_amount'))" :disabled="disabledObj['recharge_amount_isDisabled']" />
							<span v-else-if="$check_field('get','recharge_amount')">{{ form[''] }}</span>
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
				url_get_obj: "~/api/balance_recharge/get_obj?",
				url_add: "~/api/balance_recharge/add?",
				url_set: "~/api/balance_recharge/set?",

				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},

				// 查询条件
				query: {
					"account_number": "",
					"recharge_amount": 0,
					"user_account": 0,
					"balance_recharge_id": 0,
				},

				obj: {
					"account_number":'', // 账号编号
					"recharge_amount":0, // 充值金额
					"user_account": 0, // 用户账号
					"balance_recharge_id": 0,
				},

				// 表单字段
				form: {
					"account_number":'', // 账号编号
					"recharge_amount":0, // 充值金额
					"user_account": 0, // 用户账号
					"balance_recharge_id": 0,
				},
				disabledObj:{
					"account_number_isDisabled": false,
					"user_account_isDisabled": false,
				},
				// 用户列表
				list_user_user_account: [],

				// ID字段
				field: "balance_recharge_id",
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
				this.$post("~/api/balance_recharge/upload?", form, (res) => {
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

		},
		created() {
			this.get_user_session_user_account();
			this.get_list_user_user_account();
		},
	}
</script>

<style>
</style>
