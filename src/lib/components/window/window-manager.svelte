<script lang="ts">
  import { launchpad } from "$lib/meta.svelte";
  import { onMount, type Snippet } from "svelte";
  import { windowDragHandler } from "./actions.svelte";
  import { container, moveWindowsWithinBounds } from "./helpers.svelte";
  import WindowContent from "./window-content.svelte";
  import WindowControls from "./window-controls.svelte";
  import WindowTitleBar from "./window-title-bar.svelte";
  import Window from "./window.svelte";
  import { stackOrder, windows, type WindowSnap } from "./windows.svelte";

  let snap: WindowSnap = $state(null);

  let resizeTimeout: number = 0;

  onMount(() => {
    moveWindowsWithinBounds();
  });

  $inspect(windows, stackOrder);
</script>

<svelte:window
  onresize={() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(moveWindowsWithinBounds, 100);
  }}
/>
<svelte:document
  use:windowDragHandler
  onsnap={(e) => {
    snap = e.snap;
  }}
/>

<div
  class={{
    "pointer-events-none relative h-full w-full touch-none overflow-hidden transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]": true,
    "opacity-0": launchpad.open,
    "opacity-100": !launchpad.open,
  }}
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
  {#each windows as window}
    <Window id={window.id} position={window.position} size={window.size} minSize={window.minSize}>
      <div class="absolute left-0 flex h-7 items-center">
        <WindowControls />
      </div>
      <WindowTitleBar>
        <h1 class="text-base-content/80 text-[13px] font-bold">{window.title}</h1>
      </WindowTitleBar>
      <WindowContent>
        {@render (window.body as Snippet)()}
      </WindowContent>
    </Window>
  {/each}
</div>
