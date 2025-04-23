<script lang="ts">
  import HeroiconsXMark16Solid from "~icons/heroicons/x-mark-16-solid";
  import HeroiconsMinus16Solid from "~icons/heroicons/minus-16-solid";
  import TablerCaretUpDownFilled from "~icons/tabler/caret-up-down-filled";

  let {
    type = "standard",
  }: {
    type?: "standard" | "mono" | "title-tab";
  } = $props();
</script>

<div
  data-window-controls
  class={{
    "group grid grid-cols-3 items-center gap-2": true,
    "mx-2": type === "title-tab",
    "mx-3.25": type === "mono",
    "mx-5": type === "standard",
  }}
>
  <div
    data-window-close
    class="window-active:bg-error group-hover:bg-error group-hover:text-error-content bg-base-300 flex h-3 w-3 items-center justify-center rounded-full text-xs text-transparent"
  >
    <HeroiconsXMark16Solid />
  </div>
  <div
    data-window-hide
    class="window-active:bg-warning group-hover:bg-warning group-hover:text-warning-content bg-base-300 flex h-3 w-3 items-center justify-center rounded-full text-xs text-transparent"
  >
    <HeroiconsMinus16Solid />
  </div>
  <div
    data-window-fullscreen
    class="window-active:bg-success group-hover:bg-success group-hover:text-success-content bg-base-300 flex h-3 w-3 items-center justify-center rounded-full text-xs text-transparent"
  >
    <span class="-rotate-45 text-[8px]">
      <TablerCaretUpDownFilled />
    </span>
  </div>
</div>
