<template lang="">
	<el-card class="box-card">
		<template #header>
			<div class="card-header" style="display: flex;justify-content: flex-end;">
				<!-- <span>影片分類</span> -->
				<el-button style="margin-left: 20px" type="primary" @click="handleCreate()">新增主分類</el-button>
			</div>
		</template>

		<el-tree
      :data="dataSource"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button v-if="node.level==1" type="primary" size="small" round @click="handleCreateSub(data)">
              <i class="fa-solid fa-plus"></i>
              新增子分類
            </el-button>
						<el-button @click="handleEdit(data)" size="small" round>
              <i class="fa-solid fa-pen-to-square"></i>
              編輯
            </el-button>
          </span>
        </span>
      </template>
    </el-tree>
  </el-card>

  <DialogModal 
    :show="show"
    @closeModal="show = false"
    @handleUpdateList="handleUpdateList"
    :editData="editData"
    :option="option"
  />
  

</template>

<script setup>
import { ref, onMounted } from 'vue'
import DialogModal from '@/components/Admin/VideoType/DialogModal.vue'
import { apiGetFileTypeList, apiCheckToken } from '@/utils/api.js'

const show = ref(false)
const editData = ref()
const option = ref();

const dataSource = ref()
const handleUpdateList = async() => {
	const { data } = await apiGetFileTypeList()
	dataSource.value = data
}

// id, type
const handleCreate = (data) => {
  editData.value = {
    "id": "",
    "label": "",
  }
  option.value = 'main'
  show.value = true
}

const handleCreateSub = (data) => {
  editData.value = {
    "belong_to": data.id,
    "label": "",
  }
  option.value = 'sub'
  show.value = true
}

// id, label, type
const handleEdit = (data) => {
  editData.value = { ...data }
  option.value = 'edit'
  show.value = true
}

onMounted(() => {
  handleUpdateList();
  
})

</script>

<style lang="scss">
.main{
  font-size: 18px;
}
.custom-tree-node{
	display: flex;
	justify-content: space-between;
	width: 100%;
}
</style>