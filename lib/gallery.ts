import data from "./gallery-data.json";
import type { Locale } from "./routes";

export type Photo = { src: string; w: number; h: number };
export type Album = { slug: string; title: string; cover: number; images: Photo[] };

export const albums = data as Album[];

export const totalPhotos = albums.reduce((sum, a) => sum + a.images.length, 0);

export const getAlbum = (slug: string) => albums.find((a) => a.slug === slug);

/** Albums highlighted on the home page. */
export const featuredSlugs = [
  "reaktor-350t",
  "plock-trafo-235t",
  "flintermaas",
  "makrum",
  "eendracht",
  "glogow",
  "trans-baltic",
  "ostroleka-235-ton",
];

// Original album names are Polish; descriptive ones get translated, place and company names stay.
const titles: Record<string, { pl?: string; en: string; de: string }> = {
  "wysuw-mragowo": { en: "Skidding – Mrągowo", de: "Verschub – Mrągowo" },
  "plock-trafo-235t": { en: "Płock – transformer 235 t", de: "Płock – Trafo 235 t" },
  szwecja: { en: "Sweden", de: "Schweden" },
  balkony: { en: "Balconies", de: "Balkone" },
  "trans-baltic-zima": { en: "Trans Baltic – winter", de: "Trans Baltic – Winter" },
  "mocowanie-gdynia": { en: "Cargo lashing – Gdynia", de: "Ladungssicherung – Gdynia" },
  stocznia: { en: "Shipyard", de: "Werft" },
  karuzela: { en: "Carousel", de: "Karussell" },
  "konstrukcje-euro-terminal": { en: "Euro Terminal steel structures", de: "Stahlkonstruktionen – Euro Terminal" },
  "obracanie-zbiornika": { en: "Tank rotation", de: "Drehen eines Behälters" },
  "zatapianie-glowki-240t": { en: "Sinking a 240 t pier head", de: "Absenken eines Molenkopfs 240 t" },
  "zrzuty-police": { en: "Offloading – Police", de: "Abladen – Police" },
  "jarbo-szwecja": { en: "Jarbo – Sweden", de: "Jarbo – Schweden" },
  "swiebodzice-235t": { en: "Świebodzice 235 t", de: "Świebodzice 235 t" },
  kadlub: { en: "Ship hull", de: "Schiffsrumpf" },
  "most-warszawa": { en: "Bridge – Warsaw", de: "Brücke – Warschau" },
  filtry: { en: "Filters", de: "Filter" },
  "karuleza-230t": { pl: "Karuzela 230T", en: "Carousel 230 t", de: "Karussell 230 t" },
  "reaktor-350t": { en: "Reactor 350 t", de: "Reaktor 350 t" },
  "gdynia-stocznia": { en: "Gdynia shipyard", de: "Werft Gdynia" },
  "belchatow-186t": { en: "Bełchatów 186 t", de: "Bełchatów 186 t" },
  "swiebodzice-206t": { en: "Świebodzice 206 t", de: "Świebodzice 206 t" },
  "reaktor-230t": { en: "Reactor 230 t", de: "Reaktor 230 t" },
  "zbiorniki-aluminiowe": { en: "Aluminium tanks", de: "Aluminiumbehälter" },
  barki: { en: "Barges", de: "Schuten" },
  "generator-man-a": { en: "MAN generator", de: "MAN-Generator" },
  "zrzuty-police-2": { en: "Offloading – Police 2", de: "Abladen – Police 2" },
  "stocznia-gdansk": { en: "Gdańsk shipyard", de: "Werft Gdańsk" },
  "trafo-szczecin": { en: "Transformer – Szczecin", de: "Trafo – Stettin" },
  cumowanie: { en: "Mooring", de: "Festmachen" },
  "most-torun": { en: "Bridge – Toruń", de: "Brücke – Toruń" },
  trafo: { en: "Transformer", de: "Trafo" },
  "zrzuty-3": { en: "Offloading 3", de: "Abladen 3" },
  "zbiorniki-stocznia": { en: "Shipyard tanks", de: "Behälter – Werft" },
  "zrzuty-duze": { en: "Large offloading", de: "Großes Abladen" },
  blachy: { en: "Steel plates", de: "Stahlbleche" },
  wanna: { en: "Tub", de: "Wanne" },
  "most-norwegia": { en: "Bridge – Norway", de: "Brücke – Norwegen" },
  "ponton-na-statek": { en: "Pontoon onto a ship", de: "Ponton auf ein Schiff" },
  wciagarki: { en: "Winches", de: "Winden" },
  wodowanie: { en: "Launching", de: "Stapellauf" },
  "ostroleka-180-ton": { en: "Ostrołęka 180 t", de: "Ostrołęka 180 t" },
  "ostroleka-235-ton": { en: "Ostrołęka 235 t", de: "Ostrołęka 235 t" },
};

export function albumTitle(album: Album, lang: Locale): string {
  const t = titles[album.slug];
  if (!t) return album.title;
  return lang === "pl" ? (t.pl ?? album.title) : t[lang];
}
