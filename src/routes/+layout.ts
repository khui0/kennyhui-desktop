import type { MetaTagsProps } from "svelte-meta-tags";

const DESCRIPTION =
  "Kenny Hui's Desktop is a macOS inspired web desktop environment.";

export const load = ({ url }) => {
  const baseMetaTags = Object.freeze({
    title: "Kenny Hui's Desktop",
    description: DESCRIPTION,
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: "website",
      url: new URL(url.pathname, url.origin).href,
      locale: "en_US",
      title: "Kenny Hui",
      description: DESCRIPTION,
      siteName: "desktop.kennyhui.dev",
      images: [
        {
          url: "https://kennyhui.dev/og/index.png",
        },
      ],
    },
  }) satisfies MetaTagsProps;

  return {
    baseMetaTags,
  };
};
