<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<section class="mt-5">
  <h2 id={title.toLowerCase().split(" ").join("-")} class="text-2xl font-bold">
    {title}
  </h2>
  {@render children?.()}
</section>
