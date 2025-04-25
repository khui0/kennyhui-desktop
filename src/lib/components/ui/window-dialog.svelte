<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade, fly } from "svelte/transition";

  let { children }: { children?: Snippet } = $props();
</script>

<div
  in:fade={{ duration: 300 }}
  out:fade={{ duration: 300 }}
  data-nodrag
  class="absolute inset-0 z-[110] flex items-center justify-center bg-black/20 p-5"
>
  <div
    in:fly={{ y: -50 }}
    out:fly={{ y: -50 }}
    class="bg-base-100 standard-border rounded-box z-40 flex max-h-full w-[min(320px,100%)] overflow-hidden shadow-xl"
  >
    <div class="flex flex-col items-center gap-2.5 overflow-auto p-5 text-center">
      {@render children?.()}
    </div>
  </div>
</div>
