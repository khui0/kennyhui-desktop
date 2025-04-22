<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    value = $bindable(true),
    primary,
    secondary,
    disabled,
    onclick,
    children,
  }: {
    value?: boolean;
    primary: string;
    secondary?: string;
    disabled?: boolean;
    onclick?: () => void;
    children?: Snippet;
  } = $props();
</script>

<div class="grid grid-cols-[auto_1fr] items-center gap-2">
  <button
    onclick={() => {
      if (!disabled) {
        value = !value;
      }
      onclick?.();
    }}
    class={{
      "focus-ring text-accent-content flex h-6.5 w-6.5 items-center justify-center rounded-full": true,
      "bg-accent": value,
      "bg-base-content/25": !value,
    }}
  >
    {@render children?.()}
  </button>
  <div class="flex flex-col justify-center">
    <p class="text-[12px] font-semibold">{primary}</p>
    {#if secondary}
      <p class="text-base-content/50 -mt-0.5 text-[10px]">{secondary}</p>
    {/if}
  </div>
</div>
