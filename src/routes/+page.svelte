<script lang="ts">
  import Menubar from "$lib/components/menubar/menubar.svelte";
  import NavButtons from "$lib/components/nav-buttons.svelte";
  import WindowManager from "$lib/components/window/window-manager.svelte";
  import Wordmark from "$lib/components/wordmark.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let ready = $state(false);

  onMount(() => {
    ready = true;
  });
</script>

<div class="flex h-full w-full flex-col">
  <Menubar />
  <WindowManager />
</div>
