<script lang="ts">
  import type {DorfromantikGame} from '$lib/models/games/dorfromantik/game';
  import TopResultsColumn from './TopResultsColumn.svelte';

  export let results: DorfromantikGame['results'];
  export let number = 0;
  export let totalOrders = 0;
  export let totalFlagsAndLongest = 0;
</script>

<div class="flex gap-1 text-center">
    <div class="p-1">
        <div>{number}</div>
        <div>Aufträge</div>
        <div>Fahnen</div>
    </div>
    <TopResultsColumn bind:upperValue={results.orders.forest}
                      bind:lowerValue={results.flags.forest}
                      on:input>
        Wald
    </TopResultsColumn>
    <TopResultsColumn bind:upperValue={results.orders.field}
                      bind:lowerValue={results.flags.field}
                      on:input>
        Feld
    </TopResultsColumn>
    <TopResultsColumn bind:upperValue={results.orders.house}
                      bind:lowerValue={results.flags.house}
                      on:input>
        Haus
    </TopResultsColumn>
    <TopResultsColumn bind:upperValue={results.orders.rail}
                      bind:lowerValue={results.longest.rail}
                      on:input>
        Gleis
    </TopResultsColumn>
    <TopResultsColumn bind:upperValue={results.orders.river}
                      bind:lowerValue={results.longest.river}
                      on:input>
        Fluss
    </TopResultsColumn>
    <div class="p-1">
        <div>Summe</div>
        <div>
            {totalOrders}
        </div>
        <div>
            {totalFlagsAndLongest}
        </div>
    </div>
</div>
