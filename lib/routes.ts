// Shared between next.config, server and client code – keep it dependency free.

export const locales = ["pl", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export type RouteKey = "home" | "about" | "services" | "gallery" | "references" | "contact";

/** Public (localized) path segments. Internal routes live under app/[lang]/<key>. */
export const segments: Record<RouteKey, Record<Locale, string>> = {
  home: { pl: "", en: "", de: "" },
  about: { pl: "o-firmie", en: "about", de: "unternehmen" },
  services: { pl: "uslugi", en: "services", de: "leistungen" },
  gallery: { pl: "galeria", en: "gallery", de: "galerie" },
  references: { pl: "rekomendacje", en: "references", de: "referenzen" },
  contact: { pl: "kontakt", en: "contact", de: "kontakt" },
};

export const routeKeys = Object.keys(segments) as RouteKey[];

/** Public URL path (with trailing slash) for a page in a given language. */
export function href(lang: Locale, key: RouteKey, param?: string): string {
  const parts = [lang === defaultLocale ? "" : lang, segments[key][lang], param ?? ""].filter(Boolean);
  return parts.length ? `/${parts.join("/")}/` : "/";
}

/** Resolves a public pathname back to its language, route and optional param. */
export function matchPath(pathname: string): { lang: Locale; key: RouteKey; param?: string } | null {
  const parts = pathname.split("/").filter(Boolean).map(decodeURIComponent);
  let lang: Locale = defaultLocale;
  if (parts[0] && isLocale(parts[0]) && parts[0] !== defaultLocale) lang = parts.shift() as Locale;
  if (parts.length === 0) return { lang, key: "home" };
  const key = routeKeys.find((k) => k !== "home" && segments[k][lang] === parts[0]);
  if (!key) return null;
  if (parts.length === 1) return { lang, key };
  if (key === "gallery" && parts.length === 2) return { lang, key, param: parts[1] };
  return null;
}
