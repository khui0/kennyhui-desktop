<script lang="ts">
  import {
    MenuItem as MenuItemClass,
    MenuSeparator as MenuSeparatorClass,
  } from "$lib/applications.svelte";
  import MenuItem from "./menu-item.svelte";
  import MenuSeparator from "./menu-separator.svelte";

  let {
    items,
  }: {
    items: (MenuItemClass | MenuSeparatorClass)[];
  } = $props();
</script>

{#if items.length > 0}
  <menu
    data-menu
    class="bg-glass flex w-[min(200px,100vw)] flex-col rounded-[6px] p-[5px] shadow-2xl"
  >
    {#each items as item}
      {#if item instanceof MenuItemClass}
        <MenuItem onclick={item.callback} shortcuts={item.shortcuts.map((s) => s.toString())}>
          {item.text}
        </MenuItem>
      {:else if item instanceof MenuSeparatorClass}
        <MenuSeparator />
      {/if}
    {/each}
  </menu>
{/if}
