# Nekor Partners — Website

Mehrsprachige Corporate-Website (DE/EN/FR) auf Next.js 15, ausgelegt für Deployment auf Cloudflare Workers.

## Stack

| Zweck | Paket |
| --- | --- |
| Framework | Next.js 15.5 (App Router, React 19) |
| Sprache | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| i18n | next-intl 3.26 mit lokalisierten Pfaden |
| Formulare | react-hook-form + zod |
| Deployment | @opennextjs/cloudflare + wrangler |

Getestet mit `npm run typecheck` und `npm run build` (beides fehlerfrei).

## Loslegen

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL eintragen
npm run dev                  # http://localhost:3000/de
```

Node 20 oder höher wird vorausgesetzt, empfohlen ist 22.

## Deployment auf Cloudflare

Wichtig: **Workers, nicht Pages.** Cloudflare Pages unterstützt nur die Edge-Runtime; der OpenNext-Adapter braucht die Node-Runtime.

```bash
npm run cf:preview   # lokal gegen die Workers-Runtime testen
npm run cf:deploy    # deployen
```

Im Cloudflare-Projekt (Workers Builds):

* Build command: `npx opennextjs-cloudflare build`
* Deploy command: `npx wrangler deploy`
* Umgebungsvariable: `NODE_VERSION=22`

Die `wrangler.jsonc` setzt `nodejs_compat` und `global_fetch_strictly_public` — ohne diese Flags bricht der Build ab. Die Next-Version ist bewusst auf `^15.5.21` gepinnt: Der Adapter hat den Support für Next 14 in Q1 2026 eingestellt, und seine Peer-Dependency zeigt auf 15.5.21 bzw. 16.2.11.

## Internationalisierung

Es gibt **keine hartkodierten Texte im Code**. Jeder sichtbare String kommt aus `messages/{de,en,fr}.json`.

### Neuen Text hinzufügen

1. Key in `messages/de.json` anlegen (verschachtelt nach Seite/Komponente).
2. Denselben Key in `en.json` und `fr.json` ergänzen.
3. Im Server-Component mit `getTranslations('namespace')`, im Client-Component mit `useTranslations('namespace')` auslesen.

Fehlt ein Key in EN oder FR, greift automatisch der deutsche Fallback (`src/i18n/request.ts`). Ob die Sprachdateien deckungsgleich sind, prüft:

```bash
node -e "const a=require('./messages/de.json'),b=require('./messages/en.json');const k=o=>Object.entries(o).flatMap(([x,v])=>typeof v==='object'&&!Array.isArray(v)?k(v).map(s=>x+'.'+s):[x]);const d=k(a).filter(x=>!k(b).includes(x));console.log(d.length?d:'ok')"
```

### Neue Sprache hinzufügen

1. `messages/it.json` anlegen (Kopie von `de.json`, dann übersetzen).
2. In `src/i18n/routing.ts` das Kürzel in `locales` ergänzen.
3. In `pathnames` für jede Route das übersetzte URL-Segment eintragen.

Mehr ist nicht nötig — Sprachumschalter, hreflang-Tags, Sitemap-Alternates und `generateStaticParams` ziehen sich die Liste aus `routing.ts`.

### URLs

Die Route-Keys im Code sind englisch und intern (`/clients`), die öffentliche URL ist übersetzt (`/de/experten-finden`, `/fr/trouver-des-experts`). Deshalb gilt: **immer `Link` aus `@/i18n/navigation` importieren, nie aus `next/link`** — sonst gehen Locale-Präfix und übersetztes Segment verloren.

## Struktur

```
messages/            de.json, en.json, fr.json — sämtliche Texte
src/i18n/            routing (Locales + übersetzte Pfade), navigation, request
src/app/[locale]/    Seiten: Home, clients, candidates, careers, about, blog, contact, legal
src/app/api/contact/ Endpunkt für das Kontaktformular
src/components/      brand, layout, ui, forms, home
src/content/         posts.ts, jobs.ts — Beispielinhalte, ersetzbar durch CMS/ATS
src/lib/seo.ts       Metadaten, Canonical, hreflang
```

## Design

Die Tokens in `tailwind.config.ts` sind aus dem Logo abgeleitet:

* `ink` #14181C — der dunkle Grund des Wordmarks
* `bone` #F5F2EC — warmes Papierweiß für helle Sektionen
* `copper` #B9825A — der Kupfer-Stem im N, sparsam als einziger Akzent
* Schriften: Jost (Display, mager und weit gesperrt wie das Logo), Instrument Sans (Fließtext), IBM Plex Mono (Labels und Kennzahlen)

Das wiederkehrende Element ist die `.stem`-Klasse: eine senkrechte Kupferlinie, die den linken Strich des N zitiert. Sie teilt den Hero in zwei Seiten und markiert Seitenanfänge. Das Wordmark ist als SVG plus Live-Text umgesetzt, nicht als Bild — Skalierung, Kontrast und Screenreader bleiben intakt.

## Vor dem Livegang zwingend zu erledigen

1. **Testimonials** auf allen Seiten sind Platzhalter (`clients.testimonials`, `candidates.testimonials`). Echte Referenzen einsetzen oder die Sektion entfernen — nichts Erfundenes veröffentlichen.
2. **Impressum und Datenschutzerklärung** sind Gerüste mit Klammer-Platzhaltern. Anwaltlich prüfen lassen, insbesondere den Absatz zur Weitergabe von Freelancer-Profilen.
3. **Adresse, Telefonnummer, LinkedIn-URL** in `messages/*.json` unter `contact.details` und `footer` ersetzen.
4. **Kennzahlen** unter `home.stats` sind Prozessversprechen (48 h bis Shortlist, 3 Profile pro Bedarf). Nur stehen lassen, wenn ihr sie auch einhalten wollt — sie sind einklagbare Werbeaussagen.
5. **Kontaktformular** verschickt noch nichts. In `src/app/api/contact/route.ts` einen Versand einhängen (Resend, Postmark, SMTP oder CRM-Webhook) und einen Spam-Schutz ergänzen.
6. **`og.png`** (1200×630) in `public/` ablegen, sonst zeigen Link-Previews ein leeres Bild.
7. **Datenschutz-Praxis**: Der Formular-Endpunkt loggt bewusst keine Inhalte. Beim Anbinden eines Versands darauf achten, dass keine personenbezogenen Daten in Logs landen.
