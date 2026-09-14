import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { AlbumCard, CtaBand } from "@/components/ui";
import { albums } from "@/lib/gallery";
import { getDictionary, pageMetadata } from "@/lib/i18n";
import { href, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";
import servicesImage from "@/public/images/services.webp";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "services", meta.services);
}

const showcase = ["reaktor-230t", "ponton-na-statek", "most-torun"];

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.services;

  return (
    <>
      <PageHeader
        title={t.title}
        breadcrumbsLabel={dict.ui.breadcrumbs}
        crumbs={[
          { name: dict.ui.home, href: href(lang, "home") },
          { name: dict.nav.services, href: href(lang, "services") },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-xl leading-relaxed text-navy-900 sm:text-2xl sm:leading-relaxed">{t.lead}</p>
            <div className="prose-site mt-8">
              {t.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p>
                {t.galleryNoteBefore}
                <Link href={href(lang, "gallery")}>{t.galleryNoteLink}</Link>
                {t.galleryNoteAfter}
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -right-3 -bottom-3 h-20 w-20 border-r-4 border-b-4 border-brand-red" aria-hidden />
              <Image
                src={servicesImage}
                alt={t.imageAlt}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="relative aspect-[3/2] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-steel-50 py-16 lg:py-24">
        <div className="container-site">
          <h2 className="heading text-4xl text-navy-900 sm:text-5xl">{t.cardsHeading}</h2>
          <ul className="mt-12 grid gap-px bg-steel-200 sm:grid-cols-2 lg:grid-cols-3">
            {t.cards.map((card, i) => (
              <li key={card.title} className="bg-white p-7 sm:p-8">
                <span className="font-display text-sm font-semibold tracking-[0.14em] text-brand-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="heading mt-3 text-2xl text-navy-900 sm:text-[1.75rem]">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-steel-700">{card.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="heading text-4xl text-navy-900 sm:text-5xl">{dict.home.projectsHeading}</h2>
            <Link
              href={href(lang, "gallery")}
              className="inline-flex items-center gap-2 font-display text-lg font-semibold text-navy-900 uppercase hover:text-brand-red"
            >
              {dict.ui.allProjects}
              <ArrowRightIcon className="h-5 w-5 text-brand-red" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3">
            {showcase.map((slug) => {
              const album = albums.find((a) => a.slug === slug)!;
              return (
                <AlbumCard
                  key={slug}
                  album={album}
                  lang={lang}
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 50vw"
                />
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} dict={dict} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": t.cards.map((card) => ({
            "@type": "Service",
            name: card.title,
            description: card.text,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: ["PL", "EU"],
          })),
        }}
      />
    </>
  );
}
