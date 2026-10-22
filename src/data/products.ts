export type Lang = 'en' | 'es';
export type Localized = { en: string; es: string };

export type CollectionId =
  | 'niche-luxury'
  | 'designer'
  | 'arabian-inspired'
  | 'decants'
  | 'discovery-sets'
  | 'new-arrivals';

export type Family = 'woody' | 'floral' | 'amber' | 'fresh' | 'gourmand' | 'spicy';
export type Kind = 'fragrance' | 'set';

export interface Size {
  id: string;
  ml?: number;
  label: Localized;
  price: number;
  compareAt?: number;
}

/** Stylized glass bottle used when no product photo exists (Arabian line). */
export interface BottleArt {
  glass: string;
  liquid: string;
  cap: string;
  shape: 'square' | 'round' | 'tall';
  label: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  kind: Kind;
  image?: string;
  art?: BottleArt;
  setItems?: string[];
  collections: CollectionId[];
  family: Family;
  gender: 'women' | 'men' | 'unisex';
  concentration: string;
  fullMl: number;
  fullPrice: number;
  compareAt?: number;
  tagline: Localized;
  description: Localized;
  notes: { top: string[]; heart: string[]; base: string[] };
  accent: string;
  rating: number;
  reviews: number;
  stock: 'in' | 'low';
  isNew?: boolean;
  bestSeller?: boolean;
  approved?: boolean;
}

const img = (name: string) => `images/${name}.webp`;

