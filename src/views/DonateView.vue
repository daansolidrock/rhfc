<template>
  <ImageSection title="奉獻"
    background-image="url(https://images.pexels.com/photos/35644053/pexels-photo-35644053.jpeg?auto=compress&cs=tinysrgb&w=1920)" />

  <section class="donate-section">
    <div class="container">
      <div class="verse" data-aos="fade-up">
        <p class="verse-text">
          萬軍之耶和華說：你們要將當納的十分之一全然送入倉庫，使我家有糧，以此試試我，是否為你們敞開天上的窗戶，傾福與你們，甚至無處可容。
        </p>
        <div class="gold-divider"></div>
        <p class="verse-ref">瑪拉基書 3:10</p>
      </div>

      <header class="donate-header" data-aos="fade-up">
        <h2>奉獻帳戶</h2>
        <div class="gold-divider"></div>
      </header>

      <div class="account-card" data-aos="fade-up">
        <div class="account-icon" aria-hidden="true">
          <i class="fa-solid fa-building-columns"></i>
        </div>
        <p class="account-bank">兆豐銀行 017 · 東台中分行 0712</p>
        <p class="account-number">{{ accountNumber }}</p>
        <p class="account-name">戶名：中華磐石之心城市更新協會</p>
        <button type="button" class="copy-btn" @click="copyAccount">
          <i :class="copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'" aria-hidden="true"></i>
          {{ copied ? '已複製' : '複製帳號' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ImageSection from '@/components/ImageSection.vue'

const accountNumber = '071-09-03286-2'
const copied = ref(false)

const copyAccount = async () => {
  try {
    await navigator.clipboard.writeText(accountNumber.replace(/-/g, ''))
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    copied.value = false
  }
}
</script>

<style lang="scss" scoped>
.donate-section {
  padding: 100px 0;
}

.gold-divider {
  width: 60px;
  height: 2px;
  background: var(--color-accent);
  margin: 0 auto;
}

.verse {
  max-width: 720px;
  margin: 0 auto 80px;
  text-align: center;
}

.verse-text {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  line-height: 2.1;
  color: var(--color-primary);
  margin-bottom: 28px;
}

.verse-ref {
  margin: 28px 0 0;
  font-size: 15px;
  letter-spacing: 3px;
  color: var(--color-text-muted);
}

.donate-header {
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

.account-card {
  max-width: 560px;
  margin: 0 auto;
  padding: 48px 40px;
  text-align: center;
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-top: 3px solid var(--color-accent);
  border-radius: 8px;

  p {
    margin: 0 0 12px;
  }
}

.account-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201, 169, 78, 0.08);
  border-radius: 50%;
  color: var(--color-accent);
  font-size: 20px;
}

.account-bank {
  font-size: 14px;
  color: var(--color-text-muted);
}

.account-number {
  font-family: var(--font-serif);
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--color-primary);
}

.account-name {
  font-size: 15px;
}

.copy-btn {
  margin-top: 12px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 22px;
  border: 1px solid var(--color-accent);
  border-radius: 999px;
  background: var(--color-bg-white);
  color: var(--color-primary);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-accent);
    color: var(--color-bg-white);
  }
}

@media (max-width: 768px) {
  .donate-section {
    padding: 64px 0;
  }

  .verse {
    margin-bottom: 56px;
  }

  .verse-text {
    font-size: 1.1rem;
  }

  .donate-header {
    margin-bottom: 36px;

    h2 {
      font-size: 1.6rem;
    }
  }

  .account-card {
    padding: 36px 20px;
  }

  .account-number {
    font-size: 1.7rem;
    letter-spacing: 2px;
  }

  .copy-btn {
    width: 100%;
    justify-content: center;
    min-height: 48px;
  }
}
</style>
