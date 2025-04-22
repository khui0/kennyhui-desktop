<script lang="ts">
  import { settings } from "$lib/apps/settings/settings";
  import type { Snippet } from "svelte";

  let {
    active = $bindable(false),
    controls,
    onclick,
    children,
  }: {
    active?: boolean;
    controls?: string;
    onclick?: () => void;
    children?: Snippet;
  } = $props();
</script>

<div class="group relative -mx-1 py-1" data-control-center-controls={controls}>
  <button
    onpointerdown={() => {
      onclick?.();
    }}
    class={{
      "flex h-6 shrink-0 items-center justify-center rounded-sm px-[11px] text-[13px] text-shadow-md": true,
      "group-active:bg-black/10 dark:group-active:bg-white/20 ": !active,
      "bg-black/10 dark:bg-white/20 ": active,
      "group-first:rounded-tl-[8px] group-last:rounded-tr-[8px]": $settings.roundedCorners,
    }}
  >
    {@render children?.()}
  </button>
</div>
