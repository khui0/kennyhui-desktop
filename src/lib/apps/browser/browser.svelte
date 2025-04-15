<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import { add } from "$lib/components/window/windows.svelte";
  import { onMount } from "svelte";
  import HeroiconsArrowLeft16Solid from "~icons/heroicons/arrow-left-16-solid";
  import HeroiconsArrowPath16Solid from "~icons/heroicons/arrow-path-16-solid";
  import HeroiconsArrowRight16Solid from "~icons/heroicons/arrow-right-16-solid";
  import HeroiconsSquaresPlus16Solid from "~icons/heroicons/squares-plus-16-solid";

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

<div class="relative flex h-full flex-col">
  <div data-nodrag class="bg-base-200/80 flex items-center gap-2 p-1">
    <div class="flex items-center gap-1">
      <button class="btn" aria-label="back" onclick={back}>
        <HeroiconsArrowLeft16Solid />
      </button>
      <button class="btn" aria-label="forwards" onclick={forward}>
        <HeroiconsArrowRight16Solid />
      </button>
    </div>
    <form
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
    <div>
      <button
        class={{
          btn: true,
          "pointer-events-none opacity-50": (app?.instances() || 3) >= 3,
        }}
        aria-label="new window"
        onclick={newWindow}
      >
        <HeroiconsSquaresPlus16Solid />
      </button>
      <button class="btn" aria-label="refresh" onclick={refresh}>
        <HeroiconsArrowPath16Solid />
      </button>
    </div>
  </div>
  <iframe
    bind:this={iframeRef}
    title="Browser"
    referrerpolicy="no-referrer"
    class="h-full w-full"
    sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
  <div class="window-active:pointer-events-none absolute inset-0"></div>
</div>
