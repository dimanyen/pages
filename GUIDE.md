# One-Page Website 開發指南

本文件說明如何在此專案中建立一頁式靜態網頁。供 AI 或開發者參照。

---

## 技術棧

- **Vite** (v6) — 開發伺服器與打包工具
- **TypeScript** — 型別安全的 JavaScript
- **純 HTML + CSS** — 不使用任何前端框架 (React / Vue 等)
- **Cloudflare Pages** — 部署平台

---

## 專案結構

```
pages/
├── index.html              # 網頁主體 (入口)
├── src/
│   ├── main.ts             # TypeScript 入口，匯入 CSS + 互動邏輯
│   └── styles/
│       ├── base.css         # CSS 變數、Reset、全域樣式、動畫、RWD 斷點
│       └── components.css   # 各區塊元件樣式 (Header, Hero, Cards, Footer...)
├── public/
│   └── favicon.svg          # 靜態資源 (不經 Vite 處理，直接複製到 dist)
├── package.json
├── tsconfig.json
├── vite.config.ts           # Vite 設定 (輸出目錄: dist)
├── wrangler.toml            # Cloudflare 部署設定
└── .node-version            # 指定 Node.js 版本 (22)
```

---

## 建立新頁面的步驟

### 1. 編輯 `index.html`

這是唯一的 HTML 檔案，所有內容都寫在這裡。結構慣例：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>頁面標題</title>
    <meta name="description" content="頁面描述" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <!-- Google Fonts (若需要) -->
  </head>
  <body>
    <div id="app">
      <header class="header"> ... </header>
      <section class="hero"> ... </section>
      <section class="section-xxx" id="xxx"> ... </section>
      <!-- 更多 section -->
      <section class="section-cta" id="cta"> ... </section>
      <footer class="footer"> ... </footer>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**重點：**
- `<div id="app">` 是最外層容器，所有內容放在裡面
- 每個 section 用 `id` 屬性建立錨點，供導覽列跳轉
- `<script type="module" src="/src/main.ts">` 放在 `</body>` 前

### 2. 撰寫 CSS

分成兩個檔案：

#### `src/styles/base.css` — 全域基礎

負責的內容：
- `:root` 內定義 CSS 變數 (色彩、間距、字型)
- CSS Reset (`*, *::before, *::after`)
- `html`, `body` 基礎樣式
- `#app` 容器的 max-width 與 flex 佈局
- 滾動動畫 class (`.fade-in`, `.visible`)
- RWD 斷點的變數調整

#### `src/styles/components.css` — 元件樣式

負責的內容：
- 各區塊樣式依序排列：Header → Hero → Section Headers → 各內容區 → CTA → Footer
- 每個區塊用註解分隔
- RWD media query 放在檔案底部，統一處理

### 3. 撰寫 `src/main.ts`

負責的內容：
- 匯入 CSS 檔案
- 互動邏輯 (smooth scroll, header 滾動效果, 捲動動畫等)

```ts
import "./styles/base.css";
import "./styles/components.css";

// Smooth scroll for anchor links
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// 其他互動邏輯...
```

---

## 設計慣例

### CSS 變數命名

```css
:root {
  /* 背景 */
  --bg-start / --bg-mid / --bg-end

  /* 表面色 */
  --surface-card / --surface-apps / --surface-footer

  /* 主色系 */
  --purple / --cyan / --green / --amber / --pink / --indigo

  /* 文字 */
  --text / --text-secondary / --text-muted

  /* 邊框 */
  --border-card / --border-outline

  /* 間距 */
  --px    /* 水平 padding，RWD 時自動縮小 */

  /* 字型 */
  --font
}
```

### RWD 斷點

| 斷點          | 用途             |
|--------------|------------------|
| `max-width: 1024px` | 平板 — 縮小標題、改單欄佈局 |
| `max-width: 640px`  | 手機 — 隱藏導覽文字、按鈕改全寬 |

### 頁面區塊模式

| 區塊 | class 命名 | 說明 |
|------|-----------|------|
| Header | `.header` | sticky 導覽列，滾動時加 `.scrolled` 背景模糊 |
| Hero | `.hero` | 置中大標題 + 副標題 + CTA 按鈕 |
| 內容區 | `.section-xxx` | 每個區塊有 `.section-header` (標籤 + 標題 + 描述) |
| 卡片 | `.feature-card` / `.app-card` | 功能介紹用 |
| CTA | `.section-cta` | 漸層背景的行動呼籲區 |
| Footer | `.footer` | Logo + 版權 + 連結 |

### 按鈕樣式

| class | 用途 |
|-------|------|
| `.btn-primary` | 主要 CTA (漸層背景) |
| `.btn-primary-sm` | 導覽列小按鈕 |
| `.btn-outline` | 次要按鈕 (邊框) |
| `.btn-white` | CTA 區白色按鈕 |
| `.btn-outline-purple` | CTA 區紫色邊框按鈕 |

---

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器 (含 HMR)
npm run dev

# 建置產出到 dist/
npm run build

# 預覽建置結果
npm run preview
```

---

## 部署到 Cloudflare Pages

### 設定檔

**`wrangler.toml`**：
```toml
name = "pages-hub"
compatibility_date = "2026-03-03"

[assets]
directory = "./dist"
```

**`.node-version`**：
```
22
```

### Cloudflare Pages Dashboard 設定

| 欄位 | 值 |
|------|---|
| Build command | `npm run build && npx wrangler versions upload` |
| Build output directory | (留空，由 wrangler.toml 控制) |

### 注意事項

- **不要 commit `package-lock.json`**：已加入 `.gitignore`，避免 macOS 與 Cloudflare Linux 的跨平台套件不相容問題 (rollup native bindings)
- 部署流程：`push → Cloudflare 自動 clone → npm install → build → wrangler upload`
- Cloudflare 環境會自動用 `.node-version` 指定的 Node.js 版本

---

## 新建頁面速查

1. 修改 `index.html` 的內容
2. 在 `src/styles/base.css` 調整 CSS 變數 (色彩、字型)
3. 在 `src/styles/components.css` 撰寫各區塊樣式
4. 在 `src/main.ts` 加入互動邏輯
5. `npm run dev` 本地預覽
6. `npm run build` 確認建置成功
7. `git push` 自動部署到 Cloudflare Pages
