<script lang="ts">
  import { menuBar } from "$lib/meta.svelte";
  import type { Snippet } from "svelte";
  import { activateMenuBar, deactivateMenuBar } from "./helpers.svelte";

  let {
    type = "item",
    id,
    content,
    children,
  }: {
    type?: "logo" | "name" | "item";
    id: string;
    content: Snippet;
    children: Snippet;
  } = $props();

  let parentRef: HTMLElement | null = $state(null);
  let menuRef: HTMLElement | null = $state(null);

  let open: boolean = $derived(menuBar.activeId === id);
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

<div data-menu-bar-item={id} class="group relative -mx-1 py-1" bind:this={parentRef}>
  <button
    class={{
      "flex h-6 shrink-0 items-center justify-center rounded-sm px-[11px] text-[13px] text-shadow-md": true,
      "w-[37px]": type === "logo",
      "font-bold": type === "name",
      "font-normal": type === "item",
      "menu-bar-active:bg-black/10 dark:menu-bar-active:bg-white/20 ": open,
    }}
    onkeydown={(e) => {
      if (e.key !== " " && e.key !== "Enter") return;
      if (menuBar.activeId === id) {
        deactivateMenuBar();
      } else {
        activateMenuBar(id);
      }
    }}
  >
    {@render children()}
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
    {@render content()}
  </div>
</div>
