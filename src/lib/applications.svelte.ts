import type { Component } from "svelte";
import { add, focus, stackOrder, type WindowProperties } from "./components/window/windows.svelte";
import { query, type PictureModule } from "./images";
import { applyFocus, type Vector } from "./components/window/helpers.svelte";
import Resume from "../routes/(card)/resume/resume.svelte";

export class App {
  static count: number = 0;

  id: string;
  name: string;
  icon: PictureModule;
  description: string;
  body: Component;
  allowMultipleWindows: boolean;

  constructor(
    id: string,
    name: string,
    icon: PictureModule,
    description: string,
    body: Component,
    allowMultipleWindows: boolean = false,
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.body = body;
    this.allowMultipleWindows = allowMultipleWindows;
  }

  window(title: string = this.name, size: Vector = { x: 400, y: 300 }): WindowProperties {
    return {
      id: `${this.id}.${App.count.toString()}`,
      title,
      name: this.name,
      body: this.body,
      size,
    };
  }

  count(): number {
    return stackOrder.filter((id) => id.startsWith(this.id)).length;
  }

  open(): void {
    if (this.count() <= 0 || this.allowMultipleWindows) {
      add(this.window());
    }
    focus(this.id);
    applyFocus();
  }
}

export const applications: App[] = $state([
  new App("dev.kennyhui.resume", "Resume", query("icons/resume.png"), "My Resume", Resume),
  new App("dev.kennyhui.contact", "Contact", query("icons/contact.png"), "Contact Me", Resume),
  new App("dev.kennyhui.settings", "Settings", query("icons/settings.png"), "Contact Me", Resume),
]);
