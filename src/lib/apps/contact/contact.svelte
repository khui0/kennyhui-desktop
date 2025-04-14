<script lang="ts">
  import Wordmark from "$lib/components/wordmark.svelte";
  import SimpleIconsBluesky from "~icons/simple-icons/bluesky";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
</script>

<div class="flex h-full flex-col gap-2.5 p-5 text-center">
  <section class="mx-auto mt-10 text-start">
    <Wordmark class="w-auto text-8xl" />
    <p class="text-base-content/30 text-sm font-extralight uppercase">CS @ SBU &mdash; New York</p>
  </section>
  <section
    class="[&>*:nth-child(even)]:text-base-content/50 grid flex-1 grid-cols-[4fr_6fr] items-center gap-2 text-sm [&>*:nth-child(even)]:justify-self-start [&>*:nth-child(odd)]:justify-self-end"
  >
    <p>Email</p>
    <a data-nodrag href="mailto:hello@kennyhui.dev">hello@kennyhui.dev</a>
  </section>
  <section class="my-2 flex flex-wrap justify-center gap-2">
    <a
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
