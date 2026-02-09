<script lang="ts">
  import {
    MenuItem as MenuItemClass,
    MenuSeparator as MenuSeparatorClass,
    type MenuContent,
  } from "$lib/core";
  import { prefixedTheme } from "$lib/theme";
  import MenuItem from "./menu-item.svelte";
  import MenuSeparator from "./menu-separator.svelte";

  let {
    content: items,
    callback,
    hidden = false,
    transparent = false,
  }: {
    content: MenuContent;
    callback?: () => void;
    hidden?: boolean;
    transparent?: boolean;
  } = $props();
</script>

{#if items.length > 0}
  <menu
    data-theme={$prefixedTheme}
    data-menu
    class={{
      "flex w-[min(200px,100vw)] flex-col rounded-[6px] p-[5px] shadow-2xl": true,
      "bg-glass": !transparent,
      "bg-transparent": transparent,
    }}
  >
    {#each items as item}
      {#if item instanceof MenuItemClass}
        <MenuItem
          {hidden}
          onclick={() => {
            item.callback();
            callback?.();
          }}
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
