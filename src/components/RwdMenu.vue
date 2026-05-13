<template>
    <div ref="theOffcanvas" class="offcanvas offcanvas-end" data-bs-scroll="false" tabindex="-1" aria-labelledby="offcanvasLabel">
        <div class="offcanvas-header">
            <img src="@/assets/logo/logo_fonts.svg" alt="磐石之心" class="offcanvas-logo" />
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="關閉"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="menu-list">
                <li>
                    <router-link to="/" class="menu-link">首頁</router-link>
                </li>
                <li>
                    <router-link to="/about" class="menu-link">關於我們</router-link>
                </li>
                <li>
                    <router-link to="/belief" class="menu-link">信仰宣言</router-link>
                </li>
                <li>
                    <router-link to="/video" class="menu-link">影片專區</router-link>
                </li>
                <li>
                    <router-link to="/blog" class="menu-link">文章專區</router-link>
                </li>
                <li>
                    <router-link to="/service" class="menu-link">聚會資訊</router-link>
                </li>
            </ul>

            <div class="menu-footer">
                <div class="gold-divider mb-3"></div>
                <p class="text-muted small mb-1">每週日早上 10:30 聚會</p>
                <p class="text-muted small">台中市西區臺灣大道二段285號22樓</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineExpose, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Offcanvas } from 'bootstrap'

const theOffcanvas = ref(null)
let bsOffcanvas = null

onMounted(() => {
    bsOffcanvas = new Offcanvas(theOffcanvas.value)
})

const open = () => {
    bsOffcanvas?.show()
}

const close = () => {
    bsOffcanvas?.hide()
}

const route = useRoute()
watch(route, () => {
    close()
})

defineExpose({ open })
</script>

<style lang="scss" scoped>
.offcanvas {
    max-width: 300px;
}

.offcanvas-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--color-border);
}

.offcanvas-logo {
    height: 28px;
    width: auto;
}

.menu-list {
    list-style: none;
    padding: 16px 0;
    margin: 0;
}

.menu-link {
    display: block;
    padding: 14px 24px;
    color: var(--color-text);
    text-decoration: none;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;

    &:hover {
        color: var(--color-primary);
        background-color: var(--color-primary-lighter);
        border-left-color: var(--color-accent);
    }
}

.router-link-exact-active {
    color: var(--color-primary) !important;
    border-left-color: var(--color-accent) !important;
    background-color: var(--color-primary-lighter);
}

.menu-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 24px;
}

.gold-divider {
    width: 40px;
    height: 2px;
    background-color: var(--color-accent);
}
</style>
