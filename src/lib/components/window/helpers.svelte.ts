import { applications } from "$lib/applications.svelte";
import { activeWindow, stackOrder, unfocus, windows, type WindowSnap } from "./windows.svelte";

export interface Vector {
  x: number;
  y: number;
}

export const container: { current: HTMLElement | null } = $state({ current: null });

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

export function animate(
  element: HTMLElement,
  from: Keyframe,
  to: Keyframe,
  duration: number,
  callback: () => void,
) {
  const animation = element.animate([from, to], {
    duration,
    easing: "cubic-bezier(0.65, 0, 0.35, 1)",
    fill: "forwards",
  });

  setTimeout(() => {
    animation.cancel();
    callback();
  }, duration);
}

export function move(element: HTMLElement, x: number, y: number, duration: number = 200) {
  const position = fromTranslate(element);
  animate(
    element,
    {
      transform: toTranslate(position.x, position.y),
    },
    {
      transform: toTranslate(x, y),
    },
    duration,
    () => {
      Object.assign(element.style, {
        transform: toTranslate(x, y),
      });
    },
  );
}

export function resize(element: HTMLElement, w: number, h: number, duration: number = 200) {
  const size = getSize(element);
  animate(
    element,
    {
      width: size.x + "px",
      height: size.y + "px",
    },
    {
      width: w + "px",
      height: h + "px",
    },
    duration,
    () => {
      Object.assign(element.style, {
        width: w + "px",
        height: h + "px",
      });
    },
  );
}

export function fromTranslate(element: HTMLElement): Vector {
  const translate = element.style.transform.match(/translate\(([-.0-9]*)px(?:, ?([-.0-9]*)px)?\)/);
  const position = translate
    ? {
        x: parseFloat(translate[1]) || 0,
        y: parseFloat(translate[2]) || 0,
      }
    : {
        x: 0,
        y: 0,
      };
  return position;
}

export function toTranslate(x: number, y: number) {
  return `translate(${x}px, ${y}px)`;
}

export function getSize(element: HTMLElement): Vector {
  return {
    x: element.clientWidth,
    y: element.clientHeight,
  };
}

export function getMinSize(element: HTMLElement): Vector {
  const parts = element
    .getAttribute("data-window-min")
    ?.split(",")
    .map((s) => parseInt(s));
  return {
    x: parts?.[0] || 0,
    y: parts?.[1] || 0,
  };
}

export function moveWindowsWithinBounds(duration: number = 200) {
  if (container.current === null) return;
  const maxSize = getSize(container.current);
  container.current.querySelectorAll("[data-window]").forEach((element) => {
    const window = element as HTMLElement;

    const id = window.getAttribute("data-window");
    const snapTo = windows.find((window) => window.id === id)?.snapTo || null;

    if (snapTo !== null) {
      applyWindowSnap(window, snapTo);
    } else {
      const size = getSize(window);
      const minSize = getMinSize(window);
      const targetSize: Vector = {
        x: size.x < minSize.x ? Math.min(minSize.x, maxSize.x) : Math.min(size.x, maxSize.x),
        y: size.y < minSize.y ? Math.min(minSize.y, maxSize.y) : Math.min(size.y, maxSize.y),
      };
      resize(window, targetSize.x, targetSize.y, duration);

      const position = fromTranslate(window);
      const targetPosition: Vector = {
        x: clamp(position.x, 0, maxSize.x - targetSize.x),
        y: clamp(position.y, 0, maxSize.y - targetSize.y),
      };

      move(window, targetPosition.x, targetPosition.y, duration);
    }
  });
}

function applyWindowSnap(element: HTMLElement, snap: WindowSnap, duration: number = 0) {
  if (container.current === null) return;
  if (snap === "full") {
    move(element, container.current.clientLeft, container.current.clientTop, duration);
    resize(element, container.current.clientWidth, container.current.clientHeight, duration);
  } else if (snap === "left") {
    move(element, container.current.clientLeft, container.current.clientTop, duration);
    resize(element, container.current.clientWidth / 2, container.current.clientHeight, duration);
  } else if (snap === "right") {
    move(
      element,
      container.current.clientLeft + container.current.clientWidth / 2,
      container.current.clientTop,
      duration,
    );
    resize(element, container.current.clientWidth / 2, container.current.clientHeight, duration);
  }
}

export function applyFocus() {
  if (container.current === null) return;
  for (let i = 0; i < stackOrder.length; i++) {
    const id = stackOrder[i];
    const window = container.current.querySelector(`[data-window="${id}"]`);
    if (window === null) return;
    (window as HTMLElement).style.zIndex = i.toString();

    if (i === stackOrder.length - 1) {
      window.setAttribute("data-window-active", "");
      activeWindow.current = windows.find((window) => window.id === id) || null;
      const app = applications.find((app) => id.startsWith(app.id));
      if (!app) return;
      activeWindow.menuBarActive = app.menuBarActive();
      activeWindow.menuBarItems = app.menuBarItems;
    } else {
      window.removeAttribute("data-window-active");
    }
  }
  if (windows.length === 0) {
    unfocus();
  }
}
