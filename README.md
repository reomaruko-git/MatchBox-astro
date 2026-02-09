# Match Box Project

転職支援サービス「Match Box」のAstroプロジェクトです。
LP（ランディングページ）や比較記事をMarkdownで管理し、静的サイトとして生成します。

## 🚀 プロジェクト概要

- **サイト名**: Match Box
- **URL**: https://match-box.net
- **フレームワーク**: [Astro](https://astro.build/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **デプロイ形式**: 静的サイト生成 (SSG)

## 🛠 開発環境のセットアップ

### 前提条件
- Node.js (v18以上推奨)
- npm

### インストール
```bash
npm install
```

### 開発サーバーの起動
```bash
npm run dev
```
ブラウザで `http://localhost:4321` を開いて確認します。

## 📁 ディレクトリ構成

```text
/
├── public/             # 静的ファイル（画像、faviconなど）
├── src/
│   ├── assets/         # アセットファイル
│   │   └── images/     # サイト内で使用する画像（自動最適化されます）
│   ├── components/     # Astroコンポーネント
│   │   └── templates/  # LP用テンプレート（Single, Comparisonなど）
│   ├── content/        # コンテンツコレクション
│   │   ├── config.ts   # スキーマ定義
│   │   └── lps/        # LPのMarkdownファイル (*.md)
│   ├── layouts/        # 共通レイアウト (Layout.astro)
│   ├── pages/          # ページルーティング
│   │   ├── index.astro # トップページ
│   │   ├── 404.astro   # 404ページ
│   │   ├── robots.txt.js # robots.txt自動生成
│   │   └── sitemap.xml.js # sitemap.xml自動生成
│   └── styles/         # グローバルCSS
├── astro.config.mjs    # Astro設定ファイル
└── tailwind.config.mjs # Tailwind設定
```

## 📝 コンテンツの更新手順

### 1. 新しいLPを追加する
`src/content/lps/` フォルダ内に新しい `.md` ファイルを作成します。
ファイル名（例: `new-lp.md`）がそのままURLスラッグになります（例: `https://match-box.net/new-lp/`）。

**Markdownの記述例:**
```markdown
---
template: ../../components/templates/TemplateSingle.astro
title: "ページのタイトル"
description: "メタディスクリプション"
heroTitle: "MVのキャッチコピー"
images:
  mv: "../../assets/images/lp/new-lp/mv.jpg" # src/assets/images/ からの相対パス
  mvAlt: "MVの代替テキスト"
  og: "../../assets/images/lp/new-lp/ogp.png"
colors:
  primary: "#1e3a8a"
  accent: "#ea580c"
affiliateLink: "https://example.com/link"
---

ここに本文を書きます...
```

### 2. 画像を追加する
画像ファイルは `public/assets/images/` 以下の適切なフォルダに配置してください。
Markdownからは `/assets/images/...` のパスで参照できます。

## 📦 ビルドとデプロイ

本番用に静的ファイルを生成します。

```bash
npm run build
```

生成されたファイルは `dist/` フォルダに出力されます。このフォルダの中身をWebサーバーにアップロードしてください。

## ⚙️ 主な設定

- **サイトURL**: `astro.config.mjs` の `site` プロパティで設定
- **GTM ID**: `src/layouts/Layout.astro` 内の `GTM_ID` 定数で管理
- **sitemap/robots**: ビルド時に自動生成されます