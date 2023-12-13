<template>
	<div class="login">
		<section class="form-container">
			<div class="manage-tip">
				<span class="title">磐石之心後臺系統</span>
				<el-form :rules="rules" ref="ruleFormRef" :model="loginUser" class="loginForm" label-width="80px"
					:label-position="labelPosition">
					<el-form-item label="信箱" prop="email">
						<el-input v-model="loginUser.email" placeholder="請輸入信箱"></el-input>
					</el-form-item>
					<el-form-item label="密碼" prop="password">
						<el-input v-model="loginUser.password" placeholder="請輸入密碼" type="password"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button @click="handleSubmit(ruleFormRef)" class="submit-btn" type="primary">
							登入
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		</section>
	</div>
</template>
  
<script setup lang="ts">
import { ref, reactive } from "vue";
//   import { registerType, registerRulesType, userType } from "../utils/types";
import { FormInstance } from "element-plus";
import axios from "../utils/http";
import { useRouter } from "vue-router";
// import jwt_decode from "jwt-decode";
import { useAuthStore } from "../stores/auth.js";
import { apiLoginuser } from "../utils/api";

const labelPosition = ref('top')
const ruleFormRef = ref();
const router = useRouter();
const authStore = useAuthStore();

const loginUser = ref({
	email: "weijung0923@gmail.com",
	password: "test123",
});

const rules = reactive({
	email: [
		{
			type: "email",
			required: true,
			message: "信箱格式不正確",
			trigger: "blur",
		},
	],
	password: [
		{
			required: true,
			message: "密碼不能為空",
			trigger: "blur"
		},
	],
});

const handleSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid: boolean) => {
		if (valid) {
			const { data } = await apiLoginuser(loginUser.value)
			if (data) {
				// @ts-ignore
				authStore.setUserInfo(data)

				// @ts-ignore
				ElMessage({
					message: "登入成功",
					type: "success",
				});
				router.push("/admin");

			} else {
				// @ts-ignore
				ElMessage({
					message: "登入失敗",
					type: "success",
				});
				return false;
			}
		}
	});

};
</script>
  
<style lang="scss" scoped>
.login {
	position: relative;
	width: 100vw;
	height: 100vh;
	background: url(@/assets/bg.jpg) no-repeat center center;
	background-size: 100% 100%;
}

.form-container {
	width: 370px;
	/* height: 210px; */
	position: absolute;
	top: 10%;
	left: 50%;
	transform: translate(-50%, 0%);
	padding: 25px;
	border-radius: 5px;
	text-align: center;
}

.form-container .manage-tip .title {
	font-family: "Microsoft YaHei";
	font-weight: bold;
	font-size: 26px;
	color: #fff;
}

.registerForm,
.loginForm {
	margin-top: 20px;
	background-color: #fff;
	padding: 20px 20px;
	border-radius: 5px;
	box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
	width: 100%;
}

.tiparea {
	text-align: right;
	font-size: 12px;
	color: #333;
}

.tiparea p a {
	color: #409eff;
}
</style>