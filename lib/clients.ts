// Client list from the previous site. Links were checked in 09.2026 – dead or
// wrongly redirecting domains (dhlgf.pl, zteradom.pl, baltship.dk) are shown without a link.
export const clients: { name: string; url?: string }[] = [
  { name: "BEST LOGISTICS", url: "https://best-logistics.com/" },
  { name: "JG-MARINE", url: "https://www.jg-marine.com/" },
  { name: "Ro-Ro-Service Berlin GmbH" },
  { name: "HAEGER & SCHMIDT INTERNATIONAL", url: "https://haegerundschmidt.com/" },
  { name: "HEAVY CARGO + SERVICE", url: "http://www.hcs-log.com/" },
  { name: "DHL Global Forwarding Sp. z o.o." },
  { name: "RENTRANS CARGO Sp. z o.o.", url: "https://rentrans.com.pl/" },
  { name: "ZTE RADOM sp. z o.o." },
  { name: "AARSLEFF Polska", url: "https://aarsleff.pl/" },
  { name: "BALTSHIP" },
  { name: "FAMAK S.A.", url: "https://www.famak.pl/" },
  { name: "FAST LINES", url: "https://www.fast-lines.com/" },
  { name: "Morska Agencja Gdynia Sp. z o.o.", url: "https://www.mag.pl/" },
  { name: "MAKRUM Grupa Kapitałowa", url: "https://makrum.pl/" },
  { name: "MARINE CRANE AB POLAND", url: "https://marinegroup.se/" },
  { name: "TREND PROJEKT Sp. z o.o." },
  { name: "Deutsche Bahn (DB)", url: "https://int.bahn.de/pl" },
];

/** Classes stretching the last tile so a 2/4-column grid never ends with an empty gap. */
export function lastTileSpan(count: number, { sm = 2 }: { sm?: 1 | 2 } = {}): string {
  const two = count % 2 === 1 ? (sm === 2 ? "col-span-2" : "sm:col-span-2") : "";
  const four = { 0: "", 1: "lg:col-span-4", 2: "lg:col-span-3", 3: "lg:col-span-2" }[count % 4 as 0 | 1 | 2 | 3];
  return `${two} ${four}`.trim();
}
