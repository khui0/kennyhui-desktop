<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import DockItem from "./dock-item.svelte";
</script>

<div class="z-50 flex shrink-0 justify-center px-2 pt-[1px] pb-2">
  <div
    data-dock
    class="bg-dock flex min-h-15.25 w-fit max-w-full shrink-0 items-start gap-3 rounded-[18px] bg-[F6F6F6]/36 p-2.25 backdrop-blur-[135px]"
  >
    {#each applications as app}
      <DockItem {app} />
    {/each}
  </div>
</div>
