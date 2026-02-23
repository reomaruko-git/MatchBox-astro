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

    faq: z.object({
      label: z.string().optional(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      bgColor: z.string().optional(),
      items: z.array(z.object({
        question: z.string(),
        answer: z.string(),
      })).optional(),
    }).optional(),

    comparisonTable: z.object({
      label: z.string().optional(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      highlightLabel: z.string().optional(),
      competitorLabels: z.array(z.string()).optional(),
      rows: z.array(z.object({
        label: z.string(),
        highlight: z.string(),
        others: z.array(z.string()),
      })).optional(),
      summary: z.array(z.string()).optional(),
      bgColor: z.string().optional(),
    }).optional(),

    featureGrid: z.object({
      label: z.string().optional(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      columns: z.union([z.literal(2), z.literal(3)]).optional(),
      bgColor: z.string().optional(),
      features: z.array(z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        badge: z.string().optional(),
      })).optional(),
    }).optional(),

    priceTable: z.object({
      label: z.string().optional(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      ctaHref: z.string().optional(),
      ctaNote: z.string().optional(),
      bgColor: z.string().optional(),
      plans: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.string(),
        unit: z.string().optional(),
        originalPrice: z.string().optional(),
        features: z.array(z.string()),
        recommended: z.boolean().optional(),
        badge: z.string().optional(),
        ctaText: z.string().optional(),
      })).optional(),
    }).optional(),

    testimonials: z.object({
      label: z.string().optional(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      bgColor: z.string().optional(),
      autoplay: z.boolean().optional(),
      interval: z.number().optional(),
      items: z.array(z.object({
        id: z.number(),
        prefecture: z.string(),
        avatar: z.string(),
        title: z.string(),
        body: z.string(),
      })).optional(),
    }).optional(),

    howToUse: z.object({
      label: z.string().optional(),
      title: z.string().optional(),
      subtitle: z.string().optional(),
      steps: z.array(z.object({
        number: z.string(),
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        note: z.string().optional(),
      })).optional(),
      ctaText: z.string().optional(),
      ctaHref: z.string().optional(),
      ctaNote: z.string().optional(),
      bgColor: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { lps };