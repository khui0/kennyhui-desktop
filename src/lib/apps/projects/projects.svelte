<script lang="ts">
  import { projects } from "./projects";
  import ProjectItem from "./project-item.svelte";
</script>

<ul data-nodrag class="flex flex-col overflow-auto p-2.5">
  {#each projects as project}
    <ProjectItem {project} />
  {/each}
</ul>
