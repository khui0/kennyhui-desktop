<script lang="ts">
  import { controlKey, launchpad, search } from "$lib/meta.svelte";
  import { tick } from "svelte";
  import { items, type LaunchpadItem } from "../launchpad/launchpad";
  import CommandModal from "./command-modal.svelte";
  import Fuse from "fuse.js";
  import { goto } from "$app/navigation";
  import AppIcon from "../app/app-icon.svelte";
  import { App, applications } from "$lib/applications.svelte";

  const fuse = new Fuse(applications, {
    shouldSort: true,
    keys: ["name", "description"],
  });

  let modal: CommandModal | undefined = $state();
  let input: HTMLInputElement | undefined = $state();

  let query: string = $state("");
  let selected: number = $state(0);
  let results: App[] = $state(applications);

  let open: boolean = $state(false);

  const clamp = (n: number, min: number, max: number): number => {
    return Math.min(Math.max(n, min), max);
  };

  $effect(() => {
    search.open = open;
  });

  $effect(() => {
    const filtered = fuse.search(query).map((res) => res.item);
    results = filtered.length === 0 ? applications : filtered;
    selected = 0;
  });

  export const show = async () => {
    modal?.show();
    await tick();
    input?.focus();
  };

  export const close = () => {
    modal?.close();
  };

  export const toggle = () => {
    if (open) {
      close();
    } else {
      show();
    }
  };
</script>

<svelte:window
  onkeydown={(e) => {
    if (open) {
      if (e.key === "Escape") {
        if (query.trim() !== "") {
          query = "";
        } else {
          close();
        }
      }
      if (e.key === "Tab") {
        e.preventDefault();
      }
      if (e.key === "ArrowDown" || (controlKey(e) && e.key === "j")) {
        selected++;
      } else if (e.key === "ArrowUp" || (controlKey(e) && e.key === "k")) {
        selected--;
      }
      selected = clamp(selected, 0, results.length - 1);
      input?.focus();

      if (e.key === "Enter") {
        results[selected].open();
        close();
      }
    }
  }}
/>

<CommandModal bind:this={modal} bind:open title="Launchpad">
  <div class="flex flex-col">
    <input
      bind:this={input}
      bind:value={query}
      type="text"
      class="input input-lg input-ghost h-14 w-full rounded-xl px-4 focus-within:bg-transparent focus:bg-transparent focus:outline-none"
      placeholder="Search for apps"
    />
    <ul class="border-base-content/8 border-t p-2">
      {#each results as app, i}
        <li>
          <button
            class={{
              "rounded-field hover:bg-base-content/5 grid w-full grid-cols-[auto_auto_1fr] items-center gap-3 p-2 text-start text-sm whitespace-nowrap": true,
              "bg-base-content/10": i === selected,
            }}
            onclick={() => {
              app.open();
              close();
            }}
          >
            <AppIcon src={app.icon.default} alt="{app.name} icon" size="xs" />
            <span>{app.name}</span>
            <span class="text-base-content/50 overflow-hidden text-ellipsis whitespace-nowrap">
              {app.description}
            </span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</CommandModal>
