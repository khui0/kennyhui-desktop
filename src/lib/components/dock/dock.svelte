<script lang="ts">
  import { applications } from "$lib/apps.svelte.ts";
  import type { PictureModule } from "$lib/images";
  import AppIcon from "../app/app-icon.svelte";
  import Tooltip from "../tooltip.svelte";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import DockTooltip from "./dock-tooltip.svelte";

  interface DockItem {
    id: string;
    name: string;
    icon: PictureModule;
  }

  let {
    items = [],
  }: {
    items?: DockItem[];
  } = $props();
</script>

<div class="mt-[0.5px] h-18">
  <div
    class="bg-dock rounded-[18px] z-50 mx-auto mb-1.5 flex h-15.5 w-fit max-w-full items-start gap-3 bg-[F6F6F6]/36 p-2.25 backdrop-blur-[135px]"
  >
    {#each applications as app}
      <DockTooltip>
        {#snippet tooltip()}
          <p>{app.name}</p>
        {/snippet}
        <div class="relative">
          <AppIcon src={app.icon.default} size="sm" />
          <span
            class="text-base-content/50 absolute top-full left-1/2 mt-1 -translate-x-1/2 text-[4px]"
          >
            <TablerCircleFilled />
          </span>
        </div>
      </DockTooltip>
    {/each}
  </div>
</div>
