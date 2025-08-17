<template>
	<ImageSectionVue title="影片專區"
		:style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3)' }" />

	<div class="container py-5">
		<div class="row">
			<!-- 左側：手風琴 + 單層按鈕 -->
			<aside class="col-lg-3 episode-nav">
				<div class="accordion" id="videoAccordion">
					<div class="accordion-item" v-for="type in categories" :key="type">
						<!-- 有子分類：手風琴 -->
						<template v-if="isTypeGrouped(type)">
							<h2 class="accordion-header" :id="`heading-${safeId(type)}`">
								<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
									:data-bs-target="`#collapse-${safeId(type)}`" aria-expanded="false"
									:aria-controls="`collapse-${safeId(type)}`" :class="{ 'category-active': isSelectedType === type }"
									@click.stop>
									{{ labelOf(type) }}
								</button>
							</h2>
							<div :id="`collapse-${safeId(type)}`" class="accordion-collapse collapse"
								:aria-labelledby="`heading-${safeId(type)}`" data-bs-parent="#videoAccordion">
								<div class="accordion-body p-0">
									<button v-for="sub in getSubcategories(type)" :key="sub" class="subcat-btn btn w-100 text-start"
										:class="{ active: isSelectedType === type && isSelectedSub === sub }"
										@click="selectGrouped(type, sub)">
										{{ subLabelOf(sub) }}
									</button>
								</div>
							</div>
						</template>

						<!-- 單層：一般按鈕 -->
						<template v-else>
							<button class="accordion-button single collapsed" type="button" @click="selectFlatType(type)"
								:class="{ 'category-active': isSelectedType === type && !isSelectedSub }">
								{{ labelOf(type) }}
							</button>
						</template>
					</div>
				</div>
			</aside>

			<!-- 右側：影片清單 -->
			<main class="col-lg-9">
				<div class="section-title p-2 mb-3 d-flex align-items-center justify-content-between">
					<h5 class="mb-0">
						{{ labelOf(isSelectedType) }}
						<template v-if="isGrouped && isSelectedSub">
							<span class="text-muted"> / {{ subLabelOf(isSelectedSub) }}</span>
						</template>
					</h5>
				</div>

				<template v-if="currentList.length">
					<article v-for="(v, i) in currentList" :key="`${v.url}-${i}`" class="row g-0 mb-3 video-list card-hover"
						@click="openVideo(v.url)" style="cursor: pointer;">
						<div class="col-md-3">
							<img :src="thumbOf(v)" class="img-fluid p-3" :alt="v.title" loading="lazy" />
						</div>
						<div class="col-md-9">
							<div class="card-body d-flex flex-column justify-content-between h-100 p-3">
								<div class="mb-3">
									<h5 class="card-title fs-lg-4 fw-bold overflow-hidden mb-2 one-line">
										{{ v.title }}
									</h5>
									<p class="card-text multiline-ellipsis">
										{{ truncate(v.description) }}
									</p>
								</div>
								<div class="d-flex justify-content-between align-items-center">
									<small class="text-muted">{{ formatDate(v.published_at) }}</small>
									<button class="btn btn-warning" @click.stop="openVideo(v.url)">點我觀看</button>
								</div>
							</div>
						</div>
					</article>
				</template>

				<template v-else>
					<div class="text-muted">這個分類目前沒有影片。</div>
				</template>
			</main>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import ImageSectionVue from '@/components/ImageSection.vue';
import videoData from '@/assets/data/videoList.json';

const videos = videoData?.videos ?? {};
const categories = ref(Object.keys(videos));

const typeLabelMap = { PODCAST: 'Podcast' };
const subLabelMap = { PODCAST: 'Podcast', PODCAST2: 'Podcast 2' };
const labelOf = (type) => typeLabelMap[type] || type;
const subLabelOf = (sub) => subLabelMap[sub] || sub;
const safeId = (s) => String(s).replace(/\s+/g, '-').replace(/[^\w-]/g, '');

const isTypeGrouped = (type) => {
	const node = videos[type];
	return !!node && !Array.isArray(node) && typeof node === 'object';
};
const getSubcategories = (type) => (isTypeGrouped(type) ? Object.keys(videos[type]) : []);

const defaultType = categories.value[0] ?? '';
const isSelectedType = ref(defaultType);
const isSelectedSub = ref('');

const isGrouped = computed(() => !!isSelectedType.value && isTypeGrouped(isSelectedType.value));

const currentList = computed(() => {
	const node = videos[isSelectedType.value];
	if (!node) return [];
	if (Array.isArray(node)) return node;
	const sub = isSelectedSub.value || Object.keys(node)[0];
	return node[sub] || [];
});

watch(
	() => isSelectedType.value,
	(t) => {
		if (!t || !isTypeGrouped(t)) {
			isSelectedSub.value = '';
			return;
		}
		const subs = getSubcategories(t);
		if (!subs.includes(isSelectedSub.value)) {
			isSelectedSub.value = subs[0] ?? '';
		}
	},
	{ immediate: true }
);

const selectFlatType = (type) => {
	isSelectedType.value = type;
	isSelectedSub.value = '';
};
const selectGrouped = (type, sub) => {
	isSelectedType.value = type;
	isSelectedSub.value = sub;
};

const ytThumbFromUrl = (url) => {
	const m = url?.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/);
	return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : '';
};
const thumbOf = (v) => v?.thumbnails || ytThumbFromUrl(v?.url) || '';
const formatDate = (iso) => {
	if (!iso) return '';
	const d = new Date(iso);
	return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString();
};
const openVideo = (url) => window.open(url, '_blank', 'noopener,noreferrer');

// 右側描述最多字數（可自行調整）
const DESC_MAX_CHARS = 80;
const ellipsis = '…..';
const truncate = (text, n = DESC_MAX_CHARS) => {
	const s = String(text ?? '');
	return s.length > n ? s.slice(0, n).trimEnd() + ellipsis : s;
};

</script>

<style lang="scss" scoped>
/* 左側分類 */
.episode-nav {
	.accordion-item {
		border: none;
	}

	.accordion-button {
		background: transparent;
		color: rgb(131, 123, 123);
		font-weight: bold;
		font-size: 18px;
		padding: 10px 14px;
		box-shadow: none;
		transition: color .2s ease;

		&:hover {
			color: #fc832c;
		}

		&:not(.collapsed) {
			color: #fc832c;
		}
	}

	.accordion-button.single::after {
		display: none !important;
	}

	.subcat-btn {
		padding: 8px 12px;
		font-size: 16px;
		font-weight: 600;
		color: rgb(131, 123, 123);
		background: transparent;
		border: none;
		transition: color .2s ease;
		margin-left: 20px;

		&:hover,
		&.active {
			color: #fc832c;
			font-weight: bold;
		}
	}

	.category-active {
		color: #fc832c;
	}
}
</style>
