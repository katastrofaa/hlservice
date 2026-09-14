import type { NextConfig } from "next";
import { locales, routeKeys, segments, defaultLocale } from "./lib/routes";

const nextConfig: NextConfig = {
  // Keeps the URL format of the previous WordPress site (e.g. /o-firmie/).
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      // Legacy WordPress / qTranslate / NextGEN URLs
      { source: "/pl", destination: "/", permanent: true },
      { source: "/galeria/nggallery/album/:album", destination: "/galeria/:album/", permanent: true },
      { source: "/galeria/nggallery/:path*", destination: "/galeria/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      // Internal route names must not be reachable under a second URL
      ...routeKeys
        .filter((key) => key !== "home")
        .flatMap((key) =>
          locales
            .filter((lang) => lang === defaultLocale || segments[key][lang] !== key)
            .flatMap((lang) => {
              const target = `${lang === defaultLocale ? "" : `/${lang}`}/${segments[key][lang]}`;
              // Trailing slashes in destinations avoid a second hop through the trailingSlash redirect
              return [
                { source: `/${lang}/${key}`, destination: `${target}/`, permanent: true },
                { source: `/${lang}/${key}/:param+`, destination: `${target}/:param+/`, permanent: true },
              ];
            }),
        ),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: `/${defaultLocale}` },
        ...routeKeys
          .filter((key) => key !== "home")
          .flatMap((key) =>
            locales
              .filter((lang) => lang === defaultLocale || segments[key][lang] !== key)
              .map((lang) => ({
                source: `${lang === defaultLocale ? "" : `/${lang}`}/${segments[key][lang]}/:param*`,
                destination: `/${lang}/${key}/:param*`,
              })),
          ),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
