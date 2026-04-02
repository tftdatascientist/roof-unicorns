import pl from './pl.json';
import en from './en.json';

const translations = { pl, en } as const;

export type Locale = keyof typeof translations;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'pl';
}

export function getUnicornOfDay(locale: Locale) {
  const t = getTranslations(locale);
  const unicorns = t.unicornOfDay.unicorns;
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)) % unicorns.length;
  return unicorns[dayIndex];
}
