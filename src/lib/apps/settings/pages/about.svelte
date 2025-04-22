<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { query } from "$lib/images";
  import { version } from "$lib/meta.svelte";
  import dayjs from "dayjs";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
  import SettingsField from "../settings-field.svelte";
  import SettingsGroup from "../settings-group.svelte";
</script>

<div class="flex h-full flex-col gap-2.5 text-center">
  <section class="mx-auto mt-10 mb-2 text-start">
    <AppIcon src={query("icons/desktop.png").default} alt="Desktop icon" size="lg" />
  </section>
  <section class="mb-2">
    <p class="text-2xl font-bold">kennyhui-desktop</p>
    <p class="text-base-content/30">
      Portfolio, {dayjs().format("MMMM YYYY")}
    </p>
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
  </section>
  <section class="text-base-content/30 text-center text-[11px] leading-tight">
    <p>&copy; 2025 Kenny Hui</p>
    <p>All Rights Reserved.</p>
  </section>
</div>
