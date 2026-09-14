import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/GalleryBrowser";
import { PageHeader } from "@/components/PageHeader";
import { albumTitle, albums, totalPhotos } from "@/lib/gallery";
import { fill, getDictionary, pageMetadata, photosLabel } from "@/lib/i18n";
import { href, type Locale } from "@/lib/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "gallery", meta.gallery);
}

export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);

  const items = albums.map((a) => {
    const title = albumTitle(a, lang);
    return {
      slug: a.slug,
      title,
      search: `${title} ${a.title} ${a.slug}`,
      href: href(lang, "gallery", a.slug),
      cover: (a.images[a.cover] ?? a.images[0]).src,
      count: photosLabel(lang, a.images.length),
    };
  });

  return (
    <>
      <PageHeader
        title={dict.gallery.title}
        lead={dict.gallery.lead}
        breadcrumbsLabel={dict.ui.breadcrumbs}
        crumbs={[
          { name: dict.ui.home, href: href(lang, "home") },
          { name: dict.nav.gallery, href: href(lang, "gallery") },
        ]}
      >
        <p className="mt-6 font-display text-lg font-semibold tracking-wide text-white uppercase">
          <span className="text-brand-red">■</span> {fill(dict.gallery.count, { albums: albums.length, photos: totalPhotos })}
        </p>
      </PageHeader>

      <section className="py-12 lg:py-16">
        <div className="container-site">
          <GalleryBrowser items={items} labels={{ search: dict.ui.search, noResults: dict.ui.noResults }} />
        </div>
      </section>
    </>
  );
}
