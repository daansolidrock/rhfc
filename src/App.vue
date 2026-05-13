<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    offset: 120,
    duration: 800,
    easing: 'ease',
    once: true,
  })
})

</script>
