import {waitLocale} from 'svelte-i18n'
import {init} from '$lib/i18n';

export async function load() {
  init();
  await waitLocale();

  return {};
}
