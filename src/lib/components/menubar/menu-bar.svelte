<script lang="ts">
  import { launchpad, menuBar } from "$lib/meta.svelte";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import { activeWindow } from "../window/windows.svelte";
  import MenuBarItem from "./menu-bar-item.svelte";
  import {
    activateMenuBar,
    deactivateMenuBar,
    systemActiveMenu,
    systemMenu,
  } from "./helpers.svelte";
  import MenuBarButton from "./menu-bar-button.svelte";

  let time: string = $state("");

  let disableTimeout: number = 0;
  let disableOnPointerUp: boolean = false;
  let itemVisitNumber: number = 0;

  update();

  onMount(() => {
    setInterval(update, 1000);
  });

  function update() {
    time = dayjs().format("ddd MMM D h:mm A");
  }

  function startDisableTimeout(): void {
    cancelDisableTimeout();

    disableTimeout = setTimeout(() => {
      disableOnPointerUp = true;
    }, 1000);
  }

  function cancelDisableTimeout(): void {
    disableOnPointerUp = false;
    clearTimeout(disableTimeout);
  }

  function onpointerdown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target?.closest("[data-menu-bar-item]") as HTMLElement;

    if (itemVisitNumber > 1) {
      itemVisitNumber = 0;
    }

    if (item !== null) {
      const id = item.getAttribute("data-menu-bar-item");
      if (id === null) return;

      if (id !== menuBar.activeId) {
        itemVisitNumber = 0;
      }

      startDisableTimeout();
      activateMenuBar(id);
    } else {
      deactivateMenuBar();
    }
  }

  function onpointermove(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target?.closest("[data-menu-bar-item]") as HTMLElement;

    if (!menuBar.active) return;

    if (item !== null) {
      const id = item.getAttribute("data-menu-bar-item");
      if (id !== null && id !== menuBar.activeId) {
        activateMenuBar(id);
      }
    }
  }

  function onpointerup(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target?.closest("[data-menu-bar-item]") as HTMLElement;

    if (disableOnPointerUp) {
      if (item === null) return;
      deactivateMenuBar();
    }

    if (itemVisitNumber > 0) {
      deactivateMenuBar();
    }
    itemVisitNumber++;
  }
</script>

<svelte:document {onpointerdown} {onpointermove} {onpointerup} />

<menu
  data-menu-bar
  class={{
    "absolute flex h-8 w-full items-center bg-white/50 px-2 backdrop-blur-[50px] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-black/18": true,
    "opacity-0": launchpad.open,
    "opacity-100": !launchpad.open,
  }}
>
  <MenuBarItem type="logo" data={systemMenu}><TablerCircleFilled /></MenuBarItem>
  {#if activeWindow.menuBarActive !== null}
    <MenuBarItem type="name" data={activeWindow.menuBarActive} />
  {:else}
    <MenuBarItem type="name" data={systemActiveMenu} />
  {/if}
  {#if activeWindow.current !== null}
    {#each activeWindow.menuBarItems as data}
      <MenuBarItem {data} />
    {/each}
  {/if}
  <div class="flex-1"></div>
  <MenuBarButton id="system-time">
    {#snippet content()}{/snippet}
    {time}
  </MenuBarButton>
</menu>
