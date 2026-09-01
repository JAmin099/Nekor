import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeader } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

const milestones = ['founded', 'network', 'next'] as const;
const principles = ['direct', 'consent', 'transparency'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return buildMetadata({ locale, href: '/about', namespace: 'about' });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const t = await getTranslations('about');

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
        <SectionHeader eyebrow={t('story.eyebrow')} title={t('story.title')} />
        <div className="mt-14 grid gap-16 md:grid-cols-[2fr_1fr]">
          <div className="max-w-prose space-y-6 text-base leading-relaxed text-ink/75">
            <p>{t('story.paragraphOne')}</p>
            <p>{t('story.paragraphTwo')}</p>
          </div>
          <ol className="space-y-8">
            {milestones.map((milestone) => (
              <li key={milestone} className="border-l border-copper pl-6">
                <p className="font-mono text-eyebrow uppercase text-copper">
                  {t(`story.timeline.${milestone}.when`)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {t(`story.timeline.${milestone}.what`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeader eyebrow={t('principles.eyebrow')} title={t('principles.title')} />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle} className="border-t border-bone/15 pt-6">
              <h3 className="font-display text-2xl font-light">{t(`principles.items.${principle}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone/60">
                {t(`principles.items.${principle}.body`)}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader eyebrow={t('team.eyebrow')} title={t('team.title')} lead={t('team.lead')} />
        <ButtonLink href="/careers" variant="quiet" className="mt-10">
          {t('team.cta')}
        </ButtonLink>
      </Section>
    </>
  );
}
