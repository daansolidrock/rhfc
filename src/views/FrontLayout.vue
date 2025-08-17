<template lang="">
    <NavBar />
    <RouterView></RouterView>

    <span v-if="$route.meta.footerShow">
        <FooterSectionVue />
    </span>

</template>
<script setup>
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import FooterSectionVue from '@/components/FooterSection.vue';

</script>
<style lang="">

</style>