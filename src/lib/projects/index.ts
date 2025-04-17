import type { LaunchpadItem } from "../components/launchpad/launchpad";
import { query, type PictureModule } from "../images";

export interface ProjectLink {
  title: string;
  href: string;
}

export interface Project extends LaunchpadItem {
  title: string;
  path: string;
  year: string;
  tags: string[];
  short: string;
  image: PictureModule;
  alt: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    title: "Freetime",
    path: "projects/freetime",
    year: "2024",
    tags: ["TypeScript", "SvelteKit", "Pocketbase"],
    short: "Schedule sharing app for SBU",
    image: query("projects/freetime.png"),
    icon: query("icons/freetime.png"),
    alt: "Freetime promo image",
    links: [
      {
        title: "Open Freetime",
        href: "https://freetime.kennyhui.dev/",
      },
    ],
  },
  {
    title: "Video Poker",
    path: "projects/video-poker",
    year: "2025",
    tags: ["TypeScript", "SvelteKit"],
    short: "Know your poker hands",
    image: query("projects/video-poker.png"),
    icon: query("icons/video-poker.png"),
    alt: "Video Poker promo image",
    links: [
      {
        title: "Play",
        href: "https://poker.kennyhui.dev/",
      },
      {
        title: "Source",
        href: "https://github.com/khui0/video-poker",
      },
    ],
  },
  {
    title: "Flaggle",
    path: "projects/flaggle",
    year: "2024",
    tags: ["TypeScript", "SvelteKit"],
    short: "Flag guessing game",
    image: query("projects/flaggle.png"),
    icon: query("icons/flaggle.png"),
    alt: "Flaggle promo image",
    links: [
      {
        title: "Play",
        href: "https://flaggle.kennyhui.dev/",
      },
      {
        title: "Source",
        href: "https://github.com/khui0/flaggle",
      },
    ],
  },
  {
    title: "Virtual Clicker",
    path: "projects/virtual-clicker",
    year: "2022",
    tags: ["JavaScript", "HTML/CSS"],
    short: "Custom student response system",
    image: query("projects/virtual-clicker.png"),
    icon: query("icons/virtual-clicker.png"),
    alt: "Virtual Clicker promo image",
    links: [
      {
        title: "Source",
        href: "https://github.com/khui0/virtual-clicker",
      },
    ],
  },
  {
    title: "Pico Wheel",
    path: "projects/pico-wheel",
    year: "2023",
    tags: ["3D Printing", "Arduino"],
    short: "3D printed sim racing wheel",
    image: query("projects/pico-wheel.png"),
    icon: query("projects/pico-wheel.png"),
    alt: "Pico Wheel 3D render",
    links: [
      {
        title: "Source",
        href: "https://github.com/khui0/pico-wheel",
      },
    ],
  },
  {
    title: "mini Satsana",
    path: "projects/mini-satsana",
    year: "2021",
    tags: ["3D Printing"],
    short: "Fan duct mod for Creality 3D printers",
    image: query("projects/mini-satsana.png"),
    icon: query("projects/mini-satsana.png"),
    alt: "mini Satsana 3D render",
    links: [
      {
        title: "Printables",
        href: "https://www.printables.com/model/201332",
      },
    ],
  },
];
