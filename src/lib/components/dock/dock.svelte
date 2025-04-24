<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import { type App } from "$lib/core";
  import { windows } from "../window/windows.svelte";
  import DockItem from "./dock-item.svelte";

  let dockItems = $derived([
    ...applications.filter((app) => app.showInDock),
    ...windows
      .map((window) => applications.find((app) => window.id.startsWith(app.id)))
      .filter((app) => app && !app.showInDock),
  ]) as App[];

  let dockWidth: number = $state(0);
  let itemWidth: number[] = $state([]);

  let maxItemCount: number = $derived(Math.floor((dockWidth - 12 * 2) / itemWidth[0]));
</script>

<div
  bind:clientWidth={dockWidth}
  class="fixed bottom-0 z-40 flex h-17.5 w-full shrink-0 items-start justify-center px-2"
>
  <div
    data-dock
    class="bg-dock flex min-h-15.5 w-fit max-w-full shrink-0 items-start rounded-[18px] bg-[F6F6F6]/36 px-1 py-2.5 shadow-xl backdrop-blur-[135px]"
  >
    {#each dockItems as app, i (app.id)}
      <div
        bind:clientWidth={itemWidth[i]}
        class={{
          "z-50 flex shrink-0": true,
          hidden: i >= maxItemCount,
        }}
      >
        <DockItem {app} />
      </div>
    {/each}
  </div>
</div>
