<script lang="ts">
  import ToolbarButton from "$lib/components/ui/toolbar-button.svelte";
  import ToolbarTab from "$lib/components/ui/toolbar-tab.svelte";
  import Toolbar from "$lib/components/ui/toolbar.svelte";
  import HeroiconsArrowPathSolid from "~icons/heroicons/arrow-path-solid";
  import HeroiconsChevronLeftSolid from "~icons/heroicons/chevron-left-solid";
  import HeroiconsChevronRightSolid from "~icons/heroicons/chevron-right-solid";
  import HeroiconsPlusSolid from "~icons/heroicons/plus-solid";
  import BrowserIframe from "./browser-iframe.svelte";

  let tabCount: number = $state(1);
  let selectedTab: number = $state(0);

  let searchBarRef: HTMLInputElement | null = $state(null);
  let searchBar: string = $state("");

  function navigate(input: string) {}

  function back() {}

  function forward() {}

  async function refresh() {}

  function newTab() {
    if (tabCount >= 3) return;
    tabCount++;
  }
</script>

<Toolbar showTabs={tabCount > 1}>
  {#snippet leading()}
    <ToolbarButton label="back" onclick={back}>
      <HeroiconsChevronLeftSolid />
    </ToolbarButton>
    <ToolbarButton label="forward" onclick={forward}>
      <HeroiconsChevronRightSolid />
    </ToolbarButton>
  {/snippet}
  {#snippet center()}
    <form
      data-nodrag
      class="flex flex-1 justify-center"
      onsubmit={(e) => {
        e.preventDefault();
        navigate(searchBar);
      }}
    >
      <input
        bind:this={searchBarRef}
        bind:value={searchBar}
        onfocus={() => {
          searchBarRef?.select();
        }}
        type="text"
        class="input text-base-content/50 focus:text-base-content"
        placeholder="Search or enter address"
      />
    </form>
  {/snippet}
  {#snippet trailing()}
    <ToolbarButton label="new window" onclick={newTab}>
      <HeroiconsPlusSolid />
    </ToolbarButton>
    <ToolbarButton label="refresh" onclick={refresh}>
      <HeroiconsArrowPathSolid />
    </ToolbarButton>
  {/snippet}
  {#snippet tabs()}
    {#each new Array(tabCount) as _, i}
      <ToolbarTab
        onclick={() => {
          selectedTab = i;
        }}
        active={i === selectedTab}>Tab {i + 1}</ToolbarTab
      >
    {/each}
  {/snippet}
</Toolbar>
<div class="grid h-full">
  {#each new Array(tabCount) as _, i}
    <div
      class={{
        "col-start-1 row-start-1": true,
        hidden: i !== selectedTab,
      }}
    >
      <BrowserIframe />
    </div>
  {/each}
</div>
