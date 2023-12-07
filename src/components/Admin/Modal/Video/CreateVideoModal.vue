<template lang="">
    <div class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel"
  aria-hidden="true" ref="theModal" v-loading="loading">
        <div class="modal-dialog" v-loading="loading">
					<div class="modal-content">
            <div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">
								新增清單
							</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
							<el-form ref="form" :model="formData" label-width="120px" :label-position="labelPosition" :rules="formRules">
								<el-form-item label="分類">
									<el-cascader
										v-model="typeValue"
										:options="options"
										:props="hoverOption"
									/>
								</el-form-item>

								<el-form-item label="清單網址">
									<el-input v-model="formData.url" />
								</el-form-item>
								
							</el-form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"
                @click="close()">關閉</button>
                <button type="button" class="btn btn-primary" @click="submit()">新增</button>
            </div>
					</div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Modal } from 'bootstrap';
// import { FormInstance } from "element-plus";
import axios from "@/utils/https.js";
import { ElLoading } from 'element-plus'

const props = defineProps({
	// id: { type: Number, required: true },
	// type: { type: String, required: true },
	getVideoList: { type: Object, required: true}
})

const loading = ref(false);
const theModal = ref(null);
let bsModal = ""

const open = () => {
	formData.title = '';
	bsModal.show();
}

const close = () => {
	bsModal.hide();
}

const labelPosition = ref('left')
const form = ref();
const formData = reactive({
	url: '',
})

const typeValue = ref()
const hoverOption = { expandTrigger: 'hover' }
const options = ref()
const getTypeList = async() => {
	const { data } = await axios.get(`http://localhost/video/videotype`)
	options.value = data
}

const submit = async () => {
	loading.value = true

	await axios.post(`http://localhost/video/list`, {
		"type_id": typeValue.value['1']? typeValue.value['1']:typeValue.value['0'],
		"link_url": formData.url
	})

	props.getVideoList();
	close();
	loading.value = false
}


onMounted(() => {
	bsModal = new Modal(theModal.value);
	getTypeList();
})

defineExpose({
	open
});

</script>
<style lang="scss">
.el-transfer-panel {
	--el-transfer-panel-width: 230px
}
</style>