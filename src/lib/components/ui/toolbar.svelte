<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    subtitle,
    controls = "always",
    transparent = false,
    navigation,
    children,
  }: {
    title: string;
    subtitle?: string;
    controls?: "auto" | "always" | "never";
    transparent?: boolean;
    navigation?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div
  class={{
    "text-base-content/85 flex h-13 w-full shrink-0 overflow-hidden py-2.25 transition-[padding]": true,
    "pl-[92px]": controls === "always",
    "@max-md:pl-[92px]": controls === "auto",
    "border-b border-black/18 bg-[#eaeaea]/85 dark:border-black dark:bg-[#3c3c3c]/80": !transparent,
  }}
>
  <div class="flex items-center gap-2 px-3">
    {@render navigation?.()}
    <div class="flex w-fit flex-col items-start">
      <p class="text-[15px] font-semibold">{title}</p>
      {#if subtitle}
        <p class="text-base-content/50 leading-[14px]">{subtitle}</p>
      {/if}
    </div>
  </div>
  <div class="flex-1"></div>
  <div class="flex items-center pl-3">
    {@render children?.()}
  </div>
</div>
