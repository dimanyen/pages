# Pages Hub

Vite + TypeScript 專案，部署至 Cloudflare Workers。

## 技術棧

- **框架**: Vite 6 + TypeScript
- **部署**: Cloudflare Workers（透過 GitHub Actions 自動部署）
- **CI/CD**: `.github/workflows/deploy.yml`

## 開發指令

```bash
npm run dev      # 本機開發伺服器
npm run build    # 建置（tsc + vite build）
npm run preview  # 預覽建置結果
```

## 部署注意事項

### CI 使用 `npm install` 而非 `npm ci`

- CI 環境為 `ubuntu-latest`（Linux），而本機為 macOS
- `npm ci` 嚴格依照 `package-lock.json` 安裝，但 macOS 產生的 lockfile 不包含 Linux 平台的原生模組（如 `@rollup/rollup-linux-x64-gnu`），即使加 `--include=optional` 也無法解決
- `npm install` 會根據當前平台重新解析依賴，確保安裝正確的平台套件

### package-lock.json 必須納入版本控制

- `package-lock.json` **不可**加入 `.gitignore`
- 確保團隊成員間的套件版本一致
