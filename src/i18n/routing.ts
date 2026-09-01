import { defineRouting } from 'next-intl/routing';

export const locales = ['de', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

/**
 * Route keys are internal and stay in English.
 * The public URL segment is translated per locale (better SEO, no duplicate content).
 */
export const routing = defineRouting({
  locales,
  defaultLocale: 'de',
  localePrefix: 'always',
  localeDetection: true,
  pathnames: {
    '/': '/',
    '/clients': {
      de: '/experten-finden',
      en: '/find-experts',
      fr: '/trouver-des-experts'
    },
    '/candidates': {
      de: '/projekte-finden',
      en: '/find-projects',
      fr: '/trouver-des-missions'
    },
    '/careers': {
      de: '/karriere',
      en: '/careers',
      fr: '/carrieres'
    },
    '/about': {
      de: '/ueber-uns',
      en: '/about',
      fr: '/a-propos'
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contact': {
      de: '/kontakt',
      en: '/contact',
      fr: '/contact'
    },
    '/legal/imprint': {
      de: '/impressum',
      en: '/imprint',
      fr: '/mentions-legales'
    },
    '/legal/privacy': {
      de: '/datenschutz',
      en: '/privacy',
      fr: '/confidentialite'
    }
  }
});

export type Pathname = keyof typeof routing.pathnames;

/** Routes without dynamic segments — safe to pass straight to <Link href>. */
export type StaticPathname = Exclude<Pathname, `${string}[${string}`>;
