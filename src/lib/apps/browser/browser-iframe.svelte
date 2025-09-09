<script lang="ts">
  import { onMount } from "svelte";

  let iframeRef: HTMLIFrameElement | null = $state(null);

  let searchBar: string = $state("");

  let history: string[] = $state([]);
  let position: number = -1;

  onMount(() => {
    navigate("https://www.google.com/search?igu=1");
  });

  export function navigate(input: string) {
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

  export function back() {
    if (iframeRef === null) return;

    if (position > 0) {
      position--;
      iframeRef.src = history[position];
      searchBar = iframeRef.src;
    }
  }

  export function forward() {
    if (iframeRef === null) return;

    if (position < history.length - 1) {
      position++;
      iframeRef.src = history[position];
      searchBar = iframeRef.src;
    }
  }

  export async function refresh() {
    if (iframeRef === null) return;

    iframeRef.src = "";
    iframeRef.src = history[position];
  }
</script>

<iframe
  data-nodrag
  bind:this={iframeRef}
  title="browser tab"
  referrerpolicy="no-referrer"
  class="h-full w-full"
  sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