export const products: Product[] = [
  {
    id: 'baccarat-rouge-540',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    kind: 'fragrance',
    image: img('baccarat-rouge-540'),
    collections: ['niche-luxury'],
    family: 'amber',
    gender: 'unisex',
    concentration: 'Eau de Parfum',
    fullMl: 70,
    fullPrice: 335,
    tagline: { en: 'Liquid crystal, set ablaze.', es: 'Cristal líquido en llamas.' },
    description: {
      en: 'A luminous, airy amber that leaves a glowing trail. Saffron and jasmine float over ambergris and freshly cut cedar — the most requested scent in the Syndicate.',
      es: 'Un ámbar luminoso y etéreo que deja una estela radiante. Azafrán y jazmín flotan sobre ámbar gris y cedro recién cortado: el aroma más pedido del Syndicate.',
    },
    notes: { top: ['Saffron', 'Jasmine'], heart: ['Amberwood', 'Ambergris'], base: ['Fir Resin', 'Cedar'] },
    accent: '#b5402f',
    rating: 4.9,
    reviews: 412,
    stock: 'low',
    bestSeller: true,
    approved: true,
  },
  {
    id: 'creed-aventus',
    name: 'Aventus',
    brand: 'Creed',
    kind: 'fragrance',
    image: img('creed-aventus'),
    collections: ['niche-luxury'],
    family: 'woody',
    gender: 'men',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 445,
    tagline: { en: 'The crown of modern niche.', es: 'La corona del nicho moderno.' },
    description: {
      en: 'Smoky pineapple and black currant over birch and oakmoss. Confident, fruity, unforgettable — a legend for a reason.',
      es: 'Piña ahumada y grosella negra sobre abedul y musgo de roble. Seguro, frutal e inolvidable: una leyenda con razón.',
    },
    notes: { top: ['Pineapple', 'Bergamot', 'Black Currant'], heart: ['Birch', 'Patchouli', 'Jasmine'], base: ['Musk', 'Oakmoss', 'Ambergris'] },
    accent: '#9aa0a6',
    rating: 4.8,
    reviews: 356,
    stock: 'in',
    bestSeller: true,
    approved: true,
  },
  {
    id: 'black-orchid',
    name: 'Black Orchid',
    brand: 'Tom Ford',
    kind: 'fragrance',
    image: img('black-orchid'),
    collections: ['niche-luxury'],
    family: 'spicy',
    gender: 'unisex',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 185,
    tagline: { en: 'Velvet darkness, bottled.', es: 'Oscuridad de terciopelo, embotellada.' },
    description: {
      en: 'Black truffle, dark chocolate and incense wrapped around a rare orchid. Opulent, sensual and made for the night.',
      es: 'Trufa negra, chocolate oscuro e incienso envolviendo una orquídea rara. Opulento, sensual y hecho para la noche.',
    },
    notes: { top: ['Black Truffle', 'Bergamot', 'Ylang-Ylang'], heart: ['Black Orchid', 'Lotus', 'Spices'], base: ['Patchouli', 'Incense', 'Dark Chocolate'] },
    accent: '#c9a25a',
    rating: 4.7,
    reviews: 228,
    stock: 'in',
    approved: true,
  },
  {
    id: 'dior-sauvage',
    name: 'Sauvage',
    brand: 'Dior',
    kind: 'fragrance',
    image: img('dior-sauvage'),
    collections: ['designer'],
    family: 'fresh',
    gender: 'men',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 135,
    tagline: { en: 'Raw, magnetic, desert-born.', es: 'Crudo, magnético, nacido del desierto.' },
    description: {
      en: 'Calabrian bergamot meets Sichuan pepper and smooth vanilla. Fresh enough for day, magnetic enough for night.',
      es: 'Bergamota de Calabria con pimienta de Sichuan y vainilla suave. Fresco para el día, magnético para la noche.',
    },
    notes: { top: ['Bergamot', 'Pepper'], heart: ['Lavender', 'Star Anise', 'Nutmeg'], base: ['Ambroxan', 'Vanilla'] },
    accent: '#2c4a7a',
    rating: 4.8,
    reviews: 589,
    stock: 'in',
    bestSeller: true,
  },
  {
    id: 'chanel-no5',
    name: 'N°5',
    brand: 'Chanel',
    kind: 'fragrance',
    image: img('chanel-no5'),
    collections: ['designer'],
    family: 'floral',
    gender: 'women',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 168,
    tagline: { en: 'The icon, still undefeated.', es: 'El ícono, aún invicto.' },
    description: {
      en: 'An abstract bouquet of May rose and jasmine lifted by sparkling aldehydes. Timeless elegance in a single spray.',
      es: 'Un bouquet abstracto de rosa de mayo y jazmín elevado por aldehídos brillantes. Elegancia eterna en un solo spray.',
    },
    notes: { top: ['Aldehydes', 'Neroli', 'Ylang-Ylang'], heart: ['May Rose', 'Jasmine', 'Iris'], base: ['Sandalwood', 'Vanilla', 'Vetiver'] },
    accent: '#d9a55b',
    rating: 4.7,
    reviews: 301,
    stock: 'in',
    approved: true,
  },
  {
    id: 'black-opium',
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    kind: 'fragrance',
    image: img('black-opium'),
    collections: ['designer'],
    family: 'gourmand',
    gender: 'women',
    concentration: 'Eau de Parfum',
    fullMl: 90,
    fullPrice: 145,
    tagline: { en: 'Coffee, vanilla, adrenaline.', es: 'Café, vainilla, adrenalina.' },
    description: {
      en: 'Black coffee and white flowers over a rush of vanilla. Addictive, rock-and-roll and impossible to ignore.',
      es: 'Café negro y flores blancas sobre una oleada de vainilla. Adictivo, rockero e imposible de ignorar.',
    },
    notes: { top: ['Pink Pepper', 'Pear', 'Orange Blossom'], heart: ['Coffee', 'Jasmine'], base: ['Vanilla', 'Patchouli', 'Cedar'] },
    accent: '#d97a8f',
    rating: 4.8,
    reviews: 447,
    stock: 'in',
    bestSeller: true,
  },
  {
    id: 'good-girl',
    name: 'Good Girl',
    brand: 'Carolina Herrera',
    kind: 'fragrance',
    image: img('good-girl'),
    collections: ['designer', 'new-arrivals'],
    family: 'amber',
    gender: 'women',
    concentration: 'Eau de Parfum',
    fullMl: 80,
    fullPrice: 142,
    tagline: { en: "It's so good to be bad.", es: 'Qué bien se siente ser mala.' },
    description: {
      en: 'Tuberose and jasmine sambac meet roasted tonka and cocoa. Light and dark, all in one stiletto.',
      es: 'Nardo y jazmín sambac con haba tonka tostada y cacao. Luz y oscuridad en un solo tacón.',
    },
    notes: { top: ['Almond', 'Coffee'], heart: ['Tuberose', 'Jasmine Sambac'], base: ['Tonka Bean', 'Cocoa'] },
    accent: '#24356b',
    rating: 4.7,
    reviews: 264,
    stock: 'in',
    isNew: true,
  },
  {
    id: 'flowerbomb',
    name: 'Flowerbomb',
    brand: 'Viktor&Rolf',
    kind: 'fragrance',
    image: img('flowerbomb'),
    collections: ['designer', 'new-arrivals'],
    family: 'floral',
    gender: 'women',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 185,
    tagline: { en: 'A floral explosion.', es: 'Una explosión floral.' },
    description: {
      en: 'Orchid, jasmine and rose detonated over sweet patchouli. Romantic, bold, and joyfully excessive.',
      es: 'Orquídea, jazmín y rosa detonados sobre pachulí dulce. Romántico, audaz y alegremente excesivo.',
    },
    notes: { top: ['Bergamot', 'Tea'], heart: ['Orchid', 'Jasmine', 'Rose'], base: ['Patchouli', 'Musk'] },
    accent: '#e6a3a8',
    rating: 4.6,
    reviews: 198,
    stock: 'in',
    isNew: true,
  },
  {
    id: 'miss-dior',
    name: 'Miss Dior',
    brand: 'Dior',
    kind: 'fragrance',
    image: img('miss-dior'),
    collections: ['designer', 'new-arrivals'],
    family: 'floral',
    gender: 'women',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 155,
    tagline: { en: 'A love letter in pink.', es: 'Una carta de amor en rosa.' },
    description: {
      en: 'Grasse rose and lily of the valley over soft musks and woods. Fresh, tender and endlessly wearable.',
      es: 'Rosa de Grasse y lirio de los valles sobre almizcles y maderas suaves. Fresco, tierno y versátil.',
    },
    notes: { top: ['Mandarin', 'Lily of the Valley'], heart: ['Grasse Rose', 'Peony'], base: ['White Musk', 'Woods'] },
    accent: '#e8b4bd',
    rating: 4.7,
    reviews: 176,
    stock: 'in',
    isNew: true,
  },
  {
    id: 'acqua-di-gio',
    name: 'Acqua di Giò',
    brand: 'Giorgio Armani',
    kind: 'fragrance',
    image: img('acqua-di-gio'),
    collections: ['designer'],
    family: 'fresh',
    gender: 'men',
    concentration: 'Eau de Toilette',
    fullMl: 100,
    fullPrice: 112,
    tagline: { en: 'Salt, sun, Caribbean breeze.', es: 'Sal, sol y brisa caribeña.' },
    description: {
      en: 'Marine notes and Sicilian citrus over white musk. The ultimate island scent — made for San Juan summers.',
      es: 'Notas marinas y cítricos sicilianos sobre almizcle blanco. El aroma isleño por excelencia: hecho para veranos en San Juan.',
    },
    notes: { top: ['Lime', 'Lemon', 'Bergamot'], heart: ['Sea Notes', 'Jasmine', 'Rosemary'], base: ['White Musk', 'Cedar', 'Patchouli'] },
    accent: '#8fbfc4',
    rating: 4.6,
    reviews: 322,
    stock: 'in',
    bestSeller: true,
  },
  {
    id: 'lattafa-khamrah',
    name: 'Khamrah',
    brand: 'Lattafa',
    kind: 'fragrance',
    art: { glass: '#3b1d10', liquid: '#8a3d15', cap: '#c9a25a', shape: 'square', label: 'KHAMRAH' },
    collections: ['arabian-inspired', 'new-arrivals'],
    family: 'gourmand',
    gender: 'unisex',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 49,
    tagline: { en: 'Dates, cinnamon, warm nights.', es: 'Dátiles, canela y noches cálidas.' },
    description: {
      en: 'Dates, praline and cinnamon swirled with tuberose and amberwood. A cozy, boozy gourmand that performs like niche.',
      es: 'Dátiles, praliné y canela con nardo y amberwood. Un gourmand cálido y licoroso que rinde como nicho.',
    },
    notes: { top: ['Cinnamon', 'Nutmeg', 'Bergamot'], heart: ['Dates', 'Praline', 'Tuberose'], base: ['Vanilla', 'Tonka', 'Amberwood'] },
    accent: '#a0522d',
    rating: 4.8,
    reviews: 517,
    stock: 'in',
    isNew: true,
    bestSeller: true,
    approved: true,
  },
  {
    id: 'armaf-cdni',
    name: 'Club de Nuit Intense',
    brand: 'Armaf',
    kind: 'fragrance',
    art: { glass: '#101010', liquid: '#2a2a2a', cap: '#bfbfbf', shape: 'tall', label: 'CLUB DE NUIT' },
    collections: ['arabian-inspired'],
    family: 'woody',
    gender: 'men',
    concentration: 'Eau de Toilette',
    fullMl: 105,
    fullPrice: 42,
    tagline: { en: 'Smoky citrus, serious projection.', es: 'Cítrico ahumado, proyección seria.' },
    description: {
      en: 'Lemon, pineapple and birch with a smoky woody dry-down. Inspired by the legends — priced for the people.',
      es: 'Limón, piña y abedul con un fondo amaderado ahumado. Inspirado en las leyendas, con precio para todos.',
    },
    notes: { top: ['Lemon', 'Pineapple', 'Black Currant'], heart: ['Birch', 'Jasmine', 'Rose'], base: ['Musk', 'Ambergris', 'Vanilla'] },
    accent: '#7d7d7d',
    rating: 4.6,
    reviews: 389,
    stock: 'in',
  },
  {
    id: 'rasasi-hawas',
    name: 'Hawas for Him',
    brand: 'Rasasi',
    kind: 'fragrance',
    art: { glass: '#1d4f6b', liquid: '#3b8fb5', cap: '#d9dde0', shape: 'round', label: 'HAWAS' },
    collections: ['arabian-inspired', 'new-arrivals'],
    family: 'fresh',
    gender: 'men',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 55,
    tagline: { en: 'Aquatic, fruity, built for heat.', es: 'Acuático, frutal, hecho para el calor.' },
    description: {
      en: 'Apple, bergamot and cinnamon over marine ambergris. A Caribbean summer favorite with all-day staying power.',
      es: 'Manzana, bergamota y canela sobre ámbar gris marino. Un favorito del verano caribeño que dura todo el día.',
    },
    notes: { top: ['Apple', 'Bergamot', 'Cinnamon'], heart: ['Orange Blossom', 'Plum', 'Cardamom'], base: ['Ambergris', 'Musk', 'Driftwood'] },
    accent: '#3b8fb5',
    rating: 4.7,
    reviews: 241,
    stock: 'low',
    isNew: true,
  },
  {
    id: 'lattafa-oud-mood',
    name: 'Oud Mood',
    brand: 'Lattafa',
    kind: 'fragrance',
    art: { glass: '#2b2016', liquid: '#5b3a1c', cap: '#d4af37', shape: 'round', label: 'OUD MOOD' },
    collections: ['arabian-inspired'],
    family: 'woody',
    gender: 'unisex',
    concentration: 'Eau de Parfum',
    fullMl: 100,
    fullPrice: 39,
    tagline: { en: 'Rose, oud and smoke.', es: 'Rosa, oud y humo.' },
    description: {
      en: 'A rich oud wrapped in Taif rose, saffron and smoky incense. Majestic, warm and unmistakably Arabian.',
      es: 'Un oud intenso envuelto en rosa de Taif, azafrán e incienso ahumado. Majestuoso, cálido e inconfundiblemente árabe.',
    },
    notes: { top: ['Saffron', 'Rose'], heart: ['Oud', 'Incense'], base: ['Amber', 'Patchouli', 'Leather'] },
    accent: '#d4af37',
    rating: 4.5,
    reviews: 132,
    stock: 'in',
  },
  // ——— Sets & bundles ———
  {
    id: 'the-initiation',
    name: 'The Initiation',
    brand: 'Scent Syndicate',
    kind: 'set',
    setItems: ['baccarat-rouge-540', 'creed-aventus', 'black-orchid', 'lattafa-khamrah', 'chanel-no5'],
    collections: ['discovery-sets'],
    family: 'amber',
    gender: 'unisex',
    concentration: '5 × 3 ml decants',
    fullMl: 15,
    fullPrice: 59,
    compareAt: 98,
    tagline: { en: 'Your first five. Welcome in.', es: 'Tus primeros cinco. Bienvenido.' },
    description: {
      en: 'Five Syndicate-approved icons in 3 ml decants: the perfect way to find your signature before committing to a full bottle. Includes a $15 credit toward your first full size.',
      es: 'Cinco íconos aprobados por el Syndicate en decants de 3 ml: la forma perfecta de encontrar tu firma antes de un frasco completo. Incluye $15 de crédito para tu primer tamaño completo.',
    },
    notes: { top: ['Saffron', 'Pineapple', 'Aldehydes'], heart: ['Jasmine', 'Black Orchid', 'Dates'], base: ['Ambergris', 'Vanilla', 'Sandalwood'] },
    accent: '#d9a55b',
    rating: 4.9,
    reviews: 286,
    stock: 'in',
    bestSeller: true,
    approved: true,
  },
  {
    id: 'niche-circle',
    name: 'The Niche Circle',
    brand: 'Scent Syndicate',
    kind: 'set',
    setItems: ['baccarat-rouge-540', 'creed-aventus', 'black-orchid'],
    collections: ['discovery-sets'],
    family: 'woody',
    gender: 'unisex',
    concentration: '3 × 10 ml decants',
    fullMl: 30,
    fullPrice: 189,
    compareAt: 236,
    tagline: { en: 'Luxury, without the full commitment.', es: 'Lujo, sin el compromiso completo.' },
    description: {
      en: 'The three most-wanted niche fragrances in travel-ready 10 ml atomizers. Weeks of wear, a fraction of the price.',
      es: 'Las tres fragancias nicho más deseadas en atomizadores de 10 ml listos para viajar. Semanas de uso por una fracción del precio.',
    },
    notes: { top: ['Saffron', 'Pineapple', 'Truffle'], heart: ['Amberwood', 'Birch', 'Orchid'], base: ['Cedar', 'Oakmoss', 'Incense'] },
    accent: '#b5402f',
    rating: 4.8,
    reviews: 97,
    stock: 'low',
    approved: true,
  },
  {
    id: 'arabian-nights',
    name: 'Arabian Nights',
    brand: 'Scent Syndicate',
    kind: 'set',
    setItems: ['lattafa-khamrah', 'armaf-cdni', 'rasasi-hawas', 'lattafa-oud-mood'],
    collections: ['discovery-sets'],
    family: 'gourmand',
    gender: 'unisex',
    concentration: '4 × 10 ml decants',
    fullMl: 40,
    fullPrice: 69,
    compareAt: 92,
    tagline: { en: 'Big performance, small price.', es: 'Gran rendimiento, precio pequeño.' },
    description: {
      en: 'Four Middle-Eastern powerhouses with legendary longevity. The smartest way into the Arabian scene.',
      es: 'Cuatro potencias de Medio Oriente con duración legendaria. La forma más inteligente de entrar al mundo árabe.',
    },
    notes: { top: ['Cinnamon', 'Lemon', 'Apple'], heart: ['Dates', 'Birch', 'Oud'], base: ['Vanilla', 'Ambergris', 'Amber'] },
    accent: '#a0522d',
    rating: 4.8,
    reviews: 144,
    stock: 'in',
    isNew: true,
  },
  {
    id: 'date-night-duo',
    name: 'Date Night Duo',
    brand: 'Scent Syndicate',
    kind: 'set',
    setItems: ['black-opium', 'dior-sauvage'],
    collections: ['discovery-sets'],
    family: 'gourmand',
    gender: 'unisex',
    concentration: '2 full-size bottles',
    fullMl: 190,
    fullPrice: 249,
    compareAt: 280,
    tagline: { en: 'His. Hers. Unforgettable.', es: 'De él. De ella. Inolvidable.' },
    description: {
      en: 'Black Opium and Sauvage, full size, gift-wrapped in our signature black box with a handwritten note.',
      es: 'Black Opium y Sauvage en tamaño completo, envueltos en nuestra caja negra insignia con nota escrita a mano.',
    },
    notes: { top: ['Pink Pepper', 'Bergamot'], heart: ['Coffee', 'Lavender'], base: ['Vanilla', 'Ambroxan'] },
    accent: '#d97a8f',
    rating: 4.9,
    reviews: 63,
    stock: 'in',
  },
];

