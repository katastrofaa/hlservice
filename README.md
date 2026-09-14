# Heavy Lift Service – hlservice.pl

Nowa strona firmowa Heavy Lift Service Sp. z o.o. (Next.js 16, App Router, Tailwind CSS 4).
Wszystkie strony są generowane statycznie (SSG) w trzech językach: PL, EN, DE.

## Uruchomienie

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Struktura

| Ścieżka | Zawartość |
| --- | --- |
| `content/pl.ts`, `en.ts`, `de.ts` | Wszystkie teksty strony (PL = źródło, EN/DE muszą mieć ten sam kształt) |
| `lib/site.ts` | Dane firmy: adres, telefony, NIP, BDO, e-mail, Facebook |
| `lib/clients.ts` | Lista firm na podstronie Rekomendacje |
| `lib/gallery-data.json` | 90 albumów / 862 zdjęcia przeniesione ze starej strony |
| `lib/gallery.ts` | Tłumaczenia nazw albumów, albumy wyróżnione na stronie głównej |
| `lib/routes.ts` | Lokalizowane adresy URL (np. `/o-firmie/`, `/en/about/`, `/de/unternehmen/`) |
| `public/gallery/<album>/` | Zdjęcia galerii (WebP, max 1920 px) |

Wewnętrznie strony leżą w `app/[lang]/<klucz>`, a publiczne, przetłumaczone adresy są mapowane
w `next.config.ts` (rewrites). Polskie adresy są identyczne jak na starej stronie WordPress,
a stare adresy galerii (`/galeria/nggallery/album/...`) przekierowują 308 na nowe.

## Dodanie albumu do galerii

1. Wrzuć zdjęcia (WebP/JPG) do `public/gallery/<slug>/`.
2. Dopisz album do `lib/gallery-data.json` (`slug`, `title`, `cover`, `images[]` z wymiarami).
3. Opcjonalnie dodaj tłumaczenie tytułu w `lib/gallery.ts`.

## SEO

- `generateMetadata` na każdej stronie: title, description, canonical, hreflang (pl/en/de/x-default), Open Graph
- `app/sitemap.ts` (z alternatywami językowymi), `app/robots.ts`
- JSON-LD: `LocalBusiness` (layout), `BreadcrumbList`, `Service`, `ImageGallery`
