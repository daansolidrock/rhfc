<template>
  <ImageSection title="關於我們"
    background-image="url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/U8YjSv6kB6Hfx6uYp42LSDTcZ6fPUvRSqzIhvWeaPGjyHqjlLFV7FSKJZijzQEFsRsgbjPfuK7M4Ai7Pvk15Gz3gyHFEa2O2lEQ0HxXysp1GEQH0MQsuNdMkXcCCvcy9.jpg)" />

  <section class="about-section">
    <div class="container">
      <!-- Pastor 1 -->
      <article class="pastor-block reverse" data-aos="fade-up">
        <div class="pastor-img">
          <div class="img-frame">
            <img src="@/assets/images/about/paster01.jpg" alt="高文聰牧師" />
          </div>
          <div class="img-accent" aria-hidden="true"></div>
        </div>
        <div class="pastor-info">
          <div class="pastor-role">PASTOR</div>
          <h2>教會牧師 — 高文聰</h2>
          <p>2021年12月，高文聰牧師本於對福音的熱情開拓磐石之心教會，期望能在新興教會與傳統教會中取得平衡。在教會中首要任務是講明福音的本質，使信徒得著福音的好處，實踐在生活各個層面中。在教導上，強調聖經為教會的權威。致力教導聖經神學、聖約神學、以基督為中心的講道、福音轉化、西敏信條…等。每周在線上帶領以救贖歷史框架查考聖經，使信徒進入整本聖經的偉大救贖圖畫中，等候末世最後的成全。</p>
          <ul class="pastor-timeline">
            <li>2019年6月 台北改革宗神學院道學碩士畢業</li>
            <li>2019年7月 CITY to CITY TAIWAN 植堂者訓練結業</li>
            <li>2020年4月 台中烈火教會擔任傳道人</li>
            <li>2020年9月 晨曦福音戒毒學院兼任教師</li>
            <li>2021年12月 開拓磐石之心教會</li>
          </ul>
        </div>
      </article>

      <!-- Pastor 2 -->
      <article class="pastor-block" data-aos="fade-up">
        <div class="pastor-img">
          <div class="img-frame">
            <img src="@/assets/images/about/paster02.jpg" alt="黃宗儀牧師" />
          </div>
          <div class="img-accent" aria-hidden="true"></div>
        </div>
        <div class="pastor-info">
          <div class="pastor-role">SUPERVISOR</div>
          <h2>教會監督 — 黃宗儀</h2>
          <p>黃宗儀牧師是華神校友，曾在客西馬尼行道會，台中精誠教會（開拓），費城台福教會及台中福音基督教會牧會，黃宗儀牧師在獲得英國牛津宣教研究中心的哲學博士之後，曾在中台神學院專任教學，現為黃藥師的福音神學教室的創辦人，致力於為教會客製化神學課程，把神學帶進教會，將福音神學的核心真理透過解經，神學及實踐的課程轉化生命。基督教今日報專訪：擁叛逆靈魂　從小提琴手、牙醫到牧師：盼不要自居為「比較好的罪人」</p>
          <div class="pastor-links">
            <a href="https://www.facebook.com/HYSClassroom?locale=zh_TW" target="_blank" rel="noopener noreferrer" class="pastor-btn">福音神學教室</a>
            <a href="https://tinyurl.com/bfmnxjwz" target="_blank" rel="noopener noreferrer" class="pastor-btn outline">比較好的罪人</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- City image -->
  <section class="city-section">
    <img
      class="img-fluid"
      data-aos="fade-up"
      src="@/assets/images/about/city_lights.png"
      alt="城市燈光"
    />
  </section>
</template>

<script setup>
import ImageSection from '@/components/ImageSection.vue'
</script>

<style lang="scss" scoped>
.about-section {
  padding: 100px 0 60px;
}

.pastor-block {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 60px;
  align-items: start;
  margin-bottom: 100px;
}

.pastor-block.reverse {
  grid-template-columns: 1fr 350px;

  .pastor-img { order: 2; }
  .pastor-info { order: 1; }
}

.pastor-img {
  position: relative;
}

.img-frame {
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 3/4;
  background: var(--color-border);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.img-accent {
  position: absolute;
  top: 16px;
  left: 16px;
  right: -16px;
  bottom: -16px;
  border: 2px solid var(--color-accent);
  border-radius: 4px;
  z-index: -1;
  opacity: 0.25;
}

.pastor-role {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 5px;
  color: var(--color-accent);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.pastor-info {
  h2 {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 24px;
  }

  p {
    font-size: 15px;
    line-height: 2;
    color: var(--color-text);
    letter-spacing: 1px;
    margin-bottom: 16px;
  }
}

.pastor-timeline {
  list-style: none;
  margin-top: 24px;
  padding-left: 20px;
  border-left: 2px solid var(--color-accent);

  li {
    padding: 6px 0 6px 16px;
    font-size: 14px;
    color: var(--color-text-muted);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -25px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-accent);
    }
  }
}

.pastor-links {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.pastor-btn {
  display: inline-block;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  text-decoration: none;
  background: var(--color-primary);
  color: white;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-accent);
    color: var(--color-primary);
    transform: translateY(-2px);
  }

  &.outline {
    background: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);

    &:hover {
      background: var(--color-primary);
      color: white;
    }
  }
}

.city-section {
  img {
    width: 100%;
  }
}

@media (max-width: 992px) {
  .pastor-block,
  .pastor-block.reverse {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .pastor-block.reverse .pastor-img { order: 0; }
  .pastor-block.reverse .pastor-info { order: 0; }

  .img-frame {
    max-width: 320px;
    margin: 0 auto;
  }

  .img-accent { display: none; }
}
</style>
