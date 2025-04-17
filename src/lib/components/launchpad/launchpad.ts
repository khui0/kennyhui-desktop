import { query, type PictureModule } from "$lib/images";
import { projects } from "$lib/projects/index";

export interface LaunchpadItem {
  path: string;
  title: string;
  icon: PictureModule;
  short: string;
}

export const items: LaunchpadItem[] = [
  {
    path: "resume",
    title: "Resume",
    icon: query("icons/resume.png"),
    short: "View my resume",
  },
  {
    path: "contact",
    title: "Contact",
    icon: query("icons/contact.png"),
    short: "Contact me",
  },
  {
    path: "",
    title: "Home",
    icon: query("icons/home.png"),
    short: "Return home",
  },
  ...projects,
  {
    path: "settings",
    title: "Settings",
    icon: query("icons/settings.png"),
    short: "Customize this site",
  },
];
