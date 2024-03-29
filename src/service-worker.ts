import {build, files} from '$service-worker';
import {setDefaultHandler, setCatchHandler} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';
import {warmStrategyCache} from 'workbox-recipes';

interface GameCatchHandler {
  canHandle: (request: Request) => boolean;
  handle: (request: Request) => Promise<Response>|undefined;
}
interface Game {
  staticRoutesToCache?: string[],
  catchHandler?: GameCatchHandler;
}

type GameFactory = () => Game;
const cartographer: GameFactory = () => {
  const CARTOGRAPHER_FALLBACK_GAME_URL = '/cartographer/0/scorecard';
  const CARTOGRAPHER_FALLBACK_URL = '/cartographer/404';

  return {
    staticRoutesToCache: [
      CARTOGRAPHER_FALLBACK_GAME_URL,
      CARTOGRAPHER_FALLBACK_URL,
      '/cartographer',
      '/cartographer/new',
      '/cartographer/new/wasteland',
    ],
    catchHandler: {
      canHandle: request => request.url.startsWith('/cartographer'),
      handle: request => {
        if (/\/cartographer\/\d+\/scorecard(\?|#|$)/.test(request.url)) {
          return strategy.handle({event, request: CARTOGRAPHER_FALLBACK_GAME_URL});
        }
        return strategy.handle({event, request: CARTOGRAPHER_FALLBACK_URL});
      }
    }
  }
}


const games = [
  cartographer(),
]
const urls = [
  '/',
  ...games
    .filter(({staticRoutesToCache}) => staticRoutesToCache?.length)
    .reduce(
      (prev, {staticRoutesToCache}) => [...prev, ...staticRoutesToCache!],
      [] as string[],
    ),
  ...build,
  ...files,
];

const strategy = new NetworkFirst();
warmStrategyCache({
  urls,
  strategy,
});

setDefaultHandler(strategy);

setCatchHandler(async ({request, event}) => {
  if (request.destination === 'document') {
    const response = games
      .filter(g => g.catchHandler?.canHandle(request))
      .map(g => g.catchHandler!)
      .reduce(
        (prev, curr) => prev ?? curr.handle(request),
        undefined as Promise<Response>|undefined,
      );

    if (response) {
      return response;
    }
  }
  return Response.error();
})

skipWaiting();
