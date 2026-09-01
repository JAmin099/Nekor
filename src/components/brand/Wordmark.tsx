import { cn } from '@/lib/utils';

/**
 * The mark is drawn, not typeset: two hairline strokes joined by a diagonal,
 * with the left stem in copper. The wordmark next to it is live text, so it
 * scales with the type system and stays selectable.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 32"
      aria-hidden="true"
      focusable="false"
      className={cn('h-8 w-auto', className)}
    >
      <rect x="2" y="0" width="3.2" height="32" className="fill-copper" />
      <line x1="6.6" y1="0.7" x2="18.4" y2="31.3" stroke="currentColor" strokeWidth="1.3" />
      <rect x="18.4" y="0" width="1.3" height="32" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({
  className,
  label = 'Nekor'
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-3 text-bone', className)}>
      <Monogram className="h-7" />
      <span className="font-display text-xl font-light uppercase tracking-[0.32em]">
        {label.slice(1)}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