export const decantSizes = [3, 5, 10] as const;

/** Decant pricing: per-ml rate of the full bottle with a handling premium. */
export function decantPrice(p: Product, ml: number) {
  const rate = p.fullPrice / p.fullMl;
  return Math.max(ml + 6, Math.round(rate * ml * 1.55 + 4));
}

export function sizesFor(p: Product): Size[] {
  if (p.kind === 'set') {
    return [{ id: 'set', label: { en: p.concentration, es: p.concentration.replace('full-size bottles', 'frascos completos') }, price: p.fullPrice, compareAt: p.compareAt }];
  }
  return [
    { id: 'full', ml: p.fullMl, label: { en: `Full bottle · ${p.fullMl} ml`, es: `Frasco completo · ${p.fullMl} ml` }, price: p.fullPrice, compareAt: p.compareAt },
    ...decantSizes.map((ml) => ({
      id: `d${ml}`,
      ml,
      label: { en: `Decant · ${ml} ml`, es: `Decant · ${ml} ml` },
      price: decantPrice(p, ml),
    })),
  ];
}

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const brands = Array.from(new Set(products.filter((p) => p.kind === 'fragrance').map((p) => p.brand))).sort();

export const families: Family[] = ['woody', 'floral', 'amber', 'fresh', 'gourmand', 'spicy'];

