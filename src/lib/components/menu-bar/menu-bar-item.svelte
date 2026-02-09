<script lang="ts">
  import { settings } from "$lib/apps/settings/settings";
  import type { MenuContent } from "$lib/core";
  import type { Snippet } from "svelte";
  import Menu from "../menu/menu.svelte";
  import { activateMenuBar, menuBarState } from "./helpers.svelte";

  let {
    id,
    text,
    content,
    type = "normal",
    onclick,
    children,
  }: {
    id?: string;
    text?: string;
    content?: MenuContent;
    type?: "bold" | "normal";
    onclick?: () => void;
    children?: Snippet;
  } = $props();

  const active = $derived(menuBarState.activeId === id && menuBarState.active);
</script>

<div
  role="button"
  tabindex="-1"
  data-menu-bar-item={id ? id : ""}
  class="group relative py-1 select-none"
  onkeydown={(e) => {
    if (e.key !== " " && e.key !== "Enter") return;
    if (!id) return;
    activateMenuBar(id);
  }}
  onpointerdown={() => {
    onclick?.();
  }}
>
  <div
    class={{
      "group-active:bg-base-content/15 pointer-events-none relative -mx-1 flex h-6 shrink-0 items-center justify-center rounded-sm px-[11px] text-[13px] text-shadow-md group-first-of-type:ml-1 group-last-of-type:mr-1": true,
      "bg-base-content/15": active,
      "group-first:rounded-tl-[8px] group-last:rounded-tr-[8px]": $settings.roundedCorners,
    }}
  >
    <span
      class={{
        "font-bold": type === "bold",
        "font-normal": type === "normal",
      }}
    >
      {#if children}
        {@render children()}
      {:else}
        {text || ""}
      {/if}
    </span>
    {#if content}
      <div
        data-menu-bar-menu
        aria-hidden={!active}
        class={{
          "absolute top-full left-0 z-50 mt-1.25": true,
          "pointer-events-auto opacity-100": active,
          "pointer-events-none opacity-0": !active,
        }}
      >
        <Menu {content} transparent />
      </div>
    {/if}
  </div>
</div>
