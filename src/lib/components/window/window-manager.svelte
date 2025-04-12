<script lang="ts">
  import { onMount } from "svelte";
  import { clamp, type Vector } from "./vector";
  import Window from "./window.svelte";

  let { windows }: { windows?: unknown[] } = $props();

  let container: HTMLElement | null = $state(null);

  let dragInitial: Vector;
  let dragPosition: Vector;
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
    if (target.hasAttribute("data-nodrag") && target !== parent) return;

    windowTransform = target
      .getAttribute("data-window-transform")
      ?.split(",")
      .map((s) => parseInt(s)) || [0, 0];

    const cursor: Vector = { x: e.clientX, y: e.clientY };
    dragInitial = cursor;
    dragPosition = cursor;
    isDragging = true;

    windowInitialPosition = getPosition(parent);
    windowInitialSize = { x: parent.clientWidth, y: parent.clientHeight };
    minSize = getMinSize(parent);

    targetWindow = parent;

    window.getSelection()?.removeAllRanges();
  }

  function onpointerup() {
    isDragging = false;
    moveWindowsWithinBounds();
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
        offset.y + windowInitialPosition.y,
      );
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
    const position = getPosition(element);
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

  function resize(element: HTMLElement, w: number, h: number, duration: number = 200) {
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

  function getPosition(element: HTMLElement): Vector {
    const translate = element.style.transform.match(
      /translate\(([-.0-9]*)px(?:, ?([-.0-9]*)px)?\)/,
    );
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

  function toTranslate(x: number, y: number) {
    return `translate(${x}px, ${y}px)`;
  }

  function getSize(element: HTMLElement): Vector {
    return {
      x: element.clientWidth,
      y: element.clientHeight,
    };
  }

  function getMinSize(element: HTMLElement): Vector {
    const parts = element
      .getAttribute("data-window-min")
      ?.split(",")
      .map((s) => parseInt(s));
    return {
      x: parts?.[0] || 0,
      y: parts?.[1] || 0,
    };
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

      const position = getPosition(window);
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
</script>

<svelte:window
  onresize={() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(moveWindowsWithinBounds, 100);
  }}
/>
<svelte:document {onpointerdown} {onpointerup} {onpointermove} />

<div class="relative h-full w-full touch-none overflow-hidden" bind:this={container}>
  <Window>
    <h1>hi</h1>
    <div>
      <p data-nodrag>Cannot drag me</p>
      <p>
        Cillum occaecat laborum ut. Reprehenderit ipsum culpa aliqua nulla eiusmod enim tempor
        occaecat anim.
      </p>
    </div>
  </Window>
</div>
