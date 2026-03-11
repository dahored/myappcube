import { routing } from '@/i18n/routing';
import TvModeClient from './TvModeClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function TvModePage() {
  return <TvModeClient />;
}
