<template>
  <ImageSectionVue title='我們相信什麼'
    background-image='url(https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&dpr=2)' />

  <div class="container-md gaspel-center">

    <div class="row mt-6">
      <div class="col d-flex justify-content-center">
        <div class="title main fw-bold text-center">
          信 仰 宣 言
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="divide" style="width:120px;border: 2px solid orange;"></div>
      </div>
    </div>

    <div class="row mt-5 mb-2">
      <div class="col d-flex justify-content-center text-center fs-5">
        我們的信仰沿襲基督教神學家們的信仰宣言，也是教會信仰生活的基礎指引。
      </div>
    </div>


    <div class="row mt-6 mb-2">
      <div class="col d-flex justify-content-center">
        <div class="title">
          <span class="baseline">唯獨聖經</span>
        </div>
      </div>
    </div>

    <div class="row mt-2 mb-2">
      <div class="col d-flex justify-content-center text-center fs-5">
        聖經是上帝全然無誤的默示，是教會唯一的權威並受其教導。
      </div>
    </div>

    <div class="row mt-6 mb-2">
      <div class="col d-flex justify-content-center">
        <div class="title">
          <span class="baseline">唯獨信心</span>
        </div>
      </div>
    </div>

    <div class="row mt-2 mb-2">
      <div class="col d-flex justify-content-center text-center fs-5">
        救恩唯獨是藉著上帝所賞賜的信心，不是憑著人的能力或行為。
      </div>
    </div>

    <div class="row mt-6 mb-2">
      <div class="col d-flex justify-content-center">
        <div class="title">
          <span class="baseline">唯獨恩典</span>
        </div>
      </div>
    </div>

    <div class="row mt-2 mb-2">
      <div class="col d-flex justify-content-center text-center fs-5">
        神所賜給教會的救恩是白白藉著基督賜給不配蒙恩的罪人，獲得永恆的生命。
      </div>
    </div>

    <div class="row mt-6 mb-2">
      <div class="col d-flex justify-content-center">
        <div class="title">
          <span class="baseline">唯獨基督</span>
        </div>
      </div>
    </div>

    <div class="row mt-2 mb-2">
      <div class="col d-flex justify-content-center text-center fs-5">
        上帝所給人赦罪得永生的救恩唯獨透過基督作為上帝與人之間的中保，沒有其他人、事、物可代替。
      </div>
    </div>

    <div class="row mt-6 mb-2">
      <div class="col d-flex justify-content-center">
        <div class="title">
          <span class="baseline">唯獨上帝的榮耀</span>
        </div>
      </div>
    </div>

    <div class="row mt-2 mb-5">
      <div class="col d-flex justify-content-center text-center fs-5">
        上帝給人的救恩是藉著自己的意志和行為力完成，因此也只有祂自己配得榮耀與頌讚。
      </div>
    </div>

  </div>
</template>
<script setup>
import ImageSectionVue from '@/components/ImageSection.vue';

</script>
<style lang="scss" scoped>
.title {
  display: inline-block;
  font-size: 22px;
  font-weight: bolder;
}

.main {
  padding-bottom: 5px;
  font-size: 35px;
  color: #000;
}

.baseline {
  border-bottom: 2px solid rgb(80, 80, 80);
}
</style>