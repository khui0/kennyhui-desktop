<script lang="ts">
  import dayjs from "dayjs";
  import { onMount, type Snippet } from "svelte";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import MenubarItem from "./menubar-item.svelte";
  import { launchpad } from "$lib/meta.svelte";

  let { children }: { children?: Snippet } = $props();

  let time: string = $state("");

  update();

  onMount(() => {
    setInterval(update, 1000);
  });

  function update() {
    time = dayjs().format("ddd MMM D h:mm A");
  }
</script>

<menu
  class={{
    "flex h-8 w-full items-center bg-white/50 px-2 backdrop-blur-[50px] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-black/18": true,
    "opacity-0": launchpad.open,
    "opacity-100": !launchpad.open,
  }}
>
  <MenubarItem type="logo"><TablerCircleFilled /></MenubarItem>
  <MenubarItem type="name">Firefox</MenubarItem>
  <MenubarItem>File</MenubarItem>
  <MenubarItem>Edit</MenubarItem>
  <div class="flex-1"></div>
  <MenubarItem>{time}</MenubarItem>
</menu>
