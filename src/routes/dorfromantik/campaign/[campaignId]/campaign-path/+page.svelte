<script lang="ts">
  import StartNode from "./_/components/StartNode.svelte";
  import Connection from './_/components/Connection.svelte';
  import Row from './_/components/Row.svelte';
  import Node from './_/components/Node.svelte';
  import {browser} from '$app/environment';
  import {page} from '$app/stores';
  import {liveQuery} from 'dexie';
  import {dorfromantikDB} from '$lib/db';
  import {calcAllCampaignPathSteps} from '$lib/utils/games/dorfromantik/calc-all-campaign-path-steps';
  import {readable} from 'svelte/store';
  import type {DorfromantikCampaign} from '$lib/models/games/dorfromantik/campaign';
  import {
    DorfromantikBoxAchievement,
    DorfromantikCampaignPathRedHeartAchievement
  } from '../../../../../lib/models/games/dorfromantik/achievement';

  export let data: Record<'campaign', DorfromantikCampaign | undefined>;

  let containerEl: HTMLDivElement;
  const createEmptyConnectionState = (length: number): boolean[] => Array.from(Array(length)).map(() => false);
  const createEmptyConnectionStates = (length: number, stateLength: number) => Array.from(Array(length)).map(() => createEmptyConnectionState(stateLength));
  const centerScrollX = (el: HTMLElement) => {
    if (!el) {
      return;
    }

    if (el.scrollWidth <= el.offsetWidth) {
      return;
    }

    el.scrollTo({left: (el.scrollWidth - el.offsetWidth) / 2, behavior: 'smooth'})
  }
  const createEmptyState = () => [
    createEmptyConnectionState(2),
    createEmptyConnectionState(4),
    createEmptyConnectionStates(2, 4),
    createEmptyConnectionStates(4, 6),
    createEmptyConnectionStates(3, 7),
    createEmptyConnectionStates(3, 10),
    createEmptyConnectionStates(3, 10),
  ];
  const resetState = (s: DorfromantikCampaign['campaignPath']) => {
    if (!data?.campaign) {
      return;
    }
    data.campaign.campaignPath = s ?? createEmptyState();
  };
  const resetClickable = (s: DorfromantikCampaign['campaignPath']) => {
    clickable = (s ?? createEmptyState())
      .map((row) => {
        if (typeof row[0] === 'boolean') {
          return row?.every?.(i => i) ?? false;
        }
        return row.map(column => column?.every?.(i => i) ?? false);
      });
  }
  const handleCompleteBox = (nbr: 1 | 2) => async () => {
    if (nbr === 1) {
      if ($campaign?.boxAchievements?.[DorfromantikBoxAchievement.RED_HEART]) {
        return;
      }

      if (confirm(`Rotes Herz freischalten?`)) {
        const boxAchievements = {
          ...($campaign.boxAchievements ?? {}),
          [DorfromantikBoxAchievement.RED_HEART]: currentGame
        }
        await dorfromantikDB.campaigns.update(+$page.params.campaignId, {
          boxAchievements,
        })
      }
    }
  };
  const handleCompleteHeart = (nbr: DorfromantikCampaignPathRedHeartAchievement) => async () => {
    if ($campaign?.campaignPathHeartAchievements?.[nbr]) {
      return;
    }
    if (confirm(`Rotes Herz freischalten?`)) {
      const campaignPathHeartAchievements = {
        ...($campaign.campaignPathHeartAchievements ?? {}),
        [nbr]: currentGame
      }
      await dorfromantikDB.campaigns.update(+$page.params.campaignId, {
        campaignPathHeartAchievements,
      })
    }
  };

  const update = () => dorfromantikDB.campaigns.update(+$page.params.campaignId, {
    campaignPath: data.campaign.campaignPath,
    campaignPathHeartAchievements: data.campaign.campaignPathHeartAchievements,
  })

  let clickable: DorfromantikCampaign['campaignPath'];

  $: browser && centerScrollX(containerEl);
  $: unlockedSteps = browser
    ? liveQuery(async () => {
      const items = await dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).toArray();
      return calcAllCampaignPathSteps(items);
    })
    : readable(0);
  $: campaign = browser
    ? liveQuery(() => dorfromantikDB.campaigns.get(+$page.params.campaignId))
    : readable(data?.campaign);
  $: usedSteps = 0;
  $: availableSteps = Math.max($unlockedSteps - usedSteps, 0);
  $: resetState(data?.campaign?.campaignPath);
  $: resetClickable(data?.campaign?.campaignPath);
  $: gameCount = browser && $page.params.campaignId
    ? liveQuery(() => dorfromantikDB.games.where({campaignId: +$page.params.campaignId}).count())
    : undefined;
  $: currentGame = (gameCount ? $gameCount : undefined) ?? 1;
