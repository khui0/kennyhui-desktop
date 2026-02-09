<script lang="ts">
  import HeroiconsMagnifyingGlass16Solid from "~icons/heroicons/magnifying-glass-16-solid";
  import { modifiers } from "$lib/meta.svelte";
</script>

<div class="mt-7 overflow-auto p-2 pt-0 [&>*]:not-last:mb-1">
  <p>
    Hi, I'm <b>Kenny</b>! 👋 I'm currently a CS student at Stony Brook University. I love
    programming and working on fun projects... mostly web-based.
  </p>
  <p>
    Click on one of the dock icons to learn more about me or click <span
      class="inline-flex items-center align-middle"><HeroiconsMagnifyingGlass16Solid /></span
    >
    or {modifiers.command} K to view all apps
  </p>
  <p>You can also reach me via:</p>
  <div>
    <a class="btn" href="mailto:hello@kennyhui.dev">Email</a>
    <a class="btn" href="https://www.linkedin.com/in/k-hui/">LinkedIn</a>
  </div>
</div>
