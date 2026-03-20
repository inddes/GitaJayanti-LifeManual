import { en } from './en';
import { hi } from './hi';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { ru } from './ru';
import { it } from './it';

export type TranslationKeys = typeof en;

export const translations = {
  en,
  hi,
  es,
  fr,
  de,
  ru,
  it,
};

export type Language = keyof typeof translations;

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
];