export interface Collection {
  id: CollectionId;
  title: Localized;
  kicker: Localized;
  blurb: Localized;
  image: string;
  tone: 'dark' | 'stone' | 'amber' | 'beige';
}

export const collections: Collection[] = [
  {
    id: 'niche-luxury',
    title: { en: 'Niche & Luxury', es: 'Nicho y Lujo' },
    kicker: { en: 'The Inner Circle', es: 'El Círculo Interno' },
    blurb: { en: 'Rare houses, cult signatures and the bottles collectors whisper about.', es: 'Casas raras, firmas de culto y los frascos de los que hablan los coleccionistas.' },
    image: img('model-woman-noir'),
    tone: 'dark',
  },
  {
    id: 'designer',
    title: { en: 'Designer Fragrances', es: 'Fragancias de Diseñador' },
    kicker: { en: 'The Icons', es: 'Los Íconos' },
    blurb: { en: 'The greatest hits of Paris and Milan, 100% authentic.', es: 'Los grandes éxitos de París y Milán, 100% auténticos.' },
    image: img('model-man-suit'),
    tone: 'stone',
  },
  {
    id: 'arabian-inspired',
    title: { en: 'Arabian & Inspired', es: 'Árabes e Inspirados' },
    kicker: { en: 'The Underground', es: 'El Underground' },
    blurb: { en: 'Middle-Eastern powerhouses with monster performance and honest prices.', es: 'Potencias de Medio Oriente con rendimiento brutal y precios honestos.' },
    image: img('model-woman-champagne'),
    tone: 'amber',
  },
  {
    id: 'decants',
    title: { en: 'Decants', es: 'Decants' },
    kicker: { en: 'Try Before You Commit', es: 'Prueba Antes de Comprometerte' },
    blurb: { en: 'Every fragrance in 3, 5 or 10 ml, hand-poured from the original bottle.', es: 'Cada fragancia en 3, 5 o 10 ml, decantada a mano del frasco original.' },
    image: img('model-man-spray'),
    tone: 'beige',
  },
  {
    id: 'discovery-sets',
    title: { en: 'Bundles & Discovery Sets', es: 'Bundles y Sets de Descubrimiento' },
    kicker: { en: 'Curated by the Syndicate', es: 'Curado por el Syndicate' },
    blurb: { en: 'Hand-picked flights of scent, gift-ready in our signature black box.', es: 'Selecciones hechas a mano, listas para regalar en nuestra caja negra insignia.' },
    image: img('model-woman-silk'),
    tone: 'stone',
  },
  {
    id: 'new-arrivals',
    title: { en: 'New Arrivals', es: 'Recién Llegados' },
    kicker: { en: 'Just Landed', es: 'Acaban de Llegar' },
    blurb: { en: 'Fresh drops this month — the Syndicate gets them first.', es: 'Novedades de este mes: el Syndicate las recibe primero.' },
    image: img('model-woman-champagne'),
    tone: 'dark',
  },
];

