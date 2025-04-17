<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<svg class="absolute h-0 w-0">
  <clipPath id="mask" clipPathUnits="objectBoundingBox">
    <path
      d="M.263 1C.088 1 0 .912 0 .738V.263C0 .088.087 0 .263 0h.475C.913 0 1 .088 1 .263v.475C1 .913.912 1 .738 1H.263Z"
      style="fill-rule:nonzero"
    />
  </clipPath>
</svg>
<div style="clip-path: url(#mask);" class="aspect-square">
  {@render children()}
</div>
