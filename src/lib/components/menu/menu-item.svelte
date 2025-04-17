<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    disabled = false,
    shortcuts = [],
    onclick,
  }: {
    children?: Snippet;
    disabled?: boolean;
    shortcuts?: string[];
    onclick?: () => void;
  } = $props();
</script>

<button
  class="rounded-field text-base-content/85 disabled:text-base-content/25 flex h-[22px] items-center gap-2 px-[10px] text-sm hover:bg-[#0A82FF]/75"
  {disabled}
  {onclick}
>
  {@render children?.()}
  {#if shortcuts.length > 0}
    <div class="ml-auto flex shrink-0 gap-[2px]">
      {#each shortcuts as shortcuts}
        <span
          class="text-base-content/25 flex w-[12px] items-center justify-center text-sm uppercase"
        >
          {shortcuts}
        </span>
      {/each}
    </div>
  {/if}
</button>
