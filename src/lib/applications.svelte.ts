import type { Component } from "svelte";
import Browser from "./apps/browser/browser.svelte";
import Contact from "./apps/contact/contact.svelte";
import Resume from "./apps/resume/resume.svelte";
import Settings from "./apps/settings/settings.svelte";
import { applyFocus, type Vector } from "./components/window/helpers.svelte";
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
import { launchpad } from "./meta.svelte";
import Debug from "./apps/debug/debug.svelte";

export class App {
  id: string;
  name: string;
  icon: PictureModule;
  body: Component | null = null;
  callback: (() => void) | null = null;
  multipleWindows: boolean = false;
  titlebar: boolean = true;
  defaultSize: Vector = { x: 400, y: 300 };
  minSize: Vector = { x: 300, y: 28 };
  showInDock: boolean = true;
  showInLaunchpad: boolean = true;

  constructor(id: string, name: string, icon: PictureModule) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }

  setBody(body: Component): App {
    this.body = body;
    return this;
  }

  allowMultipleWindows(): App {
    this.multipleWindows = true;
    return this;
  }

  disableTitlebar(): App {
    this.titlebar = false;
    return this;
  }

  setDefaultSize(size: Vector): App {
    this.defaultSize = size;
    return this;
  }

  setMinSize(size: Vector): App {
    this.minSize = size;
    return this;
  }

  setCallback(callback: () => void): App {
    this.callback = callback;
    return this;
  }

  hideFromDock(): App {
    this.showInDock = false;
    return this;
  }

  hideFromLaunchpad(): App {
    this.showInLaunchpad = false;
    return this;
  }

  window(title: string = this.name, size: Vector = this.defaultSize): WindowProperties {
    return {
      id: `${this.id}.${this.count()}`,
      title,
      name: this.name,
      body: this.body,
      callback: this.callback,
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
    this.callback?.();
    if (this.body !== null) {
      if (this.instances() <= 0) {
        add(this.window());
      } else if (this.count() <= 0) {
        windows.forEach((window) => {
          if (window.id.startsWith(this.id)) {
            show(window.id);
          }
        });
      }
      focus(this.id);
      applyFocus();
    }
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
  new App("dev.kennyhui.resume", "Resume", query("icons/resume.png"))
    .setBody(Resume)
    .setDefaultSize({ x: 400, y: 450 }),
  new App("dev.kennyhui.launchpad", "Launchpad", query("icons/launchpad.png"))
    .setCallback(() => {
      launchpad.current?.show();
    })
    .hideFromLaunchpad(),
  new App("dev.kennyhui.contact", "Contact", query("icons/contact.png"))
    .setBody(Contact)
    .disableTitlebar()
    .setDefaultSize({ x: 280, y: 500 })
    .setMinSize({ x: 280, y: 500 }),
  new App("dev.kennyhui.settings", "Settings", query("icons/settings.png"))
    .setBody(Settings)
    .disableTitlebar()
    .setDefaultSize({
      x: 600,
      y: 500,
    }),
  new App("dev.kennyhui.browser", "Browser", query("icons/chromium.png"))
    .setBody(Browser)
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setMinSize({
      x: 300,
      y: 58,
    })
    .allowMultipleWindows(),
  new App("dev.kennyhui.debug", "Debug", query("icons/debug.png"))
    .setBody(Debug)
    .disableTitlebar()
    .setDefaultSize({ x: 280, y: 400 })
    .setMinSize({ x: 280, y: 400 })
    .hideFromDock(),
]);
