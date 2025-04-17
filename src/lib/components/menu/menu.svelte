<script lang="ts">
  import { modifiers } from "$lib/meta.svelte";
  import type { Snippet } from "svelte";
  import MenuItem from "./menu-item.svelte";
  import MenuSeparator from "./menu-separator.svelte";

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();
</script>

<menu class="bg-glass flex w-[min(200px,100vw)] flex-col rounded-[6px] p-[5px] shadow-2xl">
  <MenuItem shortcuts={[modifiers.command, "N"]}>Reload</MenuItem>
  <MenuSeparator />
  <MenuItem>Hello</MenuItem>
  <MenuItem disabled>Hello</MenuItem>
</menu>
