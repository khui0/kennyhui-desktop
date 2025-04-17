<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import Dock from "$lib/components/dock/dock.svelte";
  import Menubar from "$lib/components/menubar/menubar.svelte";
  import WindowManager from "$lib/components/window/window-manager.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    applications.find((app) => app.id === "dev.kennyhui.contact")?.open();
  });
</script>

<div class="flex h-full w-full flex-col overflow-hidden">
  <Menubar />
  <WindowManager />
  <Dock />
</div>
