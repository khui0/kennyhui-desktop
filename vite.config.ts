import { sveltekit } from "@sveltejs/kit/vite";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
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
      customCollections: {
        custom: FileSystemIconLoader("src/lib/icons", (svg) =>
          svg.replace(/^<svg /, `<svg fill="currentColor" `),
        ),
      },
    }),
    enhancedImages(),
    version(),
    tailwindcss(),
    imagetools(),
  ],
});
