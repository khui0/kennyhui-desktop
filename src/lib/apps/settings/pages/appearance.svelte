<script lang="ts">
  import SettingsField from "../settings-field.svelte";
  import SettingsGroup from "../settings-group.svelte";
  import ThemeSelector from "../theme-selector.svelte";
</script>

<SettingsGroup>
  <SettingsField label="Appearance">
    <ThemeSelector />
  </SettingsField>
</SettingsGroup>
