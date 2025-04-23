<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    onclick,
    children,
  }: {
    onclick?: () => void;
    children?: Snippet;
  } = $props();
</script>

<button
  data-nodrag
  class="btn btn-ghost btn-lg text-[17px] @md:pointer-events-none @md:opacity-50"
  {onclick}
>
  {@render children?.()}
</button>
