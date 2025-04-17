<script lang="ts">
  import { goto } from "$app/navigation";
  import Wordmark from "$lib/components/wordmark.svelte";
  import { backspaceKey, commandKey, modifiers } from "$lib/meta.svelte";
  import SimpleIconsBluesky from "~icons/simple-icons/bluesky";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
</script>

<svelte:window
  onkeydown={(e) => {
    if (commandKey(e)) {
      if (e.key === "Backspace") {
        goto("/");
      }
    }
  }}
/>

<div class="m-6 mb-0 grid grid-cols-2">
  <div>
    <Wordmark class="w-auto text-8xl" />
    <p class="text-lg font-extralight tracking-tighter uppercase">CS @ SBU &mdash; New York</p>
  </div>
  <section class="flex flex-col items-end">
    <a
      class="btn btn-ghost"
      aria-label="LinkedIn"
      href="https://www.linkedin.com/in/k-hui/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SimpleIconsLinkedin></SimpleIconsLinkedin>
      linkedin.com/in/k-hui
    </a>
    <a
      class="btn btn-ghost"
      aria-label="GitHub"
      href="https://github.com/khui0"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SimpleIconsGithub></SimpleIconsGithub>
      github.com/khui0
    </a>
    <a
      class="btn btn-ghost"
      aria-label="Bluesky"
      href="https://bsky.app/profile/kennyhui.dev"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SimpleIconsBluesky></SimpleIconsBluesky>
      @kennyhui.dev
    </a>
  </section>
</div>
<section class="mx-6 mt-4 print:hidden" aria-hidden="true">
  <p class="text-2xl">5173 3000 4321 8080</p>
</section>
<section class="m-4 mt-4 flex flex-wrap items-center justify-between">
  <div class="border-base-content/50 rounded-field flex items-center gap-3 border px-2 py-1">
    <a
      class="focus-ring text-3xl font-thin tracking-tighter text-wrap break-all"
      href="mailto:hello@kennyhui.dev"
    >
      hello@kennyhui.dev
    </a>
    <p aria-hidden="true" class="italic print:hidden">443</p>
  </div>
  <div class="flex items-center gap-2 print:hidden" aria-hidden="true">
    <div class="text-base-content/50 flex flex-col text-xs">
      <span>VALID</span>
      <span>THRU</span>
    </div>
    <p class="text-xl">05/28</p>
  </div>
</section>
<div class="bg-base-100/80 skeleton mb-4 h-20 rounded-none"></div>
