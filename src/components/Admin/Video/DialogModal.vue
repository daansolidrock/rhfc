<template lang="">
	<el-dialog
    v-model="props.show"
    :title="props.option == 'edit' ? '編輯分類' : '新增分類'"
    :before-close="handleClose"
    width="350px"
  >
    <el-form 
      :model="formData" 
      label-width="120px"
      :label-position="labelPosition"
      :rules="formRules"
      ref="formEl"
    >

      <el-form-item label="分類" prop="select">
        <el-cascader
          v-model="formData.select"
          :options="videoTypeOption"
          :props="props"
        />
      </el-form-item>

      <el-form-item label="清單連結" prop="url">
        <el-input v-model="formData.url"/>
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
import { apiGetVideoTypeList, apiUpdateVideo, apiCreateVideo } from '@/utils/api.js'

const labelPosition = ref('top')
const formData = ref()
const formEl = ref(null)
const formRules = {
  select: [{ required: true, message: "分類不能為空", trigger: "change" }],
  url: [{ required: true, message: "清單連結不能為空", trigger: "blur" }],
};

/* eslint-disable */
const handleSubmit = () => {
  if (!formEl.value) return;
  formEl.value.validate(async (valid) => {
    if (valid) {
      formData.value.link_url = formData.value.url
      if (formData.value.select.length == 1){
        formData.value.type_id = formData.value.select[0]
      } else{
        formData.value.type_id = formData.value.select[1]
      }

      if (props.option == 'edit') {
        await apiUpdateVideo(props.editData.id, formData.value)
        ElMessage.success("更新成功");
      } else {
        await apiCreateVideo(formData.value)
        ElMessage.success("新增成功");
      }
      emits("handleUpdateList");
      emits("closeModal");
    } else {
      ElMessage.error("請填寫必要欄位");
    }
  });
};

const handleClose = () => {
  emits("closeModal");
  emits("handleUpdateList");
};

const emits = defineEmits(["closeModal", "handleUpdateList"]);


const videoTypeOption = ref()
const videoTypeValue = ref()
const getVideoTypeList = async() => {
  const { data } = await apiGetVideoTypeList()
  console.log(data)
  videoTypeOption.value = data
}


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
    getVideoTypeList()
  }
);


</script>

<style lang="">
    
</style>