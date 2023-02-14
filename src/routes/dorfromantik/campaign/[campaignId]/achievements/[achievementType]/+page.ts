import type {Load} from '@sveltejs/kit';
import {error} from '@sveltejs/kit';

export const prerender = true;

export const load: Load = ({params}) => {
  if (!params.achievementType || !['campaign-path', 'boxes'].includes(params.achievementType)) {
    throw error(404);
  }
}
