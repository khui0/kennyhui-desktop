<script lang="ts">
  import { launchpad, menubar } from "$lib/meta.svelte";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import { activeWindow } from "../window/windows.svelte";
  import MenubarItem from "./menubar-item.svelte";

  let time: string = $state("");

  update();

  onMount(() => {
    setInterval(update, 1000);
  });

  function update() {
    time = dayjs().format("ddd MMM D h:mm A");
  }

  function onpointerdown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const menubarElement = document.querySelector("[data-menubar]");
    const isMenubar: boolean = target.closest("[data-menubar]") !== null;

    if (isMenubar) {
      menubarElement?.setAttribute("data-menubar-active", "");
      menubar.active = true;
    } else {
      menubarElement?.removeAttribute("data-menubar-active");
      menubar.active = false;
    }
  }
</script>

<svelte:document {onpointerdown} />

<menu
  data-menubar
  class={{
    "absolute flex h-8.75 w-full items-center bg-white/50 px-2 backdrop-blur-[50px] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-black/18": true,
    "opacity-0": launchpad.open,
    "opacity-100": !launchpad.open,
  }}
>
  <MenubarItem type="logo"><TablerCircleFilled /></MenubarItem>
  <MenubarItem type="name"
    >{activeWindow.current ? activeWindow.current.name : "Kenny Hui"}</MenubarItem
  >
  <MenubarItem>File</MenubarItem>
  <MenubarItem>Edit</MenubarItem>
  <div class="flex-1"></div>
  <MenubarItem>{time}</MenubarItem>
</menu>
