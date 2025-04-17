<script lang="ts">
  import { goto } from "$app/navigation";
  import ResumeRole from "$lib/components/resume/resume-role.svelte";
  import ResumeSection from "$lib/components/resume/resume-section.svelte";
  import Resume from "$lib/components/resume/resume.svelte";
  import Wordmark from "$lib/components/wordmark.svelte";
  import { backspaceKey, commandKey, modifiers } from "$lib/meta.svelte";
  import { projects } from "$lib/projects/index";
</script>

<svelte:window
  onkeydown={(e) => {
    if (commandKey(e)) {
      if (e.key === "Backspace") {
        goto("/");
      }
    }
  }}
/>

<article class="not-print:m-6">
  <div class="mb-8 flex justify-between not-print:hidden">
    <a
      href="https://kennyhui.dev/"
      target="_blank"
      rel="noopener noreferrer"
      class="flex w-fit flex-col items-start gap-1"
    >
      <Wordmark class="w-fit text-6xl" />
      <p class="text-xs font-extralight tracking-tighter uppercase">CS @ SBU &mdash; New York</p>
    </a>
    <section
      class="flex flex-col items-end justify-start gap-1 text-end text-sm leading-none font-extralight"
    >
      <a href="mailto:hello@kennyhui.dev">hello@kennyhui.dev</a>
      <a href="https://www.linkedin.com/in/k-hui" target="_blank" rel="noopener noreferrer">
        linkedin.com/in/k-hui
      </a>
      <a href="https://github.com/khui0" target="_blank" rel="noopener noreferrer">
        github.com/khui0
      </a>
    </section>
  </div>
  <section>
    <Resume />
  </section>
  <section class="mt-8">
    <ResumeSection title="Projects">
      {#each projects as project}
        <ResumeRole title={project.title} date={project.year}>
          {project.short} &mdash; {project.tags.join(", ")}
        </ResumeRole>
      {/each}
    </ResumeSection>
  </section>
</article>