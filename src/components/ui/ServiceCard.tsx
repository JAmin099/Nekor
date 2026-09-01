import { Check } from 'lucide-react';

export type ServiceCardProps = {
  title: string;
  status?: string;
  description: string;
  benefits: string[];
  benefitsLabel: string;
};

export function ServiceCard({
  title,
  status,
  description,
  benefits,
  benefitsLabel
}: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col border border-ink/10 bg-paper p-8 transition-colors duration-300 hover:border-copper">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-light">{title}</h3>
        {status ? (
          <span className="whitespace-nowrap border border-copper px-2 py-1 font-mono text-eyebrow uppercase text-copper-deep">
            {status}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">{description}</p>
      <p className="mt-8 font-mono text-eyebrow uppercase text-ink/40">{benefitsLabel}</p>
      <ul className="mt-4 space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex gap-3 text-sm leading-snug text-ink/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
            {benefit}
          </li>
        ))}
      </ul>
    </article>
  );
}
