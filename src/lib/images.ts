export interface Picture {
  sources: Record<string, string>;
  img: {
    src: string;
    w: number;
    h: number;
  };
}

export interface PictureModule {
  default: Picture;
}

export const images = import.meta.glob(
  "$lib/assets/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}",
  {
    eager: true,
    query: {
      enhanced: true,
    },
  },
);

export function query(image: string): PictureModule {
  return images["/src/lib/assets/" + image] as PictureModule;
}
