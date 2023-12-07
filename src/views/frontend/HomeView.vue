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