# Task Plan: 網站全面重設計

## Goal

將磐石之心教會網站全面重設計，包括：配色改為深藍×金莊重風格、字型改用 Noto Serif/Sans TC、Blog 系統改用 Markdown-in-JSON、影片 JSON 結構重構、移除 Element Plus、所有頁面 UI 提升、新增聚會資訊頁。

## Phases

- [x] **Phase 1 — 設計基礎建設**
  - 建立 CSS design tokens（`--color-primary: #1B2A4A`、`--color-accent: #C9A94E`、`--color-bg: #F7F5F0` 等）
  - index.html 引入 Noto Serif TC + Noto Sans TC
  - 移除 Element Plus（package.json + vite.config.js + main.js）
  - 清理全站 typo（gaspel→gospel）、刪除註解掉的死碼
  - main.css 建立全域基礎樣式
  - Copyright 更新為 2024

- [x] **Phase 2 — NavBar + Footer + ImageSection**
  - NavBar：語義化 `<ul><li>`、左側加 logo、active 改金色底線、scroll 背景改暖白
  - RwdMenu：配色同步、加 logo
  - Footer：深藍底金色分隔線、聚會資訊醒目化
  - ImageSection：確保 background-size cover 一致、overlay 統一深色

- [x] **Phase 3 — 首頁重設計**
  - Hero 文字加 text-shadow + 半透明背景、位置改居中
  - 三特色區塊（Gospel/Balance/Bible）改成 data-driven v-for
  - 加聚會資訊 CTA 條
  - 動畫收斂（只保留 fade）

- [x] **Phase 4 — Blog 系統重構**
  - blogList.json 改為 Markdown-in-JSON 格式（content 取代 blocks）
  - 安裝 markdown-it、移除舊 block 渲染邏輯
  - slug 全部改 kebab-case、加 excerpt 欄位、修正重複段落
  - 列表頁：雜誌排版（featured + 小卡）
  - 文章頁：max-width 720px 居中、引用改金色風格、加目錄 TOC

- [x] **Phase 5 — 信仰宣言 + 關於我們**
  - BeliefView：5 個唯獨改 data-driven v-for、加 icon、交替排列
  - AboutView：統一牧師區塊版面、移除 stray import、清理重複 CSS

- [x] **Phase 6 — 影片專區**
  - videoList.json 結構重構（playlists 陣列格式）
  - VideoView 配合新結構、UI 改善
  - 加搜尋/篩選功能（可選）

- [x] **Phase 7 — RWD 全面檢查 + 聚會資訊頁**
  - 統一 breakpoint 行為
  - 手機導覽體驗優化
  - 新增聚會資訊頁面（路由 + 頁面）

## Out of Scope

- 後台管理系統（影片/Blog 管理）
- YouTube API 自動抓取
- i18n 國際化（未來可做）
- 使用者登入/會員系統
- SEO meta tags 優化（可獨立做）

## Status

所有 Phase 完成

## Errors Encountered

（無）
