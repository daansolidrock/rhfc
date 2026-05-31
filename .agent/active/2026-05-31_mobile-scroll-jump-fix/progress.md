# Progress Log

## [2026-05-31 00:00] Project initialized
- task_plan.md 已建立
- 等待使用者確認 plan

## [2026-05-31 00:01] Phase 1 完成
- 用 ScrollTrigger.matchMedia 包住四組 parallax scrub 動畫，只在 min-width: 769px 執行
- Feature blocks 進場動畫保留（一次性 toggleActions，不影響捲動）
- 修改檔案：src/views/HomeView.vue

## [2026-05-31 00:02] Phase 2 完成
- 合併前兩個 Swiper slide（d-md-none / d-none d-md-block）為一個 slide，用 <picture> + <source> 做 RWD 圖片切換
- 移除 autoplayOptions 中無效的 loop: true 屬性
- 修改檔案：src/views/HomeView.vue

## [2026-05-31 00:03] Phase 3 完成
- hero 高度從 100vh 改為 100dvh，加 @supports fallback
- 修改檔案：src/views/HomeView.vue
