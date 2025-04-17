<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, tooltip }: { children: Snippet; tooltip: Snippet } = $props();
</script>

<div class="group relative">
  <div
    class="pointer-events-none absolute bottom-1/2 left-1/2 -translate-x-1/2 p-1.5 opacity-0 transition-all delay-300 group-hover:bottom-full group-hover:opacity-100"
  >
    <div class="glass-card rounded-selector px-2 py-1 text-sm text-nowrap">
      {@render tooltip()}
    </div>
  </div>
  {@render children()}
</div>
