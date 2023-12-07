<template lang="">
    <div class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel"
  aria-hidden="true" ref="theModal">
        <div class="modal-dialog">
					<div class="modal-content">
            <div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">
								<template v-if="props.type=='main'">
									新增主分類
								</template>
								<template v-else>
									新增子分類
								</template>
								
							</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
							<el-form ref="form" :model="formData" label-width="120px" :label-position="labelPosition" :rules="formRules">
								<el-form-item label="輸入分類">
									<el-input v-model="formData.title" />
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

const props = defineProps({
  id: { type: Number, required: true },
	type: { type: String, required: true },
	getTypeList: { type: Object, required: true}
})

const theModal = ref(null);
let bsModal = ""

const labelPosition = ref('left')
const form = ref();
const formData = reactive({
	title: '',
})

const formRules = reactive({
  title: [
    { required: true, message: '請輸入分類', trigger: 'blur' },
    { max: 10, message: '最多十個字', trigger: 'blur' },
  ],
})

onMounted(() => {
	bsModal = new Modal(theModal.value);
})

const open = () => {
	formData.title = '';
	bsModal.show();
}

const close = () => {
	bsModal.hide();
}

const submit = async() => {
	let response;
	if(props.type == 'main'){
		response = await axios.post(`http://localhost/video/videotype`,{
			"label": formData.title
		})
	}else{
		response = await axios.post(`http://localhost/video/videotype`,{
			"belong_to": props.id,
			"label": formData.title
		})
	}
	console.log(response)
	
	close();
	props.getTypeList();
}

defineExpose({
    open
});

</script>
<style lang="scss">
.el-transfer-panel{
	--el-transfer-panel-width: 230px
}
</style>