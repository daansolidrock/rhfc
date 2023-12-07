<template>
    <el-dialog :before-close="handleClose" :width="dialogWidth" v-model="props.show" title="編輯清單內容">
      <el-form ref="form" :model="formData" label-width="120px" :label-position="labelPosition" :rules="formRules">
        <el-form-item label="分類">
          <el-cascader
            v-model="level"	
            :options="options"
            :props="hoverOption"
          />
        </el-form-item>

        <el-form-item label="清單網址">
          <el-input v-model="formData.url" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">關閉</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            更新
          </el-button>
        </span>
      </template>

    </el-dialog>
</template>
  
<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "@/utils/https.js";

const props = defineProps({
    show: {
        type: Boolean,
    },
    editData: {
        type: Object,
    },
});

const formData = ref();
const hoverOption = { expandTrigger: 'hover' }
const labelPosition = ref('left')
const options = ref()
const level = ref();
const getTypeList = async() => {
	const { data } = await axios.get(`http://localhost/video/videotype`)
	options.value = data
}

const handleClose = () => {
  emits("closeModal");
};

const emits = defineEmits(["closeModal"]);

const dialogWidth = ref("550px")
window.onresize = () => {
  let windowSize = document.body.clientWidth;
  const defaultWidth = 650; // 預設寬度
  if (windowSize < defaultWidth) {
    dialogWidth.value = "95vw";
  } else {
    dialogWidth.value = defaultWidth + "px";
  }
}

onMounted(() => {
  getTypeList()
})

watch(
    () => props.editData,
    () => {
        formData.value = props.editData;
        if (props.editData.belong_to!=null){
          level.value = [props.editData.belong_to, props.editData.id]
        }else{
          level.value = [props.editData.id]
        }
    }
);

</script>
  
<style></style>