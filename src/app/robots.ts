import type { MetadataRoute } from 'next';
import { studio } from '@/config/studio';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${studio.siteUrl}/sitemap.xml`,
  };
}
