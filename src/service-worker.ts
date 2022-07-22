import {build, files} from '$service-worker';
import {setDefaultHandler, setCatchHandler} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';
import {warmStrategyCache} from 'workbox-recipes';


const FALLBACK_GAME_URL = '/0/scorecard';
const FALLBACK_URL = '/404';

const staticRoutesToCache = [
  '/',
  '/new',
  '/new/wasteland',
]

const urls = [
  FALLBACK_GAME_URL,
  FALLBACK_URL,
  ...staticRoutesToCache,
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
    if (/\/\d+\/scorecard(\?|#|$)/.test(request.url)) {
      return strategy.handle({event, request: FALLBACK_GAME_URL});
    }
    return strategy.handle({event, request: FALLBACK_URL});
  }
  return Response.error();
})

skipWaiting();
