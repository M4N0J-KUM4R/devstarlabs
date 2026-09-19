/* ================================================================== */
/* Card data — one entry per card face.                                */
/*                                                                     */
/* HOW TO CREATE A NEW CARD                                            */
/*   1. Photo: drop an image into /public/cards/ (jpg/png, roughly     */
/*      square or portrait — any size, it gets cover-cropped into      */
/*      the media window; a .mp4 poster works too), then set `media`   */
/*      to its path, e.g. "/cards/my-photo.jpg".                       */
/*   2. Text: set name / role / location, and optionally `description` */
/*      (a short bio rendered as a grey caption under the photo —      */
/*      about 4–6 words per line, ~120 characters fits cleanly).       */
/*   3. Optional: `supportLabel` (pill text, default "Contact Me", null
 *      to hide), `coinSymbol` (default "@"), `accent` (coin colour),
 *      `badge` ({ small, big } text for the bottom-left showcase badge,
 *      default { small: "View", big: "Portfolio" }, null to hide).   */
/* The card re-renders at /cards — click it there to export a PNG.     */
/* ================================================================== */

import type { CardData } from "@/components/webgl/cardTemplate";

export type CardEntry = CardData & { slug: string };

export const CARDS: CardEntry[] = [
  {
    slug: "cassandra-zampini",
    name: "Cassandra Zampini",
    role: "Artist",
    location: "US, New York",
    description:
      "Visual artist working across photography and moving image, examining how images circulate through media and memory.",
    media: "/cards/portrait-cassandra.jpg",
  },
  {
    slug: "maria-isserlis",
    name: "Maria Isserlis",
    role: "Curator",
    location: "DE, Berlin",
    description:
      "Independent curator organising exhibitions and public programmes between Berlin and Paris.",
    media: "/cards/portrait-maria.jpg",
  },
  {
    slug: "georgina-koutifari-magklara",
    name: "Georgina Koutifari-Magklara",
    role: "Curator",
    location: "DE, Berlin",
    description:
      "Curator and researcher focused on documentary practices and collective memory in southern Europe.",
    media: "/cards/portrait-georgina.jpg",
  },
  {
    slug: "robert-banat",
    name: "Robert Banat",
    role: "Artist",
    location: "US, Brooklyn",
    description:
      "Photographer shooting portraits and street work on film, with a darkroom practice decades deep.",
    media: "/cards/portrait-robert-banat.jpg",
  },
  {
    slug: "gelly-gryntaki",
    name: "Gelly Gryntaki",
    role: "Curator",
    location: "GB, London",
    description:
      "Curator building cross-disciplinary exhibitions that pair emerging artists with public collections.",
    media: "/cards/portrait-gelly-gryntaki.jpg",
  },
  {
    slug: "venus-nwaokoro",
    name: "Venus Nwaokoro",
    role: "Artist",
    location: "CA, Ajax",
    description:
      "Multidisciplinary artist working in painting and installation around community and identity.",
    media: "/cards/portrait-venus-nwaokoro.jpg",
  },
  {
    slug: "mantas-valentukonis",
    name: "Mantas Valentukonis",
    role: "Artist",
    location: "LT, Kaunas",
    description:
      "Artist documenting post-industrial landscapes through photography and print.",
    media: "/cards/portrait-mantas-valentukonis.jpg",
  },
  {
    slug: "leigh-witherell",
    name: "Leigh Witherell",
    role: "Artist",
    location: "US, Philadelphia",
    description:
      "Painter working in oil, focused on colour studies of everyday interiors.",
    media: "/cards/portrait-leigh-witherell.jpg",
  },
  {
    slug: "burning-house-collective",
    name: "Burning House Collective",
    role: "Curator",
    location: "EE",
    description:
      "Artist-run collective staging exhibitions in found spaces across the Baltics.",
    media: "/cards/portrait-burning-house.jpg",
  },
  {
    slug: "manoj-kumar-t",
    name: "Manoj Kumar T",
    role: "Cloud Architect",
    location: "IN, Chennai",
    description:
      "Cloud architect designing resilient infrastructure on AWS, and training engineers through hands-on certification programmes.",
    media: "/cards/manoj.png",
    mediaFocus: "top", // tall portrait — keep the head in frame
  },
];
