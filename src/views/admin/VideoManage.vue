<template>

	<el-card class="box-card">
    <template #header>
      <div class="card-header">
        <!-- <span>影片管理</span> -->

				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<!-- <el-form-item label="清單名稱">
						<el-input v-model="ruleForm.user" placeholder="" clearable />
					</el-form-item> -->
			
					<!-- <el-form-item label="時間範圍">
						<el-date-picker
							v-model="ruleForm.date"
							type="datetimerange"
							start-placeholder="起始"
							end-placeholder="結束"
							format="YYYY-MM-DD HH:mm:ss"
							date-format="YYYY/MM/DD ddd"
							time-format="A hh:mm:ss"
						/>
					</el-form-item> -->
					
					<el-form-item>
						<!-- <el-button type="primary" @click="onSubmit">查詢</el-button> -->
						<el-button type="primary" @click="handleCreate">新增</el-button>
						<el-button type="warning" @click="handleCreate">更新最新主日證道</el-button>
					</el-form-item>
				</el-form>

      </div>
    </template>	
	
		<el-table :data="tableData" border style="width: 100%; min-width: 500px" :default-sort="{ prop: 'date', order: 'descending' }">
			<el-table-column prop="update_time" sortable label="更新時間" width="150">
				<template #default="scope">
					<div style="display: flex; align-items: center">
						<i class="fa-regular fa-clock"></i>
						<span style="margin-left: 10px">{{ (scope.row.update_time).split("T")[0] }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="type" sortable label="分類" width="100px"/>
			<el-table-column prop="label" label="清單名稱" width="250px" />
			<el-table-column prop="url" label="網址" />
			<!-- <el-table-column prop="list_num" label="數量" width="70px"/> -->
			<el-table-column label="操作" width="150px">
				<template #default="scope">
					<el-button type="info" size="small" @click="handleEdit(scope.row)">編輯</el-button>
					<!-- <el-button type="danger" size="small" @click="handleRemove(scope.row)">刪除</el-button> -->
					<el-button type="warning" size="small" >更新</el-button>
				</template>
			</el-table-column>
		</el-table>

  </el-card>

	<DialogModal
		:show="show"
		@closeModal="show = false"
		@handleUpdateList="handleUpdateList"
		:option="option"
		:editData="editData"
	/>

</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { apiGetAdminVideList, apiCheckToken } from '@/utils/api.js'
import DialogModal from '@/components/Admin/Video/DialogModal.vue'

const tableData = ref();
const editData = ref();

// const handleCurrentChange = () => handleUpdateList()

const handleUpdateList = async() => {
	const { data } = await apiGetAdminVideList()
	tableData.value = data
}

const handleCreate = () => {
	show.value = true;
	option.value = 'create'
	editData.value = {
		"select": "",
		"url": ""
	}
}

const show = ref(false);
const option = ref('')
const handleEdit = (row) => {
	show.value = true;
	option.value = 'edit'

	if (row.belong_to == null){ //配合el-cascader
		row.select = [row.video_type_id]
	} else {
		row.select = [row.belong_to, row.video_type_id]
	}
  editData.value = row;
}

const handleRemove = () => {
	/* eslint-disable */
	ElMessageBox.confirm(
    '確定要刪除嗎',
    'Warning',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '成功刪除',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消刪除',
      })
    })
}

onMounted(() => {
	handleUpdateList();
	
})

</script>
<style lang="scss" scoped>
.demo-form-inline .el-input {
	--el-input-width: 220px;
}

.el-form-item{
	margin-bottom: 0px;
}

</style>