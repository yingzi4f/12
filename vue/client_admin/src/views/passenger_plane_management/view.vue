<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','passenger_plane_number') || $check_field('add','passenger_plane_number') || $check_field('set','passenger_plane_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机编号" prop="passenger_plane_number">
					<el-input id="passenger_plane_number" v-model="form['passenger_plane_number']" placeholder="请输入客机编号"
							  v-if="user_group === '管理员' || (form['passenger_plane_management_id'] && $check_field('set','passenger_plane_number')) || (!form['passenger_plane_management_id'] && $check_field('add','passenger_plane_number'))" :disabled="disabledObj['passenger_plane_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','passenger_plane_number')">{{form['passenger_plane_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','aircraft_model') || $check_field('add','aircraft_model') || $check_field('set','aircraft_model')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机型号" prop="aircraft_model">
					<el-input id="aircraft_model" v-model="form['aircraft_model']" placeholder="请输入客机型号"
							  v-if="user_group === '管理员' || (form['passenger_plane_management_id'] && $check_field('set','aircraft_model')) || (!form['passenger_plane_management_id'] && $check_field('add','aircraft_model'))" :disabled="disabledObj['aircraft_model_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','aircraft_model')">{{form['aircraft_model']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','service_time') || $check_field('add','service_time') || $check_field('set','service_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="服役时间" prop="service_time">
					<el-input id="service_time" v-model="form['service_time']" placeholder="请输入服役时间"
							  v-if="user_group === '管理员' || (form['passenger_plane_management_id'] && $check_field('set','service_time')) || (!form['passenger_plane_management_id'] && $check_field('add','service_time'))" :disabled="disabledObj['service_time_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','service_time')">{{form['service_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','state') || $check_field('add','state') || $check_field('set','state')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="状态" prop="state">
					<el-select id="state" v-model="form['state']"
						v-if="user_group === '管理员' || (form['passenger_plane_management_id'] && $check_field('set','state')) || (!form['passenger_plane_management_id'] && $check_field('add','state'))">
						<el-option v-for="o in list_state" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','state')">{{form['state']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','passenger_plane_picture') || $check_field('add','passenger_plane_picture') || $check_field('set','passenger_plane_picture')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="客机图片" prop="passenger_plane_picture">
					<el-upload :disabled="disabledObj['passenger_plane_picture_isDisabled']" id="passenger_plane_picture" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_passenger_plane_picture"
						:show-file-list="false" v-if="user_group === '管理员' || (form['passenger_plane_management_id'] && $check_field('set','passenger_plane_picture')) || (!form['passenger_plane_management_id'] && $check_field('add','passenger_plane_picture'))">
						<img v-if="form['passenger_plane_picture']" :src="$fullUrl(form['passenger_plane_picture'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','passenger_plane_picture')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['passenger_plane_picture'])" :preview-src-list="[$fullUrl(form['passenger_plane_picture'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
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
				field: "passenger_plane_management_id",
				url_add: "~/api/passenger_plane_management/add?",
				url_set: "~/api/passenger_plane_management/set?",
				url_get_obj: "~/api/passenger_plane_management/get_obj?",
				url_upload: "~/api/passenger_plane_management/upload?",

				query: {
					"passenger_plane_management_id": 0,
				},

				form: {
					"passenger_plane_number":'', // 客机编号
					"aircraft_model":'', // 客机型号
					"service_time":'', // 服役时间
					"state":'', // 状态
					"passenger_plane_picture":'', // 客机图片
					"passenger_plane_management_id": 0, // ID

				},
				disabledObj:{
					"passenger_plane_number_isDisabled": false,
					"aircraft_model_isDisabled": false,
					"service_time_isDisabled": false,
					"state_isDisabled": false,
					"passenger_plane_picture_isDisabled": false,
				},
				//状态选项列表
				list_state: ['正常','检修','封存'],
			}
		},
		methods: {
			/**
			 * 上传客机图片
			 * @param {Object} param图片参数
			 */
			upload_passenger_plane_picture(param){
				this.uploadFile(param.file, "passenger_plane_picture");
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
				$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/passenger_plane_management/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/passenger_plane_management/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/passenger_plane_management/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/passenger_plane_management/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/passenger_plane_management/view','get');
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
