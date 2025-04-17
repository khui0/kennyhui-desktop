<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, date, children }: { title: string; date: string; children?: Snippet } = $props();
</script>

<div class="mt-2 flex flex-col">
  <div class="flex flex-wrap items-center justify-between">
    <h3 class="text-xl font-extralight tracking-tight">{title}</h3>
    <p class="text-base-content/50 font-extralight tracking-tight">{date}</p>
  </div>
  <div class="text-base-content/75 mt-1 text-xs">
    {@render children?.()}
  </div>
</div>
