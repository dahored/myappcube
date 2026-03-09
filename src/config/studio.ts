import { Instagram, Facebook, Youtube, type LucideIcon } from 'lucide-react';

export const studio = {
  name: 'myappcube',
  siteUrl: 'https://myappcube.com',
  email: 'dahoreddiegohernandez@gmail.com',
  googlePlayDeveloperUrl: 'https://play.google.com/store/apps/developer?id=myappcube',
  adsensePublisherId: 'ca-pub-5119314285197382',
  /** Controlled via NEXT_PUBLIC_COMING_SOON env var — set to "false" in Vercel to launch */
  comingSoon: process.env.NEXT_PUBLIC_COMING_SOON !== 'false',
} satisfies Record<string, unknown>;

export interface Social {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const socials: Social[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/myappcube/',
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61586452775068',
    icon: Facebook,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@myappcube',
    icon: Youtube,
  },
];
