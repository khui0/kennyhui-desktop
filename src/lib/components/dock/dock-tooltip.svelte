<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, tooltip }: { children: Snippet; tooltip: Snippet } = $props();
</script>

<div class="group relative">
  <div
    class="pointer-events-none absolute bottom-1/2 left-1/2 -translate-x-1/2 pb-4 opacity-0 group-hover:bottom-full group-hover:opacity-100"
  >
    <div
      class="glass-card rounded-selector text-base-content/90 px-2 py-1 text-[13px] font-light text-nowrap"
    >
      {@render tooltip()}
    </div>
  </div>
  {@render children()}
</div>
