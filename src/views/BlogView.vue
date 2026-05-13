<template>
  <ImageSection title="文章專區"
    background-image="url(https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3)" />

  <div class="container blog-wrap py-5">
    <!-- Breadcrumb: detail mode only -->
    <nav v-if="view === 'detail' && activePost" aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="javascript:void(0)" @click="backToList">文章清單</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ activePost.title }}</li>
      </ol>
    </nav>

    <!-- LIST VIEW: Magazine layout -->
    <section v-if="view === 'list'">
      <div class="blog-grid">
        <!-- Featured (first post) -->
        <article v-if="posts[0]" class="blog-featured" @click="openPost(posts[0].slug)" role="button" tabindex="0"
          @keydown.enter="openPost(posts[0].slug)">
          <img :src="posts[0].cover" :alt="posts[0].title" />
          <div class="blog-featured-overlay">
            <span v-for="t in posts[0].tags" :key="t" class="blog-tag">{{ t }}</span>
            <h3>{{ posts[0].title }}</h3>
            <p class="blog-excerpt">{{ posts[0].excerpt }}</p>
            <span class="blog-date">{{ formatDate(posts[0].published_at) }}</span>
          </div>
        </article>

        <!-- Other posts -->
        <article v-for="p in posts.slice(1)" :key="p.slug" class="blog-card"
          @click="openPost(p.slug)" role="button" tabindex="0" @keydown.enter="openPost(p.slug)">
          <div class="blog-card-img">
            <img :src="p.cover" :alt="p.title" />
          </div>
          <div class="blog-card-body">
            <span v-for="t in p.tags" :key="t" class="blog-tag-text">{{ t }}</span>
            <h4>{{ p.title }}</h4>
            <p class="blog-excerpt">{{ p.excerpt }}</p>
            <span class="blog-date">{{ formatDate(p.published_at) }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- DETAIL VIEW -->
    <section v-else ref="detailRef">
      <article v-if="activePost" class="article">
        <img v-if="activePost.cover" :src="activePost.cover" :alt="activePost.title" class="article-cover" />

        <div class="article-layout">
          <!-- TOC sidebar -->
          <aside v-if="tocItems.length" class="article-toc" aria-label="目錄">
            <h6>目錄</h6>
            <ul>
              <li v-for="(item, i) in tocItems" :key="i">
                <a :href="'#' + item.id" :class="{ active: activeTocIdx === i }">{{ item.text }}</a>
              </li>
            </ul>
          </aside>

          <!-- Article body -->
          <div class="article-main">
            <div class="article-meta">
              <span v-for="t in activePost.tags" :key="t" class="tag">{{ t }}</span>
              <span>{{ formatDate(activePost.published_at) }}</span>
            </div>
            <h1 class="article-title">{{ activePost.title }}</h1>
            <div class="article-body prose" v-html="renderedContent"></div>
          </div>
        </div>
      </article>

      <div v-else class="text-muted">
        找不到這篇文章。
        <button class="btn btn-link p-0 ms-1" @click="backToList">回列表</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import ImageSection from '@/components/ImageSection.vue'
import blogData from '@/assets/data/blogList.json'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

// Make links open in new tab
const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx].attrSet('target', '_blank')
  tokens[idx].attrSet('rel', 'noopener noreferrer')
  return defaultRender(tokens, idx, options, env, self)
}

// Add id to h2 headings for TOC
md.renderer.rules.heading_open = function (tokens, idx) {
  const tag = tokens[idx].tag
  if (tag === 'h2') {
    const text = tokens[idx + 1]?.content || ''
    const id = 'h-' + text.replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fff-]/g, '')
    return `<${tag} id="${id}">`
  }
  return `<${tag}>`
}

const route = useRoute()
const router = useRouter()

const posts = ref(
  (blogData.posts ?? []).slice().sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
)

const slug = computed(() => (route.params.slug ? String(route.params.slug) : ''))
const view = computed(() => (slug.value ? 'detail' : 'list'))
const activePost = computed(() => posts.value.find((p) => p.slug === slug.value))
const detailRef = ref(null)

const renderedContent = computed(() => {
  if (!activePost.value?.content) return ''
  return md.render(activePost.value.content)
})

// TOC: extract h2 headings from content
const tocItems = computed(() => {
  if (!activePost.value?.content) return []
  const matches = [...activePost.value.content.matchAll(/^## (.+)$/gm)]
  return matches.map((m) => ({
    text: m[1],
    id: 'h-' + m[1].replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fff-]/g, ''),
  }))
})

const activeTocIdx = ref(0)

let tocObserver = null
const setupTocObserver = () => {
  if (tocObserver) tocObserver.disconnect()
  if (!tocItems.value.length) return

  const headings = tocItems.value.map((item) => document.getElementById(item.id)).filter(Boolean)
  if (!headings.length) return

  tocObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const idx = tocItems.value.findIndex((item) => item.id === entry.target.id)
          if (idx !== -1) activeTocIdx.value = idx
        }
      }
    },
    { rootMargin: '-80px 0px -60% 0px' }
  )
  headings.forEach((h) => tocObserver.observe(h))
}

