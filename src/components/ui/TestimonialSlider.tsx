'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const keys = ['one', 'two', 'three'] as const;

export function TestimonialSlider({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const [index, setIndex] = useState(0);
  const current = keys[index];

  const move = (delta: number) => setIndex((value) => (value + delta + keys.length) % keys.length);

  return (
    <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:items-end">
      <figure aria-live="polite">
        <blockquote className="font-display text-2xl font-light leading-snug md:text-3xl">
          {t(`items.${current}.quote`)}
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4 text-sm">
          <span className="h-10 w-px bg-copper" aria-hidden="true" />
          <span>
            <span className="block">{t(`items.${current}.name`)}</span>
            <span className="block opacity-60">{t(`items.${current}.role`)}</span>
          </span>
        </figcaption>
      </figure>

      <div className="flex items-center gap-4 md:justify-end">
        <button
          type="button"
          onClick={() => move(-1)}
          className="border border-current p-3 transition-colors duration-200 hover:text-copper"
        >
          <span className="sr-only">{t('previous')}</span>
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          className="border border-current p-3 transition-colors duration-200 hover:text-copper"
        >
          <span className="sr-only">{t('next')}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="font-mono text-eyebrow">
          {index + 1} / {keys.length}
        </span>
      </div>
    </div>
  );
}
