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

### CI 安裝前需移除 package-lock.json

- CI 環境為 `ubuntu-latest`（Linux），而本機為 macOS
- npm 有已知 bug（[npm/cli#4828](https://github.com/npm/cli/issues/4828)），macOS 產生的 `package-lock.json` 會導致 Linux 平台的原生模組（如 `@rollup/rollup-linux-x64-gnu`）無法被安裝，即使用 `npm install` 或 `npm ci --include=optional` 都無法解決
- CI workflow 中使用 `rm -f package-lock.json && npm install`，先移除 lockfile 再重新安裝，確保 Linux 平台套件正確解析

### package-lock.json 必須納入版本控制

- `package-lock.json` **不可**加入 `.gitignore`
- 確保團隊成員間的套件版本一致
