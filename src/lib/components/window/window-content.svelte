<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();
</script>

<div data-nodrag class="window-content p-5">
  {@render children?.()}
</div>
