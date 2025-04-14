<script lang="ts">
  import { type Snippet } from "svelte";
  import { fly } from "svelte/transition";

  let { children }: { children: Snippet } = $props();
</script>

<div class="mx-auto max-w-3xl p-2 print:max-w-full print:p-0">
  <article
    in:fly={{ y: 50 }}
    out:fly={{ y: 50 }}
    class="rounded-box not-print:bg-glass shadow-2xl not-print:overflow-hidden print:p-0 print:shadow-none"
  >
    {@render children()}
  </article>
</div>
