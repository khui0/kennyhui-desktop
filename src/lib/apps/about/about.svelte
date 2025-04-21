<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { query } from "$lib/images";
  import { getScreenSizeEstimate } from "$lib/meta.svelte";
  import dayjs from "dayjs";
  import SimpleIconsBluesky from "~icons/simple-icons/bluesky";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
</script>

<div class="flex h-full flex-col gap-2.5 p-5 text-center">
  <section class="mx-auto mt-12 mb-6 text-center">
    <AppIcon src={query("icons/desktop.png").default} alt="Desktop icon" size="xl" />
  </section>
  <section>
    <p class="text-2xl font-bold">kennyhui-desktop</p>
    <p class="text-base-content/30">
      {getScreenSizeEstimate()}-inch, {dayjs().format("MMMM YYYY")}
    </p>
  </section>
  <section class="flex flex-1 flex-col justify-center">
    <div class="grid grid-cols-[3fr_5fr] gap-2">
      <span class="justify-self-end text-end">Email</span>
      <a
        class="text-base-content/50 justify-self-start text-start"
        data-nodrag
        href="mailto:hello@kennyhui.dev"
      >
        hello@kennyhui.dev
      </a>
    </div>
    <div class="grid grid-cols-[3fr_5fr] gap-2">
      <span class="justify-self-end text-end">GitHub</span>
      <a
        class="text-base-content/50 justify-self-start text-start"
        data-nodrag
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/khui0/kennyhui-desktop"
      >
        khui0/kennyhui-desktop
      </a>
    </div>
  </section>
  <section class="my-2 flex flex-wrap justify-center gap-2">
    <a
      data-nodrag
      class="btn"
      aria-label="LinkedIn"
      href="https://www.linkedin.com/in/k-hui/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SimpleIconsLinkedin></SimpleIconsLinkedin>
      linkedin.com/in/k-hui
    </a>
    <a
      data-nodrag
      class="btn"
      aria-label="GitHub"
      href="https://github.com/khui0"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SimpleIconsGithub></SimpleIconsGithub>
      github.com/khui0
    </a>
    <a
      data-nodrag
      class="btn"
      aria-label="Bluesky"
      href="https://bsky.app/profile/kennyhui.dev"
      target="_blank"
      rel="noopener noreferrer"
    >
      <SimpleIconsBluesky></SimpleIconsBluesky>
      @kennyhui.dev
    </a>
  </section>
  <section class="text-base-content/30 text-center text-[11px] leading-tight">
    <p>&copy; 2025 Kenny Hui</p>
    <p>All Rights Reserved.</p>
  </section>
</div>
