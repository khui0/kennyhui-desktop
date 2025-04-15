import type { Action } from "svelte/action";
import {
  applyFocus,
  container,
  fromTranslate,
  getMinSize,
  moveWindowsWithinBounds,
  toTranslate,
  type Vector,
} from "./helpers.svelte";
import {
  focus,
  hide,
  remove,
  snap,
  unfocus,
  unsnap,
  windows,
  type WindowSnap,
} from "./windows.svelte";

export const windowDragHandler: Action<
  Document,
  undefined,
  {
    onsnap: (e: SnapEvent) => void;
  }
> = (node) => {
  $effect(() => {
    node.addEventListener("pointerdown", onpointerdown);
    node.addEventListener("pointerup", onpointerup);
    node.addEventListener("pointermove", onpointermove);

    node.dispatchEvent(new SnapEvent(windowSnap));
  });
};

class SnapEvent extends Event {
  snap: WindowSnap;

  constructor(snap: WindowSnap) {
    super("snap");
    this.snap = snap;
  }
}

let dragInitial: Vector;
let isDragging: boolean;

let targetWindow: HTMLElement | null;
let targetId: string;
let minSize: Vector = { x: 0, y: 0 };
let windowTransform: number[] = [0, 0];
let windowInitialPosition: Vector = { x: 0, y: 0 };
let windowInitialSize: Vector = { x: 0, y: 0 };
let windowSnap: WindowSnap = $state(null);

function onpointerdown(e: PointerEvent) {
  const target = e.target as HTMLElement;
  const ignoreUnfocus = target.closest("[data-menubar]") || target.closest("[data-dock]");
  if (!target.closest("[data-window]") && !ignoreUnfocus) {
    unfocus();
    return;
  }
  const parent = target.closest("[data-window]") as HTMLElement;
  if (parent === null) return;
  if (!parent.contains(e.target as Node)) return;

  const id = parent.getAttribute("data-window");
  if (!ignoreUnfocus) {
    if (id) {
      focus(id);
      applyFocus();

      targetId = id;
    } else {
      console.error(parent, "does not define an id");
    }
  }

  if (target.closest("[data-nodrag]") && target !== parent) return;

  windowTransform = target
    .getAttribute("data-window-transform")
    ?.split(",")
    .map((s) => parseInt(s)) || [0, 0];

  const cursor: Vector = { x: e.clientX, y: e.clientY };

  if (!target.closest("[data-window-controls]")) {
    dragInitial = cursor;
    isDragging = true;
  }

  windowInitialPosition = fromTranslate(parent);
  windowInitialSize = { x: parent.clientWidth, y: parent.clientHeight };
  minSize = getMinSize(parent);

  targetWindow = parent;

  window.getSelection()?.removeAllRanges();
}

function onpointerup(e: PointerEvent) {
  isDragging = false;
  moveWindowsWithinBounds();

  if (windowSnap !== null) {
    snap(targetId, windowSnap, targetWindow ? targetWindow : undefined);
    windowSnap = null;
  }

  const target = e.target as HTMLElement;
  const parent = target?.closest("[data-window]") as HTMLElement;
  if (parent === null) return;
  if (!parent.contains(e.target as Node)) return;

  const id = parent.getAttribute("data-window");

  if (id !== null) {
    if (target?.closest("[data-window-close]")) {
      remove(id);
      applyFocus();
    }
    if (target?.closest("[data-window-hide]")) {
      hide(id);
      applyFocus();
    }
    if (target?.closest("[data-window-fullscreen]")) {
      const window = windows.find((window) => window.id.startsWith(id));
      if (window?.snapTo !== "full") {
        snap(id, "full", parent);
      }
    }
  }
}

function onpointermove(e: PointerEvent) {
  if (!isDragging) return;
  if (targetWindow === null) return;
  e.preventDefault();

  const cursor: Vector = { x: e.clientX, y: e.clientY };
  const offset: Vector = { x: cursor.x - dragInitial.x, y: cursor.y - dragInitial.y };

  if (windowTransform[0] === 0 && windowTransform[1] === 0) {
    // Snapping
    if (container.current !== null) {
      const properties = windows.find((window) => window.id === targetId);

      const margin = 5;

      if (cursor.y <= container.current.offsetTop + margin) {
        windowSnap = "full";
      } else if (cursor.x <= container.current.offsetLeft + margin) {
        windowSnap = "left";
      } else if (
        cursor.x >=
        container.current.offsetLeft + container.current.clientWidth - margin
      ) {
        windowSnap = "right";
      } else {
        windowSnap = null;

        // Unsnap
        if (properties?.snapTo !== null) {
          const previousSize = unsnap(targetId);
          if (previousSize) {
            windowInitialSize = previousSize;

            windowInitialPosition = {
              x: cursor.x - previousSize.x / 2,
              y: windowInitialPosition.y,
            };
          }
        }
      }

      targetWindow.style.transform = toTranslate(
        offset.x + windowInitialPosition.x,
        Math.max(offset.y + windowInitialPosition.y, 0),
      );
    }
  } else {
    const targetPosition: Vector = { ...windowInitialPosition };
    const targetSize: Vector = { ...windowInitialSize };

    switch (windowTransform[0]) {
      case -1: {
        const maxPosition = windowInitialPosition.x + windowInitialSize.x - minSize.x;

        targetPosition.x = Math.min(windowInitialPosition.x + offset.x, maxPosition);
        targetSize.x = Math.max(windowInitialSize.x - offset.x, minSize.x);
        break;
      }
      case 1: {
        targetSize.x = Math.max(windowInitialSize.x + offset.x, minSize.x);
        break;
      }
    }
    switch (windowTransform[1]) {
      case -1: {
        const maxPosition = windowInitialPosition.y + windowInitialSize.y - minSize.y;

        targetPosition.y = Math.min(windowInitialPosition.y + offset.y, maxPosition);
        targetSize.y = Math.max(windowInitialSize.y - offset.y, minSize.y);
        break;
      }
      case 1: {
        targetSize.y = Math.max(windowInitialSize.y + offset.y, minSize.y);
        break;
      }
    }

    targetWindow.style.transform = toTranslate(targetPosition.x, targetPosition.y);
    targetWindow.style.width = targetSize.x + "px";
    targetWindow.style.height = targetSize.y + "px";
  }

  window.getSelection()?.removeAllRanges();
}
