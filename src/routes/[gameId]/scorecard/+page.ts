import type {LoadEvent} from '@sveltejs/kit';

export const prerender = true;
export function load({ params }: LoadEvent) {
  if (!params.gameId || !/^\d+$/.test(params.gameId)) {
    return {
      status: 404,
    }
  }
  return {
    status: 200,
  };
}
