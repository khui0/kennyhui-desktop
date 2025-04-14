<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    type = "item",
    children,
  }: {
    type?: "logo" | "name" | "item";
    children?: Snippet;
  } = $props();
</script>

<button
  class={{
    "-mx-1 flex h-6 shrink-0 items-center justify-center rounded-sm px-[11px] text-[13px] text-shadow-md hover:bg-black/10 dark:hover:bg-white/20": true,
    "w-[37px]": type === "logo",
    "font-bold": type === "name",
    "font-normal": type === "item",
  }}
>
  {@render children?.()}
</button>
