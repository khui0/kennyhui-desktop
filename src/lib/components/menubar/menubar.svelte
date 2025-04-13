<script lang="ts">
  import type { Snippet } from "svelte";
  import MenubarItem from "./menubar-item.svelte";

  import TablerCircleFilled from "~icons/tabler/circle-filled";

  let { children }: { children?: Snippet } = $props();
</script>

<menu class="flex h-8 w-full items-center bg-white/50 px-2 backdrop-blur-[50px] dark:bg-black/18">
  <MenubarItem type="logo"><TablerCircleFilled /></MenubarItem>
  <MenubarItem type="name">Firefox</MenubarItem>
  <MenubarItem>File</MenubarItem>
  <MenubarItem>Edit</MenubarItem>
</menu>
