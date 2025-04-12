<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div class="bg-base-200 grid h-7 items-center justify-center text-sm shadow-sm select-none">
  {@render children?.()}
</div>
