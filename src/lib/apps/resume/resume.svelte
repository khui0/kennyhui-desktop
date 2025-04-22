<script lang="ts">
  import WindowContent from "$lib/components/window/window-content.svelte";
  import ResumeRole from "./resume-role.svelte";
  import ResumeSection from "./resume-section.svelte";
</script>

<WindowContent>
  <h2 class="text-3xl font-bold">Kenny Hui</h2>
  <div class="mt-5 flex items-center gap-1">
    <a
      class="btn btn-accent"
      href="https://kennyhui.dev/"
      target="_blank"
      rel="noopener noreferrer"
    >
      View Projects
    </a>
    <a
      class="btn"
      href="https://kennyhui.dev/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      Full Resume
    </a>
  </div>
  <ResumeSection title="Experience">
    <ResumeRole title="Freelance Frontend Developer" date="Jan 2024 - Jun 2024">
      <ul class="text-base-content/75 list-disc pl-6 text-xs">
        <li>
          Delivered a fully responsive website for a client to manage posts and product listings.
        </li>
        <li>
          Integrated Decap CMS to enable non-technical users to update the site content easily.
        </li>
        <li>Used 11ty and Nunjucks to optimize performance and maintainability.</li>
      </ul>
    </ResumeRole>
  </ResumeSection>
  <ResumeSection title="Education">
    <ResumeRole title="Stony Brook University" date="Aug 2024 - May 2028">
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
