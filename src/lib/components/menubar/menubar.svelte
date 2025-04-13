<script lang="ts">
  import dayjs from "dayjs";
  import { onMount, type Snippet } from "svelte";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import MenubarItem from "./menubar-item.svelte";

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

<menu class="flex h-8 w-full items-center bg-white/50 px-2 backdrop-blur-[50px] dark:bg-black/18">
  <MenubarItem type="logo"><TablerCircleFilled /></MenubarItem>
  <MenubarItem type="name">Firefox</MenubarItem>
  <MenubarItem>File</MenubarItem>
  <MenubarItem>Edit</MenubarItem>
  <div class="flex-1"></div>
  <MenubarItem>{time}</MenubarItem>
</menu>
