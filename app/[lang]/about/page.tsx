import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRightIcon, ClockIcon, GearIcon, HelmetIcon, HydraulicIcon, ShieldIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink, CtaBand } from "@/components/ui";
import { getDictionary, pageMetadata } from "@/lib/i18n";
import { href, type Locale } from "@/lib/routes";
import aboutImage from "@/public/images/about.webp";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "about", meta.about);
}

const featureIcons = [ClockIcon, HelmetIcon, HydraulicIcon, GearIcon];

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.about;

  return (
    <>
      <PageHeader
        title={t.title}
        lead={t.lead}
        breadcrumbsLabel={dict.ui.breadcrumbs}
        crumbs={[
          { name: dict.ui.home, href: href(lang, "home") },
          { name: dict.nav.about, href: href(lang, "about") },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -top-3 -left-3 h-20 w-20 border-t-4 border-l-4 border-brand-red" aria-hidden />
              <Image
                src={aboutImage}
                alt={t.imageAlt}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="relative aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="prose-site">
              {t.body.map((p) => (
                <p key={p.slice(0, 24)} className="text-xl leading-relaxed text-navy-900">
                  {p}
                </p>
              ))}
            </div>
            <h2 className="heading mt-12 text-3xl text-navy-900 sm:text-4xl">{t.specHeading}</h2>
            <ul className="mt-6 divide-y divide-steel-200 border-y border-steel-200">
              {t.spec.map((item, i) => (
                <li key={item} className="flex gap-5 py-5">
                  <span className="w-9 shrink-0 font-display text-2xl leading-none font-bold text-brand-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg leading-snug text-steel-700">{item}</span>
                </li>
              ))}
            </ul>
            <ButtonLink href={href(lang, "services")} variant="dark" className="mt-10">
              {dict.ui.ourServices}
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-steel-50 py-16 lg:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="heading text-3xl text-navy-900 sm:text-4xl">{dict.home.featuresHeading}</h2>
            <div className="mt-8 border-l-4 border-brand-red bg-navy-900 p-7 text-white">
              <ShieldIcon className="h-8 w-8 text-brand-red" />
              <h3 className="heading mt-4 text-2xl">{dict.home.insuranceHeading}</h3>
              <p className="mt-3 leading-relaxed text-navy-100">{dict.home.insurance}</p>
            </div>
          </div>
          <ul className="grid gap-px self-start bg-steel-200 sm:grid-cols-2 lg:col-span-7">
            {dict.home.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <li key={f} className="bg-white p-7">
                  <Icon className="h-9 w-9 text-brand-red" />
                  <p className="mt-5 font-display text-xl leading-tight font-semibold text-navy-900 uppercase">{f}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} dict={dict} />
    </>
  );
}
