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
    "-mx-1 flex h-6 items-center justify-center rounded-sm px-[11px] text-[13px] hover:bg-[#e6e6e6] dark:hover:bg-white/20": true,
    "w-[37px]": type === "logo",
    "font-bold": type === "name",
    "font-medium": type === "item",
  }}
>
  {@render children?.()}
</button>
