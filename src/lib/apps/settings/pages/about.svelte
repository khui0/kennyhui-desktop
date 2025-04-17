<script lang="ts">
  import Wordmark from "$lib/components/wordmark.svelte";
  import SimpleIconsBluesky from "~icons/simple-icons/bluesky";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
  import SettingsGroup from "../settings-group.svelte";
  import SettingsField from "../settings-field.svelte";
  import { version } from "$lib/meta.svelte";
</script>

<div class="flex h-full flex-col gap-2.5 text-center">
  <section class="mx-auto my-10 text-start">
    <Wordmark class="w-auto text-8xl" />
    <p class="text-base-content/30 text-sm uppercase">CS @ SBU &mdash; New York</p>
  </section>
  <SettingsGroup>
    <SettingsField label="Email">
      <span class="text-base-content/50 px-1">
        <a href="mailto:hello@kennyhui.dev">hello@kennyhui.dev</a>
      </span>
    </SettingsField>
    <hr />
    <SettingsField label="Version">
      <span class="text-base-content/50 px-1">
        <p>{version}</p>
      </span>
    </SettingsField>
  </SettingsGroup>
  <section class="my-2 mt-auto flex flex-wrap justify-center gap-2">
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
