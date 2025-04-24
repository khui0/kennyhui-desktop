<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    disabled,
    label,
    onclick,
    children,
  }: {
    disabled?: boolean;
    label?: string;
    onclick?: () => void;
    children?: Snippet;
  } = $props();
</script>

<button
  aria-label={label}
  {disabled}
  data-nodrag
  class="not-window-active:text-base-content/50 btn btn-ghost btn-lg text-[17px] disabled:pointer-events-none disabled:opacity-50"
  {onclick}
>
  {@render children?.()}
</button>
