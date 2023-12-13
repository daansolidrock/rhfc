<template lang="">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="theModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">資料填寫</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						
						<el-form 
							:model="formData" 
							label-width="120px"
							label-position="top"
							:rules="formRules"
							ref="formEl"
						>

							<el-form-item label="姓名" prop="name">
								<el-input  v-model="formData.name"/>
							</el-form-item>

							<el-form-item label="電話" prop="phone">
								<el-input  v-model="formData.phone"/>
							</el-form-item>

							<el-form-item label="郵遞區號" prop="postal_code">
								<el-input  v-model="formData.postal_code" type="number"/>
							</el-form-item>

							<el-form-item label="地址" prop="address">
								<el-input  v-model="formData.address"/>
							</el-form-item>

							<el-form-item label="備註">
								<el-input  v-model="formData.note" type="textarea"/>
							</el-form-item>

						</el-form>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
						<button type="button" class="btn btn-primary" @click="handleSubmit()">送出</button>
					</div>
				</div>
			</div>
		</div>
</template>
<script setup>
import { ref, onMounted, defineExpose } from 'vue';
import { Modal } from 'bootstrap';
import { apiCreateDonate } from '@/utils/api.js'

const theModal = ref("")
let bsModal = ""

onMounted(() => {
	bsModal = new Modal(theModal.value);
})

const open = () => {
	bsModal.show();
}

const close = () => {
	bsModal.hide();
}

const formEl = ref(null)
const formData = ref({
  "name": "",
  "phone": "",
	"postal_code": "",
	"address": "",
	"note": ""
})
const formRules = {
  name: [{ required: true, message: "姓名不能為空", trigger: "blur" }],
  phone: [{ required: true, message: "電話不能為空", trigger: "blur" }],
	postal_code: [{ required: true, message: "郵遞區號不能為空", trigger: "blur" }],
	address: [{ required: true, message: "地址不能為空", trigger: "blur" }],
};

/* eslint-disable */
const handleSubmit = () => {
  if (!formEl.value) return;
  formEl.value.validate(async (valid) => {
    // console.log(formData.value)
    if (valid) {
			await apiCreateDonate(formData.value)
			ElMessage.success("已傳至管理員");

      // emits("closeModal");
			close()
    } else {
      ElMessage.error("請填寫必要欄位");
    }
  });
};

defineExpose({
	open
});

</script>
<style lang="">
    
</style>