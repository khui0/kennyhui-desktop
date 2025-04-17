<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    label,
    children,
  }: {
    label: string;
    children?: Snippet;
  } = $props();
</script>

<div class="grid grid-cols-[auto_1fr] text-base-content/90">
  <p class="ml-1 leading-[22px]">{label}</p>
  <div class="flex justify-end">
    {@render children?.()}
  </div>
</div>
