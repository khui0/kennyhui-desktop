<script lang="ts">
  import WindowContent from "$lib/components/window/window-content.svelte";
  import ResumeRole from "./resume-role.svelte";
  import ResumeSection from "./resume-section.svelte";
</script>

<WindowContent>
  <h2 class="text-2xl font-bold">Kenny Hui</h2>
  <ResumeSection title="Experience">
    <ResumeRole title="Freelance Frontend Developer" date="January 2024 - June 2024">
      Developed a web-based storefront for a client that allowed for the creation of posts and
      product listings via a CMS and inquiries via a contact form. Used 11ty and Nunjucks.
    </ResumeRole>
  </ResumeSection>
  <ResumeSection title="Education">
    <ResumeRole title="Stony Brook University" date="Fall 2024 - Spring 2028">
      B.S. in Computer Science
    </ResumeRole>
  </ResumeSection>
  <ResumeSection title="Skills">
    <ul class="text-base-content/75 list-disc pl-6 text-xs">
      <li>TypeScript, Java, SQL, Python, Arduino, HTML/CSS, C#</li>
      <li>Svelte + SvelteKit, Tailwind, Astro, 11ty, Node.js, Electron</li>
      <li>Express.js, Socket.IO, Zod</li>
      <li>Git, Docker</li>
    </ul>
  </ResumeSection>
</WindowContent>
