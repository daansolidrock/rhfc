<template>
    <ImageSectionVue title='Q&A' background-image='url(https://images.pexels.com/photos/5428834/pexels-photo-5428834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'/>

    <div class="container-lg mt-7">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="row">

                    <div class="col-lg-6">
                        <div class="mb-4">
                            <label class="fs-8 font-serifTc mb-1" for="order__name ">聯絡人（先生/小姐）<span
                                    class="text-danger">*</span></label>
                            <input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
                                id="order__name" placeholder="">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-4">
                            <label class="fs-8 font-serifTc mb-1" for="order__name ">聯絡電話
                                <!-- <span class="text-danger">*</span> -->
                            </label>
                            <input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
                                id="order__name" placeholder="">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-4">
                            <label class="fs-8 font-serifTc mb-1" for="order__name ">電子郵件<span
                                    class="text-danger">*</span></label>
                            <input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
                                id="order__name" placeholder="">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-4">
                            <label class="fs-8 font-serifTc mb-1" for="order__name ">line ID</label>
                            <input class="form-control bg-light border-black-30 py-2 px-4" type="text" name="order__name"
                                id="order__name" placeholder="">
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="mb-4">
                            <label class="fs-8 font-serifTc mb-1" for="custom__needs ">信仰問題 / 需求說明<span
                                    class="text-danger">*</span></label>
                            <textarea class="d-block w-100 bg-light  border-black-30 py-2 px-4 rounded-2"
                                name="custom__needs" id="custom__needs"></textarea>
                        </div>

                        <div class="col-12 d-flex justify-content-center">
                            <button class="btn btn-warning">送出</button>
                        </div>
                    </div>

                    <div class="mb-2 mt-5">
                        <p class="mb-2 text-center">若您有任何關於信仰、聖經或教會問題，歡迎您詢問並填寫資料，教會牧者將回覆您的問題。</p>
                    </div>
                    

                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import ImageSectionVue from '@/components/Frontend/Layout/ImageSection.vue';
</script>
<style lang="">
    
</style>