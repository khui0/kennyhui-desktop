<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import ToolbarButton from "$lib/components/ui/toolbar-button.svelte";
  import Toolbar from "$lib/components/ui/toolbar.svelte";
  import { add } from "$lib/components/window/windows.svelte";
  import { onMount } from "svelte";
  import HeroiconsArrowPathSolid from "~icons/heroicons/arrow-path-solid";
  import HeroiconsChevronLeftSolid from "~icons/heroicons/chevron-left-solid";
  import HeroiconsChevronRightSolid from "~icons/heroicons/chevron-right-solid";
  import HeroiconsSquaresPlusSolid from "~icons/heroicons/squares-plus-solid";

  const app = $derived(applications.find((app) => app.id === "dev.kennyhui.browser"));

  let iframeRef: HTMLIFrameElement | null = $state(null);

  let searchBarRef: HTMLInputElement | null = $state(null);
  let searchBar: string = $state("");

  let history: string[] = $state([]);
  let position: number = -1;

  onMount(() => {
    navigate("https://www.google.com/search?igu=1");
  });

  function navigate(input: string) {
    if (iframeRef === null) return;

    const url = resolveQuery(input).href;
    iframeRef.src = url;
    searchBar = iframeRef.src;

    if (position === history.length - 1) {
      history = [...history, url];
    } else {
      history = [...history.slice(0, position + 1), url];
    }
    position = history.length - 1;
  }

  function resolveQuery(input: string): URL {
    if (URL.canParse(input)) return new URL(input);
    if (/^(?:[a-z0-9][a-z0-9]*\.)?[a-z0-9][a-z0-9]*\.[a-z0-9]+$/.test(input))
      return new URL(`https://${input}`);
    return new URL(`https://www.google.com/search?igu=1&q=${encodeURIComponent(input)}`);
  }

  function back() {
    if (iframeRef === null) return;

    if (position > 0) {
      position--;
      iframeRef.src = history[position];
      searchBar = iframeRef.src;
    }
  }

  function forward() {
    if (iframeRef === null) return;

    if (position < history.length - 1) {
      position++;
      iframeRef.src = history[position];
      searchBar = iframeRef.src;
    }
  }

  async function refresh() {
    if (iframeRef === null) return;

    iframeRef.src = "";
    iframeRef.src = history[position];
  }

  function newWindow() {
    if (!app) return;
    if (app.count() < 3) {
      add(app.window(`${app.name} (${app.instances() + 1})`));
    }
  }
</script>

<Toolbar>
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
    <ToolbarButton disabled={(app?.instances() || 3) >= 3} label="new window" onclick={newWindow}>
      <HeroiconsSquaresPlusSolid />
    </ToolbarButton>
    <ToolbarButton label="refresh" onclick={refresh}>
      <HeroiconsArrowPathSolid />
    </ToolbarButton>
  {/snippet}
</Toolbar>
<iframe
  data-nodrag
  bind:this={iframeRef}
  title="Browser"
  referrerpolicy="no-referrer"
  class="h-full w-full"
  sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
