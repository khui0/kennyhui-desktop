<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div class="rounded-field bg-base-300/30 border-base-content/5 flex flex-col gap-2 border p-1.5">
  {@render children?.()}
</div>
