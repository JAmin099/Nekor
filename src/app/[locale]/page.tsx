import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Cpu, Gauge, ShieldCheck } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { StatsCounter } from '@/components/ui/StatsCounter';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeader, Shell } from '@/components/ui/Section';
import { posts } from '@/content/posts';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

const values = [
  { key: 'technology', Icon: Cpu },
  { key: 'competence', Icon: ShieldCheck },
  { key: 'speed', Icon: Gauge }
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return buildMetadata({ locale, href: '/', namespace: 'home' });
}

export default async function HomePage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const t = await getTranslations('home');

  return (
    <>
      <Hero />

      <Section tone="raised">
        <p className="max-w-prose font-mono text-eyebrow uppercase text-copper">{t('stats.eyebrow')}</p>
        <div className="mt-12">
          <StatsCounter />
        </div>
        <p className="mt-10 max-w-prose text-sm leading-relaxed text-bone/50">{t('stats.note')}</p>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow={t('values.eyebrow')}
          title={t('values.title')}
          lead={t('values.lead')}
        />
        <div className="mt-16 grid gap-px bg-ink/10 md:grid-cols-3">
          {values.map(({ key, Icon }) => (
            <article key={key} className="bg-bone p-8">
              <Icon className="h-6 w-6 text-copper" aria-hidden="true" />
              <h3 className="mt-6 font-display text-2xl font-light">{t(`values.items.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{t(`values.items.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="bg-ink py-20 md:py-28">
        <Shell className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div className="relative pl-8">
            <span aria-hidden="true" className="stem absolute left-0 top-0 h-full" />
            <p className="font-mono text-eyebrow uppercase text-copper">{t('teaser.eyebrow')}</p>
            <h2 className="mt-6 font-display text-headline font-light">{t('teaser.title')}</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-bone/70">{t('teaser.body')}</p>
            <ButtonLink href="/about" variant="outline" className="mt-10">
              {t('teaser.cta')}
            </ButtonLink>
          </div>
        </Shell>
      </section>

      <Section tone="light">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow={t('journal.eyebrow')} title={t('journal.title')} />
          <ButtonLink href="/blog" variant="quiet">
            {t('journal.cta')}
          </ButtonLink>
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  );
}
