import type { Locale } from '@/i18n/routing';

export type Job = {
  id: string;
  location: string;
  type: 'fulltime' | 'parttime' | 'werkstudent';
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
};

/** Internal openings at Nekor. Replace with your ATS feed when you have one. */
export const jobs: Job[] = [
  {
    id: 'recruiter-it',
    location: 'Frankfurt am Main',
    type: 'fulltime',
    title: {
      de: 'Recruiter:in IT-Freelancing',
      en: 'IT Freelance Recruiter',
      fr: 'Recruteur·se freelance IT'
    },
    summary: {
      de: 'Du qualifizierst Kundenbedarfe, baust unser Freelancer-Netzwerk aus und begleitest Besetzungen bis zur Beauftragung.',
      en: 'You qualify client requirements, grow our freelance network and see placements through to signature.',
      fr: 'Vous qualifiez les besoins clients, développez notre réseau de freelances et accompagnez les placements jusqu’à la signature.'
    }
  },
  {
    id: 'werkstudent-sourcing',
    location: 'Remote',
    type: 'werkstudent',
    title: {
      de: 'Werkstudent:in Sourcing & Research',
      en: 'Working Student, Sourcing & Research',
      fr: 'Étudiant·e en alternance, sourcing & recherche'
    },
    summary: {
      de: 'Du recherchierst Profile, pflegst unseren Talentpool und unterstützt bei der Marktanalyse.',
      en: 'You research profiles, maintain our talent pool and support market analysis.',
      fr: 'Vous recherchez des profils, entretenez notre vivier et soutenez l’analyse de marché.'
    }
  }
];
