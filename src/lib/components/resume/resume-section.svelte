<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<section class="mt-4">
  <h2 id={title.toLowerCase().split(" ").join("-")} class="text-2xl font-bold tracking-tighter">
    {title}
  </h2>
  {@render children?.()}
</section>
