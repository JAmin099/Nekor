import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SkillCloud } from '@/components/ui/SkillCloud';
import { TestimonialSlider } from '@/components/ui/TestimonialSlider';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeader, Shell } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

const models = ['direct', 'contracting', 'permanent'] as const;
const steps = ['intake', 'match', 'release', 'interview'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return buildMetadata({ locale, href: '/candidates', namespace: 'candidates' });
}

export default async function CandidatesPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const t = await getTranslations('candidates');

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
        <SectionHeader eyebrow={t('models.eyebrow')} title={t('models.title')} lead={t('models.lead')} />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {models.map((model) => (
            <ServiceCard
              key={model}
              title={t(`models.items.${model}.title`)}
              status={t(`models.items.${model}.status`)}
              description={t(`models.items.${model}.description`)}
              benefitsLabel={t('models.benefitsLabel')}
              benefits={t.raw(`models.items.${model}.benefits`) as string[]}
            />
          ))}
        </div>
      </Section>

      {/* Numbered because the process really is a sequence — each step gates the next. */}
      <Section tone="raised">
        <SectionHeader eyebrow={t('process.eyebrow')} title={t('process.title')} />
        <ol className="mt-16 grid gap-10 md:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="border-t border-copper/40 pt-6">
              <p className="font-mono text-eyebrow uppercase text-copper">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-5 font-display text-xl font-light">{t(`process.items.${step}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone/60">{t(`process.items.${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="light">
        <SectionHeader eyebrow={t('skills.eyebrow')} title={t('skills.title')} lead={t('skills.lead')} />
        <div className="mt-14">
          <SkillCloud skills={t.raw('skills.items') as string[]} />
        </div>
      </Section>

      <Section>
        <TestimonialSlider namespace="candidates.testimonials" />
      </Section>

      <section className="bg-slate py-20 md:py-24">
        <Shell className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="max-w-xl font-display text-headline font-light">{t('cta.title')}</h2>
            <p className="mt-4 max-w-prose text-bone/70">{t('cta.body')}</p>
          </div>
          <ButtonLink href="/contact">{t('cta.action')}</ButtonLink>
        </Shell>
      </section>
    </>
  );
}
