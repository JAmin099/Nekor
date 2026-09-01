import Link from 'next/link';

/**
 * Rendered when the middleware cannot resolve a locale at all.
 * It sits outside `[locale]`, so it brings its own document shell.
 */
export default function GlobalNotFound() {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#14181C',
          color: '#F5F2EC',
          fontFamily: 'ui-sans-serif, system-ui'
        }}
      >
        <main style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ letterSpacing: '0.18em', fontSize: '0.75rem', color: '#B9825A' }}>404</p>
          <h1 style={{ fontWeight: 300, fontSize: '2rem' }}>Page not found</h1>
          <Link href="/de" style={{ color: '#B9825A' }}>
            nekor-partners.com
          </Link>
        </main>
      </body>
    </html>
  );
}
