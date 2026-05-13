# 專案開發規則

本檔定義本專案的開發流程與 Claude 的行為規範。Claude 每次新 session 開頭必須讀取本檔並嚴格遵守。

---

## 🔍 Skill 使用透明化

每次回應**開頭第一行**,必須使用以下格式宣告 skill 使用狀況:

格式:`📌 [skills: skill-A, skill-B] 簡短原因`

規則:
- 使用一個或多個 skill → 列出全部名字
- 沒有使用任何 skill → 寫 `📌 [no skills] 純對話`
- 跨多個 skill 工作 → 列出全部,不要省略
- 即使是簡短回應也要宣告

範例:
- `📌 [skills: planning-with-files] 建立任務計畫`
- `📌 [skills: frontend-design, code-review] 寫 UI 並檢查`
- `📌 [no skills] 純討論方向`

---

## ⚡ 我的客製指令使用 `//` 雙斜線前綴

**重要識別規則**:本專案所有客製化指令以 `//` 雙斜線開頭,**為了與 Claude Code 內建單斜線指令(`/help`、`/clear` 等)區分**。

當你看到我打 `//xxx`:
- 一律當作客製化指令處理
- 完全按本檔後面定義的步驟執行
- 不要當成 typo、不要當成 Claude Code 內建指令
- 不要把 `//` 解讀為註解語法

當你看到我打 `/xxx`(單斜線):
- 那是 Claude Code 內建指令,**不是**我的客製指令,不要插手

---

## 🗺️ 指令總覽

依用途分四類:

### 🗣️ 討論類(不建檔)
| 指令 | 用途 |
|---|---|
| `//talk [主題]` | 啟動自由討論,不建檔不觸發 skill |
| `//talk on [feature]` | 針對已存在的功能做擴充討論 |

### 📋 任務管理類(建檔、追進度)
| 指令 | 用途 |
|---|---|
| `//start [描述]` | 啟動新任務,建立三檔資料夾 |
| `//next` | 執行下一個 phase |
| `//finish` | 整個功能完成,搬到 done |
| `//status` / `//status [feature]` | 查看進度 |

### 🔧 程式碼操作類(動 code)
| 指令 | 用途 |
|---|---|
| `//review` | Code review,給問題清單 |
| `//fix` | 修上次 review 找到的問題 |
| `//simplify` | 清理冗餘程式碼 |

### 📝 範圍與筆記類(調整邊界與紀錄)
| 指令 | 用途 |
|---|---|
| `//note [內容]` | 自動判斷寫進 findings 或 progress |
| `//finding [內容]` | 強制寫進 findings.md |
| `//log [內容]` | 強制寫進 progress.md |
| `//sync` | 回顧對話,把該補的同步到三個檔案 |
| `//scope` | 列出當前功能的 Out of Scope |
| `//scope add [項目]` | 新增 Out of Scope 項目 |
| `//scope promote [項目]` | 升級成正式 Phase(擴大範圍) |
| `//scope split [項目]` | 獨立成新功能 |
| `//scope drop [項目]` | 永久放棄,寫進 findings |
| `//help` | 列出所有 `//` 指令 |

### 標準工作流

```
//talk [主題]              ← 自由討論方向
   ↓ 想清楚了
//start [功能描述]         ← 正式開工,建檔
   ↓
//next                    ← 做下一個 phase
   ↓ 想看品質
//review → //fix → //simplify   ← 視需要組合
   ↓ 跟 Claude 說「Phase N 完成」
回到 //next
   ↓ 中途累積一些紀錄沒寫
//sync                    ← 把該補的補回三個檔案
   ↓ 全部 phase 完成
//finish                  ← 歸檔到 done
```

**接續舊功能**:直接說「接續血量系統」或「讀 .agent/active/.../ 告訴我上次做到哪」,Claude 會自己處理。

---

## 📁 資料夾結構

使用 **planning-with-files** skill 時,所有規劃檔案統一放在 `.agent/` 資料夾。

