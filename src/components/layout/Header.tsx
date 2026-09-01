'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { Wordmark } from '@/components/brand/Wordmark';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { Shell } from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import type { StaticPathname } from '@/i18n/routing';

const primary: { href: StaticPathname; key: string }[] = [
  { href: '/clients', key: 'findExperts' },
  { href: '/candidates', key: 'findProjects' },
  { href: '/about', key: 'about' },
  { href: '/blog', key: 'blog' },
  { href: '/careers', key: 'careers' }
];

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-ink/90 backdrop-blur">
      <Shell className="flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label={t('home')} className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label={t('primary')} className="hidden items-center gap-8 lg:flex">
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={cn(
                'link-underline font-mono text-eyebrow uppercase',
                pathname === item.href ? 'text-copper' : 'text-bone/80 hover:text-bone'
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LocaleSwitcher className="hidden sm:flex" />
          <Link
            href="/contact"
            className="hidden border border-bone/25 px-5 py-3 font-mono text-eyebrow uppercase transition-colors duration-200 hover:border-copper hover:text-copper sm:inline-flex"
          >
            {t('contact')}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden"
          >
            <span className="sr-only">{open ? t('closeMenu') : t('openMenu')}</span>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Shell>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-bone/10 bg-ink lg:hidden"
      >
        <Shell className="flex flex-col gap-1 py-6">
          {[...primary, { href: '/contact' as StaticPathname, key: 'contact' }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-bone/5 py-4 font-display text-2xl font-light"
            >
              {t(item.key)}
            </Link>
          ))}
          <LocaleSwitcher className="pt-6" />
        </Shell>
      </div>
    </header>
  );
}
