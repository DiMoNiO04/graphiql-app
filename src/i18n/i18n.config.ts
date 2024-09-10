import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
};

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });
