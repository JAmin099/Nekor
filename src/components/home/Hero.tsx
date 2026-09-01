import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Shell } from '@/components/ui/Section';
import type { StaticPathname } from '@/i18n/routing';

const paths: { href: StaticPathname; key: 'clients' | 'candidates' }[] = [
  { href: '/clients', key: 'clients' },
  { href: '/candidates', key: 'candidates' }
];

/**
 * The hero is the mark, enlarged: two sides held apart by one copper stem.
 * Left panel speaks to companies, right panel to freelancers.
 */
export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-ink">
      <Shell className="pb-16 pt-20 md:pb-24 md:pt-28">
        <p className="animate-rise font-mono text-eyebrow uppercase text-copper">{t('eyebrow')}</p>
        <h1 className="mt-8 max-w-4xl animate-rise font-display text-display font-extralight [animation-delay:120ms]">
          {t.rich('title', {
            accent: (chunks) => <span className="text-copper">{chunks}</span>
          })}
        </h1>
        <p className="mt-8 max-w-prose animate-rise text-lg leading-relaxed text-bone/70 [animation-delay:240ms]">
          {t('lead')}
        </p>
      </Shell>

      <div className="border-t border-bone/10">
        <Shell className="relative grid md:grid-cols-2">
          {/* The stem: the divider is the brand element, not a border. */}
          <span
            aria-hidden="true"
            className="stem absolute left-1/2 top-0 hidden h-full animate-stem [animation-delay:400ms] md:block"
          />
          {paths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group flex flex-col justify-between gap-10 border-b border-bone/10 py-12 pr-6 transition-colors duration-300 last:border-b-0 hover:bg-slate md:border-b-0 md:px-10 md:py-16 md:first:pl-0"
            >
              <div>
                <p className="font-mono text-eyebrow uppercase text-bone/40">{t(`${path.key}.eyebrow`)}</p>
                <p className="mt-5 font-display text-3xl font-light md:text-4xl">{t(`${path.key}.title`)}</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/60">{t(`${path.key}.body`)}</p>
              </div>
              <span className="inline-flex items-center gap-3 font-mono text-eyebrow uppercase text-copper">
                {t(`${path.key}.cta`)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          ))}
        </Shell>
      </div>
    </section>
  );
}
