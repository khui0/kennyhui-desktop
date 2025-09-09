<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    subtitle,
    controls = "always",
    transparent = false,
    showTabs = false,
    leading,
    center,
    trailing,
    tabs,
  }: {
    title?: string;
    subtitle?: string;
    controls?: "auto" | "always" | "never";
    transparent?: boolean;
    showTabs?: boolean;
    leading?: Snippet;
    center?: Snippet;
    trailing?: Snippet;
    tabs?: Snippet;
  } = $props();
</script>

<div
  class={{
    "text-base-content/50 window-active:text-base-content/85 flex w-full shrink-0 flex-col": true,
    "bg-base-100 window-active:bg-base-200/80 border-b border-black/18 dark:border-black":
      !transparent,
  }}
>
  <div
    class={{
      "flex h-13 overflow-hidden py-2.25 transition-[padding]": true,
      "pl-[80px]": controls === "always",
      "@max-md:pl-[80px]": controls === "auto",
    }}
  >
    <div class="flex items-center gap-2 px-3">
      {@render leading?.()}
      {#if title || subtitle}
        <div class="flex w-fit flex-col items-start">
          {#if title}
            <p class="text-[15px] font-semibold">{title}</p>
          {/if}
          {#if subtitle}
            <p class="text-base-content/50 leading-[14px]">{subtitle}</p>
          {/if}
        </div>
      {/if}
    </div>
    {#if center}
      <div class="flex-1"></div>
      <div class="flex items-center gap-2 pr-3">
        {@render center()}
      </div>
    {/if}
    <div class="flex-1"></div>
    <div class="flex items-center gap-2 pr-3">
      {@render trailing?.()}
    </div>
  </div>
  {#if showTabs}
    <div data-nodrag class="flex h-7">
      {@render tabs?.()}
    </div>
  {/if}
</div>
