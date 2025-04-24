<script lang="ts">
  let { title }: { title?: string } = $props();
</script>

<div
  class="bg-base-100 text-base-content/50 window-active:text-base-content/85 window-active:bg-base-200/80 grid h-7 shrink-0 items-center justify-center text-sm shadow-xs select-none"
>
  <p class="text-[13px] font-bold">
    {title}
  </p>
</div>
