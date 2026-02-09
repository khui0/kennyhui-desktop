<script lang="ts">
  import HeroiconsMagnifyingGlass16Solid from "~icons/heroicons/magnifying-glass-16-solid";
  import { modifiers } from "$lib/meta.svelte";
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { query } from "$lib/images";
</script>

<div class="mt-7 overflow-auto p-2 pt-0 [&>*]:not-last:mb-1">
  <p>Kenny Hui's Desktop is a web-based macOS inspired desktop environment.</p>
  <p>
    Click the <span class="inline-flex items-center align-middle"
      ><HeroiconsMagnifyingGlass16Solid /></span
    >
    menu bar icon or {modifiers.command} K to open Spotlight
  </p>
  <p>
    Click <span class="inline-flex items-center align-middle">
      <AppIcon src={query("icons/launchpad.png").default} alt="Launchpad icon" size="xs" />
    </span>
    or {modifiers.command} L to open Launchpad
  </p>
  <p>For more, find links in the menu bar</p>
</div>
