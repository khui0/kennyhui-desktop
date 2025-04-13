<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div
  class="bg-base-100 window-active:bg-base-200/80 grid h-7 shrink-0 items-center justify-center text-sm shadow-xs select-none"
>
  {@render children?.()}
</div>
