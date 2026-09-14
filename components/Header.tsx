"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, locales, matchPath, type Locale, type RouteKey } from "@/lib/routes";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

type NavKey = Exclude<RouteKey, "home">;
const navKeys: NavKey[] = ["about", "services", "gallery", "references", "contact"];

export type HeaderLabels = {
  nav: Record<NavKey, string>;
  skip: string;
  menu: string;
  close: string;
  call: string;
  language: string;
  home: string;
  mainNav: string;
  langNames: Record<Locale, string>;
};

export function Header({ lang, labels }: { lang: Locale; labels: HeaderLabels }) {
  const pathname = usePathname();
  const current = matchPath(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (key: NavKey) => current?.key === key;
  const switchHref = (l: Locale) => (current ? href(l, current.key, current.param) : href(l, "home"));

  const langSwitch = (dark: boolean) => (
    <ul className="flex items-center" aria-label={labels.language}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={switchHref(l)}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            title={labels.langNames[l]}
            onClick={() => setOpen(false)}
            className={`block px-2 py-1.5 font-display text-[0.95rem] font-semibold uppercase tracking-wider transition-colors ${
              l === lang
                ? dark
                  ? "text-white underline decoration-brand-red decoration-2 underline-offset-[6px]"
                  : "text-navy-900 underline decoration-brand-red decoration-2 underline-offset-[6px]"
                : dark
                  ? "text-navy-200 hover:text-white"
                  : "text-steel-500 hover:text-navy-900"
            }`}
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-steel-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        {labels.skip}
      </a>
      <div className="container-site flex h-[4.25rem] items-center justify-between gap-4 lg:h-20">
        <Link href={href(lang, "home")} aria-label={`Heavy Lift Service – ${labels.home}`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={labels.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navKeys.map((key) => (
              <li key={key}>
                <Link
                  href={href(lang, key)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={`relative block px-3 py-2 font-display text-[1.05rem] font-semibold uppercase tracking-wide transition-colors after:absolute after:inset-x-3 after:-bottom-[1px] after:h-[3px] after:bg-brand-red after:transition-transform ${
                    isActive(key)
                      ? "text-navy-900 after:scale-x-100"
                      : "text-steel-700 after:scale-x-0 hover:text-navy-900 hover:after:scale-x-100"
                  }`}
                >
                  {labels.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {langSwitch(false)}
          <a
            href={`tel:${site.phones[1].tel}`}
            className="inline-flex items-center gap-2 bg-brand-red px-4 py-2.5 font-display text-[1.05rem] font-semibold tracking-wide text-white transition-colors hover:bg-brand-red-dark"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phones[1].display}
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={`tel:${site.phones[1].tel}`}
            aria-label={`${labels.call}: ${site.phones[1].display}`}
            className="grid h-11 w-11 place-items-center bg-brand-red text-white"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center text-navy-900"
          >
            <MenuIcon className="h-7 w-7" />
            <span className="sr-only">{labels.menu}</span>
          </button>
        </div>
      </div>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise contain this fixed overlay */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col bg-blueprint text-white lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
      >
        <div className="container-site flex h-[4.25rem] items-center justify-between">
          <Link href={href(lang, "home")} onClick={() => setOpen(false)} aria-label={labels.home}>
            <Logo tone="light" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center"
            autoFocus
          >
            <CloseIcon className="h-7 w-7" />
            <span className="sr-only">{labels.close}</span>
          </button>
        </div>
        <nav aria-label={labels.mainNav} className="container-site flex-1 overflow-y-auto pt-6">
          <ul className="border-t border-white/10">
            <li>
              <Link
                href={href(lang, "home")}
                onClick={() => setOpen(false)}
                aria-current={current?.key === "home" ? "page" : undefined}
                className="flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl font-bold uppercase aria-[current=page]:text-brand-red"
              >
                {labels.home}
              </Link>
            </li>
            {navKeys.map((key) => (
              <li key={key}>
                <Link
                  href={href(lang, key)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className="flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl font-bold uppercase aria-[current=page]:text-brand-red"
                >
                  {labels.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-between gap-4">
            {langSwitch(true)}
          </div>
        </nav>
        <div className="container-site grid gap-2 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {site.phones.map((p) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              className="flex items-center justify-center gap-2 bg-brand-red py-3.5 font-display text-xl font-semibold text-white"
            >
              <PhoneIcon className="h-5 w-5" />
              {p.display}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
