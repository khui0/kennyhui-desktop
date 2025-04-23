<script lang="ts">
  import { onMount, tick, type Snippet } from "svelte";
  import TablerLayoutSidebar from "~icons/tabler/layout-sidebar";
  import Toolbar from "./toolbar.svelte";

  let {
    title,
    transparent,
    sidebar,
    children,
  }: {
    title: string;
    transparent?: boolean;
    sidebar?: Snippet;
    children?: Snippet;
  } = $props();

  let open: boolean = $state(false);
  let ready: boolean = $state(false);

  onMount(async () => {
    await tick();
    ready = true;
  });
</script>

<div class="relative flex h-full overflow-x-hidden">
  <div
    class={{
      "flex shrink-0 overflow-hidden @md:w-[200px]": true,
      "w-0": !open,
      "w-[200px]": open,
      "transition-[width]": ready,
    }}
  >
    <ul class="mt-13 w-[200px] flex-1 shrink-0 flex-col overflow-auto p-2.5 pt-0" data-nodrag>
      {@render sidebar?.()}
    </ul>
  </div>
  <div
    class={{
      "bg-base-100 relative flex h-full w-full shrink-0 flex-col @md:flex-1": true,
      "border-l border-black/18 dark:border-black": true,
      "@max-md:border-none": !open,
    }}
  >
    <Toolbar {transparent} {title} controls={open ? "never" : "auto"}>
      {#snippet navigation()}
        <button
          data-nodrag
          class="btn btn-ghost btn-lg text-[17px] @md:pointer-events-none @md:opacity-50"
          onclick={() => {
            open = !open;
          }}
        >
          <TablerLayoutSidebar />
        </button>
      {/snippet}
    </Toolbar>
    <div data-nodrag class="flex-1 overflow-auto">
      {@render children?.()}
    </div>
  </div>
</div>
