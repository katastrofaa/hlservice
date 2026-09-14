import type { MetadataRoute } from "next";
import { albums } from "@/lib/gallery";
import { defaultLocale, href, locales, routeKeys, type RouteKey } from "@/lib/routes";
import { site } from "@/lib/site";

const priority: Record<RouteKey, number> = {
  home: 1,
  services: 0.9,
  about: 0.8,
  gallery: 0.8,
  contact: 0.8,
  references: 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (key: RouteKey, param?: string, prio = priority[key]) =>
    locales.map((lang) => ({
      url: `${site.url}${href(lang, key, param)}`,
      changeFrequency: "monthly" as const,
      priority: lang === defaultLocale ? prio : Math.round(prio * 0.9 * 10) / 10,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${site.url}${href(l, key, param)}`])),
          "x-default": `${site.url}${href(defaultLocale, key, param)}`,
        },
      },
    }));

  return [
    ...routeKeys.flatMap((key) => entry(key)),
    ...albums.flatMap((a) => entry("gallery", a.slug, 0.5)),
  ];
}
