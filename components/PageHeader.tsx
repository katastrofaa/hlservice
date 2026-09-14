import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { JsonLd } from "./JsonLd";

type Crumb = { name: string; href: string };

export function PageHeader({
  title,
  lead,
  crumbs,
  breadcrumbsLabel,
  children,
}: {
  title: string;
  lead?: string;
  crumbs: Crumb[];
  breadcrumbsLabel: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-blueprint relative overflow-hidden text-white">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-brand-red" aria-hidden />
      <div className="container-site py-12 sm:py-16 lg:py-20">
        <nav aria-label={breadcrumbsLabel}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-navy-200">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-navy-400">/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="heading mt-5 max-w-4xl text-[2.75rem] sm:text-6xl lg:text-7xl">{title}</h1>
        {lead && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-navy-100 sm:text-xl">{lead}</p>}
        {children}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${site.url}${c.href}`,
          })),
        }}
      />
    </section>
  );
}
