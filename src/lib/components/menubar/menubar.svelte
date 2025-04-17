<script lang="ts">
  import { launchpad, menubar } from "$lib/meta.svelte";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import { activeWindow } from "../window/windows.svelte";
  import MenubarItem from "./menubar-item.svelte";

  let time: string = $state("");
  let menubarRef: HTMLElement | null = $state(null);

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
    const item = target?.closest("[data-menubar-item]") as HTMLElement;
    if (itemVisitNumber > 1) {
      itemVisitNumber = 0;
    }

    if (item !== null) {
      const id = item.getAttribute("data-menubar-item");
      if (id === null) return;

      startDisableTimeout();

      menubarRef?.setAttribute("data-menubar-active", "");
      menubar.active = true;
      menubar.activeId = id;
    } else {
      deactivateMenubar();
    }
  }

  function onpointermove(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target?.closest("[data-menubar-item]") as HTMLElement;

    if (!menubar.active) return;

    if (item !== null) {
      const id = item.getAttribute("data-menubar-item");
      if (id !== null && id !== menubar.activeId) {
        menubarRef?.setAttribute("data-menubar-active", "");
        menubar.active = true;
        menubar.activeId = id;
      }
    }
  }

  function onpointerup(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target?.closest("[data-menubar-item]") as HTMLElement;

    if (disableOnPointerUp) {
      if (item === null) return;
      deactivateMenubar();
    }

    if (itemVisitNumber > 0) {
      deactivateMenubar();
    }
    itemVisitNumber++;
  }

  function deactivateMenubar(): void {
    menubarRef?.removeAttribute("data-menubar-active");
    menubar.active = false;
    menubar.activeId = "";
  }
</script>

<svelte:document {onpointerdown} {onpointermove} {onpointerup} />

<menu
  bind:this={menubarRef}
  class={{
    "absolute flex h-8 w-full items-center bg-white/50 px-2 backdrop-blur-[50px] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-black/18": true,
    "opacity-0": launchpad.open,
    "opacity-100": !launchpad.open,
  }}
>
  <MenubarItem type="logo" id="system"><TablerCircleFilled /></MenubarItem>
  <MenubarItem type="name" id="active-app"
    >{activeWindow.current ? activeWindow.current.name : "Kenny Hui"}</MenubarItem
  >
  <MenubarItem id="file">File</MenubarItem>
  <MenubarItem id="edit">Edit</MenubarItem>
  <div class="flex-1"></div>
  <MenubarItem id="time">{time}</MenubarItem>
</menu>
