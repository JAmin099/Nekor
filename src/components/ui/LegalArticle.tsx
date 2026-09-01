import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';

type LegalSection = { heading: string; body: string };

/**
 * Renders a legal page from a `sections` array in messages so that
 * Impressum and Datenschutz stay fully translatable.
 */
export async function LegalArticle({ namespace }: { namespace: string }) {
  const t = await getTranslations(namespace);
  const sections = t.raw('sections') as LegalSection[];

  return (
    <Section className="pt-16 md:pt-24">
      <div className="mx-auto max-w-prose">
        <p className="font-mono text-eyebrow uppercase text-copper">{t('eyebrow')}</p>
        <h1 className="mt-6 font-display text-headline font-light">{t('title')}</h1>
        <p className="mt-6 text-sm text-bone/50">{t('updated')}</p>

        <div className="mt-14 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-light text-copper">{section.heading}</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-bone/75">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
