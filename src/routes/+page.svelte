<script lang="ts">
  import Menubar from "$lib/components/menubar/menubar.svelte";
  import WindowManager from "$lib/components/window/window-manager.svelte";
  import { onMount } from "svelte";
</script>

<div class="flex h-full w-full flex-col">
  <Menubar />
  <WindowManager />
</div>
