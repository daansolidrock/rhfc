<template lang="">
	<el-dialog
    v-model="props.show"
    :title="props.option == 'edit' ? '編輯奉獻收據申請人資料' : '新增奉獻收據申請人資料'"
    :before-close="handleClose"
  >
    <el-form 
      :model="formData" 
      label-width="120px"
      :label-position="labelPosition"
      :rules="formRules"
      ref="formEl"
    >

      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>

			<el-form-item label="電話" prop="phone">
				<el-input v-model="formData.phone" />
			</el-form-item>

			<el-form-item label="郵遞區號" prop="postal_code">
				<el-input v-model="formData.postal_code" />
			</el-form-item>

			<el-form-item label="地址" prop="address">
				<el-input v-model="formData.address" />
			</el-form-item>

			<el-form-item label="備註" prop="note">
				<el-input v-model="formData.note" type="textarea"/>
			</el-form-item>

			<el-form-item label="處理狀況" prop="status">
				<el-select v-model="formData.status" placeholder="Activity zone">
					<el-option label="已處理" :value="true" />
					<el-option label="未處理" :value="false" />
				</el-select>
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
import { apiCreateDonate, apiUpdateDonate } from '@/utils/api.js'

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
    console.log(formData.value)
    if (valid) {
      if (props.option == 'edit') {
        await apiUpdateDonate(props.editData.id, formData.value)
        ElMessage.success("更新成功");
      } else {
				formData.value.postal_code = parseInt(formData.value.postal_code)
        await apiCreateDonate(formData.value)
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