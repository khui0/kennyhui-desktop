<script lang="ts">
  import Tooltip from "$lib/components/tooltip.svelte";
  import { backspaceKey, launchpad, modifiers, search } from "$lib/meta.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import HeroiconsArrowLongUpSolid from "~icons/heroicons/arrow-long-up-solid";
  import HeroiconsHomeSolid from "~icons/heroicons/home-solid";
  import HeroiconsMagnifyingGlassSolid from "~icons/heroicons/magnifying-glass-solid";
  import HeroiconsSquares2x2Solid from "~icons/heroicons/squares-2x2-solid";

  let {
    home = false,
    hint = false,
  }: {
    home?: boolean;
    hint?: boolean;
  } = $props();

  let hintTimeout: number = 0;
  let showHint: boolean = $state(false);

  onMount(() => {
    if (hint) {
      hintTimeout = setTimeout(() => {
        showHint = true;
      }, 10000);
    }
  });

  function clearHint() {
    clearTimeout(hintTimeout);
    showHint = false;
  }
</script>

{#if home}
  <Tooltip>
    {#snippet tooltip()}
      <p>Home <kbd>{modifiers.command}</kbd> <kbd>{backspaceKey}</kbd></p>
    {/snippet}
    <a aria-label="Return Home" class="btn btn-circle btn-lg" href="/">
      <HeroiconsHomeSolid />
    </a>
  </Tooltip>
{/if}
<Tooltip>
  {#snippet tooltip()}
    <p>Launchpad <kbd>{modifiers.command}</kbd> <kbd>L</kbd></p>
  {/snippet}
  <button
    aria-label="Open Launchpad"
    class="btn btn-circle btn-lg"
    onclick={() => {
      launchpad.current?.show();
      clearHint();
    }}
  >
    <HeroiconsSquares2x2Solid />
    {#if showHint}
      <div
        in:fade={{ duration: 1000 }}
        out:fade
        class="pointer-events-none absolute top-full left-1/2 z-50 -translate-x-1/2 text-shadow-lg"
      >
        <div class="flex w-56 flex-col items-center">
          <span class="bounce my-2"><HeroiconsArrowLongUpSolid /></span>
          <p class="font-light">Start here!</p>
        </div>
      </div>
    {/if}
  </button>
</Tooltip>
<Tooltip>
  {#snippet tooltip()}
    <p>Search <kbd class="text-sm">{modifiers.command}</kbd> <kbd class="text-sm">K</kbd></p>
  {/snippet}
  <button
    aria-label="Open Search"
    class="btn btn-circle btn-lg"
    onclick={() => {
      search.current?.show();
      clearHint();
    }}
  >
    <HeroiconsMagnifyingGlassSolid />
  </button>
</Tooltip>

<style>
  .bounce {
    animation: bounce 1500ms cubic-bezier(0.37, 0, 0.63, 1) alternate infinite;
  }

  @keyframes bounce {
    0% {
      transform: translateY(15%);
    }

    100% {
      transform: translateY(-15%);
    }
  }
</style>
