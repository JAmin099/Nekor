import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BlogList } from '@/components/ui/BlogList';
import { Section } from '@/components/ui/Section';
import { posts } from '@/content/posts';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return buildMetadata({ locale, href: '/blog', namespace: 'blog' });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Section className="pt-16 md:pt-24">
      <div className="relative max-w-3xl pl-8">
        <span aria-hidden="true" className="stem absolute left-0 top-0 h-full animate-stem" />
        <p className="font-mono text-eyebrow uppercase text-copper">{t('hero.eyebrow')}</p>
        <h1 className="mt-6 font-display text-display font-extralight">{t('hero.title')}</h1>
        <p className="mt-8 text-lg leading-relaxed text-bone/70">{t('hero.lead')}</p>
      </div>
      <div className="mt-20">
        <BlogList posts={sorted} />
      </div>
    </Section>
  );
}
