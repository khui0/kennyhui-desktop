<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, date, children }: { title: string; date: string; children?: Snippet } = $props();
</script>

<div class="mt-1 flex flex-col">
  <div class="flex flex-wrap items-center justify-between">
    <h3 class="text-lg font-medium">{title}</h3>
    <p class="text-base-content/50 text-sm">{date}</p>
  </div>
  <div class="text-base-content/75 mt-1 text-sm">
    {@render children?.()}
  </div>
</div>
