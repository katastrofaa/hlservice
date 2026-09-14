"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { ArrowRightIcon, CameraIcon, SearchIcon } from "./icons";

export type AlbumItem = { slug: string; title: string; search: string; href: string; cover: string; count: string };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ł/g, "l");

export function GalleryBrowser({ items, labels }: { items: AlbumItem[]; labels: { search: string; noResults: string } }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const q = normalize(deferred.trim());
  const visible = q ? items.filter((i) => normalize(i.search).includes(q)) : items;

  return (
    <>
      <div className="relative max-w-xl">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-steel-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.search}
          aria-label={labels.search}
          className="h-14 w-full border-2 border-steel-200 bg-white pr-4 pl-12 text-base text-navy-900 placeholder:text-steel-500 focus:border-navy-900 focus:outline-none"
        />
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-lg text-steel-700">{labels.noResults}</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:gap-x-5 sm:gap-y-8 md:grid-cols-3 xl:grid-cols-4">
          {visible.map((item, i) => (
            <li key={item.slug}>
              <Link href={item.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
                    loading={i < 8 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-0 bottom-0 inline-flex items-center gap-1.5 bg-navy-950/85 px-2.5 py-1 text-xs font-medium text-white">
                    <CameraIcon className="h-3.5 w-3.5" />
                    {item.count}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b-2 border-transparent py-2.5 transition-colors group-hover:border-brand-red sm:py-3">
                  <h2 className="font-display text-base leading-tight sm:text-xl font-semibold text-navy-900 uppercase">{item.title}</h2>
                  <ArrowRightIcon className="hidden h-5 w-5 shrink-0 sm:block text-brand-red transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
