<script>
  import { page } from "$app/state";
</script>

<div class="hero min-h-screen mix-blend-overlay">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="mb-2 text-8xl font-black tracking-tighter">{page.status}</h1>
      <p class="mb-4 text-lg font-light tracking-tight">{page.error?.message}</p>
    </div>
  </div>
</div>
