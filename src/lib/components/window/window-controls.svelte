<script lang="ts">
  import HeroiconsXMark16Solid from "~icons/heroicons/x-mark-16-solid";
  import HeroiconsMinus16Solid from "~icons/heroicons/minus-16-solid";
  import TablerCaretUpDownFilled from "~icons/tabler/caret-up-down-filled";
</script>

<div class="group grid h-full grid-cols-3 items-center gap-2">
  <div
    class="bg-error group-hover:text-error-content flex h-3 w-3 items-center justify-center rounded-full text-xs text-transparent"
  >
    <HeroiconsXMark16Solid />
  </div>
  <div
    class="bg-warning group-hover:text-warning-content flex h-3 w-3 items-center justify-center rounded-full text-xs text-transparent"
  >
    <HeroiconsMinus16Solid />
  </div>
  <div
    class="bg-success group-hover:text-success-content flex h-3 w-3 items-center justify-center rounded-full text-xs text-transparent"
  >
    <span class="-rotate-45 text-[8px]">
      <TablerCaretUpDownFilled />
    </span>
  </div>
</div>
