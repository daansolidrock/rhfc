<template>
    <section class="kv" :style="kvStyle">
        <div class="kv-overlay"></div>
        <div class="kv-content">
            <h1 class="kv-title">{{ title }}</h1>
            <div class="kv-divider"></div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'

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

const kvStyle = computed(() => ({
    backgroundImage: props.backgroundImage
}))
</script>

<style lang="scss" scoped>
.kv {
    position: relative;
    height: 350px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}

.kv-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        rgba(27, 42, 74, 0.6) 0%,
        rgba(27, 42, 74, 0.4) 100%
    );
}

.kv-content {
    position: relative;
    z-index: 1;
    text-align: center;
}

.kv-title {
    font-family: var(--font-serif);
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 8px;
    margin-bottom: 16px;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.kv-divider {
    width: 60px;
    height: 2px;
    background-color: var(--color-accent);
    margin: 0 auto;
}

@media screen and (max-width: 767px) {
    .kv {
        height: 280px;
    }

    .kv-title {
        font-size: 1.8rem;
        letter-spacing: 5px;
    }
}
</style>
