<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, tooltip }: { children: Snippet; tooltip: Snippet } = $props();
</script>

<div class="group relative shrink-0">
  <div
    class="pointer-events-none absolute left-1/2 -translate-x-1/2 pb-4 opacity-0 group-hover:bottom-full group-hover:opacity-100"
  >
    <div
      class="bg-glass rounded-selector text-base-content/90 px-3 py-0.75 text-[13px] text-nowrap shadow-md"
    >
      {@render tooltip()}
    </div>
  </div>
  {@render children()}
</div>
