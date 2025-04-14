import type { Component } from "svelte";
import {
  add,
  focus,
  hide,
  remove,
  show,
  stackOrder,
  windows,
  type WindowProperties,
} from "./components/window/windows.svelte";
import { query, type PictureModule } from "./images";
import { applyFocus, type Vector } from "./components/window/helpers.svelte";
import Contact from "./apps/contact/contact.svelte";
import Resume from "./apps/resume/resume.svelte";

export class App {
  id: string;
  name: string;
  icon: PictureModule;
  description: string;
  body: Component;
  allowMultipleWindows: boolean;
  titlebar: boolean;
  defaultSize: Vector;
  minSize?: Vector;

  constructor(
    id: string,
    name: string,
    icon: PictureModule,
    description: string,
    body: Component,
    allowMultipleWindows: boolean = false,
    titlebar: boolean = true,
    defaultSize: Vector = { x: 400, y: 300 },
    minSize: Vector = { x: 300, y: 28 },
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.body = body;
    this.allowMultipleWindows = allowMultipleWindows;
    this.titlebar = titlebar;
    this.defaultSize = defaultSize;
    this.minSize = minSize;
  }

  window(title: string = this.name, size: Vector = this.defaultSize): WindowProperties {
    return {
      id: `${this.id}.${this.count()}`,
      title,
      name: this.name,
      body: this.body,
      size,
      titlebar: this.titlebar,
      minSize: this.minSize,
    };
  }

  // Returns number of App.window() instances
  instances(): number {
    return windows.filter((window) => window.id.startsWith(this.id)).length;
  }

  // Return number of windows shown
  count(): number {
    return stackOrder.filter((id) => id.startsWith(this.id)).length;
  }

  open(): void {
    if (this.instances() <= 0) {
      add(this.window());
    } else if (this.count() <= 0 || this.allowMultipleWindows) {
      show(this.window());
    }
    focus(this.id);
    applyFocus();
  }

  close(): void {
    hide(this.id);
    applyFocus();
  }

  quit(): void {
    remove(this.id);
    applyFocus();
  }
}

export const applications: App[] = $state([
  new App("dev.kennyhui.resume", "Resume", query("icons/resume.png"), "My Resume", Resume),
  new App(
    "dev.kennyhui.contact",
    "Contact",
    query("icons/contact.png"),
    "Contact Me",
    Contact,
    false,
    false,
    { x: 280, y: 500 },
    { x: 280, y: 500 },
  ),
  new App("dev.kennyhui.settings", "Settings", query("icons/settings.png"), "Contact Me", Resume),
]);
