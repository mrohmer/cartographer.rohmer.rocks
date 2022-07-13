import {getLocaleFromNavigator, init as i18nInit, register} from 'svelte-i18n';

export const init = (): void => {
  register('en', () => import('./locales/en.json'));
  register('de', () => import('./locales/de.json'));

  i18nInit({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
}

