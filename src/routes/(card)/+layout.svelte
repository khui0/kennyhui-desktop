<script lang="ts">
  import NavButtons from "$lib/components/nav-buttons.svelte";
  import Wordmark from "$lib/components/wordmark.svelte";
  import { onMount, type Snippet } from "svelte";
  import { fade, fly } from "svelte/transition";

  let { children }: { children: Snippet } = $props();

  onMount(scroll);

  let hiddenRatio: number = $state(0);

  function scroll() {
    hiddenRatio = Math.min(document.documentElement.scrollTop / 104, 1);
  }
</script>

<svelte:window onscroll={scroll} />

<div class="mx-auto max-w-3xl p-2 pt-26 print:max-w-full print:p-0">
  <div
    in:fade
    out:fade
    class="fixed top-0 left-1/2 flex w-full max-w-3xl -translate-x-1/2 justify-between p-6 print:hidden"
    style="opacity: {1 - hiddenRatio};"
  >
    <a
      href="/"
      aria-label="Back Home"
      class="focus-ring flex w-fit flex-col items-start gap-1 mix-blend-overlay"
    >
      <Wordmark class="w-auto text-4xl" />
      <p class="text-xs font-extralight tracking-tighter uppercase">CS @ SBU &mdash; New York</p>
    </a>
    <div class="flex items-center gap-2 p-2">
      <NavButtons home />
    </div>
  </div>
  <article
    in:fly={{ y: 50 }}
    out:fly={{ y: 50 }}
    class="rounded-box not-print:glass-card shadow-2xl not-print:overflow-hidden print:p-0 print:shadow-none"
  >
    {@render children()}
  </article>
</div>
