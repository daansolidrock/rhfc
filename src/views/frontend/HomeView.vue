<template>
  <swiper :slides-per-view="1" :space-between="50" :autoplay="autoplayOptions" :modules="modules" effect="fade">
    <swiper-slide>
      <img src="@/assets/images/c.jpg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/images/d.jpg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/images/h.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img src="@/assets/images/k.jpg" alt="">
    </swiper-slide>

  </swiper>


  <div class="mask" ref="main">
    <div class="txt line1">
      歡迎回家
    </div>
    <div class="txt line2">
      以福音為中心的教會
    </div>
    <div class="txt line3">
      兼容平衡的教會
    </div>
    <div class="txt line4">
      認識十架的教會
    </div>
  </div>

  <section class="part">
			<div class="container gaspel-center">
				<div class="row flex-row-reverse">
					<div 
						class="col-xl-7"
						data-aos="fade-down" 	
					>
						<img  style="width: 100%; height:422px; object-fit: cover" src="https://cdn.pixabay.com/photo/2015/03/30/14/35/love-699480_1280.jpg" alt="picture">
					</div>

					<div class="col-xl-5 d-flex align-items-center">
						<div class="gaspel-center-content" data-aos="fade-up">
							<div class="subtip">GOSPEL</div>
							<h2>
								<span>以福音為中心的教會</span>
							</h2>
							<!-- <h2>
								<span>是什麼樣？</span>
							</h2> -->
							<p>福音就是基督為自己百姓做成的救恩，教會以此為中心不斷發現福音的恩典運用在生命上，離開以行為換取祝福的宗教模式。</p>
							<!-- <img src="https://iamamberhh.github.io/sollys/assets/images/dream-1.png" alt="slogan"> -->
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="part">
			<div class="container gaspel-center">
				<div class="row">
					<div 
						class="col-xl-7"
						data-aos="fade-down" 	
					>
						<img style="width: 100%; height:422px; object-fit: cover" src="https://cdn.pixabay.com/photo/2016/04/16/18/00/scales-1333455_1280.jpg" alt="picture">
					</div>

					<div class="col-xl-5 d-flex align-items-center">
						<div class="gaspel-center-content" data-aos="fade-up">
							<div class="subtip">BALANCE</div>
							<h2>
								<span>兼容平衡的教會</span>
							</h2>
							<!-- <h2>
								<span>是什麼樣？</span>
							</h2> -->
							<p>崇拜、團契與使命是健康教會均衡發展的三要素，避免教會成為神學院或內聚的團體。</p>
							<!-- <img src="https://iamamberhh.github.io/sollys/assets/images/dream-1.png" alt="slogan"> -->
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="part mb-6">
			<div class="container gaspel-center">
				<div class="row flex-row-reverse">
					<div 
						class="col-xl-7"
						data-aos="fade-down" 	
					>
						<img  style="width: 100%; height:422px; object-fit: cover" src="https://cdn.pixabay.com/photo/2016/11/21/16/09/bible-1846174_1280.jpg" alt="picture">
					</div>

					<div class="col-xl-5 d-flex align-items-center">
						<div class="gaspel-center-content" data-aos="fade-up">
							<div class="subtip">BIBLE</div>
							<h2>
								<span>學習聖經的教會</span>
							</h2>
							<!-- <h2>
								<span>是什麼樣？</span>
							</h2> -->
							<p>聖經是上帝所啟示的生命之道，因此教會有責任教導信徒聖經真理，指出聖經前後一致的焦點是基督，以及祂如何因為愛所成就的事。</p>
							<!-- <img src="https://iamamberhh.github.io/sollys/assets/images/dream-1.png" alt="slogan"> -->
						</div>
					</div>
				</div>
			</div>
		</section>
  <!-- </div> -->
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import { EffectFade } from 'swiper/core';
import { TimelineLite, TweenMax, TweenLite, gsap } from "gsap";

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

//自動輪播的配置
const autoplayOptions = {
  delay: 3000,
  disableOnInteraction: false,
  loop: true,
  pauseOnMouseEnter: true,
  reverseDirection: true
}

const modules = [Navigation, Pagination, A11y, Autoplay, EffectFade]

onMounted(() => {
    gsap
      .timeline()
      .fromTo('.line1', {y: 150, opacity: 0 }, {duration: 2, y: 0, opacity: 1.})
      .to('.line1', { duration: 2, y: -100, opacity: 0, delay: 1}, '-=35%')
      .fromTo('.line2', {y: 150, opacity: 0 }, {duration: 2, y: 0, opacity: 1.})
      .to('.line2', { duration: 2, y: -100, opacity: 0, delay: 1}, '-=35%')
      .fromTo('.line3', {y: 150, opacity: 0 }, {duration: 2, y: 0, opacity: 1.})
      .to('.line3', { duration: 2, y: -100, opacity: 0, delay: 1}, '-=35%')
      .fromTo('.line4', {y: 150, opacity: 0 }, {duration: 2, y: 0, opacity: 1.})
      .to('.line4', { duration: 2, y: -100, opacity: 0, delay: 1}, '-=35%')
      .repeat(-1)
})

</script>
<style scoped lang="scss">
.swiper {
  width: 100vw;
  height: 100vh;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mask {
  height: 300px;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  /* border: 1px solid rgba(255, 255, 255, .01); */
  border-radius: 10px;
  font-size: 30px;
  padding: 20px;
  /* backdrop-filter: blur(15px); */
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.txt{
  position: absolute;
  letter-spacing: 10px;
  font-size: 50px;
  font-weight: bolder;
  user-select: none;
}

.part{
  margin-top: 150px;
}

@media(max-width:768px){
  .mask{
    left: 50%;
    width: 100%;
  }

  .txt{
    font-size: 35px;
  }
}



</style>