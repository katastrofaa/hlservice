import type { Metadata } from "next";
import pl, { type Dictionary } from "@/content/pl";
import en from "@/content/en";
import de from "@/content/de";
import { defaultLocale, href, isLocale, locales, type Locale, type RouteKey } from "./routes";
import { site } from "./site";

/** Polish typography: glue one-letter words (w, z, o, i, a…) to the next word so they never end a line. */
function glueOrphans<T>(value: T): T {
  if (typeof value === "string") return value.replace(/(^|\s)([aiouwzAIOUWZ])\s/g, "$1$2\u00A0") as T;
  if (Array.isArray(value)) return value.map(glueOrphans) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, glueOrphans(v)])) as T;
  }
  return value;
}

const dictionaries: Record<Locale, Dictionary> = { pl: glueOrphans(pl), en, de };

export function getDictionary(lang: string): Dictionary {
  return dictionaries[isLocale(lang) ? lang : defaultLocale];
}

/** Replaces {placeholders} in a template string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""));
}

export function photosLabel(lang: Locale, count: number): string {
  const form = new Intl.PluralRules(lang).select(count) as keyof Dictionary["ui"]["photos"];
  return `${count} ${getDictionary(lang).ui.photos[form] ?? getDictionary(lang).ui.photos.other}`;
}

export function pageMetadata(
  lang: Locale,
  key: RouteKey,
  { title, description, param, image }: { title: string; description: string; param?: string; image?: string },
): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, href(l, key, param)])) as Record<string, string>;
  languages["x-default"] = href(defaultLocale, key, param);
  const dict = getDictionary(lang);
  return {
    title: key === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: href(lang, key, param), languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: href(lang, key, param),
      locale: dict.ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => getDictionary(l).ogLocale),
      images: [image ? { url: image } : { url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
