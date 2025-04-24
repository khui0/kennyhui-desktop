<script lang="ts">
  import { launchpad } from "$lib/meta.svelte";
  import { onMount, type Component, type Snippet } from "svelte";
  import { windowDragHandler } from "./actions.svelte";
  import { container, moveWindowsWithinBounds } from "./helpers.svelte";
  import WindowControls from "./window-controls.svelte";
  import WindowTitleBar from "./window-title-bar.svelte";
  import Window from "./window.svelte";
  import { windows, type WindowSnap } from "./windows.svelte";

  let snap: WindowSnap = $state(null);

  let resizeTimeout: NodeJS.Timeout;

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
  {#each windows as window (window.id)}
    <Window id={window.id} position={window.position} size={window.size} minSize={window.minSize}>
      <div
        class={{
          "absolute left-0 z-[80] flex items-center": true,
          "h-7": window.controlsSize === "title-tab",
          "h-10": window.controlsSize === "mono",
          "h-13": window.controlsSize === "standard",
        }}
      >
        <WindowControls size={window.controlsSize} />
      </div>
      {#if window.titlebar}
        <WindowTitleBar title={window.title} />
      {/if}
      {#if window.body.component !== null}
        {@const Component = window.body.component as Component}
        <Component {...window.body.props} />
      {/if}
    </Window>
  {/each}
</div>
