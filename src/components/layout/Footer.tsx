import { useTranslations } from 'next-intl';
import { Linkedin, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Wordmark } from '@/components/brand/Wordmark';
import { Shell } from '@/components/ui/Section';
import type { StaticPathname } from '@/i18n/routing';

const columns: { key: string; links: { href: StaticPathname; key: string }[] }[] = [
  {
    key: 'services',
    links: [
      { href: '/clients', key: 'findExperts' },
      { href: '/candidates', key: 'findProjects' }
    ]
  },
  {
    key: 'company',
    links: [
      { href: '/about', key: 'about' },
      { href: '/careers', key: 'careers' },
      { href: '/blog', key: 'blog' },
      { href: '/contact', key: 'contact' }
    ]
  },
  {
    key: 'legal',
    links: [
      { href: '/legal/imprint', key: 'imprint' },
      { href: '/legal/privacy', key: 'privacy' }
    ]
  }
];

export function Footer() {
  const t = useTranslations('nav');
  const tf = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink">
      <Shell className="grid gap-12 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <Wordmark />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/60">{tf('claim')}</p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={tf('linkedinUrl')}
              className="text-bone/60 transition-colors hover:text-copper"
              rel="noreferrer noopener"
              target="_blank"
            >
              <span className="sr-only">{tf('linkedin')}</span>
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${tf('email')}`} className="text-bone/60 transition-colors hover:text-copper">
              <span className="sr-only">{tf('emailLabel')}</span>
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {columns.map((column) => (
          <nav key={column.key} aria-label={tf(column.key)}>
            <p className="font-mono text-eyebrow uppercase text-copper">{tf(column.key)}</p>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline text-sm text-bone/75 hover:text-bone">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Shell>

      <Shell className="flex flex-col gap-3 border-t border-bone/10 py-6 text-xs text-bone/40 md:flex-row md:items-center md:justify-between">
        <p>{tf('copyright', { year })}</p>
        <p>{tf('address')}</p>
      </Shell>
    </footer>
  );
}
