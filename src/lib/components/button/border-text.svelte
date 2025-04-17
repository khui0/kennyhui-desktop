<script lang="ts">
  let {
    text = "",
    radius = 16,
    height = 64,
    width = 64,
    padding = 6,
    spacing = 0,
    offset = 0,
  }: {
    text?: string;
    radius?: number;
    width?: number;
    height?: number;
    padding?: number;
    spacing?: number;
    offset?: number;
  } = $props();
</script>

<span class="inline-block" style="width: {width}px; height: {height}px">
  <svg viewBox="0 0 {width} {height}">
    <path
      id="shape"
      fill="transparent"
      d="
        M{radius + padding},{padding}
        H{width - radius - padding}
        A{radius},{radius} 0 0 1 {width - padding},{radius + padding}
        V{width - radius - padding}
        A{radius},{radius} 0 0 1 {width - radius - padding},{height - padding}
        H{radius + padding}
        A{radius},{radius} 0 0 1 {padding},{height - radius - padding}
        V{radius + padding}
        A{radius},{radius} 0 0 1 {radius + padding},{padding}
        Z"
    />
    <text font-size="8px">
      <textPath
        method="stretch"
        href="#shape"
        startOffset={offset}
        style="letter-spacing: {spacing}px;"
      >
        {text}
      </textPath>
    </text>
  </svg>
</span>

<style>
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  text {
    text-transform: uppercase;
  }
</style>
