<script lang="ts">
    export let round: number;
</script>
<style lang="postcss">
    .background {
        @apply fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30 transition-all;
    }
    .background--spring {
        background: radial-gradient(circle 400px at 0 0, #B2D730 20%, #B2D730AA 40%, #FAFE6AAA, transparent);
    }
    .background--summer {
        background: radial-gradient(circle 400px at 0 0, #3A8000 20%, #3A8000AA 40%, #B2D730AA, transparent);
    }
    .background--autumn {
        background: radial-gradient(circle 400px at 0 0, #904C00 20%, #904C00AA 40%, #FAFE6AAA, transparent);
    }
    .background--winter {
        background-image: radial-gradient(circle 400px at 0 0, #0BFFFF 20%, #0BFFFFAA 40%, #E8FFFFAA, transparent);
    }
</style>

<div class="background background--spring"
     class:background--spring={!round}
     class:background--summer={round === 1}
     class:background--autumn={round === 2}
     class:background--winter={round >= 3}
></div>
