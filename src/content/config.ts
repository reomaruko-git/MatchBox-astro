import { defineCollection, z } from 'astro:content';

const lps = defineCollection({
  type: 'content',
  // schema を関数形式に変更し、ヘルパーの image を取得します
  schema: ({ image }) => z.object({
    title: z.string(),
    pageLayout: z.string().optional(),
    heroTitle: z.string().optional(),
    badge: z.string().optional(),
    description: z.string().optional(),
    
    // ▼ 画像定義を文字列から image() へ変更
    images: z.object({
      mv: image().optional(), 
      mvAlt: z.string().optional(),
      og: image().optional(), 
    }).optional(),

    colors: z.record(z.string()).optional(),
    keywords: z.array(z.object({
      text: z.string(),
      link: z.string(),
    })).optional(),
    affiliateLink: z.string().optional(),
    rankings: z.array(z.any()).optional(),
    texts: z.record(z.string()).optional(),
    
    cta: z.object({
      title: z.string().optional(),
      label: z.string().optional(),
      microCopy: z.string().optional(),
      icon: z.string().optional(),
    }).optional(),
    
    heroCta: z.object({
      label: z.string().optional(),
      microCopy: z.string().optional(),
    }).optional(),
    
    mvButtonLabel: z.string().optional(),
    mvMicroCopy: z.string().optional(),
    
    sticky: z.object({
      text: z.string().optional(),
      label: z.string().optional(),
      microCopy: z.string().optional(),
    }).optional(),

    banner: z.object({
      src: z.string(),
      alt: z.string().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      trackingPixel: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { lps };