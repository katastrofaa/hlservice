import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer, MobileContactBar } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n";
import { href, isLocale, locales } from "@/lib/routes";
import { site } from "@/lib/site";
import "../globals.css";

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#102840",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.siteTitle, template: `%s | ${site.name}` },
    description: dict.meta.home.description,
    applicationName: site.name,
    formatDetection: { telephone: false },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <Header
          lang={lang}
          labels={{
            nav: dict.nav,
            skip: dict.ui.skip,
            menu: dict.ui.menu,
            close: dict.ui.close,
            call: dict.ui.call,
            language: dict.ui.language,
            home: dict.ui.home,
            mainNav: dict.ui.mainNav,
            langNames: { pl: getDictionary("pl").langName, en: getDictionary("en").langName, de: getDictionary("de").langName },
          }}
        />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <MobileContactBar dict={dict} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${site.url}/#organization`,
            name: site.name,
            legalName: site.legalName,
            url: `${site.url}${href(lang, "home")}`,
            logo: `${site.url}/icon.svg`,
            image: `${site.url}/images/team-port.webp`,
            description: dict.meta.home.description,
            email: site.email,
            telephone: site.phones.map((p) => p.tel),
            faxNumber: site.fax,
            taxID: site.nip,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.streetEn,
              postalCode: site.postalCode,
              addressLocality: site.city,
              addressCountry: site.country,
            },
            areaServed: ["PL", "EU"],
            sameAs: [site.facebook],
            knowsAbout: [
              "Heavy lift",
              "Oversized cargo handling",
              "Cargo lashing",
              "Skidding",
              "Power hydraulics",
            ],
          }}
        />
      </body>
    </html>
  );
}
