<script lang="ts">
  import { type Snippet } from "svelte";
  import type { Vector } from "./helpers.svelte";
  import { stackOrder } from "./windows.svelte";

  let {
    id,
    position = { x: 0, y: 0 },
    size = { x: 400, y: 300 },
    minSize = { x: 300, y: 28 },
    children,
  }: {
    id: string;
    position?: Vector;
    size?: Vector;
    minSize?: Vector;
    children: Snippet;
  } = $props();

  let open: boolean = $derived(stackOrder.indexOf(id) !== -1);

  $inspect(open);
</script>

<svelte:document />

{#snippet handles()}
  <!-- Top -->
  <div
    data-window-transform="0,-1"
    class="not-window-active:pointer-events-none absolute -top-1.25 right-1.25 left-1.25 h-2.5 cursor-ns-resize"
  ></div>
  <!-- Bottom -->
  <div
    data-window-transform="0,1"
    class="not-window-active:pointer-events-none absolute right-1.25 -bottom-1.25 left-1.25 h-2.5 cursor-ns-resize"
  ></div>
  <!-- Left -->
  <div
    data-window-transform="-1,0"
    class="not-window-active:pointer-events-none absolute top-1.25 bottom-1.25 -left-1.25 w-2.5 cursor-ew-resize"
  ></div>
  <!-- Right -->
  <div
    data-window-transform="1,0"
    class="not-window-active:pointer-events-none absolute top-1.25 -right-1.25 bottom-1.25 w-2.5 cursor-ew-resize"
  ></div>
  <!-- Top Left -->
  <div
    data-window-transform="-1,-1"
    class="not-window-active:pointer-events-none absolute -top-1.25 -left-1.25 h-4 w-4 cursor-nwse-resize"
  ></div>
  <!-- Top Right -->
  <div
    data-window-transform="1,-1"
    class="not-window-active:pointer-events-none absolute -top-1.25 -right-1.25 h-4 w-4 cursor-nesw-resize"
  ></div>
  <!-- Bottom Left -->
  <div
    data-window-transform="-1,1"
    class="not-window-active:pointer-events-none absolute -bottom-1.25 -left-1.25 h-4 w-4 cursor-nesw-resize"
  ></div>
  <!-- Bottom Right -->
  <div
    data-window-transform="1,1"
    class="not-window-active:pointer-events-none absolute -right-1.25 -bottom-1.25 h-4 w-4 cursor-nwse-resize"
  ></div>
{/snippet}

<div
  class={{
    "bg-window rounded-box fixed box-content overflow-hidden shadow-2xl shadow-black/20 transition-opacity [[data-window-active]]:shadow-black/40": true,
    "pointer-events-auto  opacity-100": open,
    "pointer-events-none opacity-0": !open,
  }}
  style="width: {size.x}px; height: {size.y}px; transform: translate({position.x}px, {position.y}px);"
  data-window={id}
  data-window-transform="0,0"
  data-window-min="{minSize.x},{minSize.y}"
>
  <div class="flex h-full w-full flex-col overflow-hidden">
    {@render children()}
  </div>
  {@render handles()}
</div>
