<template>
	<nav class="navbar fixed-top" :class="{ scrolled: isScrolled }">
		<div class="container-lg navbar-inner">
			<router-link to="/" class="navbar-brand">
				<img src="@/assets/logo/LOGO.png" alt="磐石之心" class="brand-logo" />
			</router-link>

			<ul class="nav-links d-none d-md-flex">
				<li v-if="$route.path !== '/'">
					<router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">首頁</router-link>
				</li>
				<li>
					<router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">關於我們</router-link>
				</li>
				<li>
					<router-link to="/belief" class="nav-link" :class="{ active: $route.path === '/belief' }">信仰宣言</router-link>
				</li>
				<li>
					<router-link to="/video" class="nav-link" :class="{ active: $route.path === '/video' }">影片專區</router-link>
				</li>
				<li>
					<router-link to="/blog" class="nav-link"
						:class="{ active: $route.path.startsWith('/blog') }">文章專區</router-link>
				</li>
			<li>
				<router-link to="/service" class="nav-link" :class="{ active: $route.path === '/service' }">聚會資訊</router-link>
			</li>
			</ul>

			<button class="menu-toggle d-md-none" @click="openRwdMenu" aria-label="開啟選單">
				<i class="fa-solid fa-bars"></i>
			</button>
		</div>
	</nav>

	<RwdMenuVue ref="rwdMenuEl" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import RwdMenuVue from './RwdMenu.vue'

const isScrolled = ref(false)
const rwdMenuEl = ref(null)

const onScroll = () => {
	isScrolled.value = window.pageYOffset > 60
}

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
})

const openRwdMenu = () => {
	rwdMenuEl.value.open()
}
</script>

<style lang="scss" scoped>
.navbar {
	padding: 14px 0;
	width: 100%;
	transition: all 0.3s ease;
	z-index: 1030;
}

.navbar-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.navbar-brand {
	display: flex;
	align-items: center;
	text-decoration: none;
}

.brand-logo {
	height: 42px;
	width: auto;
	filter: brightness(0) invert(1);
	transition: all 0.3s ease;
}

.scrolled .brand-logo {
	height: 36px;
	filter: none;
}

.nav-links {
	list-style: none;
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 0;
	padding: 0;
}

.nav-link {
	color: rgba(255, 255, 255, 0.9);
	text-decoration: none;
	font-size: 16px;
	font-weight: 600;
	padding: 6px 16px;
	position: relative;
	transition: color 0.3s ease;
	letter-spacing: 1px;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 2px;
		background-color: var(--color-accent);
		transition: width 0.3s ease;
	}

	&:hover {
		color: white;

		&::after {
			width: 60%;
		}
	}

	&.active {
		color: white;

		&::after {
			width: 60%;
			background-color: var(--color-accent);
		}
	}
}

.menu-toggle {
	background: none;
	border: none;
	color: white;
	font-size: 22px;
	padding: 8px;
	cursor: pointer;
	transition: color 0.3s ease;
}

/* Scrolled state */
.scrolled {
	background-color: var(--color-bg-white);
	box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
	padding: 10px 0;

	.brand-logo {
		filter: none;
	}

	.nav-link {
		color: var(--color-text-muted);

		&:hover {
			color: var(--color-primary);
		}

		&.active {
			color: var(--color-primary);
		}
	}

	.menu-toggle {
		color: var(--color-primary);
	}
}
</style>
