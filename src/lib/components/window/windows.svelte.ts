import type { Component } from "svelte";
import { container, type Vector } from "./helpers.svelte";

export type WindowSnap = "full" | "left" | "right" | null;

export interface WindowProperties {
  id: string;
  title: string;
  body: Component;
  position?: Vector;
  size?: Vector;
  minSize?: Vector;
  snapTo?: WindowSnap;
}

export const windows: WindowProperties[] = $state([]);

export const stackOrder: string[] = $state([]);

export function add(...properties: WindowProperties[]): void {
  properties.forEach((window) => {
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
  });
}
