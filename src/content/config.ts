import { defineCollection, z } from 'astro:content';

const lps = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
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
    // ▲▲▲ ここまで ▲▲▲
    rankings: z.array(z.any()).optional(),
    texts: z.record(z.string()).optional(),
  }),
});

export const collections = { lps };