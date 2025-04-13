<script lang="ts">
  import { onMount } from "svelte";
  import {
    clamp,
    getMinSize,
    fromTranslate,
    getSize,
    move,
    resize,
    toTranslate,
    type Vector,
  } from "./helper";
  import WindowControls from "./window-controls.svelte";
  import WindowTitleBar from "./window-title-bar.svelte";
  import Window from "./window.svelte";

  let { windows }: { windows?: unknown[] } = $props();

  let container: HTMLElement | null = $state(null);

  let dragInitial: Vector;
  let isDragging: boolean;

  let targetWindow: HTMLElement | null;
  let minSize: Vector = { x: 0, y: 0 };
  let windowTransform: number[] = [0, 0];
  let windowInitialPosition: Vector = { x: 0, y: 0 };
  let windowInitialSize: Vector = { x: 0, y: 0 };

  function onpointerdown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest("[data-window]")) return;
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

    window.getSelection()?.removeAllRanges();
  }

  function onpointerup() {
    isDragging = false;
    moveWindowsWithinBounds();
    if (targetWindow && container) {
      if (snap === "full") {
        move(targetWindow, container.clientLeft, container.clientTop);
        resize(targetWindow, container.clientWidth, container.clientHeight);
      } else if (snap === "left") {
        move(targetWindow, container.clientLeft, container.clientTop);
        resize(targetWindow, container.clientWidth / 2, container.clientHeight);
      } else if (snap === "right") {
        move(targetWindow, container.clientLeft + container.clientWidth / 2, container.clientTop);
        resize(targetWindow, container.clientWidth / 2, container.clientHeight);
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

      if (container) {
        if (cursor.y <= container.offsetTop) {
          snap = "full";
        } else if (cursor.x <= container.offsetLeft) {
          snap = "left";
        } else if (cursor.x >= container.offsetLeft + container.clientWidth) {
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

      console.log(targetSize);

      targetWindow.style.transform = toTranslate(targetPosition.x, targetPosition.y);
      targetWindow.style.width = targetSize.x + "px";
      targetWindow.style.height = targetSize.y + "px";
    }

    window.getSelection()?.removeAllRanges();
  }

  function moveWindowsWithinBounds() {
    if (container === null) return;
    const maxSize = getSize(container);
    container.querySelectorAll("[data-window]").forEach((element) => {
      const window = element as HTMLElement;

      const size = getSize(window);
      const targetSize: Vector = {
        x: size.x < minSize.x ? Math.min(minSize.x, maxSize.x) : Math.min(size.x, maxSize.x),
        y: size.y < minSize.y ? Math.min(minSize.y, maxSize.y) : Math.min(size.y, maxSize.y),
      };
      resize(window, targetSize.x, targetSize.y);

      const position = fromTranslate(window);
      const targetPosition: Vector = {
        x: clamp(position.x, 0, maxSize.x - targetSize.x),
        y: clamp(position.y, 0, maxSize.y - targetSize.y),
      };

      move(window, targetPosition.x, targetPosition.y);
    });
  }

  let resizeTimeout: number = 0;

  onMount(() => {
    moveWindowsWithinBounds();
  });

  let snap: "left" | "right" | "full" | null = $state(null);
</script>

<svelte:window
  onresize={() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(moveWindowsWithinBounds, 100);
  }}
/>
<svelte:document {onpointerdown} {onpointerup} {onpointermove} />

<div
  class="pointer-events-none relative h-full w-full touch-none overflow-hidden"
  bind:this={container}
>
  <div
    class={{
      "preview pointer-events-none top-0 bottom-0 left-0 w-1/2 opacity-0 transition-opacity duration-300": true,
      "opacity-100": snap === "left",
    }}
  ></div>
  <div
    class={{
      "preview pointer-events-none top-0 right-0 bottom-0 w-1/2 opacity-0 transition-opacity duration-300": true,
      "opacity-100": snap === "right",
    }}
  ></div>
  <div
    class={{
      "preview pointer-events-none inset-0 opacity-0 transition-opacity duration-300": true,
      "opacity-100": snap === "full",
    }}
  ></div>
  <Window id="test">
    <div class="absolute left-0 h-7">
      <WindowControls />
    </div>
    <WindowTitleBar>
      <h1 class="font-medium">Title</h1>
    </WindowTitleBar>
    <div class="h-full overflow-auto p-5" data-nodrag>
      <p>
        Labore sunt adipisicing culpa minim aliquip dolore sint anim aliqua. Eiusmod ad duis amet.
        Minim occaecat mollit deserunt. Laboris quis nisi labore non sunt consequat eu irure
        excepteur non sint. Sint sint Lorem in ex aute qui aliqua ea aute pariatur amet consequat
        esse dolor.
      </p>
    </div>
  </Window>
</div>
