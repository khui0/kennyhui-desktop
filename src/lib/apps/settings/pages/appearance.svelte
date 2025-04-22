<script lang="ts">
  import { settings } from "../settings";
  import SettingsField from "../settings-field.svelte";
  import SettingsGroup from "../settings-group.svelte";
  import ThemeSelector from "../theme-selector.svelte";
</script>

<SettingsGroup>
  <SettingsField label="Appearance">
    <ThemeSelector />
  </SettingsField>
  <hr />
  <SettingsField label="Rounded Corners">
    <input type="checkbox" bind:checked={$settings.roundedCorners as boolean} class="toggle" />
  </SettingsField>
</SettingsGroup>
