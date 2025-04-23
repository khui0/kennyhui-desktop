<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    selected = $bindable(false),
    onclick,
    children,
  }: {
    onclick?: () => void;
    selected?: boolean;
    children?: Snippet;
  } = $props();
</script>

<li>
  <button
    {onclick}
    class={{
      "rounded-field text-base-content/85 flex h-7 w-full cursor-default items-center px-1.5": true,
      "bg-base-content/10 window-active:bg-accent/75 window-active:text-accent-content": selected,
    }}
  >
    <div class="flex items-center gap-1.5 not-window-active:opacity-50">
      {@render children?.()}
    </div>
  </button>
</li>
