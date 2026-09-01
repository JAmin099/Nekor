'use client';

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('nav');
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    startTransition(() => {
      // Keeps dynamic segments (e.g. blog slug) while swapping the locale.
      router.replace({ pathname, params: params as never }, { locale: next });
    });
  }

  return (
    <div
      className={cn('flex items-center gap-1 font-mono text-eyebrow uppercase', className)}
      role="group"
      aria-label={t('language')}
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 ? <span aria-hidden="true" className="opacity-30">/</span> : null}
          <button
            type="button"
            lang={locale}
            disabled={isPending}
            aria-current={locale === active ? 'true' : undefined}
            onClick={() => switchTo(locale)}
            className={cn(
              'px-1 py-1 transition-colors duration-200',
              locale === active ? 'text-copper' : 'opacity-60 hover:opacity-100'
            )}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
