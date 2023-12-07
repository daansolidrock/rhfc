<template lang="">
    <div ref="theOffcanvas" class="offcanvas offcanvas-end" data-bs-scroll="false" data-bs-backdrop="trhe" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel"></h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <li>
                <router-link to="/" class="nav-link">首頁</router-link>
            </li>
            <li>
                <router-link to="/about" class="nav-link">關於我們</router-link>
            </li>
            <li>
                <router-link to="/video" class="nav-link">影片專區</router-link>
            </li>
            <li>
                <router-link to="/resource" class="nav-link">資源下載</router-link>
            </li>
            <li>
                <router-link to="/donate" class="nav-link">奉獻</router-link>
            </li>
            <li>
                <router-link to="/question" class="nav-link">Q&A</router-link>
            </li>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineExpose, watch } from 'vue'
import { useRoute } from "vue-router"
import { Offcanvas } from 'bootstrap'

const theOffcanvas = ref("")
let bsOffcanvas = ""


onMounted(() => {
	bsOffcanvas = new Offcanvas(theOffcanvas.value);
})

const open = () => {
	bsOffcanvas.show();
}

const close = () => {
	bsOffcanvas.hide();
}

const route = useRoute();
watch(route, (nv, ov) => {
	close();
})



defineExpose({
	open
});

</script>
<style lang="scss" scoped>
li {
	list-style: none;
	padding: 10px;
	margin: 0px 20px;
	color: rgb(70, 66, 66);
	font-size: 18px;

	user-select: none;
	font-weight: bolder;
}

.router-link-active {
	color: #fc832c;
}
</style>