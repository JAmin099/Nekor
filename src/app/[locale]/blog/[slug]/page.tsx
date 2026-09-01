import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { getPost, posts } from '@/content/posts';
import { buildMetadata, siteUrl } from '@/lib/seo';
import { getPathname } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const post = getPost(slug);

  if (!post) return buildMetadata({ locale, href: '/blog', namespace: 'blog' });

  const href = { pathname: '/blog/[slug]' as const, params: { slug } };

  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: {
      canonical: siteUrl + getPathname({ locale, href }),
      languages: Object.fromEntries(
        locales.map((l) => [l, siteUrl + getPathname({ locale: l, href })])
      )
    },
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      title: post.title[locale],
      description: post.excerpt[locale]
    }
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const format = await getFormatter();

  return (
    <Section className="pt-16 md:pt-24">
      <article className="mx-auto max-w-prose">
        <p className="flex flex-wrap items-center gap-3 font-mono text-eyebrow uppercase text-copper">
          <time dateTime={post.date}>
            {format.dateTime(new Date(post.date), { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span aria-hidden="true" className="text-bone/30">
            ·
          </span>
          {t(`categories.${post.category}`)}
          <span aria-hidden="true" className="text-bone/30">
            ·
          </span>
          <span className="text-bone/50">{t('readingTime', { minutes: post.readingMinutes })}</span>
        </p>

        <h1 className="mt-8 font-display text-headline font-light">{post.title[locale]}</h1>
        <p className="mt-6 text-lg leading-relaxed text-bone/70">{post.excerpt[locale]}</p>

        <div className="mt-12 space-y-6 leading-relaxed text-bone/80">
          {post.body[locale].map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="mt-16 border-t border-bone/10 pt-8">
          <ButtonLink href="/blog" variant="outline">
            {t('backToOverview')}
          </ButtonLink>
        </footer>
      </article>
    </Section>
  );
}
