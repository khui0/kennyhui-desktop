import { tick, type Component } from "svelte";
import { applyFocus, container, getSize, move, resize, type Vector } from "./helpers.svelte";
import type { MenuBarItem } from "$lib/applications.svelte";

export type WindowSnap = "full" | "left" | "right" | null;

export interface WindowProperties {
  id: string;
  title: string;
  name: string;
  body: Component | null;
  callback: (() => void) | null;
  position?: Vector;
  size?: Vector;
  minSize?: Vector;
  snapTo?: WindowSnap;
  previousSize?: Vector;
  previousPosition?: Vector;
  titlebar?: boolean;
}

export const windows: WindowProperties[] = $state([]);
export const stackOrder: string[] = $state([]);
export const activeWindow: {
  current: WindowProperties | null;
  menuBarActive: MenuBarItem | null;
  menuBarItems: MenuBarItem[];
} = $state({
  current: null,
  menuBarActive: null,
  menuBarItems: [],
});

export function add(...properties: WindowProperties[]): void {
  const containerSize: Vector = container.current ? getSize(container.current) : { x: 0, y: 0 };

  properties.forEach((window) => {
    const windowSize = window.size || { x: 400, y: 300 };
    if (!window.position) {
      window.position = {
        x: (containerSize.x - windowSize.x) / 2,
        y: (containerSize.y - windowSize.y) / 2,
      };
    }
    windows.push(window);
    show(window.id);
  });

  tick().then(() => {
    applyFocus();
  });
}

export function show(id: string): void {
  stackOrder.push(id);
}

export function remove(id: string): void {
  hide(id);
  for (let i = 0; i < windows.length; i++) {
    if (windows[i].id.startsWith(id)) {
      windows.splice(i, 1);
    }
  }
}

export function hide(id: string): void {
  for (let i = 0; i < stackOrder.length; i++) {
    if (stackOrder[i].startsWith(id)) {
      stackOrder.splice(i, 1);
    }
  }
}

export function focus(id: string): void {
  const index = stackOrder.findLastIndex((item) => item.startsWith(id));
  if (index === -1 || index === stackOrder.length - 1) return;
  const item = stackOrder[index];
  stackOrder.splice(index, 1);
  stackOrder.push(item);
}

export function unfocus(): void {
  if (container.current === null) return;
  container.current.querySelectorAll("[data-window-active]").forEach((window) => {
    window.removeAttribute("data-window-active");
  });
  activeWindow.current = null;
  activeWindow.menuBarActive = null;
}

export function snap(id: string, snap: WindowSnap, target?: HTMLElement): void {
  if (container.current === null) return;
  const targetWindow = target
    ? target
    : (container.current.querySelector(`[data-window="${id}"]`) as HTMLElement);
  if (!targetWindow) return;

  const index = windows.findIndex((window) => window.id === id);

  if (index === -1) return;

  windows[index].previousSize = getSize(targetWindow);
  windows[index].snapTo = snap;

  if (snap === "full") {
    move(targetWindow, container.current.clientLeft, container.current.clientTop);
    resize(targetWindow, container.current.clientWidth, container.current.clientHeight);
  } else if (snap === "left") {
    move(targetWindow, container.current.clientLeft, container.current.clientTop);
    resize(targetWindow, container.current.clientWidth / 2, container.current.clientHeight);
  } else if (snap === "right") {
    move(
      targetWindow,
      container.current.clientLeft + container.current.clientWidth / 2,
      container.current.clientTop,
    );
    resize(targetWindow, container.current.clientWidth / 2, container.current.clientHeight);
  }
}

export function unsnap(id: string): Vector | undefined {
  const window = windows.find((window) => window.id === id);
  if (!window) return;

  window.snapTo = null;

  if (window.previousSize && container.current !== null) {
    const element = container.current.querySelector(`[data-window="${id}"]`) as HTMLElement;

    resize(element, window.previousSize.x, window.previousSize.y, 0);

    return window.previousSize;
  }
}
