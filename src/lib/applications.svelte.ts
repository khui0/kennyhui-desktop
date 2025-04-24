import { type Component } from "svelte";
import { applyFocus, type Vector } from "./components/window/helpers.svelte";
import {
  add,
  focus,
  hide,
  remove,
  show,
  stackOrder,
  windows,
  type WindowControlsSize,
  type WindowProperties,
} from "./components/window/windows.svelte";
import { type ImageModule } from "./images";
import { modifiers } from "./meta.svelte";

type AppObserverCallback = (e: { action?: string }) => void;

export class App {
  id: string;
  name: string;
  icon: ImageModule;
  body: {
    component: Component | null;
    props: object;
  } = {
    component: null,
    props: {},
  };
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
  controlsSize: WindowControlsSize = "title-tab";

  observers: AppObserverCallback[] = [];

  constructor(id: string, name: string, icon: ImageModule) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }

  subscribe(callback: AppObserverCallback) {
    this.observers.push(callback);
  }

  unsubscribe(callback: AppObserverCallback) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  }

  notify(action: string) {
    this.observers.forEach((observer) => observer({ action }));
  }

  setBody(body: Component): App {
    this.body.component = body;
    return this;
  }

  setProps(props: object) {
    this.body.props = props;
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
      controlsSize: this.controlsSize,
    };
    if (this.defaultPosition !== null) {
      properties.position = this.defaultPosition;
    }
    return properties;
  }

  setControlsSize(controlsSize: WindowControlsSize) {
    this.controlsSize = controlsSize;
    return this;
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
    this.notify("open");
    if (this.body.component !== null) {
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
    this.notify("close");
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
