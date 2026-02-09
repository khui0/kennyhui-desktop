interface ImageProperties {
  sources: Record<string, string>;
  img: {
    src: string;
    w: number;
    h: number;
  };
}

interface ModuleImport {
  default: ImageProperties;
}

export interface Image {
  default: ImageProperties;
  alt: string;
}

const images: Record<string, ModuleImport> = import.meta.glob(
  "$lib/assets/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}",
  {
    eager: true,
    query: {
      enhanced: true,
    },
  },
);

export function query(image: string, alt: string = ""): Image {
  return {
    default: images["/src/lib/assets/" + image]?.default,
    alt,
  };
}
