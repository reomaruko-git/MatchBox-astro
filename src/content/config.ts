import { defineCollection, z } from 'astro:content';

const lps = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    template: z.string().optional(),
    heroTitle: z.string().optional(),
    badge: z.string().optional(),
    description: z.string().optional(),
    images: z.object({
      mv: z.string().optional(),
    }).optional(),
    colors: z.record(z.string()).optional(),
    // ▼▼▼ この定義がないとMarkdownのkeywordsが読み込まれません ▼▼▼
    keywords: z.array(z.object({
      text: z.string(),
      link: z.string(),
    })).optional(),
    affiliateLink: z.string().optional(),
    // ▲▲▲ ここまで ▲▲▲
    rankings: z.array(z.any()).optional(),
    texts: z.record(z.string()).optional(),
    // ▼▼▼ CTA用の設定を追加 ▼▼▼
    cta: z.object({
      title: z.string().optional(),
      label: z.string().optional(),
      microCopy: z.string().optional(),
      icon: z.string().optional(),
    }).optional(),
    // ▼▼▼ heroCtaを追加 ▼▼▼
    heroCta: z.object({
      label: z.string().optional(),
      microCopy: z.string().optional(),
    }).optional(),
    // ▼▼▼ MVボタンの文言設定を追加 ▼▼▼
    mvButtonLabel: z.string().optional(),
    mvMicroCopy: z.string().optional(),
    // ▼▼▼ 追従ボタンの設定を追加 ▼▼▼
    sticky: z.object({
      text: z.string().optional(),
      label: z.string().optional(),
      microCopy: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { lps };