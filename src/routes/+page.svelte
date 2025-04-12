<script lang="ts">
  import NavButtons from "$lib/components/nav-buttons.svelte";
  import WindowManager from "$lib/components/window/window-manager.svelte";
  import Wordmark from "$lib/components/wordmark.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let ready = $state(false);

  onMount(() => {
    ready = true;
  });
</script>

<div
  class="absolute top-1/2 left-1/2 flex max-w-full -translate-x-1/2 -translate-y-1/2 flex-col items-start overflow-hidden mix-blend-overlay print:mix-blend-normal"
>
  <Wordmark class="text-[120px] transition-[font-size] sm:text-[150px]" />
  <p class="mt-1 font-extralight tracking-tighter uppercase">CS @ SBU &mdash; New York</p>
</div>
{#if ready}
  <div
    in:fade={{ duration: 1000 }}
    class="absolute top-3/4 flex w-full flex-wrap items-center justify-center gap-2 px-4 print:hidden"
  >
    <NavButtons hint />
  </div>
{/if}
<WindowManager />
