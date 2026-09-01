import { cn } from '@/lib/utils';

/** Weighted by position so the cloud reads as a hierarchy, not as noise. */
export function SkillCloud({ skills }: { skills: string[] }) {
  return (
    <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-4">
      {skills.map((skill, index) => (
        <li
          key={skill}
          className={cn(
            'font-display font-light leading-none transition-colors duration-300',
            index % 5 === 0 && 'text-3xl text-copper md:text-4xl',
            index % 5 === 1 && 'text-xl opacity-90 md:text-2xl',
            index % 5 === 2 && 'text-base opacity-60',
            index % 5 === 3 && 'text-2xl opacity-80 md:text-3xl',
            index % 5 === 4 && 'text-lg opacity-70'
          )}
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}
