<script lang="ts">
  import { App } from "$lib/applications.svelte";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import AppIcon from "../app/app-icon.svelte";
  import { add } from "../window/windows.svelte";
  let { app }: { app: App } = $props();

  let open: boolean = $state(false);

  function openApp() {
    add(app.window());
  }
</script>

<button class="group relative shrink-0" onclick={openApp}>
  <div
    class="pointer-events-none absolute left-1/2 -translate-x-1/2 pb-4 opacity-0 group-hover:bottom-full group-hover:opacity-100"
  >
    <div
      class="bg-glass rounded-selector text-base-content/90 px-3 py-0.75 text-[13px] text-nowrap shadow-md"
    >
      <p>{app.name}</p>
    </div>
  </div>
  <div class="relative">
    <AppIcon src={app.icon.default} size="sm" />
    <span
      class={{
        "text-base-content/50 absolute top-full left-1/2 mt-1 -translate-x-1/2 text-[4px]": true,
        "opacity-100": open,
        "opacity-0": !open,
      }}
    >
      <TablerCircleFilled />
    </span>
  </div>
</button>
