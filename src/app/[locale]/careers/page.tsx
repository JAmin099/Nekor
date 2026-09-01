import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeader } from '@/components/ui/Section';
import { jobs } from '@/content/jobs';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return buildMetadata({ locale, href: '/careers', namespace: 'careers' });
}

export default async function CareersPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const t = await getTranslations('careers');
  const active = (await getLocale()) as Locale;

  return (
    <>
      <Section className="pt-16 md:pt-24">
        <div className="relative max-w-3xl pl-8">
          <span aria-hidden="true" className="stem absolute left-0 top-0 h-full animate-stem" />
          <p className="font-mono text-eyebrow uppercase text-copper">{t('hero.eyebrow')}</p>
          <h1 className="mt-6 font-display text-display font-extralight">{t('hero.title')}</h1>
          <p className="mt-8 text-lg leading-relaxed text-bone/70">{t('hero.lead')}</p>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader eyebrow={t('openings.eyebrow')} title={t('openings.title')} />

        {jobs.length === 0 ? (
          <p className="mt-12 max-w-prose text-ink/70">{t('openings.empty')}</p>
        ) : (
          <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {jobs.map((job) => (
              <li key={job.id}>
                <article className="grid gap-6 py-8 md:grid-cols-[2fr_1fr_auto] md:items-center">
                  <div>
                    <h3 className="font-display text-2xl font-light">{job.title[active]}</h3>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/70">
                      {job.summary[active]}
                    </p>
                  </div>
                  <p className="flex items-center gap-2 font-mono text-eyebrow uppercase text-ink/60">
                    <MapPin className="h-4 w-4 text-copper" aria-hidden="true" />
                    {job.location} · {t(`openings.types.${job.type}`)}
                  </p>
                  <ButtonLink href="/contact" variant="quiet">
                    {t('openings.apply')}
                  </ButtonLink>
                </article>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-12 max-w-prose text-sm leading-relaxed text-ink/60">{t('openings.speculative')}</p>
      </Section>
    </>
  );
}
