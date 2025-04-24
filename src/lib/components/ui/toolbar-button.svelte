<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    disabled,
    onclick,
    children,
  }: {
    disabled?: boolean;
    onclick?: () => void;
    children?: Snippet;
  } = $props();
</script>

<button
  {disabled}
  data-nodrag
  class="btn btn-ghost btn-lg text-[17px] disabled:pointer-events-none disabled:opacity-50"
  {onclick}
>
  {@render children?.()}
</button>
