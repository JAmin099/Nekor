import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Always import Link/useRouter from here, never from `next/link`,
 * otherwise the locale prefix and the translated segments are lost.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
