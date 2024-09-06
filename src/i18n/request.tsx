import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { type AbstractIntlMessages } from 'next-intl';
import { Locale, locales } from '../types/localesTypes';

const messageImports = {
  en: () => import('../messages/en.json'),
  ru: () => import('../messages/ru.json'),
} as const satisfies Record<Locale, () => Promise<{ default: AbstractIntlMessages }>>;

export function isValid(locale: unknown): locale is Locale {
  return locales.some((element) => element === locale);
}

export default getRequestConfig(async (params) => {
  const defaultLocale = new Intl.Locale(params.locale).baseName;
  if (!isValid(defaultLocale)) notFound();

  return {
    messages: (await messageImports[defaultLocale]()).default,
  };
});
