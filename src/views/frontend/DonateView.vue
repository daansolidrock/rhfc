<template>
	<ImageSectionVue title='奉獻'
		background-image='url(/src/assets/images/donate/intro01.jpg)' />

	<div class="container-lg mt-7 mb-7">
		<div class="row justify-content-center">
			<div class="col-lg-6" data-aos="fade-down">
				<img
					src="https://images.pexels.com/photos/5206048/pexels-photo-5206048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					style="width:100%;height:500px;object-fit: cover; " alt="">
			</div>

			<div class="col-lg-6">
				<div class="about-content" data-aos="fade-up">
					<!-- <div class="subtip">ABOUT DONATE</div> -->
					<h2>
						<span>經文</span>
					</h2>
					<!-- <h2>
                        <span>夢想空間</span>
                    </h2> -->
					<p>萬軍之耶和華說：你們要將當納的十分之一全然送入倉庫，使我家有糧，以此試試我，是否為你們敞開天上的窗戶，傾福與你們，甚至無處可容。 瑪拉基書 3：10</p>

					<h2>
						<span>奉獻帳戶</span>
					</h2>
					<p>銀行代碼：兆豐銀行 017（東台中分行 017-0712）</p>
					<p>帳號：071-09-03286-2</p>
					<p>戶名：中華磐石之心城市更新協會</p>
				</div>

				<div class="col-12 d-flex justify-content-center">
					<button class="btn btn-warning" @click="openDonateModal()">索取奉獻收據</button>
				</div>
			</div>

		</div>
	</div>

	<!-- <DonateModalVue ref="donateModalEl" /> -->

	<DonateModalVue 
		:show="show"
		@closeModal="show = false"
		ref="theModal"
	/>
</template>
<script setup>
import { ref } from 'vue'
import DonateModalVue from '@/components/Frontend/Modal/DonateModal.vue';
import ImageSectionVue from '@/components/Frontend/Layout/ImageSection.vue';

// const donateModalEl = ref(null);

// const openDonateModal = () => {
// 	donateModalEl.value.open();
// }

const show = ref(false)
const theModal = ref()
const openDonateModal = () => {
	// show.value = true
	theModal.value.open()
}

</script>
<style lang="scss" scoped>
h2 {
	font-size: 40px;
	font-weight: bold;
	margin-bottom: 20px;

}

span {
	border-bottom: 1px solid #4F4F51;
}

.subtip {
	margin-bottom: 10px;
}

p {
	margin: 10px 0 20px;
	line-height: 2.25;
	letter-spacing: 3px;
}
</style>