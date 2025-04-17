<script lang="ts">
  import ThemeSelector from "$lib/components/theme/theme-selector.svelte";

  const version: string = import.meta.env.PACKAGE_VERSION;
  const formatted: string = version
    .split(".")
    .filter((n) => n !== "0")
    .join(".");
</script>

<div class="m-6">
  <h2 class="text-3xl font-bold">Settings</h2>
  <label class="grid grid-cols-2 items-center">
    Appearance
    <ThemeSelector />
  </label>
  <p>Version <span class="text-base-content/50">{formatted}</span></p>
</div>
