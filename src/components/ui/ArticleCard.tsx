import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import type { Post } from '@/content/posts';

export function ArticleCard({ post }: { post: Post }) {
  const locale = useLocale() as Locale;
  const format = useFormatter();
  const t = useTranslations('blog');

  return (
    <article className="group flex h-full flex-col border-t border-current/15 pt-6">
      <p className="flex items-center gap-3 font-mono text-eyebrow uppercase opacity-50">
        <time dateTime={post.date}>
          {format.dateTime(new Date(post.date), { year: 'numeric', month: 'short', day: 'numeric' })}
        </time>
        <span aria-hidden="true">·</span>
        {t(`categories.${post.category}`)}
      </p>
      <h3 className="mt-4 font-display text-xl font-light leading-snug">
        <Link href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }} className="link-underline">
          {post.title[locale]}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed opacity-70">{post.excerpt[locale]}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-mono text-eyebrow uppercase text-copper">
        {t('readMore')}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
