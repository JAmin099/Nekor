import type { Locale } from '@/i18n/routing';

export type PostCategory = 'market' | 'compliance' | 'hiring';

export type Post = {
  slug: string;
  date: string;
  category: PostCategory;
  readingMinutes: number;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string[]>;
};

/**
 * Placeholder editorial content. Swap this module for a CMS client
 * (Sanity, Storyblok, Contentful) — the pages only depend on the Post type.
 */
export const posts: Post[] = [
  {
    slug: 'direktvertrag-statt-zwischenrechnung',
    date: '2026-07-14',
    category: 'market',
    readingMinutes: 5,
    title: {
      de: 'Direktvertrag statt Zwischenrechnung: was das für Ihr Budget heißt',
      en: 'Direct contract instead of a middleman invoice: what it does to your budget',
      fr: 'Contrat direct plutôt que facturation intermédiaire : l’effet sur votre budget'
    },
    excerpt: {
      de: 'Wer den Freelancer selbst kontrahiert, zahlt keine laufende Marge. Wir rechnen vor, ab welcher Projektlaufzeit sich das lohnt.',
      en: 'Contracting the freelancer yourself means no running margin. Here is the point at which that starts to pay off.',
      fr: 'Contracter directement le freelance supprime la marge récurrente. Voici à partir de quand cela devient rentable.'
    },
    body: {
      de: [
        'In der klassischen Personaldienstleistung liegt zwischen Kunde und Freelancer ein Dienstleister, der auf jede abgerechnete Stunde eine Marge legt. Über zwölf Monate summiert sich das erheblich.',
        'Im Direct Placement schließen Kunde und Freelancer den Projektvertrag selbst. Der Dienstleister wird einmalig für die Vermittlung bezahlt, danach entstehen keine weiteren Kosten.',
        'Das Modell passt nicht überall: Wer Lieferantenkonsolidierung braucht oder keine Einzelverträge mit Selbstständigen schließen will, fährt mit einem Contracting-Modell besser.'
      ],
      en: [
        'In classic staffing there is a provider between client and freelancer who adds a margin to every billed hour. Over twelve months that adds up.',
        'In direct placement, client and freelancer sign the project contract themselves. The provider is paid once for the introduction, and nothing after that.',
        'The model is not for everyone: if you need supplier consolidation or cannot contract individually with self-employed specialists, contracting suits you better.'
      ],
      fr: [
        'Dans le placement classique, un prestataire s’intercale entre le client et le freelance et ajoute une marge à chaque heure facturée. Sur douze mois, la somme est considérable.',
        'En placement direct, le client et le freelance signent eux-mêmes le contrat de mission. Le prestataire est payé une seule fois pour la mise en relation.',
        'Ce modèle ne convient pas partout : si vous avez besoin de consolider vos fournisseurs, le contracting reste plus adapté.'
      ]
    }
  },
  {
    slug: 'scheinselbststaendigkeit-vermeiden',
    date: '2026-06-02',
    category: 'compliance',
    readingMinutes: 7,
    title: {
      de: 'Scheinselbstständigkeit vermeiden: sechs Punkte für den Projektzuschnitt',
      en: 'Avoiding bogus self-employment: six points for scoping a project',
      fr: 'Éviter le faux travail indépendant : six points pour cadrer une mission'
    },
    excerpt: {
      de: 'Weisungsbindung, Eingliederung, Exklusivität: woran Projekte in der Prüfung scheitern und wie sich das im Briefing verhindern lässt.',
      en: 'Direction, integration, exclusivity: where projects fail an audit, and how to prevent it in the brief.',
      fr: 'Subordination, intégration, exclusivité : ce qui fait échouer un audit et comment l’éviter dès le brief.'
    },
    body: {
      de: [
        'Die Abgrenzung zwischen selbstständiger Tätigkeit und abhängiger Beschäftigung entscheidet sich am gelebten Projektalltag, nicht am Vertragstext.',
        'Ein sauberes Briefing beschreibt ein Gewerk mit Ergebnis und Abnahmekriterien, nicht eine Rolle mit Anwesenheitszeiten.',
        'Dieser Beitrag ersetzt keine Rechtsberatung. Bei Zweifeln gehört ein Statusfeststellungsverfahren in die Projektvorbereitung.'
      ],
      en: [
        'Whether work counts as self-employed or dependent is decided by day-to-day reality, not by the wording of the contract.',
        'A clean brief describes a deliverable with acceptance criteria, not a role with office hours.',
        'This article is not legal advice. Where there is doubt, a formal status determination belongs in the project preparation.'
      ],
      fr: [
        'La distinction entre travail indépendant et emploi salarié se joue dans le quotidien du projet, pas dans le texte du contrat.',
        'Un brief propre décrit un livrable avec des critères de réception, pas un poste avec des horaires.',
        'Cet article ne constitue pas un conseil juridique. En cas de doute, prévoyez une procédure de qualification en amont.'
      ]
    }
  },
  {
    slug: 'shortlist-in-48-stunden',
    date: '2026-05-08',
    category: 'hiring',
    readingMinutes: 4,
    title: {
      de: 'Wie eine Shortlist in 48 Stunden entsteht',
      en: 'How a shortlist comes together in 48 hours',
      fr: 'Comment une shortlist se construit en 48 heures'
    },
    excerpt: {
      de: 'Drei Profile statt dreißig: Wie wir Bedarfe qualifizieren, bevor wir überhaupt mit dem Suchen anfangen.',
      en: 'Three profiles instead of thirty: how we qualify a requirement before searching at all.',
      fr: 'Trois profils au lieu de trente : comment nous qualifions un besoin avant même de chercher.'
    },
    body: {
      de: [
        'Die meiste Zeit geht nicht bei der Suche verloren, sondern bei unklaren Anforderungen. Deshalb steht am Anfang ein strukturiertes Bedarfsgespräch.',
        'Rolle, Skills, Start, Dauer, Auslastung, Remote-Anteil, Budget, Entscheider und Interviewprozess werden vor dem Sourcing geklärt.',
        'Erst danach gehen Profile raus — anonymisiert, bis die Konditionen bestätigt sind.'
      ],
      en: [
        'Most time is lost on unclear requirements, not on searching. So we start with a structured intake call.',
        'Role, skills, start, duration, workload, remote share, budget, decision maker and interview process are settled before sourcing begins.',
        'Only then do profiles go out — anonymised until the terms are confirmed.'
      ],
      fr: [
        'Le temps se perd rarement dans la recherche, mais dans des besoins mal définis. Nous commençons donc par un entretien de cadrage structuré.',
        'Rôle, compétences, démarrage, durée, charge, part de télétravail, budget, décideur et processus d’entretien sont clarifiés avant le sourcing.',
        'Ensuite seulement, les profils partent — anonymisés tant que les conditions ne sont pas confirmées.'
      ]
    }
  }
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
