<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import WindowContent from "$lib/components/window/window-content.svelte";
  import { query } from "$lib/images";
  import { modifiers } from "$lib/meta.svelte";
  import ResumeRole from "./resume-role.svelte";
  import ResumeSection from "./resume-section.svelte";
</script>

<WindowContent>
  <h2 class="text-3xl font-bold">Kenny Hui</h2>
  <div class="mt-5 flex items-center gap-1">
    <a class="btn" href="https://kennyhui.dev/resume.pdf" target="_blank" rel="noopener noreferrer">
      View PDF Resume
    </a>
  </div>
  <div class="mt-5">
    <p class="text-base-content/80">Tip: Open Launchpad to view available applications</p>
    <div class="mt-2 flex items-center gap-5">
      <AppIcon src={query("icons/launchpad.png").default} size="sm" />
      <p>or</p>
      <p class="text-xl">{modifiers.command} L</p>
    </div>
  </div>
  <ResumeSection title="Experience">
    <ResumeRole title="Freelance Frontend Developer" date="Jan 2024 - Jun 2024">
      <ul class="text-base-content/75 list-disc pl-6 text-xs">
        <li>
          Developed and deployed a custom online catalog site for a client, collaborating with the
          client through revisions to ensure brand alignment.
        </li>
        <li>
          Implemented a CMS to empower the client with autonomous content updates for listings.
        </li>
        <li>Designed core branding assets for the client's online presence.</li>
      </ul>
    </ResumeRole>
  </ResumeSection>
  <ResumeSection title="Education">
    <ResumeRole title="Stony Brook University" date="Fall 2024 - Spring 2028">
      Bachelor of Science in Computer Science
    </ResumeRole>
  </ResumeSection>
  <ResumeSection title="Skills">
    <ul class="text-base-content/75 list-disc pl-6 text-xs">
      <li><b>Languages</b>: TypeScript, Java, SQL, HTML/CSS</li>
      <li><b>Frameworks</b>: Node.js, Svelte, SvelteKit, Tailwind, Astro, 11ty, Electron</li>
      <li><b>Libraries</b>: Express.js, Socket.IO, Zod</li>
      <li><b>Developer Tools</b>: VSCode, Git, Docker, Oracle Cloud</li>
    </ul>
  </ResumeSection>
</WindowContent>
