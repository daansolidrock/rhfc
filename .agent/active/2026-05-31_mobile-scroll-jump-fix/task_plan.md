# Task Plan

## Goal
修復手機上頁面會定時往上跳的問題，主因是 ScrollTrigger parallax + Swiper autoplay + 100vh 在手機瀏覽器的交互作用。

## Phases

- [x] Phase 1: 手機上停用 ScrollTrigger parallax 動畫（hero-bg, hero-grid, hero-content, cta-bar-bg）
- [x] Phase 2: 修正 Swiper slide RWD 做法，移除 Bootstrap display class，改用正確方式處理手機/桌面不同圖片
- [x] Phase 3: 修正 hero 100vh 問題，改用 dvh 或 CSS 變數避免手機網址列造成的跳動
- [ ] Phase 4: 手機實測驗證

## Out of Scope
- 重新設計首頁動畫效果
- 修改其他頁面的 AOS 動畫
- 效能優化（非捲動相關）

## Status
Phase 1-3 完成，等待手機實測 (Phase 4)

## Errors Encountered
（無）
