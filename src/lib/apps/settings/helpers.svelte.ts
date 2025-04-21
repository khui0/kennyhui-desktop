import { query, type ImageModule } from "$lib/images";
import type { Component } from "svelte";
import About from "./pages/about.svelte";
import Appearance from "./pages/appearance.svelte";

export interface SettingsPage {
  title: string;
  icon: ImageModule;
  content: Component;
}

export const settingsPages: SettingsPage[] = [
  {
    title: "About",
    icon: query("icons/about.png"),
    content: About,
  },
  {
    title: "Appearance",
    icon: query("icons/appearance.png"),
    content: Appearance,
  },
];
