import type { Action } from "svelte/action";
import {
  applyFocus,
  container,
  fromTranslate,
  getMinSize,
  move,
  moveWindowsWithinBounds,
  resize,
  toTranslate,
  type Vector,
} from "./helpers.svelte";
import { focus, unfocus, type WindowSnap } from "./windows.svelte";

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

    node.dispatchEvent(new SnapEvent(snap));
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
let minSize: Vector = { x: 0, y: 0 };
let windowTransform: number[] = [0, 0];
let windowInitialPosition: Vector = { x: 0, y: 0 };
let windowInitialSize: Vector = { x: 0, y: 0 };

let snap: WindowSnap = $state(null);

function onpointerdown(e: PointerEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest("[data-window]")) {
    unfocus();
    return;
  }
  const parent = target.closest("[data-window]") as HTMLElement;
  if (parent === null) return;
  if (!parent.contains(e.target as Node)) return;
  if (target.closest("[data-nodrag]") && target !== parent) return;

  windowTransform = target
    .getAttribute("data-window-transform")
    ?.split(",")
    .map((s) => parseInt(s)) || [0, 0];

  const cursor: Vector = { x: e.clientX, y: e.clientY };
  dragInitial = cursor;
  isDragging = true;

  windowInitialPosition = fromTranslate(parent);
  windowInitialSize = { x: parent.clientWidth, y: parent.clientHeight };
  minSize = getMinSize(parent);

  targetWindow = parent;

  const id = parent.getAttribute("data-window");
  if (id) {
    focus(id);
    applyFocus();
  } else {
    console.error(parent, "does not define an id");
  }

  window.getSelection()?.removeAllRanges();
}

function onpointerup() {
  isDragging = false;
  moveWindowsWithinBounds();
  if (targetWindow && container.current !== null) {
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
  snap = null;
}

function onpointermove(e: PointerEvent) {
  if (!isDragging) return;
  if (targetWindow === null) return;
  e.preventDefault();

  const cursor: Vector = { x: e.clientX, y: e.clientY };
  const offset: Vector = { x: cursor.x - dragInitial.x, y: cursor.y - dragInitial.y };

  if (windowTransform[0] === 0 && windowTransform[1] === 0) {
    targetWindow.style.transform = toTranslate(
      offset.x + windowInitialPosition.x,
      Math.max(offset.y + windowInitialPosition.y, 0),
    );

    // Snapping

    if (container.current !== null) {
      if (cursor.y <= container.current.offsetTop) {
        snap = "full";
      } else if (cursor.x <= container.current.offsetLeft) {
        snap = "left";
      } else if (cursor.x >= container.current.offsetLeft + container.current.clientWidth) {
        snap = "right";
      } else {
        snap = null;
      }
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
