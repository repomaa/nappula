import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import en from './translations/en';
import fi from './translations/fi';
import de from './translations/de';

export type Locale = 'en' | 'fi' | 'de';
export type Translation = typeof en;

const translations: Record<Locale, Translation> = { en, fi, de };

const defaultLocale: Locale = 'en';

function getBrowserLocale(): Locale {
	if (!browser) return defaultLocale;
	const browserLang = navigator.language.split('-')[0];
	if (browserLang === 'fi') return 'fi';
	if (browserLang === 'de') return 'de';
	return 'en';
}

const browserLocale = getBrowserLocale();

export const locale = writable<Locale>(browserLocale);

export function t(localeValue: Locale): Translation {
	return translations[localeValue] || translations[defaultLocale];
}
