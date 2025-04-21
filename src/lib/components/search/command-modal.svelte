<script lang="ts">
  import { search } from "$lib/meta.svelte";
  import { type Snippet } from "svelte";
  import { scale } from "svelte/transition";

  const DURATION = 200;

  let {
    open = $bindable(false),
    title,
    onshow,
    onclose,
    children,
  }: {
    open?: boolean;
    title?: string;
    onshow?: Function;
    onclose?: Function;
    children?: Snippet;
  } = $props();

  let scrollable: boolean = $state(false);
  let modal: HTMLDialogElement | undefined = $state();
  let timeout: NodeJS.Timeout;

  export function show() {
    clearTimeout(timeout);
    modal?.showModal();
    open = true;
    onshow?.();
    search.open = true;
  }

  export function close() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      modal?.close();
    }, DURATION);
    open = false;
    onclose?.();
    search.open = false;
  }
</script>

<svelte:document
  onkeydown={(e) => {
    if (open && e.key === "Escape") {
      e.preventDefault();
    }
  }}
/>

<dialog
  aria-label={title}
  bind:this={modal}
  onclose={(e) => {
    e.preventDefault();
    close();
  }}
  class="relative"
>
  {#if open}
    <div
      class={{
        "absolute inset-0 grid": true,
        "overflow-auto": scrollable,
        "overflow-hidden": !scrollable,
      }}
    >
      <div
        role="presentation"
        onpointerdown={(e) => {
          if (e.currentTarget !== e.target) return;
          close();
        }}
        class="relative col-start-1 row-start-1"
      >
        <div
          in:scale={{ start: 0.975, duration: DURATION }}
          out:scale={{ start: 0.975, duration: DURATION }}
          class="bg-glass fixed top-1/5 left-1/2 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-box shadow-2xl shadow-black/70"
        >
          {@render children?.()}
        </div>
      </div>
    </div>
  {/if}
</dialog>

<style>
  dialog {
    pointer-events: none;
    visibility: hidden;
    position: fixed;
    inset: 0;
    margin: 0;
    background-color: transparent;
    max-width: none;
    max-height: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  dialog::backdrop {
    background-color: transparent;
  }

  dialog[open] {
    visibility: visible;
    pointer-events: auto;
    overflow-y: auto;
  }
</style>
