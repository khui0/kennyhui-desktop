<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import { windows } from "../window/windows.svelte";
  import DockItem from "./dock-item.svelte";
</script>

<div class="fixed bottom-0 z-50 flex h-17.5 w-full shrink-0 items-start justify-center px-2">
  <div
    data-dock
    class="bg-dock flex min-h-15.5 w-fit max-w-full shrink-0 items-start gap-3 rounded-[18px] bg-[F6F6F6]/36 p-2.5 shadow-xl backdrop-blur-[135px]"
  >
    {#each applications.filter((app) => app.showInDock) as app}
      <DockItem {app} />
    {/each}
    {#each applications.filter((app) => !app.showInDock && windows.findIndex( (window) => window.id.startsWith(app.id), ) !== -1) as app}
      <DockItem {app} />
    {/each}
  </div>
</div>
