import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/navigation';
import { locales, type Locale, type Pathname } from '@/i18n/routing';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

type Params = {
  locale: Locale;
  /** Route key, e.g. '/clients' — not the translated segment. */
  href: Pathname;
  /** Namespace inside messages that holds `title` and `description`. */
  namespace: string;
};

/**
 * Builds title, description, canonical and hreflang alternates for one page.
 * Every locale of a page points at every other locale, plus x-default.
 */
export async function buildMetadata({
  locale,
  href,
  namespace
}: Params): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  const canonical = siteUrl + getPathname({ locale, href: href as never });

  const languages = Object.fromEntries(
    locales.map((l) => [l, siteUrl + getPathname({ locale: l, href: href as never })])
  );

  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        'x-default': siteUrl + getPathname({ locale: 'de', href: href as never })
      }
    },
    openGraph: {
      type: 'website',
      siteName: tMeta('siteName'),
      locale,
      url: canonical,
      title,
      description,
      images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: tMeta('siteName') }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
