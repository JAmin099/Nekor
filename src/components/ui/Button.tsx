import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'outline' | 'quiet';

const base =
  'group inline-flex items-center justify-center gap-3 px-6 py-3.5 font-mono text-eyebrow uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  solid: 'bg-copper text-ink hover:bg-copper-soft',
  outline: 'border border-current text-bone hover:bg-bone hover:text-ink',
  quiet: 'border border-ink/20 text-ink hover:border-copper hover:text-copper'
};

export function ButtonLink({
  variant = 'solid',
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'solid',
  className,
  children,
  ...props
}: ComponentProps<'button'> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
