<template>
  <ImageSection title="聚會資訊"
    background-image="url(https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1932)" />

  <section class="service-section">
    <div class="container">
      <header class="service-header" data-aos="fade-up">
        <h2>聚會時間</h2>
        <div class="gold-divider"></div>
      </header>

      <div class="service-cards">
        <article v-for="s in services" :key="s.title" class="service-card" data-aos="fade-up">
          <div class="service-icon" aria-hidden="true">
            <i :class="s.icon"></i>
          </div>
          <h4>{{ s.title }}</h4>
          <p>{{ s.desc }}</p>
          <div class="service-time">{{ s.time }}</div>
        </article>
      </div>

      <div class="location-block" data-aos="fade-up">
        <div class="location-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.5354511847054!2d120.66381001105044!3d24.15294727311292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d762cb04e85%3A0xd0a48fdb7d9f08ea!2zNDAz6Ie65Lit5biC6KW_5Y2A5rCR6b6N6YeM6Ie654Gj5aSn6YGT5LqM5q61Mjg16Jmf5a-w5a6H5a-m5qWt5aSn5buI!5e0!3m2!1szh-TW!2stw!4v1778682240397!5m2!1szh-TW!2stw"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="磐石之心教會地圖"
          ></iframe>
        </div>
        <div class="location-info">
          <h4>如何前來</h4>
          <ul>
            <li>
              <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
              <span>403台中市西區臺灣大道二段285號22樓</span>
            </li>
            <li>
              <i class="fa-solid fa-clock" aria-hidden="true"></i>
              <span>每週日早上 10:30 主日崇拜</span>
            </li>
            <li>
              <i class="fa-solid fa-phone" aria-hidden="true"></i>
              <span>0954-030-032</span>
            </li>
            <li>
              <i class="fa-solid fa-envelope" aria-hidden="true"></i>
              <span>daansolidrock@gmail.com</span>
            </li>
          </ul>

          <div class="social-links">
            <a href="https://www.facebook.com/daansolidrock/?locale=zh_TW" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.youtube.com/@user-vd1mj4li5t" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i class="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com/rockhardfaithchurch_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ImageSection from '@/components/ImageSection.vue'

const services = [
  {
    icon: 'fa-solid fa-church',
    title: '主日崇拜',
    desc: '一同敬拜神、聆聽神的話語',
    time: '每週日 10:30',
  },
  {
    icon: 'fa-solid fa-book-bible',
    title: '線上查經',
    desc: '以救贖歷史框架查考聖經',
    time: '每週日 19:30',
  },
  {
    icon: 'fa-solid fa-people-group',
    title: '小組團契',
    desc: '彼此關懷、分享生命',
    time: '每週五 19:30',
  },
]
</script>

<style lang="scss" scoped>
.service-section {
  padding: 100px 0;
}

.service-header {
  text-align: center;
  margin-bottom: 60px;

  h2 {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 16px;
  }
}

.gold-divider {
  width: 60px;
  height: 2px;
  background: var(--color-accent);
  margin: 0 auto;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 960px;
  margin: 0 auto 80px;
}

.service-card {
  text-align: center;
  padding: 48px 32px;
  background: var(--color-bg-white);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--color-accent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.06);

    &::before { transform: scaleX(1); }
  }

  h4 {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: var(--color-text-muted);
    line-height: 1.7;
    margin-bottom: 12px;
  }
}

.service-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201,169,78,0.08);
  border-radius: 50%;
  color: var(--color-accent);
  font-size: 20px;
}

.service-time {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* Location */
.location-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-bg-white);
}

.location-map {
  min-height: 350px;
  background: var(--color-border);

  iframe {
    width: 100%;
    height: 100%;
  }
}

.location-info {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h4 {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 24px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
  }

  li {
    display: flex;
    align-items: start;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 15px;
    line-height: 1.6;

    i {
      color: var(--color-accent);
      margin-top: 4px;
      min-width: 18px;
      text-align: center;
    }
  }
}

.social-links {
  display: flex;
  gap: 10px;

  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-primary);
    }
  }
}

@media (max-width: 768px) {
  .service-cards {
    grid-template-columns: 1fr;
  }

  .location-block {
    grid-template-columns: 1fr;
  }

  .location-map {
    min-height: 250px;
  }
}
</style>
