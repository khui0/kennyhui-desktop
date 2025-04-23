<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import SidebarItem from "$lib/components/ui/sidebar-item.svelte";
  import Sidebar from "$lib/components/ui/sidebar.svelte";
  import { type Snippet } from "svelte";
  import { settingsPages } from "./helpers.svelte";

  let index: number = $state(0);
</script>

<Sidebar title={settingsPages[index].title} transparent>
  {#snippet sidebar()}
    {#each settingsPages as page, i}
      <SidebarItem
        selected={i === index}
        onclick={() => {
          index = i;
        }}
      >
        <AppIcon src={page.icon.default} size="xs" />
        {page.title}
      </SidebarItem>
    {/each}
  {/snippet}
  <div class="h-full p-5 pt-0">
    {@render (settingsPages[index].content as Snippet)()}
  </div>
</Sidebar>
