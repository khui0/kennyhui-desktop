<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { onMount, tick, type Snippet } from "svelte";
  import TablerLayoutSidebarFilled from "~icons/tabler/layout-sidebar-filled";
  import { settingsPages } from "./helpers.svelte";

  let index: number = $state(0);

  let sidebarOpen: boolean = $state(false);

  let ready: boolean = $state(false);

  onMount(async () => {
    await tick();
    ready = true;
  });
</script>

<div class="relative flex h-full overflow-x-hidden">
  <div
    class={{
      "flex shrink-0 overflow-hidden  @md:w-[200px]": true,
      "w-0": !sidebarOpen,
      "w-[200px]": sidebarOpen,
      "transition-[width]": ready,
    }}
  >
    <ul class="mt-[28px] w-[200px] shrink-0 flex-col p-2.5" data-nodrag>
      {#each settingsPages as page, i}
        <li>
          <button
            class={{
              "rounded-field flex w-full cursor-default items-center gap-2 px-2 py-1": true,
              "bg-accent/75": i === index,
            }}
            onclick={() => {
              index = i;
              sidebarOpen = false;
            }}
          >
            <AppIcon src={page.icon.default} size="xs" />
            {page.title}
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <div
    class={{
      "bg-base-100 relative flex h-full w-full shrink-0 flex-col overflow-auto @md:flex-1 @md:border-l": true,
      "border-l": sidebarOpen,
    }}
  >
    <div class="bg-base-100 sticky top-0 flex items-center px-2.5 pt-[28px] pb-2.5 @md:pt-2.5">
      <button
        data-nodrag
        class="btn btn-ghost btn-lg text-xl @md:hidden"
        onclick={() => {
          sidebarOpen = !sidebarOpen;
        }}><TablerLayoutSidebarFilled /></button
      >
      <h2 class="ml-2 text-[15px] font-semibold">{settingsPages[index].title}</h2>
    </div>
    <div data-nodrag class="mb-5 flex-1 px-5">
      {@render (settingsPages[index].content as Snippet)()}
    </div>
  </div>
</div>
