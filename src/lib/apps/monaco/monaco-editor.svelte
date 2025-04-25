<script lang="ts">
  import { parsedTheme } from "$lib/theme";
  import loader from "@monaco-editor/loader";
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let container: HTMLElement;

  let {
    value = $bindable(""),
    position = $bindable(null),
    language = "plaintext",
  }: {
    value?: string;
    position?: Monaco.Position | null;
    language?: string;
  } = $props();

  onMount(async () => {
    const monacoEditor = await import("monaco-editor");
    loader.config({ monaco: monacoEditor.default });
    monaco = await loader.init();

    create();

    editor.onDidChangeCursorPosition(() => {
      position = editor.getPosition();
    });
    editor.onDidChangeModelContent((e) => {
      if (e.isFlush) {
        // setValue
      } else {
        console.log("hi");
        const updatedValue = editor?.getValue() || "";
        value = updatedValue;
      }
    });
  });

  parsedTheme.subscribe(create);

  async function create(theme: string = get(parsedTheme)) {
    if (!monaco) return;
    editor = monaco.editor.create(container, {
      theme: theme === "dark" ? "vs-dark" : "vs-light",
      language,
      value,
    });
  }

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  });

  let width: number | undefined = $state();
  let height: number | undefined = $state();

  $effect(() => {
    width;
    height;

    editor?.layout();
  });
</script>

<div
  data-nodrag
  class="h-full w-full"
  bind:clientWidth={width}
  bind:clientHeight={height}
  bind:this={container}
></div>
