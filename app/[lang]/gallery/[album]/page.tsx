import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlbumViewer } from "@/components/AlbumViewer";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/ui";
import { albumTitle, albums, getAlbum } from "@/lib/gallery";
import { fill, getDictionary, pageMetadata, photosLabel } from "@/lib/i18n";
import { href, locales, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => albums.map((a) => ({ lang, album: a.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery/[album]">): Promise<Metadata> {
  const { lang, album: slug } = (await params) as { lang: Locale; album: string };
  const album = getAlbum(slug);
  if (!album) return {};
  const { meta } = getDictionary(lang);
  const title = albumTitle(album, lang);
  return pageMetadata(lang, "gallery", {
    param: slug,
    title: fill(meta.album.title, { album: title }),
    description: fill(meta.album.description, { album: title, count: photosLabel(lang, album.images.length) }),
    image: (album.images[album.cover] ?? album.images[0]).src,
  });
}

export default async function AlbumPage({ params }: PageProps<"/[lang]/gallery/[album]">) {
  const { lang, album: slug } = (await params) as { lang: Locale; album: string };
  const index = albums.findIndex((a) => a.slug === slug);
  if (index === -1) notFound();

  const dict = getDictionary(lang);
  const album = albums[index];
  const title = albumTitle(album, lang);
  const prev = albums[(index - 1 + albums.length) % albums.length];
  const next = albums[(index + 1) % albums.length];
  const n = album.images.length;

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbsLabel={dict.ui.breadcrumbs}
        crumbs={[
          { name: dict.ui.home, href: href(lang, "home") },
          { name: dict.nav.gallery, href: href(lang, "gallery") },
          { name: title, href: href(lang, "gallery", slug) },
        ]}
      >
        <p className="mt-6 font-display text-lg font-semibold tracking-wide text-white uppercase">
          <span className="text-brand-red">■</span> {photosLabel(lang, n)}
        </p>
      </PageHeader>

      <section className="py-10 lg:py-14">
        <div className="container-site">
          <AlbumViewer
            photos={album.images.map((p, i) => ({
              ...p,
              alt: `${title} – ${fill(dict.ui.photoOf, { i: i + 1, n })}`,
            }))}
            labels={{
              open: dict.ui.openPhoto,
              close: dict.ui.close,
              prev: dict.ui.prev,
              next: dict.ui.next,
              counter: dict.ui.photoOf,
            }}
          />

          <nav className="mt-12 grid gap-3 border-t border-steel-200 pt-8 sm:grid-cols-3 sm:items-center">
            <Link href={href(lang, "gallery", prev.slug)} className="group flex items-center gap-3 text-navy-900">
              <ChevronLeftIcon className="h-6 w-6 shrink-0 text-brand-red transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block text-sm text-steel-500">{dict.ui.prevAlbum}</span>
                <span className="block font-display text-lg font-semibold uppercase">{albumTitle(prev, lang)}</span>
              </span>
            </Link>
            <Link
              href={href(lang, "gallery")}
              className="order-last justify-self-center font-display text-lg font-semibold text-navy-900 uppercase underline decoration-brand-red decoration-2 underline-offset-4 sm:order-none"
            >
              {dict.ui.backToGallery}
            </Link>
            <Link href={href(lang, "gallery", next.slug)} className="group flex items-center justify-end gap-3 text-right text-navy-900">
              <span>
                <span className="block text-sm text-steel-500">{dict.ui.nextAlbum}</span>
                <span className="block font-display text-lg font-semibold uppercase">{albumTitle(next, lang)}</span>
              </span>
              <ChevronRightIcon className="h-6 w-6 shrink-0 text-brand-red transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>
        </div>
      </section>

      <CtaBand lang={lang} dict={dict} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: title,
          url: `${site.url}${href(lang, "gallery", slug)}`,
          inLanguage: lang,
          publisher: { "@id": `${site.url}/#organization` },
          image: album.images.map((p) => `${site.url}${p.src}`),
        }}
      />
    </>
  );
}
