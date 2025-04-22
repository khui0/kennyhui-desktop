<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    label,
    onclick,
    children,
  }: {
    label: string;
    onclick?: () => void;
    children?: Snippet;
  } = $props();
</script>

<button
  {onclick}
  class="bg-control focus-ring flex flex-col items-center justify-center gap-0.5 p-1 pb-1.5 active:brightness-70"
>
  <span class="text-base-content/60 text-xl">
    {@render children?.()}
  </span>
  <p class="text-center text-[10px] leading-[1.1]">{label}</p>
</button>
