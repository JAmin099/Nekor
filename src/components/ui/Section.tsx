import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Shell({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-shell px-6 md:px-10', className)}>{children}</div>;
}

/**
 * Eyebrows carry the section's role, not decoration — they are the only
 * place the mono face appears in running layout.
 */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 font-mono text-eyebrow uppercase text-copper', className)}>
      <span className="h-3 w-px bg-copper" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Section({
  tone = 'dark',
  className,
  children,
  id
}: {
  tone?: 'dark' | 'light' | 'raised';
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const tones = {
    dark: 'bg-ink text-bone',
    raised: 'bg-slate text-bone',
    light: 'on-bone bg-bone text-ink'
  } as const;

  return (
    <section id={id} className={cn('py-20 md:py-28', tones[tone], className)}>
      <Shell>{children}</Shell>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="max-w-prose">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 font-display text-headline font-light">{title}</h2>
      {lead ? <p className="mt-5 text-base leading-relaxed opacity-80">{lead}</p> : null}
    </header>
  );
}
