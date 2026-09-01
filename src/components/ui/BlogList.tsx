'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArticleCard } from '@/components/ui/ArticleCard';
import type { Post, PostCategory } from '@/content/posts';
import { cn } from '@/lib/utils';

const categories: PostCategory[] = ['market', 'compliance', 'hiring'];

export function BlogList({ posts }: { posts: Post[] }) {
  const t = useTranslations('blog');
  const [active, setActive] = useState<PostCategory | 'all'>('all');

  const visible = useMemo(
    () => (active === 'all' ? posts : posts.filter((post) => post.category === active)),
    [posts, active]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3" role="group" aria-label={t('filterLabel')}>
        {(['all', ...categories] as const).map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={cn(
              'border px-4 py-2 font-mono text-eyebrow uppercase transition-colors duration-200',
              active === category
                ? 'border-copper bg-copper text-ink'
                : 'border-current/20 hover:border-copper hover:text-copper'
            )}
          >
            {category === 'all' ? t('all') : t(`categories.${category}`)}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 max-w-prose opacity-70">{t('empty')}</p>
      ) : (
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {visible.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
