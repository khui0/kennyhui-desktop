<script lang="ts">
  import type { MenubarItem } from "$lib/applications.svelte";
  import { menubar } from "$lib/meta.svelte";
  import type { Snippet } from "svelte";
  import Menu from "../menu/menu.svelte";
  import { activateMenubar, deactivateMenubar } from "./helpers.svelte";

  let {
    type = "item",
    data,
    children,
  }: {
    type?: "logo" | "name" | "item";
    data: MenubarItem;
    children?: Snippet;
  } = $props();

  let parentRef: HTMLElement | null = $state(null);
  let menuRef: HTMLElement | null = $state(null);

  let open: boolean = $derived(menubar.activeId === data.id);
  let flip: boolean = $state(false);

  $effect(() => {
    open;
    positionMenu();
  });

  function positionMenu(): void {
    if (!parentRef) return;
    if (!menuRef) return;

    const left = parentRef.getBoundingClientRect().x;
    const width = menuRef.clientWidth;

    if (left + width >= document.body.clientWidth) {
      flip = true;
    }
  }
</script>

<div data-menubar-item={data.id} class="group relative -mx-1 py-1" bind:this={parentRef}>
  <button
    class={{
      "flex h-6 shrink-0 items-center justify-center rounded-sm px-[11px] text-[13px] text-shadow-md": true,
      "w-[37px]": type === "logo",
      "font-bold": type === "name",
      "font-normal": type === "item",
      "menubar-active:bg-black/10 dark:menubar-active:bg-white/20 ": open,
    }}
    onkeydown={(e) => {
      if (e.key !== " " && e.key !== "Enter") return;
      if (menubar.activeId === data.id) {
        deactivateMenubar();
      } else {
        activateMenubar(data.id);
      }
    }}
  >
    {#if children}
      {@render children()}
    {:else}
      {data.text}
    {/if}
  </button>
  <div
    aria-hidden={!open}
    class={{
      "absolute top-full": true,
      "left-0": !flip,
      "right-0": flip,
      "pointer-events-auto opacity-100": open,
      "pointer-events-none opacity-0": !open,
    }}
    bind:this={menuRef}
  >
    <Menu items={data.items} />
  </div>
</div>
