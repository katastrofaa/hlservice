"use client";

import Image from "next/image";
import { useRef, useState, type TouchEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

export type ViewerPhoto = { src: string; w: number; h: number; alt: string };

export function AlbumViewer({
  photos,
  labels,
}: {
  photos: ViewerPhoto[];
  labels: { open: string; close: string; prev: string; next: string; counter: string };
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const count = photos.length;

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const photo = photos[index];

  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-navy-100"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                loading={i < 8 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="sr-only">{labels.open}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={photo.alt}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
      >
        <div className="pointer-events-none flex h-full flex-col">
          <div className="pointer-events-auto flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="font-display text-lg font-semibold tracking-wide" aria-live="polite">
              {labels.counter.replace("{i}", String(index + 1)).replace("{n}", String(count))}
            </p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="grid h-12 w-12 place-items-center bg-white/10 transition-colors hover:bg-brand-red"
            >
              <CloseIcon className="h-6 w-6" />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>
          <div className="relative flex-1 px-2 sm:px-20">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              quality={85}
              className="pointer-events-auto object-contain"
            />
          </div>
          <div className="pointer-events-auto flex justify-center gap-3 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:absolute sm:inset-x-0 sm:top-1/2 sm:-translate-y-1/2 sm:justify-between sm:p-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid h-14 w-14 place-items-center bg-white/10 transition-colors hover:bg-brand-red"
            >
              <ChevronLeftIcon className="h-7 w-7" />
              <span className="sr-only">{labels.prev}</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid h-14 w-14 place-items-center bg-white/10 transition-colors hover:bg-brand-red"
            >
              <ChevronRightIcon className="h-7 w-7" />
              <span className="sr-only">{labels.next}</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
