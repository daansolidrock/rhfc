<template>
  <!-- HERO -->
  <section class="hero" ref="heroRef">
    <div class="hero-bg" ref="heroBgRef">
      <swiper
        :slides-per-view="1"
        :autoplay="autoplayOptions"
        :modules="swiperModules"
        effect="fade"
        class="hero-swiper"
      >
        <swiper-slide>
          <picture>
            <source media="(min-width: 768px)" :srcset="heroDesktop" />
            <img :src="heroMobile" class="hero-img special" alt="磐石之心教會" />
          </picture>
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/home/intro02.jpg" class="hero-img" alt="磐石之心教會" />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/home/intro03.jpg" class="hero-img" alt="磐石之心教會" />
        </swiper-slide>
        <swiper-slide>
          <img src="@/assets/images/home/intro04.jpg" class="hero-img" alt="磐石之心教會" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="hero-overlay"></div>
    <div class="hero-grid" ref="heroGridRef"></div>

    <div class="hero-content" ref="heroContentRef">
      <div class="hero-line-deco"></div>
      <h1 class="hero-title">磐石之心</h1>
      <div class="hero-subtitle-wrap" aria-live="polite">
        <div v-for="(line, i) in heroLines" :key="i" class="hero-subtitle" :ref="el => lineRefs[i] = el">
          {{ line }}
        </div>
      </div>
      <router-link to="/about" class="hero-cta" role="button">
        <span>認識我們</span>
        <span aria-hidden="true">&rarr;</span>
      </router-link>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
      <span>SCROLL</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="features">
    <div class="container">
      <div
        v-for="(feat, i) in features"
        :key="feat.label"
        class="feature-block"
        :class="{ reverse: i % 2 === 0 }"
        :ref="el => featureRefs[i] = el"
      >
        <div class="feature-img">
          <img :src="feat.img" :alt="feat.title" />
        </div>
        <div class="feature-text">
          <div class="feature-label">{{ feat.label }}</div>
          <h2 class="feature-title">{{ feat.title }}</h2>
          <div class="feature-underline"></div>
          <p class="feature-desc">{{ feat.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA BAR -->
  <section class="cta-bar">
    <div class="cta-bar-bg" ref="ctaBgRef"></div>
    <div class="cta-bar-overlay"></div>
    <div class="cta-bar-content">
      <h3>歡迎來到磐石之心</h3>
      <p>每週日早上 10:30 &#183; 台中市西區臺灣大道二段285號22樓</p>
      <router-link to="/service" class="cta-btn" role="button">聚會資訊 &rarr;</router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import { EffectFade } from 'swiper/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import 'swiper/css'
import 'swiper/css/effect-fade'

import heroMobile from '@/assets/images/home/網頁圖片.jpg'
import heroDesktop from '@/assets/images/home/網頁圖片3.jpg'
import img01 from '@/assets/images/home/01.jpg'
import img02 from '@/assets/images/home/02.jpg'
import img03 from '@/assets/images/home/03.jpg'

gsap.registerPlugin(ScrollTrigger)

const autoplayOptions = {
  delay: 4000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
}
const swiperModules = [Autoplay, EffectFade]

const heroLines = ['歡迎回家', '以福音為中心的教會', '兼容平衡的教會', '認識十架的教會']

const features = [
  {
    label: 'GOSPEL',
    title: '以福音為中心的教會',
    desc: '福音就是基督為自己百姓做成的救恩，教會以此為中心不斷發現福音的恩典運用在生命上，離開以行為換取祝福的宗教模式。',
    img: img01,
  },
  {
    label: 'BALANCE',
    title: '兼容平衡的教會',
    desc: '崇拜、團契與使命是健康教會均衡發展的三要素，避免教會成為神學院或內聚的團體。',
    img: img02,
  },
  {
    label: 'BIBLE',
    title: '學習聖經的教會',
    desc: '聖經是上帝所啟示的生命之道，因此教會有責任教導信徒聖經真理，指出聖經前後一致的焦點是基督，以及祂如何因為愛所成就的事。',
    img: img03,
  },
]

const heroRef = ref(null)
const heroBgRef = ref(null)
const heroGridRef = ref(null)
const heroContentRef = ref(null)
const ctaBgRef = ref(null)
const lineRefs = ref([])
const featureRefs = ref([])

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    // Cycling subtitle
    const cycleTl = gsap.timeline({ repeat: -1, delay: 0.5 })
    lineRefs.value.forEach((line) => {
      if (!line) return
      cycleTl
        .fromTo(line, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' })
        .to(line, { y: -30, opacity: 0, duration: 0.8, ease: 'power2.in', delay: 1.8 })
    })

    // Parallax only on desktop (mobile browsers cause scroll jumps)
    ScrollTrigger.matchMedia({
      '(min-width: 769px)': () => {
        gsap.to(heroBgRef.value, {
          y: '25%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.value, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to(heroGridRef.value, {
          y: '18%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.value, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to(heroContentRef.value, {
          y: '-15%',
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.value, start: '55% top', end: 'bottom top', scrub: true },
        })

        if (ctaBgRef.value) {
          gsap.to(ctaBgRef.value, {
            y: '20%',
            ease: 'none',
            scrollTrigger: { trigger: '.cta-bar', start: 'top bottom', end: 'bottom top', scrub: true },
          })
        }
      },
    })

    // Feature blocks scroll-triggered (keep on all devices)
    featureRefs.value.forEach((block) => {
      if (!block) return
      const img = block.querySelector('.feature-img')
      const label = block.querySelector('.feature-label')
      const title = block.querySelector('.feature-title')
      const underline = block.querySelector('.feature-underline')
      const desc = block.querySelector('.feature-desc')
      const isReverse = block.classList.contains('reverse')

      const tl = gsap.timeline({
        scrollTrigger: { trigger: block, start: 'top 78%', toggleActions: 'play none none none' },
      })
      tl.from(img, { x: isReverse ? 60 : -60, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from(label, { x: isReverse ? -20 : 20, opacity: 0, duration: 0.5 }, '-=0.4')
        .from(title, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .to(underline, { width: '60px', duration: 0.5, ease: 'power2.out' }, '-=0.2')
        .from(desc, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
    })
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<style scoped lang="scss">
/* ===== HERO ===== */
.hero {
  position: relative;
  height: 100dvh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @supports not (height: 100dvh) {
    height: 100vh;
  }
}

.hero-bg {
  position: absolute;
  inset: -15%;
  will-change: transform;
}

.hero-swiper {
  width: 100%;
  height: 100%;
}

.hero-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-img.special {
  object-position: left top;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg,
    rgba(17, 28, 51, 0.85) 0%,
    rgba(27, 42, 74, 0.78) 40%,
    rgba(42, 63, 106, 0.7) 100%);
  z-index: 1;
}

.hero-grid {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.04;
  background-image:
    linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px);
  background-size: 80px 80px;
  will-change: transform;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(to top, var(--color-bg), transparent);
  z-index: 3;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 4;
  text-align: center;
  padding: 0 24px;
}

.hero-line-deco {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, var(--color-accent));
  margin: 0 auto 28px;
}

.hero-title {
  font-family: var(--font-serif);
  color: white;
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 900;
  letter-spacing: 14px;
  margin-bottom: 20px;
  text-shadow: 0 4px 40px rgba(0,0,0,0.4);
}

.hero-subtitle-wrap {
  height: 50px;
  overflow: hidden;
  position: relative;
  margin-bottom: 44px;
}

.hero-subtitle {
  position: absolute;
  width: 100%;
  color: var(--color-accent-light, #E2D5A0);
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 400;
  letter-spacing: 8px;
  opacity: 0;
  transform: translateY(40px);
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  color: white;
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 4px;
  padding: 16px 40px;
  border: 1px solid rgba(201,169,78,0.5);
  text-decoration: none;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
    z-index: -1;
  }

  &:hover {
    color: var(--color-primary);
    border-color: var(--color-accent);

    &::before {
      transform: scaleX(1);
    }
  }
}

.hero-scroll-hint {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  span {
    font-size: 10px;
    letter-spacing: 4px;
    color: rgba(255,255,255,0.3);
    font-weight: 600;
  }
}

.scroll-line {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, rgba(201,169,78,0.5), transparent);
  animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  50.1% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ===== FEATURES ===== */
.features {
  padding: 80px 0 40px;
}

.feature-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 120px;
}

.feature-block.reverse {
  direction: rtl;

  > * {
    direction: ltr;
  }
}

.feature-img {
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 4/3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }
}

.feature-text {
  padding: 20px 0;
}

.feature-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 5px;
  color: var(--color-accent);
  margin-bottom: 16px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: var(--color-accent);
  }
}

