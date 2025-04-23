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

<div
  class="border-base-content/5 text-base-content/85 grid h-9 grid-cols-[auto_1fr] items-center not-first:border-t"
>
  <p>{label}</p>
  <div class="flex justify-end">
    {@render children?.()}
  </div>
</div>
