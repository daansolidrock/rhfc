<template lang="">
	<el-dialog
    v-model="props.show"
    :title="props.option == 'edit' ? '編輯QA問卷' : '新增QA問卷'"
    :before-close="handleClose"
  >
    <el-form 
      :model="formData" 
      label-width="120px"
      :label-position="labelPosition"
      :rules="formRules"
      ref="formEl"
    >

      <el-form-item label="姓名">
        <el-input v-model="formData.name" />
      </el-form-item>

			<el-form-item label="電話">
				<el-input v-model="formData.phone" />
			</el-form-item>

			<el-form-item label="Line ID" prop="line_id">
				<el-input v-model="formData.line_id" />
			</el-form-item>

			<el-form-item label="信箱" prop="email">
				<el-input v-model="formData.email" />
			</el-form-item>

			<el-form-item label="備註" prop="note">
				<el-input v-model="formData.note" type="textarea"/>
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
import { ref, watch } from 'vue'
import { apiCreateQuestion, apiUpdateQuestion } from '@/utils/api.js'

const labelPosition = ref('top')
const formData = ref()
const formEl = ref(null)
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
		console.log(props.option)
    if (valid) {
      if (props.option == 'edit') {
    		console.log(formData.value)
        await apiUpdateQuestion(props.editData.id, formData.value)
        ElMessage.success("更新成功");
      } else {
        await apiCreateQuestion(formData.value)
        ElMessage.success("新增成功");
      }
      emits("getDonateList");
      emits("closeModal");
    } else {
      ElMessage.error("請填寫必要欄位");
    }
  });
};

const handleClose = () => {
  emits("closeModal");
  emits("getDonateList");
};

const emits = defineEmits(["closeModal", "getDonateList"]);


const props = defineProps({
  show: {
    type: Boolean,
  },
  editData: {
    type: Object,
  },
  option: {
    type: String
  }
});

watch(
  () => props.editData,
  () => {
    formData.value = props.editData;
  }
);


</script>

<style lang="">
    
</style>