</script>

<a href="/dorfromantik/campaign/{$page.params.campaignId}" class="block mb-3">
    &lt; Zurück zur Kampagne
</a>

<div>
    Freigeschaltete Schritte: {$unlockedSteps}
</div>
<div>
    Verfügbare Schritte: {availableSteps}
</div>


{#if data?.campaign?.campaignPath?.length}
    <div bind:this={containerEl} class="w-full overflow-x-auto overflow-y-hidden h-fit">
        <div class="flex flex-col gap-1 w-[500px] mx-auto h-fit">
            <Row>
                <StartNode/>
            </Row>
            <Row>
                <Connection bind:state={data.campaign.campaignPath[0]}
                            isSelectableFromBeginning={true}
                            on:select={update}
                            on:complete={handleCompleteBox(1)}
                />
            </Row>
            <Row>
                <Node>
                    Öffnet Schachtel 1
                </Node>
            </Row>
            <Row>
                <Connection bind:state={data.campaign.campaignPath[1]}
                            isSelectableFromBeginning={clickable[0]}
                            on:select={update}
                            on:complete={handleCompleteBox(2)}
                />
            </Row>
            <Row>
                <div class="grid grid-cols-8 gap-1">
                    <!-- row 1 -->
                    <Node class="col-span-2">
                        Erfolgskarte Lagerhaus
                    </Node>
                    <Connection bind:state={data.campaign.campaignPath[2][0]}
                                class="z-20"
                                direction="r-l"
                                isSelectableFromBeginning={clickable[1]}
                                isSelectableFromEnd={clickable[3][0]|clickable[3|1]}
                                on:select={update}
                    />
                    <Node class="col-span-2">
                        Öffnet Schachtel 2
                    </Node>
                    <Connection bind:state={data.campaign.campaignPath[2][1]}
                                class="z-20"
                                direction="l-r"
                                isSelectableFromBeginning={clickable[1]}
                                isSelectableFromEnd={clickable[3][2]|clickable[3|3]}
                                on:select={update}
                    />
                    <Node class="col-span-2">
                        Erfolgskarte Zirkus
                    </Node>

                    <!-- row 2 -->
                    <Connection class="col-span-2"
                                bind:state={data.campaign.campaignPath[3][0]}
                                isSelectableFromBeginning={clickable[2][0]}
                                isSelectableFromEnd={clickable[4][0]}
                                on:select={update}
                    />
                    <Connection bind:state={data.campaign.campaignPath[3][1]}
                                class="z-10"
                                direction="tl-br-flat"
                                isSelectableFromBeginning={clickable[2][0]}
                                isSelectableFromEnd={clickable[4][1]|clickable[2][1]}
                                on:select={update}
                    />
                    <div></div>
                    <div></div>
                    <Connection bind:state={data.campaign.campaignPath[3][2]}
                                class="z-10"
                                direction="tr-bl-flat"
                                isSelectableFromBeginning={clickable[2][1]}
                                isSelectableFromEnd={clickable[4][1]|clickable[2][0]}
                                on:select={update} />
                    <Connection class="col-span-2"
                                bind:state={data.campaign.campaignPath[3][3]}
                                isSelectableFromBeginning={clickable[2][1]}
                                isSelectableFromEnd={clickable[4][2]}
                                on:select={update}
                    />

                    <!-- row 3 -->
                    <Node class="col-span-2">
                        Erfolgskarte Getriedetunnel
                    </Node>
                    <div></div>
                    <Node class="col-span-2">
                        Erfolgskarte Bahnwärter
                    </Node>
                    <div></div>
                    <Node class="col-span-2">
                        Erfolgskarte Damhirsch
                    </Node>

                    <!-- row 4 -->
                    <Connection class="col-span-2"
                                bind:state={data.campaign.campaignPath[4][0]}
                                heartPosition={3}
                                isSelectableFromBeginning={clickable[3][0]}
                                isSelectableFromEnd={clickable[5][0]}
                                on:select={update}
                                on:completeHeart={handleCompleteHeart(1)}
                    />
                    <div></div>
                    <Connection class="col-span-2"
                                bind:state={data.campaign.campaignPath[4][1]}
                                heartPosition={3}
                                isSelectableFromBeginning={clickable[3][1]|clickable[3][2]}
                                isSelectableFromEnd={clickable[5][1]}
                                on:select={update}
                                on:completeHeart={handleCompleteHeart(2)}
                    />
                    <div></div>
                    <Connection class="col-span-2"
                                bind:state={data.campaign.campaignPath[4][2]}
                                heartPosition={3}
                                isSelectableFromBeginning={clickable[3][3]}
                                isSelectableFromEnd={clickable[5][2]}
                                on:select={update}
                                on:completeHeart={handleCompleteHeart(3)}
                    />

                    <!-- row 5 -->
                    <Node class="col-span-2">
                        Erfolgskarte Dorftunnel
                    </Node>
                    <div></div>
                    <Node class="col-span-2">
                        Erfolgskarte Schäferin
                    </Node>
                    <div></div>
                    <Node class="col-span-2">
                        Erfolgskarte Burg
                    </Node>

                    <!-- row 6 -->
                    <Connection class="col-span-2"
                                bind:state={data.campaign.campaignPath[5][0]}
                                isSelectableFromBeginning={clickable[4][0]}
                                isSelectableFromEnd={clickable[6][0]}
                                on:select={update}
                    />
                    <div></div>
                    <Connection class="col-span-2"
                                bind:state={data.campaign.campaignPath[5][1]}
                                isSelectableFromBeginning={clickable[4][1]}
                                isSelectableFromEnd={clickable[6][1]}
                                on:select={update}
                    />
                    <div></div>
                    <Connection class="col-span-2"
                                bind:state={data.campaign.campaignPath[5][2]}
                                isSelectableFromBeginning={clickable[4][2]}
                                isSelectableFromEnd={clickable[6][2]}
                                on:select={update}
                    />

                    <!-- row 7 -->
                    <Node class="col-span-2">
                        Erfolgskarte Waldtunnel
                    </Node>
                    <div></div>
                    <Node class="col-span-2">
                        Erfolgskarte Hügel
                    </Node>
                    <div></div>
                    <Node class="col-span-2">
                        Erfolgskarte Bauernhof
                    </Node>

                    <!-- row 8 -->
                    <div></div>
                    <Connection class="col-span-2 z-10"
                                bind:state={data.campaign.campaignPath[6][0]}
                                direction="tl-br"
                                isSelectableFromBeginning={clickable[5][0]}
                                isSelectableFromEnd={clickable[5][1]|clickable[5][2]}
                                on:select={update}
                    />
                    <Connection class="col-span-2 z-10"
                                bind:state={data.campaign.campaignPath[6][1]}
                                isSelectableFromBeginning={clickable[5][1]}
                                isSelectableFromEnd={clickable[5][0]|clickable[5][2]}
                                on:select={update}
                    />
                    <Connection class="col-span-2 z-10"
                                bind:state={data.campaign.campaignPath[6][2]}
                                isSelectableFromBeginning={clickable[5][2]}
                                isSelectableFromEnd={clickable[5][0]|clickable[5][1]}
                                direction="tr-bl"
                                on:select={update}
                    />
                    <div></div>

                    <!-- row 9 -->
                    <div></div>
                    <div></div>
                    <div></div>
                    <Node class="col-span-2">
                        Erfolgskarte Wolke
                    </Node>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Row>

        </div>
    </div>
{/if}
