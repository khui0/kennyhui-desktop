import { query, type Image } from "$lib/images";

export interface Project {
  title: string;
  date: string;
  tags?: string[];
  icons?: string[];
  description: string;
  screenshots: Image[];
  links: {
    source: string;
    demo?: string;
    appId?: string;
  };
}

export const projects: Project[] = [
  {
    title: "swap.ts",
    date: "2025",
    tags: ["Svelte", "PostgreSQL"],
    icons: ["ts", "svelte", "tailwind"],
    description: "General purpose gift exchange matcher for secret santa and similar events.",
    screenshots: [query("icons/swapts.png")],
    links: {
      source: "https://github.com/khui0/swap.ts",
    },
  },
  {
    title: "Flaggle",
    date: "2024",
    tags: ["TypeScript", "SvelteKit", "TailwindCSS"],
    icons: ["ts", "svelte", "tailwind"],
    description: "Web-based flag recognition game with fuzzy search + keyboard shortcuts.",
    screenshots: [query("projects/icons/flaggle.png")],
    links: {
      source: "https://github.com/khui0/flaggle",
      demo: "https://flaggle.kennyhui.dev/",
      appId: "dev.kennyhui.flaggle",
    },
  },
  {
    title: "Video Poker",
    date: "2025",
    tags: ["TypeScript", "SvelteKit", "TailwindCSS"],
    icons: ["ts", "svelte", "tailwind"],
    description: "Web-based video poker game with audio and full hand logic.",
    screenshots: [query("projects/icons/video-poker.png")],
    links: {
      source: "https://github.com/khui0/video-poker",
      demo: "https://poker.kennyhui.dev/",
      appId: "dev.kennyhui.videopoker",
    },
  },
  {
    title: "Freetime",
    date: "2024",
    tags: ["TypeScript", "SvelteKit", "PocketBase"],
    icons: ["ts", "svelte", "pocketbase"],
    description:
      "Full-stack web platform for Stony Brook University students to share and compare availability with friends",
    screenshots: [query("projects/icons/freetime.png")],
    links: {
      source: "https://github.com/khui0/freetime",
      demo: "https://freetime.kennyhui.dev/",
    },
  },
  {
    title: "Kenny Hui's Desktop",
    date: "2025",
    tags: ["TypeScript", "SvelteKit", "TailwindCSS"],
    icons: ["ts", "svelte", "tailwind"],
    description:
      "macOS inspired web desktop environment with responsive menu bar, window snapping, and animations.",
    screenshots: [query("projects/icons/kennyhui-desktop.png")],
    links: {
      source: "https://github.com/khui0/kennyhui-desktop",
      demo: "https://desktop.kennyhui.dev/",
    },
  },
  {
    title: "Virtual Clicker",
    date: "2022",
    tags: ["JavaScript", "HTML/CSS"],
    icons: ["js", "html", "css"],
    description:
      "Custom classroom polling system built to replace Google Forms for my high school calculus course.",
    screenshots: [query("projects/icons/virtual-clicker.png")],
    links: {
      source: "https://github.com/khui0/virtual-clicker",
      demo: "https://virtual-clicker.vercel.app/",
    },
  },
];
