<script lang="ts">
  import {
    MenuItem as MenuItemClass,
    MenuSeparator as MenuSeparatorClass,
  } from "$lib/core";
  import MenuItem from "./menu-item.svelte";
  import MenuSeparator from "./menu-separator.svelte";

  let {
    items,
    hidden = false,
  }: {
    items: (MenuItemClass | MenuSeparatorClass)[];
    hidden?: boolean;
  } = $props();
</script>

{#if items.length > 0}
  <menu
    data-menu
    class="bg-glass flex w-[min(200px,100vw)] flex-col rounded-[6px] p-[5px] shadow-2xl"
  >
    {#each items as item}
      {#if item instanceof MenuItemClass}
        <MenuItem
          {hidden}
          onclick={item.callback}
          shortcuts={item.shortcuts.map((s) => s.toString())}
        >
          {item.text}
        </MenuItem>
      {:else if item instanceof MenuSeparatorClass}
        <MenuSeparator />
      {/if}
    {/each}
  </menu>
{/if}
