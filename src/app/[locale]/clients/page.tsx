import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SkillCloud } from '@/components/ui/SkillCloud';
import { TestimonialSlider } from '@/components/ui/TestimonialSlider';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeader, Shell } from '@/components/ui/Section';
import { posts } from '@/content/posts';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

const models = ['direct', 'contracting', 'permanent'] as const;
const advantages = ['protected', 'shortlist', 'documented'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return buildMetadata({ locale, href: '/clients', namespace: 'clients' });
}

export default async function ClientsPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const t = await getTranslations('clients');

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

      <Section tone="raised">
        <SectionHeader eyebrow={t('skills.eyebrow')} title={t('skills.title')} lead={t('skills.lead')} />
        <div className="mt-14">
          <SkillCloud skills={t.raw('skills.items') as string[]} />
        </div>
      </Section>

      <Section tone="light">
        <div className="grid gap-px bg-ink/10 md:grid-cols-3">
          {advantages.map((advantage, index) => (
            <article key={advantage} className="bg-bone p-8">
              <p className="font-mono text-eyebrow uppercase text-copper">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-6 font-display text-2xl font-light">
                {t(`advantages.items.${advantage}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {t(`advantages.items.${advantage}.body`)}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <TestimonialSlider namespace="clients.testimonials" />
      </Section>

      <section className="bg-copper py-20 text-ink md:py-24">
        <Shell className="flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="max-w-xl font-display text-headline font-light">{t('cta.title')}</h2>
            <p className="mt-4 max-w-prose text-ink/80">{t('cta.body')}</p>
          </div>
          <ButtonLink href="/contact" className="bg-ink text-bone hover:bg-slate">
            {t('cta.action')}
          </ButtonLink>
        </Shell>
      </section>

      <Section tone="light">
        <SectionHeader eyebrow={t('journal.eyebrow')} title={t('journal.title')} />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  );
}
