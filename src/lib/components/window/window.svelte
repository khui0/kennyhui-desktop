<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    id,
    x = 0,
    y = 0,
    width = 400,
    height = 300,
    minWidth = 300,
    minHeight = 200,
    children,
  }: {
    id: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    children: Snippet;
  } = $props();
</script>

<svelte:document />

{#snippet handles()}
  <!-- Top -->
  <div
    data-window-transform="0,-1"
    class="handle absolute -top-1.25 right-1.25 left-1.25 h-2.5 cursor-ns-resize"
  ></div>
  <!-- Bottom -->
  <div
    data-window-transform="0,1"
    class="handle absolute right-1.25 -bottom-1.25 left-1.25 h-2.5 cursor-ns-resize"
  ></div>
  <!-- Left -->
  <div
    data-window-transform="-1,0"
    class="handle absolute top-1.25 bottom-1.25 -left-1.25 w-2.5 cursor-ew-resize"
  ></div>
  <!-- Right -->
  <div
    data-window-transform="1,0"
    class="handle absolute top-1.25 -right-1.25 bottom-1.25 w-2.5 cursor-ew-resize"
  ></div>
  <!-- Top Left -->
  <div
    data-window-transform="-1,-1"
    class="handle absolute -top-1.25 -left-1.25 h-4 w-4 cursor-nwse-resize"
  ></div>
  <!-- Top Right -->
  <div
    data-window-transform="1,-1"
    class="handle absolute -top-1.25 -right-1.25 h-4 w-4 cursor-nesw-resize"
  ></div>
  <!-- Bottom Left -->
  <div
    data-window-transform="-1,1"
    class="handle absolute -bottom-1.25 -left-1.25 h-4 w-4 cursor-nesw-resize"
  ></div>
  <!-- Bottom Right -->
  <div
    data-window-transform="1,1"
    class="handle absolute -right-1.25 -bottom-1.25 h-4 w-4 cursor-nwse-resize"
  ></div>
{/snippet}

<div
  class="glass-card rounded-box pointer-events-auto fixed box-content overflow-hidden shadow-2xl shadow-black/50"
  style="width: {width}px; height: {height}px; transform: translate({x}px, {y}px);"
  data-window={id}
  data-window-transform="0,0"
  data-window-min="{minWidth},{minHeight}"
>
  <div class="h-full w-full overflow-hidden">
    {@render children()}
  </div>
  {@render handles()}
</div>
