<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { query } from "$lib/images";
  import { version } from "$lib/meta.svelte";
  import dayjs from "dayjs";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
  import AboutSection from "./about-section.svelte";
</script>

<div class="flex h-full flex-col gap-2.5 p-5 text-center">
  <section class="mx-auto mt-12 mb-6 text-center">
    <AppIcon src={query("icons/desktop.png").default} alt="Desktop icon" size="xl" />
  </section>
  <section>
    <p class="text-2xl font-bold">Kenny Hui's Desktop</p>
    <p class="text-base-content/30">
      Portfolio, {dayjs().format("MMMM YYYY")}
    </p>
  </section>
  <section class="flex flex-1 flex-col justify-center">
    <AboutSection label="Email">
      <a data-nodrag href="mailto:hello@kennyhui.dev"> hello@kennyhui.dev </a>
    </AboutSection>
    <AboutSection label="GitHub">
      <a
        data-nodrag
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/khui0/kennyhui-desktop"
      >
        khui0/kennyhui-desktop
      </a>
    </AboutSection>
    <AboutSection label="Version">
      <p>{version}</p>
    </AboutSection>
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
  </section>
  <section class="text-base-content/30 text-center text-[11px] leading-tight">
    <p>&copy; 2025 Kenny Hui</p>
    <p>All Rights Reserved.</p>
  </section>
</div>
