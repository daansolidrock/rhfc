<template>
	<nav class="navbar fixed-top" :class="{ active: isActive }">
		<div class="container-lg d-none d-md-flex justify-content-end">
			<li>
				<router-link to="/" class="nav-link">首頁</router-link>
			</li>
			<li>
				<router-link to="/about" class="nav-link">關於我們</router-link>
			</li>
			<li>
				<router-link to="/belief" class="nav-link">信仰宣言</router-link>
			</li>
			<li>
				<router-link to="/video" class="nav-link">影片專區</router-link>
			</li>
			<li>
				<router-link to="/donate" class="nav-link">奉獻</router-link>
			</li>
			<li>
				<router-link to="/question" class="nav-link">Q&A</router-link>
			</li>
		</div>

		<div class="container-lg d-block d-md-none">
			<li @click="openRwdMenu()">
				<i class="fa-solid fa-bars"></i>
			</li>
		</div>
	</nav>

	<!-- <nav class="navbar navbar-expand-lg fixed-top" :class="{ active: isActive }">
		<div class="container-lg d-flex">
			<router-link to="/" class="nav-link d-flex align-items-center" v-if="$route.meta.logoShow">
				<img src="../assets/logo/LOGO.png" alt="" width="50">
					<span style="font-size: 20px;">
						磐石之心
					</span>
			</router-link>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link to="/about" class="nav-link">關於我們</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/video" class="nav-link">影片專區</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/resource" class="nav-link">資源下載</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/donate" class="nav-link">奉獻</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/question" class="nav-link">Q&A</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav> -->

	<RwdMenuVue ref="rwdMenuEl" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { useCollapseStore } from '@/stores/collapse.js'
import RwdMenuVue from './RwdMenu.vue';

// const store = useCollapseStore();

const isActive = ref(false)

const rwdMenuEl = ref(null);


onMounted(() => {
	window.addEventListener("scroll", () => {
		var curr = window.pageYOffset;

		if (curr > 300) {
			isActive.value = true
		} else {
			isActive.value = false
		}
	});
});

const openRwdMenu = () => {
	rwdMenuEl.value.open();
}



</script>

<style lang="scss" scoped>
.navbar {
	padding: 10px;
	margin: 0;
	width: 100vw;
	transition-duration: .3s;

	li {
		list-style: none;
		padding: 10px;
		margin: 0px 20px;
		color: white;
		font-size: 18px;

		user-select: none;
		font-weight: bolder;

		:hover {
			color: #fc832c;
		}
	}

	.nav-link {
		color: white;
	}


	.router-link-active {
		color: #fc832c;
	}

}

.active {
	background-color: rgb(255, 255, 255);
	transition-duration: .3s;
	box-shadow: 0 4px 8px 0 rgb(36 36 36 / 20%);

	li {
		color: rgb(131, 123, 123)
	}

	.nav-link {
		color: rgb(131, 123, 123)
	}

	.router-link-active {
		color: #fc832c;
	}
}
</style>