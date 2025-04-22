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

<div class="grid grid-cols-[3fr_4fr] gap-3 text-[11px] leading-relaxed">
  <span class="justify-self-end text-end">{label}</span>
  <span class="text-base-content/50 justify-self-start text-start">
    {@render children?.()}
  </span>
</div>
