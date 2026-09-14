import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Dictionary } from "@/content/pl";
import { albumTitle, type Album } from "@/lib/gallery";
import { photosLabel } from "@/lib/i18n";
import { href, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";
import { ArrowRightIcon, CameraIcon, MailIcon, PhoneIcon } from "./icons";

const buttonStyles = {
  primary: "bg-brand-red text-white hover:bg-brand-red-dark",
  dark: "bg-navy-900 text-white hover:bg-navy-700",
  outlineLight: "border-2 border-white/40 text-white hover:border-white hover:bg-white/5",
  outlineDark: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles; children: ReactNode }) {
  return (
    <Link
      {...props}
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 font-display text-lg font-semibold tracking-wide uppercase transition-colors ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  tone = "dark",
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  tone?: "dark" | "light";
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <p className={`eyebrow ${tone === "light" ? "text-navy-200" : "text-steel-500"}`}>{eyebrow}</p>}
      <Tag
        className={`heading mt-3 text-4xl sm:text-5xl ${tone === "light" ? "text-white" : "text-navy-900"}`}
      >
        {title}
      </Tag>
    </div>
  );
}

export function AlbumCard({ album, lang, sizes }: { album: Album; lang: Locale; sizes: string }) {
  const cover = album.images[album.cover] ?? album.images[0];
  const title = albumTitle(album, lang);
  return (
    <Link href={href(lang, "gallery", album.slug)} className="group block bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
        <Image
          src={cover.src}
          alt={title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute right-0 bottom-0 inline-flex items-center gap-1.5 bg-navy-950/85 px-2.5 py-1 text-xs font-medium text-white">
          <CameraIcon className="h-3.5 w-3.5" />
          {photosLabel(lang, album.images.length)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 border-b-2 border-transparent py-2.5 transition-colors group-hover:border-brand-red sm:py-3">
        <h3 className="font-display text-base leading-tight font-semibold text-navy-900 uppercase sm:text-xl">{title}</h3>
        <ArrowRightIcon className="hidden h-5 w-5 shrink-0 text-brand-red transition-transform group-hover:translate-x-1 sm:block" />
      </div>
    </Link>
  );
}

export function CtaBand({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section className="bg-blueprint relative overflow-hidden text-white">
      <div className="container-site grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-6">
          <p className="eyebrow text-navy-200">{dict.nav.contact}</p>
          <h2 className="heading mt-3 text-4xl sm:text-5xl lg:text-6xl">{dict.home.ctaHeading}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">{dict.home.ctaText}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
          {site.phones.map((p) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              className="flex items-center gap-4 border border-white/15 bg-white/[0.03] p-5 transition-colors hover:border-brand-red hover:bg-white/[0.06]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand-red">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-navy-200">{dict.contact.phone}</span>
                <span className="block font-display text-2xl font-semibold tracking-wide whitespace-nowrap">{p.display}</span>
              </span>
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-4 border border-white/15 bg-white/[0.03] p-5 transition-colors hover:border-brand-red hover:bg-white/[0.06] sm:col-span-2"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center bg-white text-navy-900">
              <MailIcon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-navy-200">{dict.contact.email}</span>
              <span className="block truncate font-display text-2xl font-semibold tracking-wide">{site.email}</span>
            </span>
            <ArrowRightIcon className="ml-auto h-6 w-6 shrink-0 text-brand-red" />
          </a>
          <ButtonLink href={href(lang, "contact")} variant="outlineLight" className="sm:col-span-2">
            {dict.ui.contactUs}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
