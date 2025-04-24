<script lang="ts">
  let {
    src,
    title,
  }: {
    src?: string;
    title?: string;
  } = $props();
</script>

<div data-nodrag class="relative flex h-full flex-col">
  <iframe
    {src}
    title={title || "IFrame"}
    referrerpolicy="no-referrer"
    class="h-full w-full"
    sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>
