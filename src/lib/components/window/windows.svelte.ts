import type { Component } from "svelte";
import type { Vector } from "./helpers.svelte";

export type WindowSnap = "full" | "left" | "right" | null;

export interface WindowProperties {
  id: string;
  title: string;
  body: Component;
  minSize: Vector;
  snapTo: WindowSnap;
}

export const windows: WindowProperties[] = $state([]);
