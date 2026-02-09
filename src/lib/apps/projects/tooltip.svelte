<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    tooltip,
  }: {
    children?: Snippet;
    tooltip?: Snippet;
  } = $props();
</script>

<span class="group relative inline-block">
  <span>
    {@render children?.()}
  </span>
  <span
    role="tooltip"
    class="pointer-events-none absolute bottom-full left-1/2 z-50 block -translate-x-1/2 translate-y-2.5 py-1 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
  >
    <span
      class="bg-glass bg-base-200 rounded-selector text-base-content/90 flex items-center gap-1 px-2 py-0.75 text-sm text-nowrap shadow-md"
    >
      {@render tooltip?.()}
    </span>
  </span>
</span>
