import type {PageLoad} from '../../../../../../.svelte-kit/types/src/routes/cartographer/[gameId]/scorecard/$types';

export const prerender = true;
export const load: PageLoad = ({ params }) => {
  if (!params.gameId || !/^\d+$/.test(params.gameId)) {
    return {
      status: 404,
    }
  }
  return {
    status: 200,
  };
}
