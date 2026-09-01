import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { Section, Shell } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  return buildMetadata({ locale, href: '/contact', namespace: 'contact' });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const t = await getTranslations('contact');

  return (
    <>
      <Section className="pt-16 md:pt-24">
        <div className="relative max-w-3xl pl-8">
          <span aria-hidden="true" className="stem absolute left-0 top-0 h-full animate-stem" />
          <p className="font-mono text-eyebrow uppercase text-copper">{t('hero.eyebrow')}</p>
          <h1 className="mt-6 font-display text-display font-extralight">{t('hero.title')}</h1>
          <p className="mt-8 text-lg leading-relaxed text-bone/70">{t('hero.lead')}</p>
        </div>
      </Section>

      <section className="on-bone bg-bone py-20 text-ink md:py-28">
        <Shell className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-light">{t('form.title')}</h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <p className="font-mono text-eyebrow uppercase text-copper">{t('details.officeLabel')}</p>
              <p className="mt-4 flex gap-3 text-sm leading-relaxed text-ink/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
                <span className="whitespace-pre-line">{t('details.address')}</span>
              </p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-copper">{t('details.reachLabel')}</p>
              <ul className="mt-4 space-y-3 text-sm text-ink/75">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-copper" aria-hidden="true" />
                  <a className="link-underline" href={`mailto:${t('details.email')}`}>
                    {t('details.email')}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-copper" aria-hidden="true" />
                  <a className="link-underline" href={`tel:${t('details.phoneHref')}`}>
                    {t('details.phone')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-copper">{t('details.responseLabel')}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/75">{t('details.response')}</p>
            </div>
          </aside>
        </Shell>
      </section>
    </>
  );
}
