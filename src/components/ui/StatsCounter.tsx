'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const keys = ['shortlist', 'candidates', 'upfront', 'documented'] as const;

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(start ? target : 0);

  useEffect(() => {
    if (!start) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || target === 0) {
      setValue(target);
      return;
    }

    let frame = 0;
    const duration = 1100;
    const started = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);

  return value;
}

function Stat({ statKey, visible }: { statKey: (typeof keys)[number]; visible: boolean }) {
  const t = useTranslations('home.stats.items');
  const target = Number(t(`${statKey}.value`));
  const value = useCountUp(Number.isFinite(target) ? target : 0, visible);

  return (
    <div className="border-t border-bone/10 pt-6">
      <p className="font-display text-4xl font-extralight md:text-5xl">
        {value}
        <span className="text-copper">{t(`${statKey}.unit`)}</span>
      </p>
      <p className="mt-3 text-sm leading-snug text-bone/60">{t(`${statKey}.label`)}</p>
    </div>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {keys.map((key) => (
        <Stat key={key} statKey={key} visible={visible} />
      ))}
    </div>
  );
}
