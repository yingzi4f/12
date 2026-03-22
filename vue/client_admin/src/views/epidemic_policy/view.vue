<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','area_number') || $check_field('add','area_number') || $check_field('set','area_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="地区编号" prop="area_number">
					<el-input id="area_number" v-model="form['area_number']" placeholder="请输入地区编号"
							  v-if="user_group === '管理员' || (form['epidemic_policy_id'] && $check_field('set','area_number')) || (!form['epidemic_policy_id'] && $check_field('add','area_number'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','area_number')">{{form['area_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','region_name') || $check_field('add','region_name') || $check_field('set','region_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="地区名称" prop="region_name">
					<el-input id="region_name" v-model="form['region_name']" placeholder="请输入地区名称"
							  v-if="user_group === '管理员' || (form['epidemic_policy_id'] && $check_field('set','region_name')) || (!form['epidemic_policy_id'] && $check_field('add','region_name'))" :disabled="disabledObj['region_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','region_name')">{{form['region_name']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','date') || $check_field('add','date') || $check_field('set','date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="日期" prop="date">
					<el-date-picker :disabled="disabledObj['date_isDisabled']" v-if="user_group === '管理员' || (form['epidemic_policy_id'] && $check_field('set','date')) || (!form['epidemic_policy_id'] && $check_field('add','date'))" id="date"
						v-model="form['date']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','date')">{{form['date']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','cover') || $check_field('add','cover') || $check_field('set','cover')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="封面" prop="cover">
					<el-upload :disabled="disabledObj['cover_isDisabled']" id="cover" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_cover"
						:show-file-list="false" v-if="user_group === '管理员' || (form['epidemic_policy_id'] && $check_field('set','cover')) || (!form['epidemic_policy_id'] && $check_field('add','cover'))">
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
			<el-col v-if="user_group === '管理员' || $check_field('get','details_of_epidemic_policy') || $check_field('add','details_of_epidemic_policy') || $check_field('set','details_of_epidemic_policy')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="政策详情" prop="details_of_epidemic_policy">
					<el-input type="textarea" id="details_of_epidemic_policy" v-model="form['details_of_epidemic_policy']" placeholder="请输入政策详情"
						v-if="user_group === '管理员' || (form['epidemic_policy_id'] && $check_field('set','details_of_epidemic_policy')) || (!form['epidemic_policy_id'] && $check_field('add','details_of_epidemic_policy'))" :disabled="disabledObj['details_of_epidemic_policy_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','details_of_epidemic_policy')">{{form['details_of_epidemic_policy']}}</div>
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
				field: "epidemic_policy_id",
				url_add: "~/api/epidemic_policy/add?",
				url_set: "~/api/epidemic_policy/set?",
				url_get_obj: "~/api/epidemic_policy/get_obj?",
				url_upload: "~/api/epidemic_policy/upload?",

				query: {
					"epidemic_policy_id": 0,
				},

				form: {
					"area_number":this.$get_stamp(), // 地区编号
					"region_name":'', // 地区名称
					"date":'', // 日期
					"cover":'', // 封面
					"details_of_epidemic_policy":'', // 政策详情
					"epidemic_policy_id": 0, // ID

				},
				disabledObj:{
					"area_number_isDisabled": false,
					"region_name_isDisabled": false,
					"date_isDisabled": false,
					"cover_isDisabled": false,
					"details_of_epidemic_policy_isDisabled": false,
				},
			}
		},
		methods: {
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
        if (this.form["date"].indexOf("-")===-1){
          this.form["date"] = this.$toTime(parseInt(this.form["date"]),"yyyy-MM-dd")
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
        if(this.form["date"]=="0000-00-00"){
          this.form["date"] = null;
        }
				if(parseInt(this.form["date"]) > 9999){
					this.form["date"] = this.$toTime(parseInt(this.form["date"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/epidemic_policy/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/epidemic_policy/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/epidemic_policy/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/epidemic_policy/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/epidemic_policy/view','get');
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
