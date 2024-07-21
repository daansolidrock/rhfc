<template lang="">
    <section>
        <div class="container info" >
            <div class="row">
                <div class="col-md-6">
                    <div class="logo">
                        <!-- <img src="@/assets/logo/LOGO.png" alt=""> -->
                        <!-- <div class="name">
                            中華磐石之心城市更新協會
                        </div> -->
                        <img src="@/assets/logo/logo_fonts.png" alt="">
                    </div>
                    <!-- <div class="line">
                        Rock Hard Faith Church in Taichung
                    </div> -->
                    <div class="line">
                        <a href="https://www.facebook.com/daansolidrock/?locale=zh_TW" target="_blank">
                            <i class="fa-brands fa-facebook icon link"></i>
                        </a>
                        <a href="https://www.youtube.com/@user-vd1mj4li5t" target="_blank">
                            <i class="fa-brands fa-youtube icon link"></i>
                        </a>
                        <a href="https://www.instagram.com/rockhardfaithchurch_/" target="_blank">
                            <i class="fa-brands fa-instagram icon link"></i>
                        </a>
                    </div>
                </div>
                <div class="col-md-6 right-side">
                    <span class="title">其他資訊</span>
                    <div class="other-info">
                        <li>
                            <i class="fa-solid fa-pen"></i>
                            <span> 統一編號：92263802</span>
                        </li>
                        <li>
                            <i class="fa-solid fa-location-dot icon"></i>
                            <span>403台中市西區臺灣大道二段285號22樓</span>
                        </li>
                        <li>
                            <i class="fa-solid fa-envelope icon"></i>
                            <span>daansolidrock@gmail.com</span>
                        </li>
                        <li>
                            <i class="fa-solid fa-phone icon"></i>
                            <span>0954-030-032</span>
                        </li>
                        <li>
                            <i class="fa-solid fa-house"></i>
                            <span> 聚會時間：每週日早上10:30</span>
                        </li>
                    </div>
                </div>
            </div>
        </div>

        <div class="container copyright">
            Copyright ©2023 – 磐石之心 All Rights Reserved.
        </div>        
    </section>


</template>
<script></script>

<style lang="scss" scoped>
* {
    color: white;
}

section {
    background-color: #0E0E0E;
    padding: 50px;
}

/* 526 × 386 */
img {
    /* width: 40px; */
    /* height: 57px; */
    width: 270px;
}

.line {
    margin-top: 10px;
}

.logo{
    display: flex;
    align-items: center;     

    .name{
        font-size: 25px;
        margin-left: 10px;
    }
}

.info {
    border-bottom: 1px solid white;
    padding-bottom: 50px;
}

.title {
    font-size: 20px;
    border-bottom: 2px solid white;
    padding: 10px 0px;
}

.icon {
    margin-right: 5px;
}

.link {
    font-size: 30px;
    margin-left: 10px;
    cursor: pointer;

    :hover{
        color: #fc832c;
    }
}

.other-info {
    margin-top: 20px;

    & li {
        margin-top: 8px;
        list-style-type: none
    }
}

.copyright {
    margin-top: 20px;
}

@media screen and (max-width: 767px) {
    .right-side{
        margin-top: 30px;
    }
    img {
        width: 305px;
    }
}

@media screen and (max-width: 414px) {
    img{
        width: 100%;
    }
}

</style>