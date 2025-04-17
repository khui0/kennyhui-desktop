<script lang="ts">
  import type { MenubarItem } from "$lib/applications.svelte";
  import type { Snippet } from "svelte";
  import Menu from "../menu/menu.svelte";
  import MenubarButton from "./menubar-button.svelte";

  let {
    type = "item",
    data,
    children,
  }: {
    type?: "logo" | "name" | "item";
    data: MenubarItem;
    children?: Snippet;
  } = $props();
</script>

<MenubarButton {type} id={data.id}>
  {#snippet content()}
    <Menu items={data.items} />
  {/snippet}
  {#if children}
    {@render children()}
  {:else}
    {data.text}
  {/if}
</MenubarButton>
