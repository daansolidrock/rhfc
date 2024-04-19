<template>
	<ImageSectionVue title='Q&A'
		background-image='url(https://images.pexels.com/photos/5428834/pexels-photo-5428834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' />

	<div class="container-lg mt-7">
		<div class="row justify-content-center">
			<div class="col-lg-8">
				<!-- <div class="row"> -->

				<el-form :model="formData" label-width="120px" label-position="top" :rules="formRules" ref="formEl">

					<!-- <div class="col-lg-6">
							<div class="mb-4">
								<label class="fs-8 font-serifTc mb-1" for="order__name ">聯絡人（先生/小姐）<span
										class="text-danger">*</span></label>
								<input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
									id="order__name" placeholder="">
							</div>
						</div>

						<div class="col-lg-6">
							<div class="mb-4">
								<label class="fs-8 font-serifTc mb-1" for="order__name ">聯絡電話

								</label>
								<input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
									id="order__name" placeholder="">
							</div>
						</div>

						<div class="col-lg-6">
							<div class="mb-4">
								<label class="fs-8 font-serifTc mb-1" for="order__name ">電子郵件<span class="text-danger">*</span></label>
								<input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
									id="order__name" placeholder="">
							</div>
						</div>

						<div class="col-lg-6">
							<div class="mb-4">
								<label class="fs-8 font-serifTc mb-1" for="order__name ">line ID</label>
								<input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
									id="order__name" placeholder="">
							</div>
						</div> -->
					<div class="row">
						<div class="col-lg-6">
							<el-form-item label="聯絡人（先生/小姐）" prop="name">
								<el-input v-model="formData.name" />
							</el-form-item>
						</div>

						<div class="col-lg-6">
							<el-form-item label="聯絡電話" prop="phone">
								<el-input v-model="formData.phone" />
							</el-form-item>
						</div>

						<div class="col-lg-6">
							<el-form-item label="電子郵件" prop="email">
								<el-input v-model="formData.email" />
							</el-form-item>
						</div>

						<div class="col-lg-6">
							<el-form-item label="line ID" prop="line_id">
								<el-input v-model="formData.line_id" />
							</el-form-item>
						</div>
					</div>

					<el-form-item label="問題內容">
						<el-input v-model="formData.note" type="textarea" />
					</el-form-item>


				</el-form>


				<!-- <div class="col-lg-12">
						<div class="mb-4">
							<label class="fs-8 font-serifTc mb-1" for="custom__needs ">信仰問題 / 需求說明<span
									class="text-danger">*</span></label>
							<textarea class="d-block w-100 bg-light  border-black-30 py-2 px-4 rounded-2" name="custom__needs"
								id="custom__needs"></textarea>
						</div>

					</div> -->
				<div class="col-12 d-flex justify-content-center">
					<button class="btn btn-warning" @click="handleSubmit">送出</button>
				</div>

				<div class="mb-2 mt-5">
					<p class="mb-2 text-left">若您有任何關於信仰、聖經或教會問題，歡迎您詢問並填寫資料，教會牧者將回覆您的問題。</p>
				</div>


				<!-- </div> -->
			</div>
		</div>
	</div>
</template>
<script setup>
import ImageSectionVue from '@/components/Frontend/Layout/ImageSection.vue';
import { ref } from 'vue'
import { apiCreateQuestion } from '@/utils/api.js'

const formEl = ref(null)
const formData = ref({
	"name": "",
	"phone": "",
	"email": "",
	"line_id": "",
	"note": ""
})
const formRules = {
	name: [{ required: true, message: "聯絡人不能為空", trigger: "blur" }],
	phone: [{ required: true, message: "聯絡電話不能為空", trigger: "blur" }],
	email: [
		{
			required: true,
			message: "Email不能為空",
			trigger: "blur"
		}, {
			type: 'email',
			message: '請輸入正確的信箱格式',
			trigger: ['blur', 'change'],
		}],
	// address: [{ required: true, message: "地址不能為空", trigger: "blur" }],
};

/* eslint-disable */
const handleSubmit = () => {
	if (!formEl.value) return;
	formEl.value.validate(async (valid) => {
		// console.log(formData.value)
		if (valid) {

			await apiCreateQuestion(formData.value)
			ElMessage.success("已傳至管理員");

			emits("closeModal");
		} else {
			ElMessage.error("請填寫必要欄位");
		}
	});
};

const handleClose = () => {
	emits("closeModal");
};

const emits = defineEmits(["closeModal"]);

const props = defineProps({
	show: {
		type: Boolean,
	}
});

</script>
<style lang="">
    
</style>