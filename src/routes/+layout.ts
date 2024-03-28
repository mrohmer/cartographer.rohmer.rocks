import {waitLocale} from 'svelte-i18n'
import {init} from '$lib/i18n';
import type {LayoutLoad} from './$types';

export const load: LayoutLoad = async () => {
  init();
  await waitLocale();

  return {};
}
