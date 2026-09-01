import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = routing.locales.includes(requested as Locale)
    ? (requested as Locale)
    : routing.defaultLocale;

  // Fallback: keys missing in a locale fall back to the default locale (de).
  const fallback = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages: { ...fallback, ...messages },
    timeZone: 'Europe/Berlin',
    now: new Date()
  };
});
