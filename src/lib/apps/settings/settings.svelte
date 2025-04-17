<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { type Snippet } from "svelte";
  import HeroiconsChevronLeft20Solid from "~icons/heroicons/chevron-left-20-solid";
  import { settingsPages } from "./helpers.svelte";

  let index: number = $state(0);
</script>

<div class="relative grid h-full grid-cols-1 @md:grid-cols-[200px_1fr]">
  <ul class="mt-[28px] hidden flex-col p-2.5 @md:flex" data-nodrag>
    {#each settingsPages as page, i}
      <li>
        <button
          class={{
            "rounded-field flex w-full cursor-default items-center gap-2 px-2 py-1": true,
            "bg-accent/75": i === index,
          }}
          onclick={() => {
            index = i;
          }}
        >
          <AppIcon src={page.icon.default} size="xs" />
          {page.title}
        </button>
      </li>
    {/each}
  </ul>
  <div class="bg-base-100 relative flex flex-col overflow-auto @md:border-l">
    <div class="bg-base-100 sticky top-0 flex items-center px-2.5 pt-[28px] pb-2.5 @md:pt-2.5">
      <button class="btn btn-ghost btn-lg text-xl"><HeroiconsChevronLeft20Solid /></button>
      <h2 class="ml-2 text-[15px] font-semibold">{settingsPages[index].title}</h2>
    </div>
    <div data-nodrag class="mb-5 flex-1 px-5">
      {@render (settingsPages[index].content as Snippet)()}
    </div>
  </div>
</div>
