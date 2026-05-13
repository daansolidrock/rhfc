<template>
  <ImageSection title="我們相信什麼"
    background-image="url(https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&dpr=2)" />

  <section class="belief-section">
    <div class="container">
      <header class="belief-header" data-aos="fade-up">
        <h2>信 仰 宣 言</h2>
        <div class="gold-divider"></div>
        <p>我們的信仰沿襲基督教神學家們的信仰宣言，也是教會信仰生活的基礎指引。</p>
      </header>

      <div class="sola-list">
        <article
          v-for="(sola, i) in solas"
          :key="sola.latin"
          class="sola-item"
          data-aos="fade-up"
          :data-aos-delay="i * 80"
        >
          <div class="sola-number" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="sola-content">
            <div class="sola-latin">{{ sola.latin }}</div>
            <h3 class="sola-title">{{ sola.title }}</h3>
            <p class="sola-desc">{{ sola.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import ImageSection from '@/components/ImageSection.vue'

const solas = [
  {
    latin: 'Sola Scriptura',
    title: '唯獨聖經',
    desc: '聖經是上帝全然無誤的默示，是教會唯一的權威並受其教導。',
  },
  {
    latin: 'Sola Fide',
    title: '唯獨信心',
    desc: '救恩唯獨是藉著上帝所賞賜的信心，不是憑著人的能力或行為。',
  },
  {
    latin: 'Sola Gratia',
    title: '唯獨恩典',
    desc: '神所賜給教會的救恩是白白藉著基督賜給不配蒙恩的罪人，獲得永恆的生命。',
  },
  {
    latin: 'Solus Christus',
    title: '唯獨基督',
    desc: '上帝所給人赦罪得永生的救恩唯獨透過基督作為上帝與人之間的中保，沒有其他人、事、物可代替。',
  },
  {
    latin: 'Soli Deo Gloria',
    title: '唯獨上帝的榮耀',
    desc: '上帝給人的救恩是藉著自己的意志和行為力完成，因此也只有祂自己配得榮耀與頌讚。',
  },
]
</script>

<style lang="scss" scoped>
.belief-section {
  padding: 100px 0;
  background: var(--color-bg-white);
}

.belief-header {
  text-align: center;
  margin-bottom: 80px;

  h2 {
    font-family: var(--font-serif);
    font-size: 2.2rem;
    font-weight: 900;
    color: var(--color-primary);
    letter-spacing: 8px;
    margin-bottom: 16px;
  }

  p {
    color: var(--color-text-muted);
    font-size: 16px;
    max-width: 500px;
    margin: 24px auto 0;
    line-height: 1.8;
  }
}

.gold-divider {
  width: 60px;
  height: 2px;
  background: var(--color-accent);
  margin: 0 auto;
}

.sola-list {
  max-width: 860px;
  margin: 0 auto;
}

.sola-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 32px;
  align-items: start;
  padding: 40px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
}

.sola-number {
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-accent);
  line-height: 1;
  opacity: 0.35;
}

.sola-latin {
  font-family: var(--font-serif);
  font-size: 12px;
  letter-spacing: 5px;
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.sola-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.sola-desc {
  font-size: 15px;
  line-height: 2;
  color: var(--color-text);
}

@media (max-width: 600px) {
  .sola-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .sola-number {
    font-size: 2rem;
  }
}
</style>
