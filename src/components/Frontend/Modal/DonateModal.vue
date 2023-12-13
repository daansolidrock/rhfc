<template lang="">
	<el-dialog
    v-model="props.show"
    :title="'奉獻收據資料'"
    :before-close="handleClose"
  >
    <el-form 
      :model="formData" 
      label-width="120px"
      label-position="left"
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
        <el-input  v-model="formData.postal_code"/>
      </el-form-item>

			<el-form-item label="地址" prop="address">
        <el-input  v-model="formData.address"/>
      </el-form-item>

			<el-form-item label="備註">
        <el-input  v-model="formData.note" type="textarea"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">關閉</el-button>
        <el-button type="primary" @click="handleSubmit()">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { apiCreateDonate } from '@/utils/api.js'

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