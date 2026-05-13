<template>
  <ImageSection title="影片專區"
    background-image="url(https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3)" />

  <div class="container video-wrap py-5">
    <div class="video-layout">
      <!-- Sidebar -->
      <aside class="video-sidebar" aria-label="影片分類">
        <h6 class="sidebar-heading">分類</h6>
        <nav>
          <div v-for="type in categories" :key="type" class="category-group">
            <template v-if="isTypeGrouped(type)">
              <button
                class="category-btn has-sub"
                :class="{ active: selectedType === type }"
                @click="toggleCategory(type)"
                :aria-expanded="expandedType === type"
              >
                {{ type }}
                <span class="expand-icon" :class="{ open: expandedType === type }">&#9662;</span>
              </button>
              <div v-show="expandedType === type" class="subcategory-list">
                <button
                  v-for="sub in getSubcategories(type)"
                  :key="sub"
                  class="subcategory-btn"
                  :class="{ active: selectedType === type && selectedSub === sub }"
                  @click="selectGrouped(type, sub)"
                >
                  {{ sub }}
                </button>
              </div>
            </template>
            <template v-else>
              <button
                class="category-btn"
                :class="{ active: selectedType === type && !selectedSub }"
                @click="selectFlatType(type)"
              >
                {{ type }}
              </button>
            </template>
          </div>
        </nav>
      </aside>

      <!-- Video list -->
      <main class="video-main">
        <div class="video-list-header">
          <h3>
            {{ selectedType }}
            <span v-if="isGrouped && selectedSub" class="text-muted"> / {{ selectedSub }}</span>
          </h3>
          <span class="video-count">{{ currentList.length }} 部影片</span>
        </div>

        <div v-if="currentList.length" class="video-list">
          <article
            v-for="(v, i) in currentList"
            :key="`${v.url}-${i}`"
            class="video-item"
            @click="openVideo(v.url)"
            role="button"
            tabindex="0"
            @keydown.enter="openVideo(v.url)"
          >
            <div class="video-thumb">
              <img :src="thumbOf(v)" :alt="v.title" loading="lazy" />
              <div class="play-overlay" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="40" height="40"><path d="M8 5v14l11-7z" fill="white"/></svg>
              </div>
            </div>
            <div class="video-info">
              <h5>{{ v.title }}</h5>
              <p v-if="v.description">{{ truncate(v.description) }}</p>
              <span class="video-date">{{ formatDate(v.published_at) }}</span>
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          <p>這個分類目前沒有影片。</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ImageSection from '@/components/ImageSection.vue'
import videoData from '@/assets/data/videoList.json'

const videos = videoData?.videos ?? {}
const categories = ref(Object.keys(videos))

const isTypeGrouped = (type) => {
  const node = videos[type]
  return !!node && !Array.isArray(node) && typeof node === 'object'
}
const getSubcategories = (type) => (isTypeGrouped(type) ? Object.keys(videos[type]) : [])

const defaultType = categories.value[0] ?? ''
const selectedType = ref(defaultType)
const selectedSub = ref('')
const expandedType = ref(defaultType)

const isGrouped = computed(() => !!selectedType.value && isTypeGrouped(selectedType.value))

const currentList = computed(() => {
  const node = videos[selectedType.value]
  if (!node) return []
  if (Array.isArray(node)) return node
  const sub = selectedSub.value || Object.keys(node)[0]
  return node[sub] || []
})

watch(
  () => selectedType.value,
  (t) => {
    if (!t || !isTypeGrouped(t)) {
      selectedSub.value = ''
      return
    }
    const subs = getSubcategories(t)
    if (!subs.includes(selectedSub.value)) {
      selectedSub.value = subs[0] ?? ''
    }
  },
  { immediate: true }
)

const toggleCategory = (type) => {
  if (expandedType.value === type) {
    expandedType.value = ''
  } else {
    expandedType.value = type
    selectedType.value = type
  }
}

const selectFlatType = (type) => {
  selectedType.value = type
  selectedSub.value = ''
  expandedType.value = ''
}

const selectGrouped = (type, sub) => {
  selectedType.value = type
  selectedSub.value = sub
}

const ytThumbFromUrl = (url) => {
  const m = url?.match(/^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/)
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : ''
}
const thumbOf = (v) => v?.thumbnails || ytThumbFromUrl(v?.url) || ''

const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}

const openVideo = (url) => window.open(url, '_blank', 'noopener,noreferrer')

const truncate = (text, n = 90) => {
  const s = String(text ?? '').replace(/\n/g, ' ')
  return s.length > n ? s.slice(0, n).trimEnd() + '……' : s
}
</script>

<style lang="scss" scoped>
.video-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
}

/* ===== SIDEBAR ===== */
.sidebar-heading {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
  text-transform: uppercase;
}

.category-group {
  margin-bottom: 2px;
}

.category-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-muted);
  background: none;
  border: none;
  border-left: 3px solid transparent;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: rgba(201,169,78,0.06);
    color: var(--color-primary);
    border-left-color: var(--color-accent);
  }

  &.active {
    background: rgba(201,169,78,0.06);
    color: var(--color-primary);
    border-left-color: var(--color-accent);
    font-weight: 700;
  }
}

.expand-icon {
  font-size: 10px;
  transition: transform 0.2s;
  &.open { transform: rotate(180deg); }
}

.subcategory-list {
  padding-left: 12px;
}

.subcategory-btn {
  display: block;
  width: 100%;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  background: none;
  border: none;
  border-left: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover,
  &.active {
    color: var(--color-accent);
    border-left-color: var(--color-accent);
    font-weight: 700;
  }
}

/* ===== VIDEO LIST ===== */
.video-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);

  h3 {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-primary);
    margin: 0;

    .text-muted {
      color: var(--color-text-muted);
      font-weight: 400;
    }
  }

  .video-count {
    font-size: 13px;
    color: var(--color-text-muted);
  }
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.video-item {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  padding: 16px;
  background: var(--color-bg-white);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.06);
    border-color: var(--color-border);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
}

.video-thumb {
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 16/9;
  background: var(--color-border);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(27,42,74,0.35);
  opacity: 0;
  transition: opacity 0.3s;

  svg {
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
  }
}

.video-item:hover .play-overlay {
  opacity: 1;
}

.video-info {
  h5 {
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 8px;
    line-height: 1.5;
  }

  p {
    font-size: 13px;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 8px;
  }

  .video-date {
    font-size: 12px;
    color: var(--color-text-muted);
  }
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .video-layout {
    grid-template-columns: 1fr;
  }

  .video-sidebar {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .video-item {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }

  .video-thumb {
    aspect-ratio: 16/9;
  }
}
</style>
