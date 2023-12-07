<template>

	<el-card class="box-card">
    <template #header>
      <div class="card-header">
        <!-- <span>Card name</span> -->
        <!-- <el-button class="button" text>Operation button</el-button> -->
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<!-- <el-form-item label="名稱">
						<el-input v-model="ruleForm.user" placeholder="" clearable />
					</el-form-item>

					<el-form-item label="時間範圍">
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
						<!-- <el-button type="warning" @click="onSubmit">設定更新時間</el-button> -->
					</el-form-item>
				</el-form>


      </div>
    </template>
    
			<el-table :data="tableData" border style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
			<el-table-column prop="update_time" sortable label="更新時間" width="150">
				<template #default="scope">
					<div style="display: flex; align-items: center">
						<i class="fa-regular fa-clock"></i>
						<span style="margin-left: 10px">{{ (scope.row.update_time).split('T')[0] }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="name" sortable label="姓名" width="100" />
			<el-table-column prop="phone" label="電話" width="150px"/>
			<el-table-column prop="email" label="信箱" width="100px"/>
			<el-table-column prop="line_id" label="line ID" />
			<el-table-column prop="note" label="備註" />


			<el-table-column label="操作" width="150px">
				<template #default="scope">
					<el-button type="info" size="small" @click="handleEdit(scope.row)">編輯</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">刪除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<hr class="my-4" />

		<!-- <el-pagination 
			background 
			layout="prev, pager, next" 
			:total="100" 
			v-model:current-page="currentPage"	
		/> -->
		
  </el-card>

	<DialogModal
		:show="show"
    @closeModal="show = false"
    @getDonateList="getDonateList"
    :editData="editData"
    :option="option"
	/>

</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from "@/utils/https.js";
import { apiGetQuestion } from '@/utils/api.js'
import DialogModal from "@/components/Admin/Question/DialogModal.vue"

const show = ref(false)
const option = ref();
const tableData = ref([])	
const getDonateList = async() => {
	const { data } = await apiGetQuestion()
	tableData.value = data
}

const receiptDialog = ref(null)
const handleCreate = () => {
	editData.value = {
		"name": "",
		"phone": "",
		"line_id": "",
		"email": "",
		"note": "",
	}
	option.value = 'create'
	show.value = true
}

const editData = ref(null)
const handleEdit = (row) => {
	editData.value = { ...row }
	option.value = 'edit'
	show.value = true
}

onMounted(() => {
	getDonateList()
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