export const getCollection = (id: string) => collections.find((c) => c.id === id);

export function inCollection(p: Product, id: CollectionId) {
  if (id === 'decants') return p.kind === 'fragrance';
  return p.collections.includes(id);
}

export const reviews = [
  { name: 'Natalia R.', city: 'San Juan, PR', rating: 5, product: 'Baccarat Rouge 540', text: { en: 'Ordered a 5 ml decant first, came back for the full bottle a week later. Packaging felt like opening jewelry.', es: 'Pedí un decant de 5 ml primero y una semana después volví por el frasco completo. El empaque se sintió como abrir una joya.' } },
  { name: 'Carlos M.', city: 'Bayamón, PR', rating: 5, product: 'Khamrah', text: { en: "I get compliments every single time. Can't believe the price. The Syndicate never misses.", es: 'Me halagan cada vez que lo uso. No puedo creer el precio. El Syndicate nunca falla.' } },
  { name: 'Andrea V.', city: 'Miami, FL', rating: 5, product: 'The Initiation', text: { en: 'The discovery set is the best $59 I spent this year. Found my signature: Black Orchid.', es: 'El set de descubrimiento son los mejores $59 que gasté este año. Encontré mi firma: Black Orchid.' } },
  { name: 'Luis F.', city: 'Ponce, PR', rating: 5, product: 'Aventus', text: { en: 'Authentic batch, arrived in two days with a handwritten note. Real ones.', es: 'Batch auténtico, llegó en dos días con una nota escrita a mano. Gente seria.' } },
  { name: 'Mariela S.', city: 'Orlando, FL', rating: 4, product: 'Miss Dior', text: { en: 'Smells exactly like the boutique. Love that I can try 3 ml first.', es: 'Huele igual que en la boutique. Me encanta poder probar 3 ml primero.' } },
];

export const DISCOUNTS: Record<string, number> = { SYNDICATE15: 0.15, WELCOME10: 0.1 };
export const FREE_SHIPPING = 100;
export const SHIPPING_FEE = 7.95;
