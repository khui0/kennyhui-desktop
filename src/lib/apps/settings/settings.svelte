<script lang="ts">
  import ThemeSelector from "./theme-selector.svelte";
</script>

<div class="grid h-full grid-cols-[200px_1fr]">
  <div class="flex flex-col border-r"></div>
  <div class="bg-base-100 flex flex-col px-5">
    <div class="flex h-12 items-center">
      <h2 class="text-[15px] font-semibold">Appearance</h2>
    </div>
    <div data-nodrag>
      <div class="rounded-field bg-base-300/30 border-base-content/5 border p-1.5">
        <div class="grid grid-cols-[auto_1fr]">
          <p class="ml-1 leading-[22px]">Appearance</p>
          <div class="flex justify-end">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
