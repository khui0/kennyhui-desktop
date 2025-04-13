<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div
  class="window-active:bg-white window-active:dark:bg-[#1e1e1e] h-full w-full overflow-auto p-5"
  data-nodrag
>
  {@render children?.()}
</div>
