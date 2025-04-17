<script lang="ts">
  import type { MenuBarItem } from "$lib/applications.svelte";
  import type { Snippet } from "svelte";
  import Menu from "../menu/menu.svelte";
  import MenuBarButton from "./menu-bar-button.svelte";

  let {
    type = "item",
    data,
    children,
  }: {
    type?: "logo" | "name" | "item";
    data: MenuBarItem;
    children?: Snippet;
  } = $props();
</script>

<MenuBarButton {type} id={data.id}>
  {#snippet content()}
    <Menu items={data.items} />
  {/snippet}
  {#if children}
    {@render children()}
  {:else}
    {data.text}
  {/if}
</MenuBarButton>
