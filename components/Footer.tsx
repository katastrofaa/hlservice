import Link from "next/link";
import type { Dictionary } from "@/content/pl";
import { href, type Locale, type RouteKey } from "@/lib/routes";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { FacebookIcon, MailIcon, PhoneIcon } from "./icons";

const navKeys: Exclude<RouteKey, "home">[] = ["about", "services", "gallery", "references", "contact"];

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="bg-navy-950 pb-24 text-navy-200 lg:pb-0">
      <div className="h-1 bg-gradient-to-r from-brand-red to-brand-orange" aria-hidden />
      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-12 lg:py-16">
        <div className="col-span-2 lg:col-span-4">
          <Link href={href(lang, "home")} aria-label={`Heavy Lift Service – ${dict.ui.home}`}>
            <Logo tone="light" />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">{dict.footer.about}</p>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-white transition-colors hover:text-brand-red"
          >
            <FacebookIcon className="h-5 w-5" />
            <span className="text-sm">{dict.ui.facebook}</span>
          </a>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">Menu</h2>
          <ul className="mt-4 space-y-2.5">
            {navKeys.map((key) => (
              <li key={key}>
                <Link href={href(lang, key)} className="transition-colors hover:text-white">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">{dict.contact.company}</h2>
          <address className="mt-4 space-y-1 leading-relaxed not-italic">
            <strong className="block font-semibold text-white">{site.legalName}</strong>
            <span className="block">{site.street}</span>
            <span className="block">
              {site.postalCode} {site.city}
            </span>
            <span className="block pt-2">
              {dict.contact.nip}: {site.nip}
            </span>
            <span className="block">
              {dict.contact.bdo}: {site.bdo}
            </span>
          </address>
        </div>

        <div className="col-span-2 sm:col-span-1 lg:col-span-3">
          <h2 className="font-display text-sm font-semibold tracking-[0.14em] text-white uppercase">{dict.nav.contact}</h2>
          <ul className="mt-4 space-y-2.5">
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2.5 text-white transition-colors hover:text-brand-red">
                  <PhoneIcon className="h-4 w-4 text-brand-red" />
                  {p.display}
                </a>
              </li>
            ))}
            <li className="pl-[1.625rem]">
              {dict.contact.fax} {site.fax}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-white transition-colors hover:text-brand-red">
                <MailIcon className="h-4 w-4 text-brand-red" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Fixed call / e-mail bar shown on phones only. */
export function MobileContactBar({ dict }: { dict: Dictionary }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-navy-800 bg-navy-950 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a
        href={`tel:${site.phones[1].tel}`}
        className="flex items-center justify-center gap-2 bg-brand-red py-3.5 font-display text-lg font-semibold tracking-wide text-white uppercase"
      >
        <PhoneIcon className="h-5 w-5" />
        {dict.ui.call}
      </a>
      <a
        href={`mailto:${site.email}`}
        className="flex items-center justify-center gap-2 py-3.5 font-display text-lg font-semibold tracking-wide text-white uppercase"
      >
        <MailIcon className="h-5 w-5" />
        {dict.ui.write}
      </a>
    </div>
  );
}
