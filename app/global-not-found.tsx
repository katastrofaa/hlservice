import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import de from "@/content/de";
import en from "@/content/en";
import pl from "@/content/pl";
import { href } from "@/lib/routes";
import { site } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-barlow" });
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "404 – Heavy Lift Service",
  robots: { index: false },
};

export default function GlobalNotFound() {
  const versions = [
    { lang: "pl", dict: pl },
    { lang: "en", dict: en },
    { lang: "de", dict: de },
  ] as const;

  return (
    <html lang="pl" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="bg-blueprint flex min-h-dvh flex-col text-white antialiased">
        <div className="container-site flex h-20 items-center">
          <Link href="/">
            <Logo tone="light" />
          </Link>
        </div>
        <main className="container-site flex flex-1 flex-col justify-center py-16">
          <p className="font-display text-[7rem] leading-none font-bold text-brand-red sm:text-[10rem]">404</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {versions.map(({ lang, dict }) => (
              <div key={lang} lang={lang} className="border-t border-white/15 pt-6">
                <h1 className="heading text-3xl">{dict.notFound.title}</h1>
                <p className="mt-3 text-navy-100">{dict.notFound.text}</p>
                <Link
                  href={href(lang, "home")}
                  className="mt-5 inline-flex min-h-12 items-center bg-brand-red px-5 font-display text-lg font-semibold tracking-wide uppercase hover:bg-brand-red-dark"
                >
                  {dict.ui.home}
                </Link>
              </div>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
