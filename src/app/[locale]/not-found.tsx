import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <Section className="min-h-[60vh]">
      <p className="font-mono text-eyebrow uppercase text-copper">404</p>
      <h1 className="mt-6 max-w-2xl font-display text-headline font-light">{t('title')}</h1>
      <p className="mt-5 max-w-prose text-bone/70">{t('lead')}</p>
      <ButtonLink href="/" className="mt-10">
        {t('cta')}
      </ButtonLink>
    </Section>
  );
}
