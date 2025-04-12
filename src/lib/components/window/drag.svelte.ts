import type { Action } from "svelte/action";

export interface Vector {
  x: number;
  y: number;
}

export function add(a: Vector, b: Vector): Vector {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function subtract(a: Vector, b: Vector): Vector {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function lerp(a: number, b: number, alpha: number) {
  return a + alpha * (b - a);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export const drag: Action<
  HTMLElement,
  undefined,
  {
    oncustomdragstart: (e: CustomEvent) => void;
    oncustomdragend: (e: CustomEvent) => void;
    oncustomdrag: (e: DragEvent) => void;
  }
> = (node) => {
  $effect(() => {
    let initial: Vector;
    let position: Vector;
    let isDragging: boolean;

    document.addEventListener("pointerdown", (e: PointerEvent) => {
      if (!node.contains(e.target as Node)) return;
      if ((e.target as HTMLElement).hasAttribute("data-blockdrag") && e.target !== node) return;

      const cursor: Vector = { x: e.clientX, y: e.clientY };
      initial = cursor;
      position = cursor;
      isDragging = true;

      window.getSelection()?.removeAllRanges();

      node.dispatchEvent(new CustomEvent("customdragstart"));
    });

    document.addEventListener("pointerup", () => {
      isDragging = false;

      node.dispatchEvent(new CustomEvent("customdragend"));
    });

    document.addEventListener("pointermove", (e: PointerEvent) => {
      if (!isDragging) return;

      const cursor: Vector = { x: e.clientX, y: e.clientY };
      const delta: Vector = { x: cursor.x - position.x, y: cursor.y - position.y };
      const offset: Vector = { x: cursor.x - initial.x, y: cursor.y - initial.y };
      position = cursor;

      window.getSelection()?.removeAllRanges();

      node.dispatchEvent(new DragEvent(delta, offset));
    });
  });
};

class DragEvent extends Event {
  delta: Vector;
  offset: Vector;

  constructor(delta: Vector, offset: Vector) {
    super("customdrag");
    this.delta = delta;
    this.offset = offset;
  }
}
