<script lang="ts">
  import Wordmark from "$lib/components/wordmark.svelte";
  import SimpleIconsBluesky from "~icons/simple-icons/bluesky";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
</script>

<section>
  <Wordmark class="w-auto text-8xl" />
  <p class="text-lg font-extralight tracking-tighter uppercase">CS @ SBU &mdash; New York</p>
</section>
<section class="flex flex-wrap items-center justify-between">
  <a
    class="focus-ring text-3xl font-thin tracking-tighter text-wrap break-all"
    href="mailto:hello@kennyhui.dev"
  >
    hello@kennyhui.dev
  </a>
</section>
<section class="mt-2 flex flex-wrap justify-center gap-2">
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
