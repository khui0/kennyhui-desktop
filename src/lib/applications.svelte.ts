import type { Component } from "svelte";
import About from "./apps/about/about.svelte";
import Browser from "./apps/browser/browser.svelte";
import Debug from "./apps/debug/debug.svelte";
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
import { query, type ImageModule } from "./images";
import { launchpad, modifiers } from "./meta.svelte";

export class App {
  id: string;
  name: string;
  icon: ImageModule;
  body: Component | null = null;
  callback: (() => void) | null = null;
  multipleWindows: boolean = false;
  titlebar: boolean = true;
  defaultSize: Vector = { x: 400, y: 300 };
  minSize: Vector = { x: 300, y: 28 };
  defaultPosition: Vector | null = null;
  showInDock: boolean = true;
  showInLaunchpad: boolean = true;
  activeItems: MenuItem[] = [];
  menuBarItems: MenuBarItem[] = [];

  constructor(id: string, name: string, icon: ImageModule) {
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

  setDefaultPosition(position: Vector): App {
    this.defaultPosition = position;
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

  setMenuBarActive(items: MenuItem[]): App {
    this.activeItems = items;
    return this;
  }

  setMenuBarItems(...items: MenuBarItem[]): App {
    this.menuBarItems = items;
    return this;
  }

  window(title: string = this.name, size: Vector = this.defaultSize): WindowProperties {
    const properties: WindowProperties = {
      id: `${this.id}.${this.count()}`,
      title,
      name: this.name,
      body: this.body,
      callback: this.callback,
      size,
      titlebar: this.titlebar,
      minSize: this.minSize,
    };
    if (this.defaultPosition !== null) {
      properties.position = this.defaultPosition;
    }
    return properties;
  }

  menuBarActive(): MenuBarItem {
    return new MenuBarItem(this.id + "-active", this.name, [
      ...this.activeItems,
      new MenuItem(`Quit ${this.name}`, () => {
        this.quit();
      }),
    ]);
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

export class Shortcut {
  shortcut: string;

  constructor(shortcut: string) {
    this.shortcut = shortcut;
  }

  toString(): string {
    switch (this.shortcut) {
      case "control-key": {
        return modifiers.control;
      }
      case "option-key": {
        return modifiers.option;
      }
      case "shift-key": {
        return modifiers.shift;
      }
      case "command-key": {
        return modifiers.command;
      }
      default: {
        return this.shortcut.trim().toUpperCase();
      }
    }
  }
}

export class MenuItem {
  text: string;
  callback: () => void;
  shortcuts: Shortcut[] = [];

  constructor(text: string, callback: () => void, shortcuts: Shortcut[] = []) {
    this.text = text;
    this.callback = callback;
    this.shortcuts = shortcuts;
  }
}

export class MenuSeparator {
  constructor() {}
}

export class MenuBarItem {
  id: string;
  text: string;
  items: (MenuItem | MenuSeparator)[];

  constructor(id: string, text: string, items: (MenuItem | MenuSeparator)[]) {
    this.id = id;
    this.text = text;
    this.items = items;
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
  new App("dev.kennyhui.about", "About", query("icons/about.png"))
    .setBody(About)
    .disableTitlebar()
    .setDefaultSize({ x: 280, y: 500 })
    .setMinSize({ x: 280, y: 500 })
    .setMenuBarItems(
      new MenuBarItem("file", "File", [
        new MenuItem("Open LinkedIn", () => {
          window.open("https://www.linkedin.com/in/k-hui/", "_blank");
        }),
        new MenuItem("Open GitHub", () => {
          window.open("https://github.com/khui0", "_blank");
        }),
        new MenuItem("Open Bluesky", () => {
          window.open("https://bsky.app/profile/kennyhui.dev", "_blank");
        }),
      ]),
      new MenuBarItem("edit", "Edit", [
        new MenuItem(
          "Copy Email",
          () => {
            navigator.clipboard.writeText("hello@kennyhui.dev");
          },
          [new Shortcut("command-key"), new Shortcut("c")],
        ),
      ]),
    )
    .hideFromDock(),
  new App("dev.kennyhui.settings", "System Settings", query("icons/settings.png"))
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
    .setDefaultPosition({ x: 40, y: 40 })
    .hideFromDock(),
]);