.feature-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.feature-underline {
  width: 0;
  height: 2px;
  background: var(--color-accent);
  margin-bottom: 24px;
  opacity: 0.5;
}

.feature-desc {
  font-size: 16px;
  line-height: 2.1;
  letter-spacing: 1px;
}

@media (max-width: 992px) {
  .feature-block {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .feature-block.reverse {
    direction: ltr;
  }
}

/* ===== CTA BAR ===== */
.cta-bar {
  position: relative;
  padding: 100px 0;
  text-align: center;
  overflow: hidden;
}

.cta-bar-bg {
  position: absolute;
  inset: -30%;
  background: url('@/assets/images/home/intro03.jpg') center/cover no-repeat;
  will-change: transform;
}

.cta-bar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(17, 28, 51, 0.88);
}

.cta-bar-content {
  position: relative;
  z-index: 1;

  h3 {
    color: white;
    font-family: var(--font-serif);
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: 6px;
  }

  p {
    color: #E2D5A0;
    font-size: 15px;
    margin-bottom: 36px;
    letter-spacing: 3px;
  }
}

.cta-btn {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-primary);
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  padding: 16px 44px;
  text-decoration: none;
  transition: all 0.4s ease;

  &:hover {
    background: white;
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(201,169,78,0.3);
  }
}

/* ===== Reduced motion ===== */
@media (prefers-reduced-motion: reduce) {
  .scroll-line { animation: none; }
}
</style>
