import type { Component } from "svelte";
import { container, getSize, move, resize, type Vector } from "./helpers.svelte";

export type WindowSnap = "full" | "left" | "right" | null;

export interface WindowProperties {
  id: string;
  title: string;
  name: string;
  body: Component;
  position?: Vector;
  size?: Vector;
  minSize?: Vector;
  snapTo?: WindowSnap;
  previousSize?: Vector;
}

export const windows: WindowProperties[] = $state([]);
export const stackOrder: string[] = $state([]);
export const activeWindow: { current: WindowProperties | null } = $state({ current: null });

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
    stackOrder.push(window.id);
  });
}

export function remove(id: string): void {
  const windowIndex = windows.findIndex((window) => window.id === id);
  if (windowIndex === -1) return;
  windows.splice(windowIndex, 1);
  stackOrder.splice(
    stackOrder.findIndex((item) => item === id),
    1,
  );
}

export function focus(id: string): void {
  const index = stackOrder.findIndex((item) => item === id);
  if (index === -1 || index === stackOrder.length - 1) return;
  stackOrder.splice(index, 1);
  stackOrder.push(id);
}

export function unfocus(): void {
  if (container.current === null) return;
  container.current.querySelectorAll("[data-window-active]").forEach((window) => {
    window.removeAttribute("data-window-active");
    activeWindow.current = null;
  });
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
