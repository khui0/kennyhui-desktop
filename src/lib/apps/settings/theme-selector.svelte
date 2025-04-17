<script lang="ts">
  import { theme } from "$lib/theme";
</script>

<select bind:value={$theme} class="select w-32">
  <option value="auto">Auto</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>
