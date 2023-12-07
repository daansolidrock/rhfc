<template lang="">
    <ImageSectionVue title='資源下載' background-image='url(https://images.unsplash.com/photo-1588580000645-4562a6d2c839?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'/>


    <div class="container py-5">
		<div class="row">
			<!-- 所有季數 -->
			<div class="col-lg-3 episode-nav">
				<div class="left-border bg-light border-5 p-2 mb-3">
					<h5 class="mb-0">分類</h5>
				</div>
				<ul class="list-unstyled">
					<li class="mb-3">
						<a class="category-button" href="#" @click.prevent="getAllProductsData(1)"
							:class="{'category-active': isSelected === ''}">
							全部
						</a>
					</li>
					<li class="mb-3" v-for="category in categories" :key="category">
					<a 
						class="h5 category-button"
						:class="{'category-active': isSelected === category}"
						href="#" @click.prevent="getAllProductsData(1, category)">
								{{category}}
					</a>
					</li>
				</ul>
			</div>
			<!-- 單集列表 -->
			<div class="col-lg-9 table-responsive-xxl">
				<!-- <div class="left-border bg-light border-5 p-2 mb-3">
					<h5 class="mb-0">列表</h5>
				</div> -->
				
                <table class="table table-striped" style="min-width:650px;">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col" class="w-35">檔案名稱</th>
                            <th scope="col" class="w-55">說明</th>
                            <th scope="col">時間</th>
                            <th scope="col">下載</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">路得記第一章講義</th>
                            <td>閱讀第一章，試著回答問題。</td>
                            <td>2023/08/24</td>
                            <td><button type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-down"></i></button></td>
                        </tr>
                        <tr>
                            <th scope="row">詩篇二十三篇</th>
                            <td>如果你跟著仔細從主禱文前面讀到這裡會很崩潰，有的人會認為這裡是耶穌關心我們物質的需要，我們應當感謝神。但是這忽略了這一個祈求的特徵，因為這個祈求要你求一個很小的東西，一個很不持久的東西。就是『你的下一餐』、『你即將所需的一餐』。</td>
                            <td>2023/08/23</td>
                            <td><button type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-down"></i></button></td>
                        </tr>
                        <tr>
                            <th scope="row">主禱文五｜信仰生活的禱告｜詩篇二十三篇</th>
                            <td>如果你跟著仔細從主禱文前面讀到這裡會很崩潰，有的人會認為這裡是耶穌關心我們物質的需要，我們應當感謝神。但是這忽略了這一個祈求的特徵，因為這個祈求要你求一個很小的東西，一個很不持久的東西。就是『你的下一餐』、『你即將所需的一餐』。</td>
                            <td>2023/08/23</td>
                            <td><button type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-down"></i></button></td>
                        </tr>
                    </tbody>
                </table>


			</div>
		</div>
	</div>



</template>
<script setup>
import ImageSectionVue from '@/components/Frontend/Layout/ImageSection.vue';
</script>
<style lang="scss" scoped>
.left-border {
    border-left: 10px solid rgb(255, 149, 0);
}


.episode-nav li {
    padding-left: 13px;

    .category-button {
        text-decoration: none;
        font-size: 1.25rem;
        color: black;
        font-weight: bolder;
    }

    .category-active {
        color: #e89b02;
    }

    :hover {
        color: #e89b02;
    }
}
</style>