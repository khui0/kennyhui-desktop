<script lang="ts">
  import { page } from "$app/state";
  import Gradient from "$lib/components/gradient/gradient.svelte";
  import Launchpad from "$lib/components/launchpad/launchpad.svelte";
  import Search from "$lib/components/search/search.svelte";
  import { commandKey, launchpad, search } from "$lib/meta.svelte";
  import { MetaTags, deepMerge } from "svelte-meta-tags";
  import "../app.css";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

  let ready = $state(false);

  onMount(() => {
    ready = true;
  });
</script>

<svelte:window
  onkeydown={(e) => {
    if (commandKey(e)) {
      if (e.key === "l") {
        e.preventDefault();
        launchpad.current?.toggle();
        search.current?.close();
      }
      if (e.key === "k") {
        if (launchpad.open) return;
        e.preventDefault();
        search.current?.toggle();
      }
    }
  }}
/>

<MetaTags {...metaTags} />
<div class="fixed inset-0 z-[-1]">
  <Gradient />
</div>
{@render children()}

<Launchpad bind:this={launchpad.current} />
<Search bind:this={search.current} />
