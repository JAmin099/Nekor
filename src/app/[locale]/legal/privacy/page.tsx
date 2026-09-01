import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { LegalArticle } from '@/components/ui/LegalArticle';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return buildMetadata({ locale, href: '/legal/privacy', namespace: 'privacy' });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  return <LegalArticle namespace="privacy" />;
}
