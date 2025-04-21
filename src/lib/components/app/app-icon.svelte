<script lang="ts">
  import type { Picture } from "vite-imagetools";

  let {
    src,
    size = "md",
  }: {
    src: string | Picture;
    alt?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    icon?: string;
  } = $props();
</script>

<div class="drop-shadow-sm">
  <enhanced:img
    loading="lazy"
    {src}
    alt="{src} icon"
    class={{
      "object-cover": true,
      "h-5 w-5": size === "xs",
      "h-10 w-10": size === "sm",
      "h-14 w-14": size === "md",
      "h-20 w-20": size === "lg",
      "h-30 w-30": size === "xl",
    }}
  />
</div>
