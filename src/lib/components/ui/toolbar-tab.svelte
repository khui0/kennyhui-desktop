<script lang="ts">
  import type { Snippet } from "svelte";
  import HeroiconsXMark20Solid from "~icons/heroicons/x-mark-20-solid";

  let {
    active = $bindable(false),
    onclick,
    onclose,
    children,
  }: {
    active?: boolean;
    onclick?: () => void;
    onclose?: () => void;
    children?: Snippet;
  } = $props();
</script>

<div
  class={{
    "group relative flex-1 text-[11px] font-medium": true,
    "text-base-content/50 window-active:dark:bg-black/40 not-window-active:dark:bg-black/50 not-window-active:bg-black/5 border-t bg-black/3 inset-shadow-sm dark:border-black/50":
      !active,
  }}
>
  <button aria-label="select tab" {onclick} class="h-full w-full border-l group-first:border-none">
    {@render children?.()}
  </button>
  <button
    aria-label="close tab"
    {onclose}
    class="text-base-content/50 hover:bg-base-content/25 absolute top-1/2 left-1.5 -translate-y-1/2 rounded-xs text-xs opacity-0 transition-all group-hover:opacity-100"
  >
    <HeroiconsXMark20Solid />
  </button>
</div>
