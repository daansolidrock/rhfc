<template lang="">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="theModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">資料填寫</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="row g-3 needs-validation" novalidate>

							<div class="col-12">
								<div class="mb-4">
									<label class="fs-8 font-serifTc mb-1" for="order__name ">姓名<span
													class="text-danger">*</span></label>
									<input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
												id="order__name" placeholder="">
									<div class="invalid-feedback">
										Please provide a valid city.
									</div>
								</div>
							</div>
	
							<div class="col-12">
								<div class="mb-4">
									<label class="fs-8 font-serifTc mb-1" for="order__name ">電話<span
													class="text-danger">*</span></label>
									<input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
											id="order__name" placeholder="">
								</div>
							</div>
	
							<div class="col-12">
								<div class="mb-4">
									<label class="fs-8 font-serifTc mb-1" for="order__name ">郵遞區號<span
													class="text-danger">*</span></label>
									<input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
											id="order__name" placeholder="">
								</div>
							</div>
	
							<div class="col-12">
								<div class="mb-4">
									<label class="fs-8 font-serifTc mb-1" for="order__name ">地址<span
													class="text-danger">*</span></label>
									<input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
											id="order__name" placeholder="">
								</div>
							</div>
	
							<div class="col-lg-12">
									<div class="mb-4">
										<label class="fs-8 font-serifTc mb-1" for="custom__needs ">備註
											<!-- <span class="text-danger">*</span> -->
										</label>
										<textarea class="d-block w-100 bg-light  border-black-30 py-2 px-4 rounded-2"
												name="custom__needs" id="custom__needs"></textarea>
									</div>
								</div>
						</form>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
						<button type="button" class="btn btn-primary">送出</button>
					</div>
				</div>
			</div>
		</div>
</template>
<script setup>
import { ref, onMounted, defineExpose } from 'vue';
import { Modal } from 'bootstrap';

const theModal = ref("")
let bsModal = ""

onMounted(() => {
	bsModal = new Modal(theModal.value);
})

const open = () => {
	bsModal.show();
}

const close = () => {
	bsModal.hide();
}

const submit = () => {
	console.log(props.feature)

}

defineExpose({
	open
});

</script>
<style lang="">
    
</style>