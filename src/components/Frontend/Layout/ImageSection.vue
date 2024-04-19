<template lang="">
    <section class="kv">
        <div class="mask"></div>

        <div class="title">
            <h1>{{ title }}</h1>
        </div>
    </section>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    backgroundImage: {
        type: String,
        default: ''
    }
})

</script>

<style lang="scss" scoped>
section {
    /* width: 100%; */
    position: relative;

    .mask {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.447);
    }

    &.kv {
        /* https://hexschool-api.s3.us-west-2.amazonaws.com/custom/U8YjSv6kB6Hfx6uYp42LSDTcZ6fPUvRSqzIhvWeaPGjyHqjlLFV7FSKJZijzQEFsRsgbjPfuK7M4Ai7Pvk15Gz3gyHFEa2O2lEQ0HxXysp1GEQH0MQsuNdMkXcCCvcy9.jpg */
        /* background-image: url('@/assets/images/patrick-fore-b_SHPU5M3nk-unsplash.jpg'); */
        background-image: v-bind(backgroundImage);
        /* background-attachment: fixed; */
        background-position: 50% 50%;
        background-repeat: no-repeat;
        height: 350px;
        position: relative;
        /* filter: brightness(50%); */
    }

    .title {
        /* position: absolute;
        left: 0;
        right: 0;
        bottom: 10%;
        color: white; */

        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        color: white;
        /* border: 1px solid white; */
        border-radius: 10px;
        padding: 50px 100px;
        /* backdrop-filter: blur(8px); */
        /* background-color: #d2d4d137; */
    }

}

@media screen and (max-width: 767px) {
    section {
        &.kv {
            height: 300px;
            background-position: 50% 0px;
        }
    }
}
</style>