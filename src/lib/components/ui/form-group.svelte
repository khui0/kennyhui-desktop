<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children?: Snippet } = $props();
</script>

<div class="bg-base-content/1.5 border-base-content/4 flex flex-col rounded-[4px] border px-2.5">
  {@render children?.()}
</div>
