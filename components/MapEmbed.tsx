"use client";

import { useState } from "react";
import { PinIcon } from "./icons";

/** Google Maps iframe loaded only after an explicit click (privacy + performance). */
export function MapEmbed({
  query,
  lang,
  labels,
}: {
  query: string;
  lang: string;
  labels: { load: string; consent: string; title: string };
}) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=${lang}&z=15&output=embed`;

  if (loaded) {
    return (
      <iframe
        src={src}
        title={labels.title}
        className="h-full min-h-[22rem] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="bg-blueprint flex h-full min-h-[22rem] flex-col items-center justify-center gap-5 p-8 text-center text-white">
      <span className="grid h-16 w-16 place-items-center bg-brand-red">
        <PinIcon className="h-8 w-8" />
      </span>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="border-2 border-white/40 px-6 py-3 font-display text-lg font-semibold tracking-wide uppercase transition-colors hover:border-white hover:bg-white/5"
      >
        {labels.load}
      </button>
      <p className="max-w-sm text-sm text-navy-200">{labels.consent}</p>
    </div>
  );
}
