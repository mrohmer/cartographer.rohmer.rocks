<div class="loader">
    <div class="loader-row">
        <div class="loader-block"></div>
        <div class="loader-block"></div>
        <div class="loader-block"></div>
    </div>
    <div class="loader-row">
        <div class="loader-block"></div>
        <div class="loader-block"></div>
        <div class="loader-block"></div>
    </div>
    <div class="loader-row">
        <div class="loader-block"></div>
        <div class="loader-block"></div>
        <div class="loader-block"></div>
    </div>
</div>

<style lang="postcss">

    .loader {
        @apply h-screen w-screen flex justify-center items-center;
    }
    .loader-block {
        @apply w-8 h-8 opacity-0 mx-0.5 my-1 bg-stone-100;
        animation: show 0.88s step-end infinite alternate, pulse 0.88s linear infinite alternate;
    }
    .loader-row:nth-child(1) .loader-block:nth-child(1) {
        animation-delay: 0.065s;
    }
    .loader-row:nth-child(1) .loader-block:nth-child(2) {
        animation-delay: 0.13s;
    }
    .loader-row:nth-child(1) .loader-block:nth-child(3) {
        animation-delay: 0.195s;
    }
    .loader-row:nth-child(2) .loader-block:nth-child(1) {
        animation-delay: 0.325s;
    }
    .loader-row:nth-child(2) .loader-block:nth-child(2) {
        animation-delay: 0.13s;
    }
    .loader-row:nth-child(2) .loader-block:nth-child(3) {
        animation-delay: 0.455s;
    }
    .loader-row:nth-child(3) .loader-block:nth-child(1) {
        animation-delay: 0.39s;
    }
    .loader-row:nth-child(3) .loader-block:nth-child(2) {
        animation-delay: 0.26s;
    }

    @keyframes show {
        from, 40% { opacity: 0; }
        41%, to { opacity: 1; }
    }
    @keyframes pulse {
        from,
        40% {
            @apply bg-stone-700;
        }
        to {
            @apply bg-stone-600;
        }
    }
</style>
