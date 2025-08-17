<template>
  <ImageSectionVue title="文章"
    background-image='url(https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3)' />

  <!-- 手機左右留白加大 -->
  <div class="container blog-wrap py-5">
    <!-- 麵包屑：只在內容模式顯示 -->
    <nav v-if="view === 'detail' && activePost" aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="javascript:void(0)" @click="backToList">文章清單</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ activePost.title }}
        </li>
      </ol>
    </nav>

    <div class="row">
      <main class="col-12">
        <!-- 列表視圖：3 / 2 / 1 欄 RWD -->
        <section v-if="view === 'list'">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            <article v-for="(p, i) in posts" :key="i" class="col">
              <div class="card h-100 card-hover" @click="openPost(p.slug)" style="cursor: pointer;">
                <img :src="p.cover" class="card-img-top object-cover" :alt="p.title" />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title one-line mb-2">{{ p.title }}</h5>
                  <p class="card-text text-muted two-lines mb-2">{{ formatDate(p.published_at) }}</p>
                  <div class="mt-auto">
                    <span v-for="(t, idx) in p.tags" :key="idx" class="badge text-bg-light me-1">{{ t }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- 內容視圖：列表整段隱藏，僅顯示文章 -->
        <section v-else ref="detailRef">
          <article v-if="activePost">
            <img v-if="activePost.cover" :src="activePost.cover" class="mb-3 w-100 rounded-3 object-cover"
              :alt="activePost.title" />
            <div class="text-muted mb-2">{{ formatDate(activePost.published_at) }}</div>

            <!-- 整篇段落間距 / 首行縮排 -->
            <div :class="proseClasses" :style="proseStyle">
              <!-- 單一 v-for 渲染所有 blocks；p(md) 要先判斷 -->
              <template v-for="(b, i) in activePost.blocks" :key="i">
                <!-- 段落：Markdown 行內格式（**粗體**、*斜體*、`code`、[連結](url)） -->
                <p v-if="b.type === 'p' && b.format === 'md'" v-html="renderInlineMD(b)" v-bind="pBind(b)"></p>

                <!-- 段落：純文字（非 md） -->
                <p v-else-if="b.type === 'p'" v-bind="pBind(b)">{{ b.text }}</p>

                <!-- 標題/分隔線/圖片等基本型 -->
                <component v-else-if="['h1', 'h2', 'h3', 'hr', 'img'].includes(b.type)" :is="simpleTag(b)"
                  v-bind="simpleBind(b)">
                  {{ b.text }}
                </component>

                <!-- 引用 -->
                <blockquote v-else-if="b.type === 'quote'" class="quote">
                  <p class="mb-1">{{ b.text }}</p>
                  <footer v-if="b.cite" class="text-muted">— {{ b.cite }}</footer>
                </blockquote>

                <!-- 列表 -->
                <ul v-else-if="b.type === 'list' && b.style === 'ul'">
                  <li v-for="(it, idx) in b.items" :key="idx">{{ it }}</li>
                </ul>
                <ol v-else-if="b.type === 'list' && b.style === 'ol'">
                  <li v-for="(it, idx) in b.items" :key="idx">{{ it }}</li>
                </ol>

                <!-- 任務清單 -->
                <div v-else-if="b.type === 'task_list'" class="task-list">
                  <div v-for="(it, idx) in b.items" :key="idx" class="form-check">
                    <input class="form-check-input" type="checkbox" :checked="it.checked" disabled />
                    <label class="form-check-label">{{ it.text }}</label>
                  </div>
                </div>

                <!-- 程式碼區塊 -->
                <pre v-else-if="b.type === 'code'"
                  class="code-block"><code :data-lang="b.lang">{{ b.code }}</code></pre>

                <!-- 表格 -->
                <div v-else-if="b.type === 'table'" class="table-responsive">
                  <table class="table table-sm align-middle">
                    <thead>
                      <tr>
                        <th v-for="(h, hidx) in b.header" :key="hidx">{{ h }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, ridx) in b.rows" :key="ridx">
                        <td v-for="(cell, cidx) in row" :key="cidx">{{ cell }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Callout -->
                <div v-else-if="b.type === 'callout'" :class="['callout', `callout-${b.variant || 'note'}`]">
                  <strong v-if="b.title">{{ b.title }}</strong>
                  <div>{{ b.text }}</div>
                </div>

                <!-- 影片（YouTube） -->
                <div v-else-if="b.type === 'video'" class="ratio ratio-16x9 my-3">
                  <iframe :src="youtubeEmbed(b)" title="YouTube video" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                </div>
              </template>
            </div>

            <!-- 醒目返回：桌機常規 + 手機浮動 -->
            <!-- <div class="mt-4">
              <button class="btn btn-warning btn-lg back-btn d-none d-lg-inline-flex" @click="backToList">
                <span class="arrow" aria-hidden="true">←</span>
                返回上一頁
              </button>
              <button class="btn btn-warning btn-lg back-fab d-lg-none" @click="backToList" aria-label="返回上一頁">
                ← 返回上一頁
              </button>
            </div> -->
          </article>

          <div v-else class="text-muted">
            找不到這篇文章。
            <button class="btn btn-link p-0 ms-1" @click="backToList">回列表</button>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageSectionVue from "@/components/ImageSection.vue";
import blogData from "@/assets/data/blogList.json";

const route = useRoute();
const router = useRouter();

/** 文章清單（新到舊） */
const posts = ref((blogData.posts ?? []).slice().sort(
  (a, b) => new Date(b.published_at) - new Date(a.published_at)
));

/** 目前 slug 從路由參數取得；有 slug => detail，沒有 => list */
const slug = computed(() => (route.params.slug ? String(route.params.slug) : ""));
const view = computed(() => (slug.value ? "detail" : "list"));

/** 由 slug 找文章 */
const activePost = computed(() => posts.value.find(p => p.slug === slug.value));
const hasSlug = (s) => !!posts.value.find(p => p.slug === s);

/** 內容區 DOM，用於自動捲動 */
const detailRef = ref(null);

/** 點卡片：推到 #/blog/:slug（同頁），並捲到內容區 */
const openPost = async (s) => {
  if (!hasSlug(s)) return;
  await router.push({ name: "blog", params: { slug: s } });
  await nextTick();
  detailRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/** 返回列表：回到 #/blog（同頁），由 view 自動回到 list */
const backToList = () => {
  router.push({ name: "blog" });
};

/** 監看 slug：每次切到文章就捲到內容區（處理直接貼網址進來） */
watch(slug, async (s) => {
  if (s && hasSlug(s)) {
    await nextTick();
    detailRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

/** ===== 段落排版：整篇 + 單段控制 ===== */
const proseClasses = computed(() => {
  const o = activePost.value?.options || {};
  return [
    "prose",
    o.indent ? "indent-cjk" : null,
    o.tight ? "p-tight" : null,
    o.loose ? "p-loose" : null
  ].filter(Boolean);
});
const proseStyle = computed(() => {
  const o = activePost.value?.options || {};
  const style = {};
  if (o.p_gap) style["--p-gap"] = o.p_gap;    // 段落間距
  if (o.p_indent) style["--p-indent"] = o.p_indent; // 首行縮排量
  if (o.p_weight) style["--p-weight"] = o.p_weight; // 段落字重（400/500/600/700）
  return style;
});

/** ===== 行內 Markdown（**粗體**、*斜體*、`code`、[連結](url)） ===== */
const escapeHtml = (str = "") =>
  str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const renderInlineMD = (b) => {
  // 先跳脫，再做替換（輕量安全）
  let s = escapeHtml(b.text || "");

  // 連結 [text](http...) （只接受 http/https）
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // 行內 code
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");

  // 粗體 **...**
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // 斜體 *...*  （避免與粗體衝突，放在粗體之後）
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return s;
};

/** ===== 綁定（段落/基本型） ===== */
const pBind = (b) => {
  const classes = [];
  if (b.indent === true) classes.push("p-indent");
  if (b.indent === false) classes.push("p-noindent");

  const style = {};
  if (b.mb) style["margin-bottom"] = b.mb;             // 單段距離
  if (b.weight) style["font-weight"] = String(b.weight); // 單段字重
  else if (b.bold) style["font-weight"] = "700";            // 或直接 bold

  return { class: classes, style };
};

const simpleTag = (b) => (b.type === "img" ? "img" : b.type);
const simpleBind = (b) => {
  if (b.type === "img") {
    return { src: b.src, alt: b.alt || "", class: "my-3 w-100 rounded-3 object-cover" };
  }
  return {};
};

/** YouTube 內嵌網址 */
const youtubeEmbed = (b) => {
  if (b.provider !== "youtube" || !b.id) return "";
  return `https://www.youtube.com/embed/${b.id}`;
};

/** 日期格式 */
const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString();
};
</script>

<style lang="scss" scoped>
/* 卡片 */
.card-hover {
  transition: transform .08s ease, box-shadow .08s ease;
}

.card-hover:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, .06);
}

.object-cover {
  object-fit: cover;
  max-height: 500px;
}

/* 文字省略 */
.one-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.two-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ===== 段落排版（整篇控制） ===== */
.prose {
  --p-gap: 1rem; // p 與下一個元素距離（預設）
  --p-indent: 0; // 首行縮排（0=不縮；例 2em=兩個全形字）
  --p-weight: 400; // 段落預設字重
}

.prose p {
  margin: 0 0 var(--p-gap);
  text-indent: var(--p-indent);
  line-height: 1.9;
  font-weight: var(--p-weight);
}

/* 整篇中文首行縮排（可被 --p-indent 覆寫） */
.prose.indent-cjk {
  --p-indent: 2em;
}

/* 快速鬆/緊配置（也能用 options.p_gap 精準調整） */
.prose.p-tight {
  --p-gap: .5rem;
}

.prose.p-loose {
  --p-gap: 1.5rem;
}

/* 單段落覆寫 */
.prose .p-indent {
  text-indent: 2em;
}

.prose .p-noindent {
  text-indent: 0 !important;
}

/* 行內樣式微調 */
.prose strong {
  font-weight: 700;
}

.prose em {
  font-style: italic;
}

.prose code {
  background: #0f172a10;
  padding: .1rem .35rem;
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

/* 標題/其他 */
.prose h1 {
  font-size: 1.8rem;
  margin: .5rem 0 1rem;
  font-weight: 800;
}

.prose h2 {
  font-size: 1.3rem;
  margin: 1.25rem 0 .5rem;
  font-weight: 700;
}

.prose h3 {
  font-size: 1.1rem;
  margin: 1rem 0 .5rem;
  font-weight: 700;
}

.prose img {
  margin: .75rem 0;
  border-radius: 12px;
}

.quote {
  border-left: 4px solid #e89b02;
  padding: .5rem 1rem;
  background: #fff8e7;
  border-radius: 8px;
}

/* 任務清單 */
.task-list .form-check {
  margin-bottom: .25rem;
}

/* 程式碼區塊 */
.code-block {
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 12px;
  padding: 12px 14px;
  overflow: auto;
}

/* 表格 */
.table-responsive {
  margin: 1rem 0;
}

.table th {
  font-weight: 700;
}

/* Callout */
.callout {
  border-radius: 12px;
  padding: 12px 14px;
  margin: .75rem 0;
  border-left: 6px solid;
}

.callout-note {
  background: #f8fafc;
  border-color: #94a3b8;
}

.callout-info {
  background: #eef6ff;
  border-color: #60a5fa;
}

.callout-success {
  background: #ecfdf5;
  border-color: #34d399;
}

.callout-warning {
  background: #fffbeb;
  border-color: #f59e0b;
}

.callout-danger {
  background: #fef2f2;
  border-color: #f87171;
}

/* 麵包屑符號 */
.breadcrumb {
  --bs-breadcrumb-divider: '>';
}

/* 返回上一頁 按鈕 */
.back-btn {
  border-radius: 9999px;
  padding: 10px 20px;
  font-weight: 700;
  box-shadow: 0 8px 22px rgba(0, 0, 0, .12);
  gap: .5rem;
}

.back-btn .arrow {
  font-size: 1.1em;
  line-height: 1;
}

.back-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, .16);
}

/* 手機浮動按鈕（固定在底部中間） */
.back-fab {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 1050;
  border-radius: 9999px;
  padding: 12px 22px;
  font-weight: 800;
  box-shadow: 0 12px 30px rgba(0, 0, 0, .22);
}

/* 手機：左右留白更大 + 預留浮動按鈕空間 */
@media (max-width: 575.98px) {
  .blog-wrap {
    padding-inline: clamp(1rem, 6vw, 1.5rem);
  }

  .prose {
    padding-bottom: 72px;
  }

  .card .card-body {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
