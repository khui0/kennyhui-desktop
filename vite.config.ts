import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import version from "vite-plugin-package-version";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
    enhancedImages(),
    version(),
    tailwindcss(),
    imagetools(),
  ],
});
