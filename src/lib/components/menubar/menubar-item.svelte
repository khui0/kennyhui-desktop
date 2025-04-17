<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import Menu from "../menu/menu.svelte";
  import { menubar } from "$lib/meta.svelte";
  import { activateMenubar, deactivateMenubar } from "./helpers.svelte";

  let {
    type = "item",
    id,
    children,
  }: {
    type?: "logo" | "name" | "item";
    id: string;
    children?: Snippet;
  } = $props();

  let parentRef: HTMLElement | null = $state(null);
  let menuRef: HTMLElement | null = $state(null);

  let open: boolean = $derived(menubar.activeId === id);
  let flip: boolean = $state(false);

  $effect(() => {
    open;
    console.log("uh");
    positionMenu();
  });

  function positionMenu(): void {
    if (!parentRef) return;
    if (!menuRef) return;

    const left = parentRef.getBoundingClientRect().x;
    const width = menuRef.clientWidth;

    console.log(left, width, document.body.clientWidth);

    if (left + width >= document.body.clientWidth) {
      flip = true;
    }
  }
</script>

<div data-menubar-item={id} class="group relative -mx-1 py-1" bind:this={parentRef}>
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
      if (menubar.activeId === id) {
        deactivateMenubar();
      } else {
        activateMenubar(id);
      }
    }}
  >
    {@render children?.()}
  </button>
  {#if open}
    <div
      class={{
        "absolute top-full": true,
        "left-0": !flip,
        "right-0": flip,
      }}
      bind:this={menuRef}
    >
      <Menu />
    </div>
  {/if}
</div>
