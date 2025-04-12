<script lang="ts">
  import type { Snippet } from "svelte";
  import { add, clamp, drag, subtract } from "./drag.svelte.js";

  interface Vector {
    x: number;
    y: number;
  }

  let {
    children,
    size = $bindable({ x: 400, y: 300 }),
    minSize = $bindable({ x: 300, y: 200 }),
  }: {
    children: Snippet;
    size?: Vector;
    minSize?: Vector;
  } = $props();

  let element: HTMLElement | null = $state(null);

  let initialPosition: Vector = { x: 0, y: 0 };
  let initialSize: Vector = { x: 0, y: 0 };
  let position: Vector = $state({ x: 50, y: 50 });

  function setInitial() {
    initialPosition = position;
    initialSize = size;
  }

  export function move(x: number, y: number, duration: number = 200) {
    if (duration > 0) {
      const to = {
        left: x + "px",
        top: y + "px",
      };
      const animation = element?.animate(
        [
          {
            left: position.x + "px",
            top: position.y + "px",
          },
          to,
        ],
        {
          duration,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          fill: "forwards",
        },
      );
      setTimeout(() => {
        if (element === null) return;
        animation?.cancel();
        position = { x, y };
      }, duration);
    } else {
      position = { x, y };
    }
  }

  export function resize(w: number, h: number, duration: number = 200) {
    if (duration > 0) {
      const to = {
        width: w + "px",
        height: h + "px",
      };
      const animation = element?.animate(
        [
          {
            width: size.x + "px",
            height: size.y + "px",
          },
          to,
        ],
        {
          duration,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          fill: "forwards",
        },
      );
      setTimeout(() => {
        if (element === null) return;
        animation?.cancel();
        size = { x: w, y: h };
      }, duration);
    } else {
      size = { x: w, y: h };
    }
  }
</script>

<svelte:document  />

{#snippet handles()}
  <!-- Top Left -->
  <div
    data-blockdrag
    role="presentation"
    use:drag
    oncustomdragstart={setInitial}
    oncustomdrag={(e) => {
      const maxPosition = {
        x: initialPosition.x + initialSize.x - minSize.x,
        y: initialPosition.y + initialSize.y - minSize.y,
      };

      position = {
        x: Math.min(initialPosition.x + e.offset.x, maxPosition.x),
        y: Math.min(initialPosition.y + e.offset.y, maxPosition.y),
      };

      size = {
        x: Math.max(initialSize.x - e.offset.x, minSize.x),
        y: Math.max(initialSize.y - e.offset.y, minSize.y),
      };
    }}
    class="handle absolute -top-1.25 -left-1.25 h-2.5 w-2.5 cursor-nwse-resize bg-red-500/50"
  ></div>
  <!-- Top Right -->
  <div
    data-blockdrag
    role="presentation"
    use:drag
    oncustomdragstart={setInitial}
    oncustomdrag={(e) => {
      const maxPosition = {
        x: initialPosition.x + minSize.x,
        y: initialPosition.y + initialSize.y - minSize.y,
      };

      position = {
        x: initialPosition.x,
        y: Math.min(initialPosition.y + e.offset.y, maxPosition.y),
      };

      size = {
        x: Math.max(initialSize.x + e.offset.x, minSize.x),
        y: Math.max(initialSize.y - e.offset.y, minSize.y),
      };
    }}
    class="handle absolute -top-1.25 -right-1.25 h-2.5 w-2.5 cursor-nesw-resize bg-red-500/50"
  ></div>
  <!-- Bottom Left -->
  <div
    data-blockdrag
    role="presentation"
    use:drag
    oncustomdragstart={setInitial}
    oncustomdrag={(e) => {
      const maxPosition = {
        x: initialPosition.x + initialSize.x - minSize.x,
        y: initialPosition.y + minSize.y,
      };

      position = {
        x: Math.min(initialPosition.x + e.offset.x, maxPosition.x),
        y: initialPosition.y,
      };

      size = {
        x: Math.max(initialSize.x - e.offset.x, minSize.x),
        y: Math.max(initialSize.y + e.offset.y, minSize.y),
      };
    }}
    class="handle absolute -bottom-1.25 -left-1.25 h-2.5 w-2.5 cursor-nesw-resize bg-red-500/50"
  ></div>
  <!-- Bottom Right -->
  <div
    data-blockdrag
    role="presentation"
    use:drag
    oncustomdragstart={setInitial}
    oncustomdrag={(e) => {
      size = {
        x: Math.max(initialSize.x + e.offset.x, minSize.x),
        y: Math.max(initialSize.y + e.offset.y, minSize.y),
      };
    }}
    class="handle absolute -right-1.25 -bottom-1.25 h-2.5 w-2.5 cursor-nwse-resize bg-red-500/50"
  ></div>
  <!-- Top -->
  <div
    data-blockdrag
    role="presentation"
    use:drag
    oncustomdragstart={setInitial}
    oncustomdrag={(e) => {
      const maxPosition = {
        y: initialPosition.y + initialSize.y - minSize.y,
      };

      position = {
        x: position.x,
        y: Math.min(initialPosition.y + e.offset.y, maxPosition.y),
      };

      size = {
        x: size.x,
        y: Math.max(initialSize.y - e.offset.y, minSize.y),
      };
    }}
    class="handle absolute -top-1.25 right-1.25 left-1.25 h-2.5 cursor-ns-resize bg-blue-500/50"
  ></div>
  <!-- Top -->
  <div
    data-blockdrag
    role="presentation"
    use:drag
    oncustomdragstart={setInitial}
    oncustomdrag={(e) => {
      size = {
        x: size.x,
        y: Math.max(initialSize.y + e.offset.y, minSize.y),
      };
    }}
    class="handle absolute right-1.25 -bottom-1.25 left-1.25 h-2.5 cursor-ns-resize bg-blue-500/50"
  ></div>
{/snippet}

<div
  bind:this={element}
  class="glass-card rounded-box absolute shadow-xl"
  style="width: {size.x}px; height: {size.y}px; left: {position.x}px; top: {position.y}px"
  use:drag
  oncustomdrag={(e) => {
    position = add(position, e.delta);
  }}
  oncustomdragend={() => {
    const target: Vector = { x: Math.max(0, position.x), y: Math.max(0, position.y) };
    move(target.x, target.y);
  }}
>
  <div class="h-full w-full overflow-hidden">
    <p>{JSON.stringify(position)}</p>
    <p>{JSON.stringify(size)}</p>
    {@render children()}
  </div>
  {@render handles()}
</div>
