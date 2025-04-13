<script lang="ts">
  import Menubar from "$lib/components/menubar/menubar.svelte";
  import WindowManager from "$lib/components/window/window-manager.svelte";
  import { add } from "$lib/components/window/windows.svelte";
  import { onMount } from "svelte";
  import Resume from "./(card)/resume/resume.svelte";

  onMount(() => {
    add(
      {
        id: "test-window-1",
        title: "Test Window 1",
        name: "Resume 1",
        body: Resume,
      },
      {
        id: "test-window-2",
        title: "Test Window 2",
        name: "Resume 2",
        body: Resume,
      },
    );
  });
</script>

<div class="flex h-full w-full flex-col">
  <Menubar />
  <WindowManager />
</div>
