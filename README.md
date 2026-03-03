# MatchBox

アフィリエイト LP 運用サイトの Astro プロジェクトです。
LP は Claude API による自動生成（`lp-automation/`）と、静的サイトとしてのビルド・配信に対応しています。

## 🚀 プロジェクト概要

- **サイト名**: MatchBox
- **URL**: https://matchbox-media.com
- **フレームワーク**: [Astro](https://astro.build/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **デプロイ形式**: 静的サイト生成 (SSG)

## 🛠 開発環境のセットアップ

```bash
npm install
npm run dev        # 開発サーバー起動 → http://localhost:4321
npm run build      # 本番ビルド → dist/
```

## 📁 ディレクトリ構成

```text
/
├── public/                    # 静的ファイル（favicon、ロゴなど）
├── src/
│   ├── assets/
│   │   └── images/lp/{slug}/  # LP画像（mv.webp など）
│   ├── components/
│   │   ├── sections/          # セクションコンポーネント（比較表、FAQなど）
│   │   ├── templates/         # .md LP 用テンプレート
│   │   └── ui/                # 汎用UIパーツ
│   ├── content/
│   │   ├── config.ts          # コレクションスキーマ定義
│   │   ├── lps/               # .md ベースの LP（旧形式）
│   │   └── lp-pages/          # .astro ベースの LP メタデータ JSON
│   ├── layouts/
│   │   ├── Layout.astro       # サイト共通レイアウト
│   │   ├── LayoutLp.astro     # LP 専用レイアウト（GTM・フォント・フッター込み）
│   │   └── RedirectLayout.astro
│   ├── pages/
│   │   ├── index.astro        # トップページ（LP一覧）
│   │   ├── [slug].astro       # .md LP の動的ルーティング
│   │   ├── {slug}.astro       # .astro LP（例: le-aga.astro）
│   │   ├── link/[slug].astro  # アフィリエイトリダイレクト
│   │   ├── company.astro
│   │   ├── privacy.astro
│   │   ├── 404.astro
│   │   ├── robots.txt.js
│   │   └── sitemap.xml.js
│   └── styles/
│       ├── global.css
│       └── lp-template.css    # LP デザインシステム（共通CSS）
├── lp-automation/             # Claude API を使った LP 自動生成ツール
│   ├── main.py                # メインスクリプト
│   ├── input/                 # 案件情報の入力ファイル
│   └── output/                # 生成結果の出力先
├── astro.config.mjs
└── tailwind.config.mjs
```

## 📝 LP の追加方法

### A. 自動生成（推奨）

`lp-automation/main.py` を使って Claude API が LP を自動生成します。

```bash
cd lp-automation
python3 main.py
```

実行すると以下が自動生成・配置されます。

- `src/pages/{slug}.astro` — LP ページ本体
- `src/content/lp-pages/{slug}.json` — トップページ表示用メタデータ
- `src/assets/images/lp/{slug}/` — 画像フォルダ

### B. 手動追加（.astro）

1. `src/pages/{slug}.astro` を作成し `LayoutLp` を使って実装
2. `src/content/lp-pages/{slug}.json` にメタデータを追加
3. `src/assets/images/lp/{slug}/mv.webp` に MV 画像を配置

```json
{
  "title": "ページタイトル",
  "description": "メタディスクリプション",
  "mv": "../../assets/images/lp/{slug}/mv.webp"
}
```

## 🎨 デザインシステム

LP は `LayoutLp.astro` + `lp-template.css` の2層構造です。

- **`LayoutLp.astro`**: LINE Seed JP フォント、GTM、Match Box フッター、FAQ アコーディオンを内包
- **`lp-template.css`**: ヒーロー・ボタン・比較表・口コミ・FAQ・CTAバナーなど全セクションの共通スタイル

## ⚙️ 主な設定

| 項目 | 場所 |
|------|------|
| サイト URL | `astro.config.mjs` の `site` |
| GTM ID | `src/layouts/Layout.astro` / `LayoutLp.astro` の `GTM_ID` |
| アフィリエイトリダイレクト | `src/pages/link/[slug].astro` |
| コレクションスキーマ | `src/content/config.ts` |
