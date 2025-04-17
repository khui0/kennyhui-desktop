<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import Menu from "../menu/menu.svelte";
  import { menubar } from "$lib/meta.svelte";

  let open: boolean = $state(false);

  let width: number = $state(0);
  let menuRef: HTMLElement | null = $state(null);

  let {
    type = "item",
    children,
  }: {
    type?: "logo" | "name" | "item";
    children?: Snippet;
  } = $props();

  let flip: boolean = $state(false);

  onMount(() => {
    if (!menuRef) return;
    const rect = menuRef.getBoundingClientRect();

    if (rect.x + width >= document.body.clientWidth) {
      flip = true;
    }
  });

  function openMenu() {
    open = true;
  }

  function closeMenu() {
    open = false;
  }
</script>

<div class="group relative -mx-1" bind:this={menuRef}>
  <button
    class={{
      "menubar-active:group-hover:bg-black/10 dark:menubar-active:group-hover:bg-white/20 flex h-6 shrink-0 items-center justify-center rounded-sm px-[11px] text-[13px] text-shadow-md": true,
      "w-[37px]": type === "logo",
      "font-bold": type === "name",
      "font-normal": type === "item",
    }}
    onpointerdown={() => {
      if (!open) {
        openMenu();
      } else {
        openMenu();
      }
    }}
    onpointerenter={() => {
      if (menubar.active) {
        openMenu();
      }
    }}
    onpointerleave={() => {
      closeMenu();
    }}
  >
    {@render children?.()}
  </button>
  {#if open}
    <div
      class={{
        "absolute top-full mt-1.5": true,
        "left-0": !flip,
        "right-0": flip,
      }}
      bind:clientWidth={width}
    >
      <Menu />
    </div>
  {/if}
</div>
