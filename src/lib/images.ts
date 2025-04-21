import type { Picture } from "vite-imagetools";

export interface ImageModule {
  default: Picture;
}

const images: Record<string, ImageModule> = import.meta.glob(
  "$lib/assets/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}",
  {
    eager: true,
    query: {
      enhanced: true,
    },
  },
);

export function query(image: string) {
  return images["/src/lib/assets/" + image];
}
