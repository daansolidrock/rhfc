<template lang="">
	<el-dialog
    v-model="props.show"
    :title="props.option == 'edit' ? '編輯分類' : '新增分類'"
    :before-close="handleClose"
  >
    <el-form 
      :model="formData" 
      label-width="120px"
      :label-position="labelPosition"
      :rules="formRules"
      ref="formEl"
    >

      <el-form-item label="分類名稱" prop="label">
        <el-input v-model="formData.label" />
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
import { apiCreateVideoType, apiUpdateVideoType } from '@/utils/api.js'

const labelPosition = ref('top')
const formData = ref()
const formEl = ref(null)
const formRules = {
  label: [{ required: true, message: "分類名稱不能為空", trigger: "blur" }],
};

/* eslint-disable */
const handleSubmit = () => {
  if (!formEl.value) return;
  formEl.value.validate(async (valid) => {
    console.log(props.option)
    console.log(formData.value)
    if (valid) {
      if (props.option == 'edit') {
        await apiUpdateVideoType(props.editData.id, formData.value)
        ElMessage.success("更新成功");
      } else if (props.option == 'sub') {
        formData.value.belong_to = props.editData.belong_to
        await apiCreateVideoType(formData.value)
        ElMessage.success("新增子分類成功");
      } else {
        await apiCreateVideoType(formData.value)
        ElMessage.success("新增主分類成功");
      }
      emits("getTypeList");
      emits("closeModal");
    } else {
      ElMessage.error("請填寫必要欄位");
    }
  });
};

const handleClose = () => {
  emits("closeModal");
  emits("getTypeList");
};

const emits = defineEmits(["closeModal", "getTypeList"]);


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