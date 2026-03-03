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

### package-lock.json 必須納入版本控制

- `package-lock.json` **不可**加入 `.gitignore`
- CI 使用 `npm ci` 安裝套件，此指令需要 `package-lock.json` 才能執行
- 若缺少此檔案，CI 會報錯：`The npm ci command can only install with an existing package-lock.json`

### CI 需使用 `--include=optional` 旗標

- `npm ci --include=optional` 確保跨平台 optional dependencies 會被安裝
- 本機 macOS 產生的 `package-lock.json` 不包含 Linux 平台的原生模組（如 `@rollup/rollup-linux-x64-gnu`）
- CI 環境為 `ubuntu-latest`（Linux），需要此旗標才能正確安裝 Rollup 等工具的平台套件
