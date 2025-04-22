<script lang="ts">
  import HeroiconsWifi16Solid from "~icons/heroicons/wifi-16-solid";
  import TablerBluetooth from "~icons/tabler/bluetooth";
  import HeroiconsSignal16Solid from "~icons/heroicons/signal-16-solid";
  import HeroiconsMoon16Solid from "~icons/heroicons/moon-16-solid";
  import HeroiconsSun16Solid from "~icons/heroicons/sun-16-solid";
  import HeroiconsSpeakerWave16Solid from "~icons/heroicons/speaker-wave-16-solid";
  import HeroiconsSquare2Stack from "~icons/heroicons/square-2-stack";
  import HeroiconsWindow from "~icons/heroicons/window";
</script>

<div
  data-menu-bar-ignore
  class="bg-glass fixed right-0 m-1.5 grid w-80 cursor-default grid-cols-4 gap-2.5 rounded-[17.5px] p-2.5 shadow-lg"
>
  <div class="control col-span-2 col-start-1 flex h-33 flex-col justify-center gap-2 pl-3">
    <div class="grid grid-cols-[auto_1fr] items-center gap-2">
      <div
        class="bg-accent text-accent-content flex h-6.5 w-6.5 items-center justify-center rounded-full"
      >
        <HeroiconsWifi16Solid />
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-[12px] font-semibold">Wi-Fi</p>
        <p class="text-base-content/50 -mt-0.5 text-[10px]">SSID</p>
      </div>
    </div>
    <div class="grid grid-cols-[auto_1fr] items-center gap-2">
      <div
        class="bg-accent text-accent-content flex h-6.5 w-6.5 items-center justify-center rounded-full"
      >
        <TablerBluetooth />
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-[12px] font-semibold">Bluetooth</p>
        <p class="text-base-content/50 -mt-0.5 text-[10px]">On</p>
      </div>
    </div>
    <div class="grid grid-cols-[auto_1fr] items-center gap-2">
      <div
        class="bg-accent text-accent-content flex h-6.5 w-6.5 items-center justify-center rounded-full"
      >
        <HeroiconsSignal16Solid />
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-[12px] font-semibold">Sharing</p>
        <p class="text-base-content/50 -mt-0.5 text-[10px]">Everyone</p>
      </div>
    </div>
  </div>
  <div class="col-span-2 col-start-3 grid h-33 grid-rows-2 gap-2.5">
    <div class="control col-span-2 flex flex-col justify-center pl-3">
      <div class="grid grid-cols-[auto_1fr] items-center gap-2">
        <div class="bg-base-content/25 flex h-6.5 w-6.5 items-center justify-center rounded-full">
          <HeroiconsMoon16Solid />
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-[12px] font-semibold">Focus</p>
        </div>
      </div>
    </div>
    <div class="col-span-2 grid grid-cols-2 gap-2.5">
      <div class="control flex flex-col items-center justify-center gap-0.5 p-1 pb-1.5">
        <span class="text-base-content/60 text-xl">
          <HeroiconsWindow />
        </span>
        <p class="text-center text-[10px] leading-[1.1]">Stage Manager</p>
      </div>
      <div class="control flex flex-col items-center justify-center gap-0.5 p-1 pb-1.5">
        <span class="text-base-content/60 text-xl">
          <HeroiconsSquare2Stack />
        </span>
        <p class="text-center text-[10px] leading-[1.1]">Screen Mirroring</p>
      </div>
    </div>
  </div>
  <div class="control col-span-4 flex h-16.5 flex-col justify-center gap-2 px-3">
    <p class="-mt-1 text-[12px] font-semibold">Display</p>
    <div class="relative flex">
      <input
        type="range"
        min="0"
        max="100"
        value="40"
        class="range [--range-progress:white] [--range-thumb:white]"
      />
      <span class="absolute top-1/2 left-0.75 -translate-y-1/2 text-[10px] text-black/80">
        <HeroiconsSun16Solid />
      </span>
    </div>
  </div>
  <div class="control col-span-4 flex h-16.5 flex-col justify-center gap-2 px-3">
    <p class="-mt-1 text-[12px] font-semibold">Sound</p>
    <div class="relative flex">
      <input
        type="range"
        min="0"
        max="100"
        value="40"
        class="range [--range-progress:white] [--range-thumb:white]"
      />
      <span class="absolute top-1/2 left-0.75 -translate-y-1/2 text-[10px] text-black/80">
        <HeroiconsSpeakerWave16Solid />
      </span>
    </div>
  </div>
  <div class="control col-span-4 p-3">
    <p class="text-base-content/50 text-[12px]">For display purposes</p>
  </div>
</div>

<style>
  @reference "../../../app.css";

  .control {
    @apply rounded-box bg-base-200/30 flex flex-col border-[0.5px] border-white/20 shadow-md outline-[0.5px] outline-black/20;
  }
</style>
