<template>
	<ImageSectionVue title='影片專區'
		background-image='url(@/assets/images/video/intro01.jpg)' />

	<div class="container py-5">
		<div class="row">
			<!-- 所有季數 -->
			<div class="col-lg-3 episode-nav">
				<div class="left-border bg-light border-5 p-2 mb-3">
					<h5 class="mb-0">分類</h5>
				</div>

				<div 
					class="single-category"
					:class="{'category-active': isSelected === '本週信息'}"
					@click="getVideoList('本週信息')"
				>
					本週信息
				</div>
				<!-- eslint-disable -->
				<template v-for="(category, index) in categories">
					<template v-if="!category.children.length">
						<div 
							class="single-category"
							:class="{'category-active': isSelected === category.label}"
							@click="getVideoList(category.label)"
						>
							{{ category.label }}
						</div>
					</template>
				</template>

				<!-- <ul class="list-unstyled"> -->
				<el-collapse v-model="activeName" accordion>
					<template v-for="(category, index) in categories">
						<template v-if="category.children.length">
							<el-collapse-item :name=index>
								<template #title>
									<span class="multi-category-title">
										{{ category.label }}
									</span>
								</template>

								<a v-for="item in category.children"
									class="sub-category"
									:class="{'category-active': isSelected === item.label}"
									href="#" @click.prevent="getVideoList(item.label)">
											{{item.label}}
								</a>
							</el-collapse-item>
						</template>
					</template>
				</el-collapse>
				<!-- </ul> -->
			</div>
			<!-- 單集列表 -->
			<template v-if="isSelected === '本週信息' ">
				<div class="col-lg-9" v-loading="loading">
					<!-- {{ newestUrl }} -->
					<iframe width="100%" height="500" :src="newestUrl" frameborder="0" allowfullscreen></iframe> 
				</div>
			</template>

			<template v-else>
				<div class="col-lg-9" v-loading="loading">
					<div class="left-border bg-light border-5 p-2 mb-3">
						<h5 class="mb-0">{{ isSelected }}</h5>
					</div>
	
					<div class="row g-0 mb-3 video-list" v-for="video in video_list">
						<div class="col-md-3" @click="reDirectUrl(video.video_url)">
							<img :src="video.thumbnail_url" class="img-fluid p-3" :alt="video.title" style="cursor: pointer;">
						</div>
						<div class="col-md-9">
							<div class="card-body d-flex flex-column justify-content-between h-100 p-3 ">
								<div class="mb-5 mb-lg-0">
									<h5 class="card-title fs-lg-4 bw-bold overflow-hidden mb-2">{{ video.title }}</h5>
									<p class="card-text multiline-ellipsis">{{ video.content }}</p>
								</div>
								<div class="d-flex justify-content-between align-items-center">
									<p class="card-text mb-0">
										<small class="text-muted">{{ video.publish_date }}</small>
									</p>
									<button class="btn btn-warning" @click="reDirectUrl(video.video_url)">點我觀看</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>

		</div>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import ImageSectionVue from '@/components/Frontend/Layout/ImageSection.vue';
import { apiGetVideoTypeList, apiGetVideoByType, apiGetVideoNewest } from "@/utils/api.js";

const activeName = ref('1')

const categories = ref([])
const getTypeList = async() => {
	// const data = await axios.get(`http://localhost/video/videotype`)
	const { data } = await apiGetVideoTypeList();
	// console.log(data)
	categories.value = data
}


const loading = ref(false)
const isSelected = ref("")
const video_list = ref([])
const getVideoList = async(selected) => {
	loading.value = true

	// const data = await axios.get(`http://localhost/video/list/?type_name=${selected}`)
	const { data } = await apiGetVideoByType(selected)
 	// video_list.value = data.data[0].sub_link_url
	video_list.value = data[0].sub_link_url
	isSelected.value = selected
	
	loading.value = false
}

const newestUrl = ref()
const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

const getNewestVideo = async() => {
	loading.value = true
	// const data = await axios.get(`http://localhost/video/newest`)
	const { data } = await apiGetVideoNewest()
	console.log(data)
	const videoId = getId(data.sub_link_url[0].video_url)
	newestUrl.value = `//www.youtube.com/embed/${videoId}`
	loading.value = false
}

const reDirectUrl = (url) => {
	console.log(url)
	window.location.href = url;
}

onMounted(() => {
	getTypeList();
	getVideoList('本週信息');
	getNewestVideo();
})


</script>
<style lang="scss" scoped>

.episode-nav{

	.el-collapse{
		border-top: 0;
		border-bottom: 0;
	}

	.single-category{
		padding: 0px 15px;
		font-size: 20px;
		margin-bottom: 5px;
		font-weight: 500;
		cursor: pointer;

	}

	.multi-category-title{
		font-size: 20px;
		padding-left: 15px;
	}
	.sub-category{
		text-decoration: none;
		font-size: 16px;
		color: black;
		font-weight: bolder;
		display: block;
		padding-left: 15px;
	}

	:hover{
		color: #e89b02;
	}

	.category-active{
		color: #e89b02;
	}
}

.left-border {
	border-left: 10px solid rgb(255, 149, 0);
}

</style>