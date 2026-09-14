import type { Metadata } from "next";
import { ExternalIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/ui";
import { clients, lastTileSpan } from "@/lib/clients";
import { getDictionary, pageMetadata } from "@/lib/i18n";
import { href, type Locale } from "@/lib/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/references">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "references", meta.references);
}

export default async function ReferencesPage({ params }: PageProps<"/[lang]/references">) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const t = dict.references;

  return (
    <>
      <PageHeader
        title={t.title}
        breadcrumbsLabel={dict.ui.breadcrumbs}
        crumbs={[
          { name: dict.ui.home, href: href(lang, "home") },
          { name: dict.nav.references, href: href(lang, "references") },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-site">
          <p className="max-w-4xl text-xl leading-relaxed text-navy-900 sm:text-2xl sm:leading-relaxed">{t.lead}</p>

          <h2 className="heading mt-14 text-3xl text-navy-900 sm:text-4xl">{t.listHeading}</h2>
          <ul className="mt-8 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((c, i) => {
              const inner = (
                <>
                  <span className="font-display text-sm font-semibold text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-auto flex items-end justify-between gap-3 pt-6">
                    <span className="font-display text-xl leading-tight font-semibold text-navy-900">{c.name}</span>
                    {c.url && <ExternalIcon className="h-4 w-4 shrink-0 text-steel-500 transition-colors group-hover:text-brand-red" />}
                  </span>
                </>
              );
              return (
                <li key={c.name} className={`bg-white ${i === clients.length - 1 ? lastTileSpan(clients.length, { sm: 1 }) : ""}`}>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full min-h-36 flex-col p-6 transition-colors hover:bg-steel-50"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex h-full min-h-36 flex-col p-6">{inner}</div>
                  )}
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
