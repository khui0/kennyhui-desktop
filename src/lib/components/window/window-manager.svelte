<script lang="ts">
  import type { Vector } from "./vector";
  import Window from "./window.svelte";

  let { windows }: { windows?: unknown[] } = $props();

  let dragInitial: Vector;
  let dragPosition: Vector;
  let isDragging: boolean;

  let targetWindow: HTMLElement | null;
  let windowTransform: number[] = [0, 0];
  let windowInitialPosition: Vector;
  let windowInitialSize: Vector;

  function onpointerdown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest("[data-window]")) return;
    const parent = target.closest("[data-window]") as HTMLElement;
    if (parent === null) return;
    if (!parent.contains(e.target as Node)) return;
    if (target.hasAttribute("data-blockdrag") && target !== parent) return;

    windowTransform = JSON.parse(target.getAttribute("data-window-transform") || "[0, 0]");

    const cursor: Vector = { x: e.clientX, y: e.clientY };
    dragInitial = cursor;
    dragPosition = cursor;
    isDragging = true;

    const translate = parent.style.transform.match(/translate\(([-.0-9]*)px(?:, ?([-.0-9]*)px)?\)/);
    const position = translate
      ? {
          x: parseFloat(translate[1]) || 0,
          y: parseFloat(translate[2]) || 0,
        }
      : {
          x: 0,
          y: 0,
        };

    windowInitialPosition = position;
    windowInitialSize = { x: parent.clientWidth, y: parent.clientHeight };

    console.log(windowInitialPosition);
    targetWindow = parent;

    window.getSelection()?.removeAllRanges();
  }

  function onpointerup() {
    isDragging = false;
  }

  function onpointermove(e: PointerEvent) {
    if (!isDragging) return;
    if (targetWindow === null) return;

    const cursor: Vector = { x: e.clientX, y: e.clientY };
    const delta: Vector = { x: cursor.x - dragPosition.x, y: cursor.y - dragPosition.y };
    const offset: Vector = { x: cursor.x - dragInitial.x, y: cursor.y - dragInitial.y };
    dragPosition = cursor;

    if (windowTransform[0] === 0 && windowTransform[1] === 0) {
      targetWindow.style.transform = `translate(${offset.x + windowInitialPosition.x}px, ${offset.y + windowInitialPosition.y}px)`;
    }

    window.getSelection()?.removeAllRanges();
  }

  function animate(
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

  function move(element: HTMLElement, x: number, y: number, duration: number = 200) {
    animate(
      element,
      {
        left: element.clientLeft + "px",
        top: element.clientTop + "px",
      },
      {
        left: x + "px",
        top: y + "px",
      },
      duration,
      () => {
        Object.assign(element.style, {
          left: x + "px",
          top: y + "px",
        });
      },
    );
  }

  function resize(element: HTMLElement, w: number, h: number, duration: number = 200) {
    animate(
      element,
      {
        width: element.clientWidth + "px",
        height: element.clientHeight + "px",
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

  function moveWindowsWithinBounds() {}
</script>

<svelte:window
  onresize={() => {
    moveWindowsWithinBounds();
  }}
/>
<svelte:document {onpointerdown} {onpointerup} {onpointermove} />

<div class="relative h-full w-full overflow-hidden">
  <Window>
    <h1>hi</h1>
    <div>
      <p>
        Cillum occaecat laborum ut. Reprehenderit ipsum culpa aliqua nulla eiusmod enim tempor
        occaecat anim.
      </p>
    </div>
  </Window>
</div>
