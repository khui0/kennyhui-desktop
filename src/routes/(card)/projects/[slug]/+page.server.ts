import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { compile } from "mdsvex";
import type { MetaTagsProps } from "svelte-meta-tags";
import { projects, type Project } from "$lib/projects";

import type { EntryGenerator } from "./$types";
import { query } from "$lib/images";

export const entries: EntryGenerator = () => {
  return projects.map((item) => {
    return {
      slug: item.path.split("/").at(-1) || "",
    };
  });
};

export const prerender = true;

export const load: PageServerLoad = async ({ url, params }) => {
  try {
    const raw = await import(`$lib/projects/${params.slug}.md?raw`);
    const compiled = await compile(raw.default);
    const meta = projects.find((item) => item.path === "projects/" + params.slug) as Project;

    const pageMetaTags = Object.freeze({
      title: meta?.title,
      titleTemplate: "%s — Kenny Hui",
      description: meta?.short,
      openGraph: {
        type: "website",
        url: new URL(url.pathname, url.origin).href,
        locale: "en_US",
        title: meta?.title,
        description: meta?.short,
        siteName: "kennyhui.dev",
        images: [
          {
            url: query(`projects/${params.slug}.png`).default.img.src,
          },
        ],
      },
    }) satisfies MetaTagsProps;

    return {
      path: params.slug,
      html: compiled,
      project: meta,
      pageMetaTags,
    };
  } catch {
    error(404, `kennyhui.dev/projects/${params.slug} does not exist!`);
  }
};
