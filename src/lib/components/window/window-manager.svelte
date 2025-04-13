<script lang="ts">
  import { onMount } from "svelte";
  import { windowDragHandler } from "./actions.svelte";
  import { container, moveWindowsWithinBounds } from "./helpers.svelte";
  import WindowControls from "./window-controls.svelte";
  import WindowTitleBar from "./window-title-bar.svelte";
  import Window from "./window.svelte";

  let { windows }: { windows?: unknown[] } = $props();
  let snap: "left" | "right" | "full" | null = $state(null);

  let resizeTimeout: number = 0;

  onMount(() => {
    moveWindowsWithinBounds();
  });
</script>

<svelte:window
  onresize={() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(moveWindowsWithinBounds, 100);
  }}
/>
<svelte:document use:windowDragHandler />

<div
  class="pointer-events-none relative h-full w-full touch-none overflow-hidden"
  bind:this={container.current}
>
  <div
    class={{
      "preview pointer-events-none top-0 bottom-0 left-0 w-1/2 opacity-0 transition-opacity duration-300": true,
      "opacity-100": snap === "left",
    }}
  ></div>
  <div
    class={{
      "preview pointer-events-none top-0 right-0 bottom-0 w-1/2 opacity-0 transition-opacity duration-300": true,
      "opacity-100": snap === "right",
    }}
  ></div>
  <div
    class={{
      "preview pointer-events-none inset-0 opacity-0 transition-opacity duration-300": true,
      "opacity-100": snap === "full",
    }}
  ></div>
  <Window id="test">
    <div class="absolute left-0 h-7">
      <WindowControls />
    </div>
    <WindowTitleBar>
      <h1 class="font-medium">Title</h1>
    </WindowTitleBar>
    <div class="h-full overflow-auto p-5" data-nodrag>
      <p>
        Labore sunt adipisicing culpa minim aliquip dolore sint anim aliqua. Eiusmod ad duis amet.
        Minim occaecat mollit deserunt. Laboris quis nisi labore non sunt consequat eu irure
        excepteur non sint. Sint sint Lorem in ex aute qui aliqua ea aute pariatur amet consequat
        esse dolor.
      </p>
    </div>
  </Window>
</div>
