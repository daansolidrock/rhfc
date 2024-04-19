<template lang="">
    <ImageSectionVue title='關於我們' background-image='url(/src/assets/images/about/intro01.jpg)'/>

		<section class="part">
			<div class="container-md gaspel-center">
				
				<div class="row flex-row-reverse">
					<!-- <div class="col-xl-1 d-flex align-items-center"></div> -->
					<div 
						class="col-xl-4 pastor"
						data-aos="fade-down"
					>
						<img class="pastor" src="@/assets/images/about/paster01.jpg" alt="picture">
					</div>
					
					<div class="col-xl-8 d-flex align-items-center">
						<div class="gaspel-center-content" data-aos="fade-up">
							<!-- <div class="subtip">PASTOR</div> -->
							<h2>
								<span>教會牧師 – 高文聰</span>
							</h2>
							<!-- <h2>
								<span>是什麼樣？</span>
							</h2> -->
							<p>2021年12月，高文聰牧師本於對福音的熱情開拓磐石之心教會，期望能在新興教會與傳統教會中取得平衡。在教會中首要任務是講明福音的本質，使信徒得著福音的好處，實踐在生活各個層面中。在教導上，強調聖經為教會的權威。致力教導聖經神學、聖約神學、以基督為中心的講道、福音轉化、西敏信條…等。每周在線上帶領以救贖歷史框架查考聖經，使信徒進入整本聖經的偉大救贖圖畫中，等候末世最後的成全。</p>
							
							<p>2019年6月 台北改革宗神學院道學碩士畢業</p>
							<p>2019年7月 CITY to CITY TAIWAN 植堂者訓練結業</p>
							<p>2020年4月 台中烈火教會擔任傳道人</p>
							<p>2020年9月 晨曦福音戒毒學院兼任教師</p>
							<p>2021年12月 開拓磐石之心教會</p>
							<!-- <img src="https://iamamberhh.github.io/sollys/assets/images/dream-1.png" alt="slogan"> -->
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="part">
			<div class="container gaspel-center">
				<div class="row">
					<div 
						class="col-xl-7"
						data-aos="fade-down" 	
					>
						<img style="width: 100%; height:422px; object-fit: cover" src="@/assets/images/about/paster02.jpg" alt="picture">
					</div>

					<div class="col-xl-5 d-flex align-items-center">
						<div class="gaspel-center-content" data-aos="fade-up">
							<!-- <div class="subtip">BALANCE</div> -->
							<h2>
								<span>教會監督-黃宗儀</span>
							</h2>
							<!-- <h2>
								<span>是什麼樣？</span>
							</h2> -->
							<p>黃宗儀牧師是華神校友，曾在客西馬尼行道會，台中精誠教會（開拓），費城台福教會及台中福音基督教會牧會，黃宗儀牧師在獲得英國牛津宣教研究中心的哲學博士之後，曾在中台神學院專任教學，現為黃藥師的福音神學教室的創辦人，致力於為教會客製化神學課程，把神學帶進教會，將福音神學的核心真理透過解經，神學及實踐的課程轉化生命。基督教今日報專訪：擁叛逆靈魂　從小提琴手、牙醫到牧師：盼不要自居為「比較好的罪人」
							</p>
							<p style="text-align: right">
								<button type="button" class="btn btn-success" onclick="location.href='https://www.facebook.com/HYSClassroom?locale=zh_TW'">福音神學教室</button>
								<button type="button" class="btn btn-primary" style="margin-left: 10px" onclick="location.href='https://tinyurl.com/bfmnxjwz'">比較好的罪人</button>
							</p>
							<!-- <img src="https://iamamberhh.github.io/sollys/assets/images/dream-1.png" alt="slogan"> -->
						</div>
					</div>
				</div>
			</div>
		</section>


		<section class="part pt-3">
      <div class="img-wrap d-none d-md-block">
        <img
          class="img-fluid"
          data-aos="fade-down"
          src="@/assets/images/about/city_lights.png"
          alt=""
        >
      </div>
      <div class="img-wrap d-md-none">
        <img
          class="img-fluid"
          src="@/assets/images/about/city_lights.png"
          alt=""
        >
      </div>
    </section>

		<!-- <QAndASectionVue /> -->

</template>
<script setup>
import ImageSectionVue from '@/components/Frontend/Layout/ImageSection.vue';
// import QAndASectionVue from '../components/QAndASection.vue';
</script>
<style lang="scss" scoped>
* {
	position: relative;
}

.part {
	margin-top: 150px;
}

.txt-wrap:before {
	content: "";
	z-index: -1;
	position: absolute;
	width: 120%;
	height: 110%;
	background-color: #f3ece9;
	bottom: -20px;
	right: -20px;
	border-right: 3px solid #a36549;
}

.img-wrap {
	z-index: 1;
}

.gaspel-center {
	.gaspel-center-content {
		margin-left: 20px;

		h2 {
			font-size: 40px;
			font-weight: bold;
			margin-bottom: 20px;

		}

		/* span {
			border-bottom: 1px solid #4F4F51;
		} */

		.subtip {
			margin-bottom: 10px;
		}

		p {
			margin: 25px 0 20px;
			line-height: 2;
			letter-spacing: 3.5px;
		}
	}

	img {
		height: 550px;
		object-fit: cover;
	}
}


.balance-church {

	h2 {
		font-size: 40px;
		font-weight: bold;
		margin-bottom: 20px;

	}

	span {
		border-bottom: 1px solid #4F4F51;
	}

	.subtip {
		margin-bottom: 10px;
	}

	p {
		margin: 25px 0 20px;
		line-height: 2.25;
		letter-spacing: 5px;
	}

	.deco-block {
		width: 100%;
		/* margin-right: 12%; */
		position: relative;
		background-image: url(https://iamamberhh.github.io/sollys/assets/images/about-img.jpeg);
		height: 500px;
		background-position: center;
		background-size: cover;
	}

	.deco-block::after {
		content: "";
		position: absolute;
		top: 30px;
		left: 150px;
		background-color: #DADDDA;
		width: 80%;
		height: 100%;
		z-index: -5;
	}

	.deco-sunset {
		position: absolute;
		width: 180px;
		height: 180px;
		right: 0px;
	}
}

/* .pastor {
	width: 100%;
	object-fit: cover
} */

@media(max-width:1200px) {
	.gaspel-center {
		.gaspel-center-content {
			margin-top: 50px;
		}
	}

	.gaspel-center {
		.pastor{
			text-align: center;
		}
		img {
			width: 400px;
		}
	}
}
</style>import { styleType } from 'element-plus/es/components/table-v2/src/common';
