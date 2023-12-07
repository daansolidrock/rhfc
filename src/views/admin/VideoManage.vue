<template>

	<el-card class="box-card">
    <template #header>
      <div class="card-header">
        <!-- <span>影片管理</span> -->

				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="清單名稱">
						<el-input v-model="ruleForm.user" placeholder="" clearable />
					</el-form-item>
			
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
						<el-button type="primary" @click="onSubmit">查詢</el-button>
						<el-button type="success" @click="handleCreate">新增</el-button>
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
					<el-button type="danger" size="small" @click="handleRemove(scope.row)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>
	
		<hr class="my-4" />
	
		<el-pagination 
			background 
			layout="prev, pager, next" 
			:total="totalRow"
			:page-size="pageSize"
			v-model:current-page="currentPage"
			@current-change="handleCurrentChange"
		/>

  </el-card>

	<CreateVideoModal ref="theCreateModal" :getVideoList="getVideoList"/>
	<!-- <EditVideoModal ref="theEditModal" :editData="editData"/> -->

	<EditVideoModall
    :show="show"
    @closeModal="show = false"
    :editData="editData"
  />

</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from "@/utils/https.js";
import CreateVideoModal from '@/components/Admin/Modal/Video/CreateVideoModal.vue'
import EditVideoModall from '@/components/Admin/Modal/Video/EditVideoModall.vue'
// import EditVideoModal from '@/components/Modal/EditVideoModal.vue'


const ruleForm = reactive({
  user: '',
  date: ''
})

const tableData = ref();
const totalRow = ref(100);
const pageSize = ref(10);
const currentPage = ref(1);
const theCreateModal = ref();
// const theEditModal = ref();
const editData = ref();

const handleCurrentChange = () => {
	getVideoList()
}

const getVideoList = async() => {
	const { data } = await axios.get(`http://localhost/video/admin_lists?skip=${currentPage.value}`)
	totalRow.value = data.total
	tableData.value = data.item
}

const handleCreate = () => {
	theCreateModal.value.open();
}

const show = ref(false);
const handleEdit = (row) => {
	// console.log(row)
	show.value = true;
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
	getVideoList();
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