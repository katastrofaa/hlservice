import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocIcon, ExternalIcon, FacebookIcon, FaxIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHeader } from "@/components/PageHeader";
import { getDictionary, pageMetadata } from "@/lib/i18n";
import { href, type Locale } from "@/lib/routes";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "contact", meta.contact);
}

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-steel-200 py-5 last:border-b-0">
      <span className="grid h-11 w-11 shrink-0 place-items-center bg-steel-100 text-navy-900">{icon}</span>
      <div className="min-w-0">
        <dt className="text-sm text-steel-500">{label}</dt>
        <dd className="mt-0.5 text-lg font-medium text-navy-900">{children}</dd>
      </div>
    </div>
  );
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.contact;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

  return (
    <>
      <PageHeader
        title={t.title}
        lead={t.lead}
        breadcrumbsLabel={dict.ui.breadcrumbs}
        crumbs={[
          { name: dict.ui.home, href: href(lang, "home") },
          { name: dict.nav.contact, href: href(lang, "contact") },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          {/* Phones & e-mail – the primary actions */}
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
            {site.phones.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="group flex items-center gap-4 bg-navy-900 p-6 text-white transition-colors hover:bg-navy-700"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand-red">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm text-navy-200">{t.phone}</span>
                  <span className="block font-display text-2xl font-semibold tracking-wide whitespace-nowrap sm:text-[1.7rem]">
                    {p.display}
                  </span>
                </span>
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 bg-brand-red p-6 text-white transition-colors hover:bg-brand-red-dark sm:col-span-2 lg:col-span-1"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center bg-white text-brand-red">
                <MailIcon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-white/80">{t.email}</span>
                <span className="block truncate font-display text-2xl font-semibold tracking-wide sm:text-[1.7rem]">{site.email}</span>
              </span>
            </a>
          </div>

          <div className="border border-steel-200 p-6 sm:p-8 lg:col-span-5">
            <h2 className="heading text-3xl text-navy-900">{t.company}</h2>
            <p className="mt-4 font-display text-2xl font-semibold text-navy-900">{site.legalName}</p>
            <dl className="mt-4">
              <Row icon={<PinIcon className="h-5 w-5" />} label={t.address}>
                <address className="not-italic">
                  {site.street}
                  <br />
                  {site.postalCode} {site.city}
                </address>
              </Row>
              <Row icon={<PhoneIcon className="h-5 w-5" />} label={t.phone}>
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-brand-red">
                    Tel. {p.display}
                  </a>
                ))}
              </Row>
              <Row icon={<FaxIcon className="h-5 w-5" />} label={t.fax}>
                {site.fax}
              </Row>
              <Row icon={<MailIcon className="h-5 w-5" />} label={t.email}>
                <a href={`mailto:${site.email}`} className="hover:text-brand-red">
                  {site.email}
                </a>
              </Row>
              <Row icon={<DocIcon className="h-5 w-5" />} label={`${t.nip} / ${t.bdo}`}>
                {t.nip}: {site.nip}
                <br />
                {t.bdo}: {site.bdo}
              </Row>
              <Row icon={<FacebookIcon className="h-5 w-5" />} label={t.social}>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-red">
                  Facebook
                </a>
              </Row>
            </dl>
          </div>

          <div className="flex flex-col lg:col-span-7">
            <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <h2 className="heading text-3xl text-navy-900">{t.mapHeading}</h2>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-brand-red"
              >
                {t.mapOpen}
                <ExternalIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="flex-1">
              <MapEmbed
                query={site.mapsQuery}
                lang={lang}
                labels={{ load: t.mapLoad, consent: t.mapConsent, title: `${site.name} – ${site.street}, ${site.city}` }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
