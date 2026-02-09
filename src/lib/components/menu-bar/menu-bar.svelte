<script lang="ts">
  import DateTime from "$lib/components/ui/date-time.svelte";
  import { activeWindow } from "$lib/components/window/windows.svelte";
  import ButterflyIcon from "~icons/custom/butterfly";
  import HeroiconsMagnifyingGlass16Solid from "~icons/heroicons/magnifying-glass-16-solid";
  import {
    activateMenuBar,
    cancelDisableTimeout,
    deactivateMenuBar,
    menuBarState,
    menuBarStatePrivate,
    startDisableTimeout,
    systemActiveMenu,
    systemMenu,
    systemMenuBarItems,
  } from "./helpers.svelte";
  import MenuBarItem from "./menu-bar-item.svelte";
  import { search } from "$lib/meta.svelte";

  function onpointerdown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target.closest && target?.closest<HTMLElement>("[data-menu-bar-item]");

    if (menuBarStatePrivate.visitCount > 1) {
      menuBarStatePrivate.visitCount = 0;
    }

    if (item !== null) {
      const id = item.getAttribute("data-menu-bar-item");
      if (id === null || id === "") return;

      if (id !== menuBarState.activeId) {
        menuBarStatePrivate.visitCount = 0;
      }

      startDisableTimeout();
      activateMenuBar(id);
    } else {
      deactivateMenuBar();
    }
  }

  function onpointermove(e: PointerEvent) {
    // Don't do anything if the menu bar isn't active in general.
    if (!menuBarState.active) return;

    const target = e.target as HTMLElement;

    // Deactivate the menu bar as an item is no longer being hovered.
    if (target.hasAttribute("data-menu-bar")) {
      menuBarState.activeId = "";
      return;
    }

    if (target.closest && target.closest("[data-menu-bar]") === null) {
      cancelDisableTimeout();
    }

    const item = target.closest && target?.closest<HTMLElement>("[data-menu-bar-item]");
    if (item === null) return;

    // Check if hovered menu bar item's ID is different than the active one. If so, set the new one as the active item.
    const id = item.getAttribute("data-menu-bar-item");
    if (id !== null && id !== menuBarState.activeId) {
      activateMenuBar(id);
    }
  }

  function onpointerup(e: PointerEvent) {
    const target = e.target as HTMLElement | HTMLDocument;
    if (target instanceof HTMLDocument) return;
    const item =
      target.closest &&
      (target?.closest<HTMLElement>("[data-menu-bar-item]") ||
        target?.closest<HTMLElement>("[data-menu-bar-menu]"));

    // If target is neither a menu bar item nor menu, deactivate.
    if (item === null || menuBarStatePrivate.skipPointerUp || menuBarStatePrivate.visitCount > 0) {
      deactivateMenuBar();
    }

    if (target.hasAttribute("data-menu-item")) {
      deactivateMenuBar();
      target.click();
    }

    menuBarStatePrivate.visitCount++;
  }

  function onkeydown(e: KeyboardEvent) {
    if (!menuBarState.active) return;
    if (e.key !== "Tab") return;

    const current = document.querySelector(`[data-menu-bar-item="${menuBarState.activeId}"]`);

    if (current === null) return;

    const next = e.shiftKey ? current.previousElementSibling : current.nextElementSibling;

    const id = next?.getAttribute("data-menu-bar-item") || null;

    if (next === null || id === null) return;

    e.preventDefault();
    menuBarState.activeId = id;
  }

  const activeMenuRect: DOMRect | null = $derived(
    menuBarState.activeId !== ""
      ? document
          .querySelector(`[data-menu-bar-item="${menuBarState.activeId}"] [data-menu]`)
          ?.getBoundingClientRect() || null
      : null,
  );
</script>

<svelte:document {onpointerdown} {onpointermove} {onpointerup} {onkeydown} />

<menu
  data-theme="kennyhui-dark"
  data-menu-bar
  class="z-50 flex h-8 w-full items-center bg-white/50 backdrop-blur-[50px] dark:bg-black/18"
>
  <!-- System Button -->
  <MenuBarItem {...systemMenu}>
    <ButterflyIcon />
  </MenuBarItem>
  <!-- Active App Name -->
  {#if activeWindow.menuBarActive !== null}
    <MenuBarItem type="bold" {...activeWindow.menuBarActive} />
  {:else}
    <MenuBarItem type="bold" {...systemActiveMenu} />
  {/if}
  <!-- Active App Menu Items -->
  {#if activeWindow.current !== null}
    {#each activeWindow.menuBarItems as data}
      <MenuBarItem {...data} />
    {/each}
  {:else}
    {#each systemMenuBarItems as data}
      <MenuBarItem {...data} />
    {/each}
  {/if}
  <!-- Right Side -->
  <div class="flex-1"></div>
  <MenuBarItem
    onclick={() => {
      search.current?.show();
    }}
  >
    <HeroiconsMagnifyingGlass16Solid />
  </MenuBarItem>
  <MenuBarItem>
    <DateTime />
  </MenuBarItem>
</menu>

{#if activeMenuRect}
  <div
    class="bg-glass pointer-events-none absolute rounded-[6px]"
    style="width: {activeMenuRect.width}px; height: {activeMenuRect.height}px; left: {activeMenuRect.left}px; top: {activeMenuRect.top}px;"
  ></div>
{/if}