onUnmounted(() => {
  tocObserver?.disconnect()
})

const openPost = async (s) => {
  await router.push({ name: 'blog', params: { slug: s } })
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const backToList = () => {
  router.push({ name: 'blog' })
}

watch(slug, async (s) => {
  if (s && activePost.value) {
    await nextTick()
    await nextTick()
    setupTocObserver()
  }
})

onMounted(() => {
  if (slug.value && activePost.value) {
    nextTick(() => nextTick(() => setupTocObserver()))
  }
})

const formatDate = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style lang="scss" scoped>
/* ===== BLOG GRID (Magazine) ===== */
.blog-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
}

.blog-featured {
  grid-row: 1 / 3;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  min-height: 520px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }

  &:hover img { transform: scale(1.04); }
}

.blog-featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17,28,51,0.92) 0%, rgba(17,28,51,0.3) 45%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 44px;

  h3 {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .blog-excerpt {
    color: rgba(255,255,255,0.65);
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 12px;
  }

  .blog-date {
    color: var(--color-accent-light);
    font-size: 13px;
  }
}

.blog-tag {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-primary);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 4px 14px;
  margin-bottom: 16px;
  width: fit-content;
  text-transform: uppercase;
}

.blog-card {
  background: var(--color-bg-white);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.08);
  }
}

.blog-card-img {
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
}

.blog-card:hover .blog-card-img img { transform: scale(1.06); }

.blog-card-body {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .blog-excerpt {
    font-size: 14px;
    color: var(--color-text-muted);
    line-height: 1.6;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-date {
    font-size: 13px;
    color: var(--color-text-muted);
    margin-top: 14px;
  }
}

.blog-tag-text {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--color-accent);
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .blog-grid { grid-template-columns: 1fr; }
  .blog-featured { min-height: 380px; grid-row: auto; }
}

/* ===== ARTICLE ===== */
.article-cover {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 40px;
}

.article-layout {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 48px;
  align-items: start;
}

.article-toc {
  position: sticky;
  top: 90px;
  padding-top: 8px;

  h6 {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--color-text-muted);
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  ul { list-style: none; padding: 0; margin: 0; }

  li { margin-bottom: 6px; }

  a {
    font-size: 13px;
    color: var(--color-text-muted);
    border-left: 2px solid transparent;
    padding-left: 12px;
    display: block;
    transition: all 0.2s;
    line-height: 1.5;
    text-decoration: none;

    &:hover,
    &.active {
      color: var(--color-primary);
      border-left-color: var(--color-accent);
    }
  }
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--color-text-muted);

  .tag {
    background: var(--color-accent-light);
    background: rgba(201,169,78,0.08);
    color: var(--color-accent);
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 1px;
    padding: 4px 12px;
    border-radius: 4px;
  }
}

.article-title {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 36px;
  line-height: 1.5;
}

.article-main {
  max-width: 720px;
}

/* ===== PROSE (markdown rendered) ===== */
.prose {
  :deep(h2) {
    font-family: var(--font-serif);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--color-primary);
    margin: 40px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-border);
  }

  :deep(h3) {
    font-family: var(--font-serif);
    font-size: 1.15rem;
    font-weight: 700;
    margin: 28px 0 12px;
  }

  :deep(p) {
    font-size: 16px;
    line-height: 2;
    margin-bottom: 20px;
    letter-spacing: 0.5px;
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 32px 0;
  }

  :deep(blockquote) {
    border-left: 4px solid var(--color-accent);
    background: rgba(201,169,78,0.06);
    padding: 20px 24px;
    margin: 28px 0;
    border-radius: 0 8px 8px 0;
    font-family: var(--font-serif);
    font-size: 15px;
    line-height: 1.9;
    color: var(--color-primary);

    p { margin-bottom: 8px; }
    p:last-child { margin-bottom: 0; }
  }

  :deep(ol), :deep(ul) {
    padding-left: 24px;
    margin-bottom: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.8;
    }
  }

  :deep(a) {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover { color: var(--color-primary); }
  }

  :deep(strong) { font-weight: 700; }
  :deep(em) { font-style: italic; }

  :deep(code) {
    background: rgba(27,42,74,0.06);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  :deep(pre) {
    background: var(--color-primary);
    color: #e2e8f0;
    border-radius: 8px;
    padding: 16px 20px;
    overflow-x: auto;
    margin: 20px 0;

    code {
      background: none;
      padding: 0;
      font-size: 14px;
    }
  }

  :deep(img) {
    border-radius: 8px;
    margin: 20px 0;
  }
}

/* ===== Breadcrumb ===== */
.breadcrumb {
  --bs-breadcrumb-divider: '>';
  font-size: 14px;

  a {
    color: var(--color-text-muted);
    text-decoration: none;

    &:hover { color: var(--color-accent); }
  }
}

@media (max-width: 900px) {
  .article-layout { grid-template-columns: 1fr; }
  .article-toc { display: none; }
}

@media (max-width: 575.98px) {
  .blog-wrap {
    padding-inline: clamp(1rem, 6vw, 1.5rem);
  }
}
</style>
