# Progress Log

## [2026-05-13 22:00] Project initialized
- task_plan.md 已建立
- 等待使用者確認 plan

## [2026-05-13 22:05] Phase 1 開始
- 目標：設計基礎建設（CSS tokens、字型、移除 Element Plus、清死碼）

## [2026-05-13 22:30] Phase 1 完成
- index.html: lang 改 zh-TW、字型改 Noto Serif TC + Noto Sans TC、移除 Material Icons 和 Nunito/Roboto
- main.css: 建立完整 CSS design tokens（色彩、字型、間距、transition）
- _variables.scss: $primary 改 #1B2A4A（深藍）、accent 改 #C9A94E（古金）
- vite.config.js: 移除 Element Plus auto-import 設定
- App.vue: 清理 AOS 設定、移除 el-backtop 註解
- HomeView: 修 gaspel→gospel、清死碼/註解、mask 改居中、txt 加 text-shadow + serif 字型、subtip 改金色、h2 加 serif + primary 色
- AboutView: 修 gaspel→gospel、移除 stray import、清死碼/註解/未使用 CSS（balance-church、txt-wrap）
- BeliefView: 修 gaspel→gospel
- BlogView: 引用區塊邊線改金色、清死碼
- NavBar/RwdMenu/VideoView: #fc832c 全改 var(--color-accent)
- FooterSection: Copyright 改 2024
- 卸載 element-plus、unplugin-auto-import、unplugin-vue-components

## [2026-05-13 22:35] Phase 2 開始
- 目標：NavBar + Footer + ImageSection 重構

## [2026-05-13 22:50] Phase 2 完成
- NavBar: 語義化 ul>li、左側加 logo（svg）、active 改金色底線動畫、scroll 從 300→60px 觸發、加 onUnmounted 清理 listener
- RwdMenu: 改 offcanvas-end（右滑出）、加 logo、加聚會資訊 footer、語義化 ul、金色 active 左邊線
- FooterSection: 深藍底色（--color-footer-bg）、三欄佈局（品牌+社群/聚會資訊/聯絡）、社群按鈕改圓形 hover 金色、聚會時間醒目 highlight 區塊
- ImageSection: 改用 :style 綁定取代 CSS v-bind、overlay 改漸層深藍、加金色分隔線、標題加 serif + text-shadow
- VideoView: ImageSection 用法從 :style 改為 prop

## [2026-05-13 23:00] Mockup 完成
- 建立 mockup.html 含完整視覺 + GSAP ScrollTrigger 互動特效
- 使用者確認方向，信仰宣言不要水平滾動改回垂直

## [2026-05-13 23:10] Phase 3 開始
- 目標：首頁重設計（Hero parallax + 循環文字 + 三特色 data-driven + CTA）

## [2026-05-13 23:30] Phase 3 完成
- HomeView 完全重寫
- Hero: Swiper 輪播保留 + 深藍 overlay + 網格紋理 + parallax 三層 + 循環文字(GSAP timeline) + scroll 淡出 + CTA 按鈕填充動畫 + scroll 提示動畫
- Features: 改為 data-driven v-for（3 個特色）+ ScrollTrigger 左右滑入 + 金色底線展開
- 新增 CTA Bar: parallax 背景 + 聚會資訊
- 加 gsap.context() 正確清理 + onUnmounted revert
- 加 prefers-reduced-motion 支援
- 加 aria-live 和 aria-hidden 無障礙屬性
- 加 --color-accent-light CSS variable

## [2026-05-13 23:35] Phase 4 開始
- 目標：Blog 系統重構（MD-in-JSON + markdown-it + slug 修正 + 雜誌排版 + TOC）

## [2026-05-14 00:00] Phase 4 完成
- blogList.json: blocks→MD-in-JSON、slug 全改 kebab-case、加 excerpt、修重複段落、移除 meta/block_spec、假 code block 改 bold blockquote、修 title 前空白
- 安裝 markdown-it
- BlogView 完全重寫:
  - 列表頁: 雜誌排版（featured 大圖 + 右側小卡 grid）
  - 文章頁: markdown-it 渲染、左側 sticky TOC（IntersectionObserver 自動追蹤）、max-width 720px、金色引用區塊
  - 無障礙: role=button、tabindex、keyboard nav
  - 日期格式化改用 zh-TW locale
- NavBar logo 改用 LOGO.png（純圖標）、大小 42px/36px

## [2026-05-14 00:05] Phase 5 開始
- 目標：信仰宣言 + 關於我們 重設計

## [2026-05-14 00:15] Phase 5 完成
- BeliefView: 5 個唯獨改 data-driven v-for、加拉丁文標籤(Sola Scriptura 等)、編號(01-05)、金色分隔線、stagger AOS 動畫
- AboutView: 牧師區塊改 grid 佈局 + 金色邊框裝飾、timeline 列表改金色左邊線+圓點、按鈕從 onclick 改 router-link、加 pastor-role 標籤(PASTOR/SUPERVISOR)、city_lights 圖片簡化（移除重複 d-none/d-md-block）
- 兩個檔案都加 aria 屬性

## [2026-05-14 00:20] Phase 6 開始
- 目標：影片專區重構（JSON 結構 + UI 改善）

## [2026-05-14 00:30] Phase 6 完成
- VideoView 完全重寫: 移除 Bootstrap accordion 改自製 sidebar、金色 active 左邊線、分類展開/收合、play overlay hover 效果
- 影片卡片改白底圓角 + hover shadow + focus-visible 無障礙
- 日期改 zh-TW locale、description 換行改空白
- 影片數量顯示
- videoList.json 結構保持不變（已經夠好用）

## [2026-05-14 00:40] Phase 7 開始
- 目標：RWD 全面檢查 + 聚會資訊頁

## [2026-05-14 00:55] Phase 7 完成
- 新增 ServiceView.vue: 三張聚會卡片(主日/查經/團契) + Google Map + 聯絡資訊 + 社群連結
- 新增路由 /service
- NavBar + RwdMenu 加「聚會資訊」連結
- HomeView CTA 連結改指向 /service
- VideoView 手機版: 影片卡片改圖片上文字下(grid-template-columns: 1fr)
- main.css 加 :focus-visible 全域金色 outline + prefers-reduced-motion 全域支援

## [2026-05-14 01:00] 收尾修正
- 線上查經時間改為每週日 19:30
- Google Maps embed 改用正確的 iframe src

## [2026-05-14 01:05] Project finished
- 所有 phase 完成
- 歸檔到 .agent/done/
