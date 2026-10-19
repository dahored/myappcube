import { Instagram, Facebook, Youtube, type LucideIcon } from 'lucide-react';

export const studio = {
  name: 'myappcube',
  siteUrl: 'https://www.myappcube.com',
  email: 'hi@myappcube.com',
  googlePlayDeveloperUrl: 'https://play.google.com/store/apps/dev?id=8771045632526553752',
  appStoreDeveloperUrl: 'https://apps.apple.com/es/developer/diego-alejandro-hernandez-orrego/id1886540688',
  adsensePublisherId: 'ca-pub-5119314285197382',
} satisfies Record<string, unknown>;

/**
 * AdSense ad unit IDs (data-ad-slot). Create one "Display ad" (responsive)
 * per placement in AdSense → Ads → By ad unit, and paste its numeric ID here.
 * Empty = the block is not rendered.
 */
export const adSlots = {
  homeInContent: '',
  gamesList: '',
  gameDetail: '',
} as const;

export type AdSlot = keyof typeof adSlots;

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
