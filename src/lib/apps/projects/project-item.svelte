<script lang="ts">
  import { browser } from "$app/environment";
  import { applications } from "$lib/applications.svelte";
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import HeroiconsCodeBracket20Solid from "~icons/heroicons/code-bracket-20-solid";
  import HeroiconsArrowTopRightOnSquare20Solid from "~icons/heroicons/arrow-top-right-on-square-20-solid";
  import type { Project } from "./projects";

  let { project }: { project: Project } = $props();

  const thumbnail = project.screenshots[0];

  let menuOpen: boolean = $state(false);
  let touch: boolean = $derived(browser && window.matchMedia("(pointer: coarse)").matches);
</script>

<li
  onpointerenter={() => {
    if (touch) return;
    menuOpen = true;
  }}
  onpointerleave={() => {
    if (touch) return;
    menuOpen = false;
  }}
  class="relative touch-manipulation"
>
  <div
    class="hover:bg-base-300/50 active:bg-base-300/50 rounded-field grid min-h-24 w-full grid-cols-[auto_1fr] gap-2.5 p-2 text-start transition-colors"
  >
    <enhanced:img
      class="rounded-field relative inset-0 block h-24 w-24 object-scale-down drop-shadow-sm"
      src={thumbnail.default}
      alt={thumbnail.alt}
    />
    <div class="flex h-full flex-col">
      <h3 class="relative mb-1.5 w-fit text-lg leading-none font-bold">
        {project.title}
      </h3>
      <p class="text-base-content/70 my-1.5 flex-1 leading-tight">
        {project.description}
      </p>
      <div class="mt-1.5 flex flex-wrap items-end justify-between gap-1">
        <p class="text-base-content/50 rounded-selector flex h-4 items-center leading-none">
          {project.date}
        </p>
        <div class="flex flex-wrap items-center justify-end gap-1">
          {#if project.links.demo}
            <a
              aria-label="{project.title} Source Code"
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              class="btn h-8 w-8"
            >
              <HeroiconsCodeBracket20Solid />
            </a>
          {:else}
            <a
              aria-label="{project.title} Source Code"
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              class="btn h-8"
            >
              <HeroiconsCodeBracket20Solid />
              Source Code
            </a>
          {/if}
          {#if project.links.appId}
            {@const targetApp = applications.find((app) => app.id === project.links.appId)}
            {#if project.links.demo}
              <a
                aria-label="{project.title} External Demo"
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                class="btn h-8 w-8"
              >
                <HeroiconsArrowTopRightOnSquare20Solid />
              </a>
            {/if}
            <button
              class="btn btn-accent h-8"
              onclick={() => {
                if (targetApp) targetApp.open();
              }}
              >{#if targetApp}
                <AppIcon src={targetApp.icon.default} size="xs" />
              {/if}
              {project.title}.app
            </button>
          {:else if project.links.demo}
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" class="btn h-8">
              <HeroiconsArrowTopRightOnSquare20Solid />
              External Demo
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</li>
