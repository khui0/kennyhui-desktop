<script lang="ts">
  import { settings } from "../settings";
  import FormGroup from "$lib/components/ui/form-group.svelte";
  import FormRow from "$lib/components/ui/form-row.svelte";
  import ThemeSelector from "../theme-selector.svelte";
</script>

<FormGroup>
  <FormRow label="Appearance">
    <ThemeSelector />
  </FormRow>
  <FormRow label="Rounded Corners">
    <input type="checkbox" bind:checked={$settings.roundedCorners as boolean} class="toggle" />
  </FormRow>
</FormGroup>