```
專案根目錄/
  ├─ .agent/
  │   ├─ active/                       ← 進行中的功能
  │   │   └─ YYYY-MM-DD_feature-name/
  │   │       ├─ task_plan.md
  │   │       ├─ findings.md
  │   │       └─ progress.md
  │   └─ done/                         ← 完成後歸檔
  │       └─ YYYY-MM-DD_feature-name/
  │           ├─ task_plan.md
  │           ├─ findings.md
  │           └─ progress.md
  └─ CLAUDE.md
```

### 資料夾命名規則

由 Claude 根據功能描述自動產生:`YYYY-MM-DD_feature-name-kebab-case`

範例:
- `2026-05-12_player-health-system`
- `2026-05-12_login-flow`
- `2026-05-13_inventory-ui`

同一天建立多個功能,後綴加 `-2`、`-3`。建好之後告訴我資料夾名稱,我想改名請隨時告知。

### Active vs Done

- **active/** — **進行中**的功能,可同時有多個
- **done/** — 完成後從 active **整個搬過去**歸檔
- 不要在 active 留已完成的功能

---

## 📄 三檔結構

每個功能資料夾內維護三個檔案,各司其職:

### `task_plan.md` — 路線圖(靜態)

任務拆解與整體進度。**結構性、靜態**,寫完不太改動。

內容區塊:
- `## Goal` — 任務目標
- `## Phases` — checkbox 列表(3-7 個 phase)
- `## Out of Scope` — 明確排除的事
- `## Status` — 目前在哪個 phase
- `## Errors Encountered` — 卡住的問題

### `findings.md` — 知識庫(累積)

設計決策、研究發現、踩到的坑、參考資料。**跟「進度」無關的知識**。

判斷該不該寫進 findings,問自己:
- 「三個月後我會想知道這件事嗎?」
- 「Claude 後續做事需要參考這個嗎?」
- 「如果忘記,我會重複踩坑或重複決策嗎?」

有任一個 yes 就寫。

格式:
```markdown
# Findings

## [YYYY-MM-DD HH:MM] 簡短主題
[內容]
```

常見類別:
- 設計決策(為什麼選 A 不選 B)
- 踩坑 / Workaround
- 命名慣例 / 程式碼風格
- 參考資料
- 未來想做但現在不做的事
- 業務規則的「為什麼」
- 環境 / 工具 / 套件版本

### `progress.md` — 執行紀錄(動態)

執行細節、做了什麼、結果如何。**時間軸日誌**。

格式:
```markdown
# Progress Log

## [YYYY-MM-DD HH:MM] 簡短事件
[細節]
```

### 三檔分工速查

- **「下一步要做什麼?」** → task_plan
- **「為什麼當初選 A 不選 B?」** → findings
- **「上次最後在幹嘛?」** → progress
- **「目前進度多少?」** → task_plan 的 Status

---

## ⚡ 指令詳細定義

所有指令以 `//` 雙斜線開頭。**完全按定義執行**,不要省略步驟也不要自作主張加步驟。

當前有多個 active 功能時,如果指令沒明確指定哪個,先問我:「目前 active 有 X、Y、Z,要操作哪個?」

---

### 🗣️ 討論類

#### `//talk [主題]`

**啟動自由討論**,**不**建任何檔案、**不**觸發任何 skill。

執行步驟:
1. 把當前 context 切換到「**討論主題:[主題]**」
2. 進入自由對話模式,可主動給建議、給選項、發表意見
3. **不要建 task_plan.md**,直到我說 `//start`
4. 如果這個討論最後變成正式功能,我會接著打 `//start [描述]`
5. 如果只是純聊天/探索,就不需要後續指令

不帶主題用法:
```
//talk
```
→ 進入自由討論模式,問我「你想聊什麼?」

#### `//talk on [feature-name]`

**針對已存在的功能做擴充討論**(不直接動檔案)。

執行步驟:
1. 讀該功能的 `task_plan.md` 與 `findings.md`,了解現有設計
2. 進入針對該功能的自由討論
3. 討論結論如果要實作:
   - 在現有功能加東西 → `//scope promote` 或加 Phase
   - 拆成獨立功能 → `//scope split` 或 `//start`
   - 永久放棄 → `//scope drop`
4. 討論期間**不主動動 task_plan**,我下指令才動

---

### 📋 任務管理類

#### `//start [功能描述]`

**啟動新任務**,使用 **planning-with-files** skill。

執行步驟:
1. 從功能描述產生資料夾名稱:`YYYY-MM-DD_feature-name`
2. 建立資料夾 `.agent/active/YYYY-MM-DD_feature-name/`
3. 建立三個檔案:
   - `task_plan.md` — 包含 Goal / Phases(3-7 個,checkbox)/ Out of Scope / Status("Currently in Phase 1")/ Errors Encountered
   - `findings.md` — 標題 `# Findings`,本體先空
   - `progress.md` — 標題 `# Progress Log`,追加第一筆:
     ```
     ## [YYYY-MM-DD HH:MM] Project initialized
     - task_plan.md 已建立
     - 等待使用者確認 plan
     ```
4. **告訴我資料夾名稱**,給我看 task_plan 內容
5. **等我說 OK 才開始實作**,不要自動進 Phase 1

#### `//next`

**執行下一個 phase**。

執行步驟:
1. 讀對應功能的 `task_plan.md`,找出第一個未打勾的 phase
2. 在 `progress.md` 追加:
   ```
   ## [YYYY-MM-DD HH:MM] Phase N 開始
   - 目標:[該 phase 內容]
   ```
3. 判斷 phase 性質:
   - 牽涉 UI → **自動套用 frontend-design skill**
   - 其他 → 走一般實作流程
4. 實作該 phase
5. 完成後:
   - `task_plan.md` 對應 phase 打勾,更新 Status
   - `progress.md` 追加完成紀錄
6. **不要自動進下一個 phase**,等我再下指令

當我說「Phase N 完成」、「打勾 Phase N」之類的話時,等同手動觸發第 5 步:更新 task_plan 打勾 + 追加 progress 紀錄。

#### `//finish`

**整個功能完成,歸檔到 done**。

執行步驟:
1. 確認 `task_plan.md` 所有 phase 都已打勾
2. 如果還有未完成的 phase,問我:「還有 X 個 phase 未完成,確定要歸檔嗎?」
3. 在 `progress.md` 追加最後一筆:
   ```
   ## [YYYY-MM-DD HH:MM] Project finished
   - 所有 phase 完成
   - 歸檔到 .agent/done/
   ```
4. 把整個資料夾從 `.agent/active/` 搬到 `.agent/done/`
5. 告訴我歸檔完成

#### `//status`

**報告所有 active 功能的進度**。

回報格式:
```
Active 功能:
- [資料夾名稱 1]:Phase X / Y(進行中)
  下一步:...
- [資料夾名稱 2]:Phase X / Y(進行中)
  下一步:...

Errors Encountered(跨所有 active):
- ...

最近 progress(最新 3 筆,跨所有 active):
- ...
```

#### `//status [feature-name]`

**只報告特定功能的詳細狀態**。

回報內容:
- 完成 X / 總共 Y 個 phase
- 目前在哪個 phase
- 下一步是什麼
- Errors Encountered 區塊有無內容
- findings.md 最新幾筆
- progress.md 最新幾筆

---

### 🔧 程式碼操作類

#### `//review`

**Code Review**,使用 **code-review** skill。

執行步驟:
1. 找出本次 session 修改過的檔案
2. 跑 code review,**只給清單,不要直接動手修**
3. 按嚴重程度分類:
   - 🔴 **Critical** — 必修(bug、安全問題、嚴重設計缺陷)
   - 🟡 **Major** — 建議修(命名、結構、效能)
   - 🟢 **Minor** — 可忽略(風格、註解)
4. 等我說 `//fix` 才動手修

#### `//fix`

**修上一次 //review 找到的問題**。預設修 Critical + Major,Minor 不動。連 Minor 也修打 `//fix all`。

修完在 `progress.md` 追加紀錄。

#### `//simplify`

**清理剛改的程式碼**,使用 **code-simplifier** skill。

執行步驟:
- 刪除冗餘程式碼
- 統一風格(跟專案既有 pattern 一致)
- 簡化過度設計(過早抽象、不必要的彈性)
- **保持功能不變**,只動形式

---

### 📝 範圍與筆記類

#### `//note [內容]`

**新增筆記**,由 Claude 判斷該寫進 findings 還是 progress:

- **設計決策、踩坑、參考資料、未來想法** → `findings.md`
- **執行紀錄、做了什麼、結果如何** → `progress.md`

不確定的話直接問我:「這要記到 findings 還是 progress?」

#### `//finding [內容]`

**強制寫進 findings.md**,不要判斷,直接寫。

#### `//log [內容]`

**強制寫進 progress.md**,不要判斷,直接寫。

#### `//sync`

**回顧本次 session 的對話,把該記錄的事情同步到三個檔案**。

執行步驟:

1. **掃描本次 session 從開始到現在的對話**,找出可能該補進三個檔案的內容:
   - **該打勾的 phase / 該追加的 progress** → task_plan + progress
   - **設計決策**(「我們決定...」、「因為...所以...」) → findings
   - **踩到的坑 / workaround** → findings
   - **計畫變更**(新增刪除 phase、Out of Scope 變動) → task_plan + progress
   - **環境 / 工具 / 慣例 / 業務規則** → findings

2. **整理成清單,先給我看,不要直接動檔案**:
   ```
   找到 N 項可能要同步:
   
   【task_plan.md】
   ✓ [建議的變更 1]
   ✓ [建議的變更 2]
   
   【findings.md】
   ✓ [建議的新增 1]
   ✓ [建議的新增 2]
   
   【progress.md】
   ✓ [建議的新增 1]
   
   要全部寫入嗎?還是要挑?
   - 全部 → 回「全部」
   - 部分 → 回「只要 1, 3, 5」
   - 不要 → 回「取消」
   ```

3. **等我確認後**才寫入對應檔案
4. 寫入完成後給總結:「同步完成,共 X 項」

使用時機建議:
- **收工前**:確保關掉 Claude Code 前,進度與決策都已落地
- **做完一個大段落**:phase 完成或長討論結束後
- **發現「啊好久沒同步」**:意識到中間決策很多沒寫進去

注意:
- `//sync` 只能掃**本次 session** 的對話。關掉重開後,之前沒同步的東西就找不回來了
- 養成收工前打 `//sync` 的習慣很有幫助

---

### 📝 範圍類

#### `//scope`

**列出當前功能的 Out of Scope** 列表。

如果我在實作中要求加東西,Claude 發現它在 Out of Scope 列表,**先提醒我**:「這在 Out of Scope,要怎麼處理?可用 //scope promote/split/drop。」

#### `//scope add [項目]`

**新增一個 Out of Scope 項目**。

執行步驟:
1. 在 `task_plan.md` 的 Out of Scope 區塊加上項目
2. 在 `findings.md` 記錄加入原因(可選,如果我有說理由)

#### `//scope promote [項目]`

**從 Out of Scope 升級成正式 Phase**(擴大範圍)。

執行步驟:
1. 從 `task_plan.md` 的 Out of Scope 移除該項目
2. 在 `Phases` 區塊加上新 phase(放在合理位置)
3. 在 `findings.md` 記錄:
   ```
   ## [YYYY-MM-DD HH:MM] 範圍擴大:納入 [項目]
   - 原本是 Out of Scope
   - 改變決定的原因:[問我]
   ```
4. 在 `progress.md` 追加紀錄

#### `//scope split [項目]`

**把 Out of Scope 項目獨立成新功能**。

執行步驟:
1. 從當前功能的 `task_plan.md` Out of Scope 移除該項目
2. 在當前功能的 `findings.md` 記錄:「[項目] 已拆出為獨立功能」
3. 自動執行 `//start [項目]`,開新功能資料夾
4. 在新功能的 `findings.md` 第一筆記錄:「拆自 [原功能名稱]」

#### `//scope drop [項目]`

**從 Out of Scope 永久放棄**。

執行步驟:
1. 從 `task_plan.md` Out of Scope 移除該項目
2. 在 `findings.md` 記錄:
   ```
   ## [YYYY-MM-DD HH:MM] 永久放棄:[項目]
   - 原因:[問我]
   - 後續不會在此功能或新功能實作
   ```

#### `//help`

**列出所有 `//` 客製指令**(避免跟 Claude Code 內建的 `/help` 混淆)。

回報格式:照「指令總覽」區塊的分類列表呈現。

---

## 🔁 跨 session 接續

打開新 session 想接續之前的功能,**用自然語言就好**:

```
接續血量系統
```
或
```
讀 .agent/active/2026-05-12_player-health-system/,告訴我上次做到哪
```

Claude 會:
1. 讀該功能的三個檔
2. 報告上次做到哪、關鍵設計決策、下一步
3. **等你確認再動手**(不要直接 //next)

---

## 📋 一般原則

### 討論階段(`//talk` 或無指令時)

- **自由對話模式**,不要主動觸發 skill
- 我可能在想方向、釐清需求、探索可能性
- 你可以主動給建議、給選項、發表意見
- **不要急著建檔**,等我說 `//start` 才建資料夾
- 想觸發 skill 我會明確說

### 實作階段(打了任務指令後)

- 嚴格按指令定義走
- skill 使用要透明(看 🔍 規則)
- 每完成一個 phase 停下來等我下指令,**不要連續做多個 phase**

### 三檔的維護紀律

- **task_plan 保持乾淨**:只放結構性內容
- **findings 累積知識**:跟「進度」無關的決策與發現都寫這
- **progress 追加日誌**:每個動作完成都追加一筆,不要修改舊紀錄
- **時間戳必加**:findings 跟 progress 每筆都要有 `[YYYY-MM-DD HH:MM]` 開頭
- **不確定有沒有漏記**:打 `//sync` 讓 Claude 掃對話提議補哪些

### 程式碼風格

- 跟著專案既有 pattern 走,不要引入新風格
- 不要過度抽象、不要過度設計
- YAGNI:沒明確需要就不做
- 命名要清楚,寧可長也不要縮寫
- **沒有 Out of Scope 列出的功能,不要自作主張加**

### 錯誤處理

- 同一個錯誤試 **3 次**還不成功 → **停下來**,寫進對應功能的 `task_plan.md` Errors Encountered 區塊
- Errors Encountered 格式:
  ```markdown
  ### [YYYY-MM-DD] [錯誤簡述]
  - **What I tried**: [試過的方法]
  - **What happened**: [結果]
  - **Hypothesis**: [可能原因]
  - **Status**: 等待使用者介入
  ```
- 不要硬幹、不要繞圈

### Out of Scope 衝突處理

當我在實作中要求加 Out of Scope 列出的東西:
1. **不要默默做**,先提醒我
2. 給我四個選項:
   - `//scope promote [項目]` — 正式擴大範圍
   - `//scope split [項目]` — 獨立成新功能
   - `//scope drop [項目]` — 永久放棄(改變決定)
   - 「臨時 hack,不正式加進來」— Claude 加最小臨時版,在 progress 註記
3. 等我選擇才動手

---

## 🚫 絕對不要做的事

- **不要把 `//` 解讀為註解語法**,它是我的客製指令前綴
- **不要在我沒打快捷指令時主動跑 review / simplify**
- **不要連續執行多個 phase**,每個 phase 都要等我確認
- **不要為了「對稱」或「完整性」加我沒要求的功能**
- **不要在 review 報告裡直接動手修**,先給清單
- **不要省略 📌 skill 宣告**,即使覺得「這個回應很短不用宣告」
- **不要在 Out of Scope 沒處理前實作 Out of Scope 的東西**
- **不要修改 progress.md 的舊紀錄**,只能追加新的
- **不要把 active 跟 done 搞混**,完成才搬,搬完才算結案
- **不要省略時間戳**,findings 跟 progress 每筆都要有 `[YYYY-MM-DD HH:MM]`
- **不要在 `//talk` 階段建檔或動 code**,只能對話
- **`//sync` 不准直接寫入檔案**,一定要先給清單等使用者確認