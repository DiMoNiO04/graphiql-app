import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { type AbstractIntlMessages } from 'next-intl';
import { Locale, locales } from '../types/localesTypes';

const messageImports = {
  en: () => import('../messages/en.json'),
  ru: () => import('../messages/ru.json'),
} as const satisfies Record<Locale, () => Promise<{ default: AbstractIntlMessages }>>;

export function isValidLocale(locale: unknown): locale is Locale {
  return locales.some((l) => l === locale);
}

export default getRequestConfig(async (params) => {
  const baseLocale = new Intl.Locale(params.locale).baseName;
  if (!isValidLocale(baseLocale)) notFound();

  return {
    messages: (await messageImports[baseLocale]()).default,
  };
});
