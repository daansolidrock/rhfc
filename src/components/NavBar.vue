<template>
	<nav class="navbar fixed-top" :class="{ active: isActive }">
		<div class="container-lg d-none d-md-flex justify-content-end">
			<!-- 首頁：只有當不是首頁的時候才顯示 -->
			<li v-if="$route.path !== '/'">
				<router-link to="/" class="nav-link" :class="{ activeLink: $route.path === '/' }">首頁</router-link>
			</li>

			<li>
				<router-link to="/about" class="nav-link" :class="{ activeLink: $route.path === '/about' }">關於我們</router-link>
			</li>
			<li>
				<router-link to="/belief" class="nav-link" :class="{ activeLink: $route.path === '/belief' }">信仰宣言</router-link>
			</li>
			<li>
				<router-link to="/video" class="nav-link" :class="{ activeLink: $route.path === '/video' }">影片專區</router-link>
			</li>
			<li>
				<router-link to="/blog" class="nav-link"
					:class="{ activeLink: $route.path.startsWith('/blog') }">文章專區</router-link>
			</li>
		</div>

		<div class="container-lg d-block d-md-none">
			<li @click="openRwdMenu()">
				<i class="fa-solid fa-bars"></i>
			</li>
		</div>
	</nav>

	<RwdMenuVue ref="rwdMenuEl" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RwdMenuVue from './RwdMenu.vue'

const isActive = ref(false)
const rwdMenuEl = ref(null)
const route = useRoute()

onMounted(() => {
	window.addEventListener("scroll", () => {
		var curr = window.pageYOffset;
		isActive.value = curr > 300
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
		padding: 0px 10px;
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
		text-decoration: none;
	}

	/* 只針對完全比對才亮 */
	.activeLink {
		color: #fc832c !important;
	}
}

.active {
	background-color: rgb(255, 255, 255);
	transition-duration: .3s;
	box-shadow: 0 4px 8px 0 rgb(36 36 36 / 20%);

	li {
		color: rgb(131, 123, 123);
	}

	.nav-link {
		color: rgb(131, 123, 123);
	}

	.activeLink {
		color: #fc832c !important;
	}
}
</style>
