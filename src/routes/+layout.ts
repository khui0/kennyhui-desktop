import "@fontsource-variable/dm-sans";

import type { MetaTagsProps } from "svelte-meta-tags";

const DESCRIPTION =
  "Kenny Hui is a CS student at Stony Brook University. They are experienced in web development and UX/UI design. Based in New York. View his portfolio.";

export const load = ({ url }) => {
  const baseMetaTags = Object.freeze({
    title: "Kenny Hui",
    description: DESCRIPTION,
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: "website",
      url: new URL(url.pathname, url.origin).href,
      locale: "en_US",
      title: "Kenny Hui",
      description: DESCRIPTION,
      siteName: "kennyhui.dev",
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
