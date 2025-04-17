<script lang="ts">
  import type { Snippet } from "svelte";
  import BorderText from "./border-text.svelte";

  let {
    label,
    tooltip,
    repeat = 4,
    spacing = 0,
    offset = 0,
    children,
    onclick,
  }: {
    label: string;
    tooltip?: string;
    repeat?: number;
    spacing?: number;
    offset?: number;
    children: Snippet;
    onclick?: Function;
  } = $props();
</script>

<div class="tooltip" data-tip={tooltip}>
  <button
    aria-label={label}
    class="border-base-content/50 btn btn-square rounded-box group grid size-20 border transition-transform hover:scale-105"
    onclick={() => {
      onclick?.();
    }}
  >
    <span
      aria-hidden="true"
      class="col-start-1 row-start-1 flex h-full w-full items-center justify-center opacity-50 transition-opacity group-hover:opacity-100"
    >
      <BorderText
        radius={5}
        width={70}
        height={70}
        {spacing}
        {offset}
        text={`${label}•`.repeat(repeat)}
      ></BorderText>
    </span>
    <span
      class="col-start-1 row-start-1 flex h-full w-full items-center justify-center text-2xl opacity-50 transition-all group-hover:rotate-6 group-hover:opacity-100"
    >
      {@render children()}
    </span>
  </button>
</div>
