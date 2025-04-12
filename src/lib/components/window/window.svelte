<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    x = 0,
    y = 0,
    width = 400,
    height = 300,
    children,
  }: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    children: Snippet;
  } = $props();
</script>

<svelte:document />

{#snippet handles()}
  <!-- Top -->
  <div
    data-window-transform="0,-1"
    class="handle absolute -top-1.25 right-1.25 left-1.25 h-2.5 cursor-ns-resize bg-blue-500/50"
  ></div>
  <!-- Bottom -->
  <div
    data-window-transform="0,1"
    class="handle absolute right-1.25 -bottom-1.25 left-1.25 h-2.5 cursor-ns-resize bg-green-500/50"
  ></div>
  <!-- Left -->
  <div
    data-window-transform="-1,0"
    class="handle absolute top-1.25 bottom-1.25 -left-1.25 w-2.5 cursor-ew-resize bg-yellow-500/50"
  ></div>
  <!-- Right -->
  <div
    data-window-transform="1,0"
    class="handle absolute top-1.25 -right-1.25 bottom-1.25 w-2.5 cursor-ew-resize bg-purple-500/50"
  ></div>
  <!-- Top Left -->
  <div
    data-window-transform="-1,-1"
    class="handle absolute -top-1.25 -left-1.25 h-4 w-4 cursor-nwse-resize bg-red-500/50"
  ></div>
  <!-- Top Right -->
  <div
    data-window-transform="1,-1"
    class="handle absolute -top-1.25 -right-1.25 h-4 w-4 cursor-nesw-resize bg-red-500/50"
  ></div>
  <!-- Bottom Left -->
  <div
    data-window-transform="-1,1"
    class="handle absolute -bottom-1.25 -left-1.25 h-4 w-4 cursor-nesw-resize bg-red-500/50"
  ></div>
  <!-- Bottom Right -->
  <div
    data-window-transform="1,1"
    class="handle absolute -right-1.25 -bottom-1.25 h-4 w-4 cursor-nwse-resize bg-red-500/50"
  ></div>
{/snippet}

<div
  class="glass-card rounded-box absolute shadow-xl"
  style="width: {width}px; height: {height}px; transform: translate({x}px, {y}px);"
  data-window
  data-window-transform="0,0"
>
  <div class="h-full w-full overflow-hidden">
    {@render children()}
  </div>
  {@render handles()}
</div>
