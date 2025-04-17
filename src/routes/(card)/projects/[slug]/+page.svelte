<script lang="ts">
  import { goto } from "$app/navigation";
  import { commandKey, enterKey, modifiers } from "$lib/meta.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:window
  onkeydown={(e) => {
    if (commandKey(e)) {
      if (e.key === "Enter") {
        window.open(data.project.links[0].href, "_blank");
      }
      if (e.key === "Backspace") {
        goto("/");
      }
    }
  }}
/>

<div class="relative overflow-hidden">
  <enhanced:img
    src={data.project.image.default}
    alt={data.project.alt}
    class="print:rounded-field object-cover"
  />
  <div class="absolute right-0 bottom-0 left-0 m-3 flex flex-wrap justify-end gap-1">
    {#each data.project.tags as tag}
      <span
        class="badge cursor-default rounded-full opacity-50 transition-opacity hover:opacity-100"
      >
        {tag}
      </span>
    {/each}
  </div>
</div>
<div class="m-6 mb-0">
  <div class="flex flex-wrap justify-between gap-2">
    <h2 class="text-5xl leading-none font-bold tracking-tight">{data.project.title}</h2>
    <div class="flex flex-wrap items-center justify-center gap-2 py-1 print:hidden">
      {#each data.project.links as link, i}
        <a class="btn" target="_blank" rel="noopener noreferrer" href={link.href}>
          {link.title || "Link " + i}
          {#if i === 0}
            <kbd>{modifiers.command}</kbd><kbd>{enterKey}</kbd>
          {/if}
        </a>
      {/each}
    </div>
  </div>
  <div class="text-base-content/50 mt-1 mb-4 flex flex-wrap justify-between font-extralight">
    <p>{data.project.short}</p>
    <p>{data.project.year}</p>
  </div>
</div>
<div class="prose m-6 font-light print:max-w-full">
  {@html data.html?.code}
</div>
