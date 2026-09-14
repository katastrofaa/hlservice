import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClockIcon, GearIcon, HelmetIcon, HydraulicIcon, ShieldIcon, ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { AlbumCard, ButtonLink, CtaBand, SectionHeading } from "@/components/ui";
import { clients } from "@/lib/clients";
import { albums, featuredSlugs } from "@/lib/gallery";
import { getDictionary, pageMetadata } from "@/lib/i18n";
import { href, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";
import teamPort from "@/public/images/team-port.webp";
import banner from "@/public/images/home-banner.webp";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "home", meta.home);
}

const featureIcons = [ClockIcon, HelmetIcon, HydraulicIcon, GearIcon];

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.home;
  const featured = featuredSlugs.map((slug) => albums.find((a) => a.slug === slug)!).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="bg-blueprint relative overflow-hidden text-white">
        <div className="container-site grid items-center gap-10 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-28">
          <div className="lg:col-span-6">
            <p className="eyebrow text-navy-200">{t.eyebrow}</p>
            <h1 className="heading mt-5 text-[2.9rem] sm:text-6xl xl:text-7xl">
              <span className="block text-brand-red">{t.brand}</span>
              <span className="mt-2 block">{t.title}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">{t.lead}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${site.phones[1].tel}`}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 bg-brand-red px-6 py-3 font-display text-lg font-semibold tracking-wide text-white uppercase transition-colors hover:bg-brand-red-dark"
              >
                <PhoneIcon className="h-5 w-5" />
                {site.phones[1].display}
              </a>
              <ButtonLink href={href(lang, "gallery")} variant="outlineLight">
                {dict.ui.seeGallery}
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <div className="absolute -top-3 -right-3 h-24 w-24 border-t-4 border-r-4 border-brand-red sm:-top-4 sm:-right-4" aria-hidden />
            <div className="absolute -bottom-3 -left-3 h-24 w-24 border-b-4 border-l-4 border-white/30 sm:-bottom-4 sm:-left-4" aria-hidden />
            <Image
              src={teamPort}
              alt={dict.about.imageAlt}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              preload
              quality={85}
              className="relative aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Key figures */}
      <section className="relative z-10 -mt-8 lg:-mt-14">
        <div className="container-site">
          <dl className="grid grid-cols-2 bg-white shadow-[0_20px_60px_-20px_rgb(16_40_64/0.35)] lg:grid-cols-4">
            {t.stats.map((s, i) => (
              <div
                key={s.label}
                className={`border-steel-200 p-5 sm:p-7 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-4xl leading-none font-bold text-navy-900 sm:text-5xl">
                    {s.value}
                    <span className="ml-1 text-2xl text-brand-red sm:text-3xl">{s.unit}</span>
                  </span>
                  <span aria-hidden className="mt-2 block text-sm leading-snug text-steel-500 sm:text-[0.95rem]">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Intro – original home page text */}
      <section className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={t.introSub} title={t.introHeading} />
            <div className="prose-site mt-8">
              {t.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ButtonLink href={href(lang, "about")} variant="outlineDark" className="mt-9">
              {dict.ui.readMore}
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Image
              src={banner}
              alt={t.introSub}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[678/209] w-full object-cover"
            />
            <div className="border-l-4 border-brand-red bg-navy-900 p-7 text-white sm:p-8">
              <ShieldIcon className="h-9 w-9 text-brand-red" />
              <h3 className="heading mt-4 text-3xl">{t.insuranceHeading}</h3>
              <p className="mt-3 leading-relaxed text-navy-100">{t.insurance}</p>
            </div>
            <div className="border border-steel-200 p-7 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-navy-900 uppercase">{t.featuresHeading}</h3>
              <ul className="mt-5 space-y-4">
                {t.features.map((f, i) => {
                  const Icon = featureIcons[i];
                  return (
                    <li key={f} className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center bg-steel-100 text-navy-900">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="pt-2 leading-snug font-medium text-navy-900">{f}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specialisation */}
      <section className="bg-steel-50 py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesHeading} />
            <ButtonLink href={href(lang, "services")} variant="dark" className="self-start md:self-auto">
              {dict.ui.ourServices}
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
          <ol className="mt-12 grid gap-px bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
            {dict.about.spec.map((item, i) => (
              <li key={item} className="flex gap-5 bg-white p-5 sm:block sm:p-8">
                <span className="font-display text-4xl leading-none font-bold text-brand-red sm:text-5xl">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-lg leading-snug font-medium text-navy-900 first-letter:uppercase sm:mt-5">
                  {item.replace(/[.,]+$/, "")}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeading eyebrow={t.projectsEyebrow} title={t.projectsHeading} className="lg:col-span-6" />
            <p className="max-w-xl text-lg leading-relaxed text-steel-700 lg:col-span-6 lg:justify-self-end">{t.projectsText}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-12 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4">
            {featured.map((album) => (
              <AlbumCard
                key={album.slug}
                album={album}
                lang={lang}
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, 50vw"
              />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <ButtonLink href={href(lang, "gallery")} variant="primary">
              {dict.ui.allProjects} ({albums.length})
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="border-t border-steel-200 bg-steel-50 py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading eyebrow={t.referencesEyebrow} title={t.referencesHeading} />
          <ul className="mt-10 grid grid-cols-2 gap-px bg-steel-200 sm:mt-12 lg:grid-cols-4">
            {clients.map((c) => (
              <li key={c.name} className="flex min-h-16 items-center bg-white px-3 py-3 font-display text-[0.95rem] leading-tight sm:min-h-20 sm:px-5 sm:py-4 sm:text-lg font-semibold text-navy-800">
                {c.name}
              </li>
            ))}
          </ul>
          <Link
            href={href(lang, "references")}
            className="mt-8 inline-flex items-center gap-2 font-display text-lg font-semibold text-navy-900 uppercase hover:text-brand-red"
          >
            {dict.nav.references}
            <ArrowRightIcon className="h-5 w-5 text-brand-red" />
          </Link>
        </div>
      </section>

      <CtaBand lang={lang} dict={dict} />
    </>
  );
}
