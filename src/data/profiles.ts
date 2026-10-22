import type { Localized } from './products';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

/** Editorial profile shown on the product page: how the scent wears and why we approve it. */
export interface Profile {
  longevity: number; // 1–5
  sillage: number; // 1–5
  seasons: Season[];
  time: ('day' | 'night')[];
  mood: Localized;
  story: Localized;
  occasion: Localized;
  verdict: Localized;
}

export const profiles: Record<string, Profile> = {
  'baccarat-rouge-540': {
    longevity: 5, sillage: 5, seasons: ['fall', 'winter', 'spring'], time: ['day', 'night'],
    mood: { en: 'Radiant · Airy · Magnetic', es: 'Radiante · Etéreo · Magnético' },
    story: {
      en: 'Created by Francis Kurkdjian to celebrate the 250th anniversary of Baccarat crystal, 540 is the scent of molten glass at 540 °C. It opens like a burst of light and settles into a sweet, mineral glow that people will ask about from across the room.',
      es: 'Creado por Francis Kurkdjian para celebrar los 250 años del cristal Baccarat, 540 es el aroma del cristal fundido a 540 °C. Abre como un destello de luz y se asienta en un brillo dulce y mineral por el que te preguntarán desde el otro lado del salón.',
    },
    occasion: { en: 'Evenings out, first impressions, the moments you want remembered.', es: 'Salidas de noche, primeras impresiones, momentos que quieres que se recuerden.' },
    verdict: { en: 'The most requested bottle in the circle. If you only try one niche fragrance this year, make it this one.', es: 'El frasco más pedido del círculo. Si solo pruebas un nicho este año, que sea este.' },
  },
  'creed-aventus': {
    longevity: 4, sillage: 4, seasons: ['spring', 'summer', 'fall'], time: ['day', 'night'],
    mood: { en: 'Confident · Smoky · Fruity', es: 'Seguro · Ahumado · Frutal' },
    story: {
      en: 'Inspired by the dramatic life of an emperor, Aventus pairs sun-ripened pineapple with birch smoke. It redefined modern masculine perfumery and every batch has its own subtle personality.',
      es: 'Inspirado en la vida de un emperador, Aventus combina piña madura al sol con humo de abedul. Redefinió la perfumería masculina moderna y cada batch tiene su propia personalidad.',
    },
    occasion: { en: 'Boardrooms, weddings, any day you need to win.', es: 'Reuniones, bodas, cualquier día que necesites ganar.' },
    verdict: { en: 'A benchmark for a reason. Start with a 5 ml and learn your batch.', es: 'Un referente por algo. Empieza con 5 ml y conoce tu batch.' },
  },
  'black-orchid': {
    longevity: 5, sillage: 4, seasons: ['fall', 'winter'], time: ['night'],
    mood: { en: 'Velvet · Dark · Opulent', es: 'Terciopelo · Oscuro · Opulento' },
    story: {
      en: 'Tom Ford set out to create a scent as rare as a black orchid. The result is lush and earthy: truffle, dark chocolate and incense wrapped around a creamy floral heart.',
      es: 'Tom Ford quiso crear un aroma tan raro como una orquídea negra. El resultado es exuberante y terroso: trufa, chocolate oscuro e incienso alrededor de un corazón floral cremoso.',
    },
    occasion: { en: 'Candlelit dinners and cold-weather nights.', es: 'Cenas a la luz de las velas y noches frías.' },
    verdict: { en: 'Unapologetic and unforgettable. Two sprays is plenty.', es: 'Sin disculpas e inolvidable. Dos sprays son suficientes.' },
  },
  'dior-sauvage': {
    longevity: 4, sillage: 4, seasons: ['spring', 'summer', 'fall', 'winter'], time: ['day', 'night'],
    mood: { en: 'Fresh · Spicy · Magnetic', es: 'Fresco · Especiado · Magnético' },
    story: {
      en: 'François Demachy imagined wide-open desert skies at twilight. The Eau de Parfum softens the original with vanilla and nutmeg — fresh, clean and irresistibly easy to wear.',
      es: 'François Demachy imaginó cielos abiertos del desierto al atardecer. El Eau de Parfum suaviza el original con vainilla y nuez moscada: fresco, limpio y fácil de llevar.',
    },
    occasion: { en: 'Every day, everywhere — the ultimate signature.', es: 'Todos los días, en todas partes: la firma por excelencia.' },
    verdict: { en: 'The safest compliment-getter in the catalog.', es: 'El generador de halagos más seguro del catálogo.' },
  },
  'chanel-no5': {
    longevity: 4, sillage: 3, seasons: ['spring', 'fall', 'winter'], time: ['day', 'night'],
    mood: { en: 'Timeless · Powdery · Elegant', es: 'Eterno · Empolvado · Elegante' },
    story: {
      en: 'Composed by Ernest Beaux in 1921 for Gabrielle Chanel, N°5 was the first fragrance built around aldehydes — an abstract bouquet that smells of no single flower and all of them at once.',
      es: 'Compuesto por Ernest Beaux en 1921 para Gabrielle Chanel, N°5 fue el primer perfume construido con aldehídos: un bouquet abstracto que no huele a una flor, sino a todas a la vez.',
    },
    occasion: { en: 'Galas, gallery openings, Sunday brunch in pearls.', es: 'Galas, inauguraciones, brunch de domingo con perlas.' },
    verdict: { en: 'A century old and still the definition of elegance.', es: 'Un siglo después, sigue siendo la definición de elegancia.' },
  },
  'black-opium': {
    longevity: 4, sillage: 4, seasons: ['fall', 'winter'], time: ['night'],
    mood: { en: 'Addictive · Sweet · Electric', es: 'Adictivo · Dulce · Eléctrico' },
    story: {
      en: 'A rock-and-roll gourmand: a shot of black coffee, a rush of vanilla and a flash of white flowers. Glittering bottle, glittering trail.',
      es: 'Un gourmand rockero: un trago de café negro, una oleada de vainilla y un destello de flores blancas. Frasco brillante, estela brillante.',
    },
    occasion: { en: 'Nights out, concerts, dates that run late.', es: 'Noches de fiesta, conciertos, citas que terminan tarde.' },
    verdict: { en: 'Pure fun in a bottle. Pairs perfectly with Sauvage in our Date Night Duo.', es: 'Pura diversión en un frasco. Combina perfecto con Sauvage en nuestro Date Night Duo.' },
  },
  'good-girl': {
    longevity: 4, sillage: 4, seasons: ['fall', 'winter', 'spring'], time: ['night'],
    mood: { en: 'Seductive · Bold · Dual', es: 'Seductor · Audaz · Dual' },
    story: {
      en: 'The stiletto bottle says it all: luminous tuberose and jasmine on one side, roasted tonka and cocoa on the other. Every woman is both — good and bad.',
      es: 'El frasco de tacón lo dice todo: nardo y jazmín luminosos por un lado, tonka tostada y cacao por el otro. Toda mujer es ambas: buena y mala.',
    },
    occasion: { en: 'Cocktail hour and statement entrances.', es: 'Hora del cóctel y entradas memorables.' },
    verdict: { en: 'A modern classic that photographs as good as it smells.', es: 'Un clásico moderno que se ve tan bien como huele.' },
  },
  flowerbomb: {
    longevity: 4, sillage: 4, seasons: ['spring', 'fall', 'winter'], time: ['day', 'night'],
    mood: { en: 'Romantic · Lush · Joyful', es: 'Romántico · Exuberante · Alegre' },
    story: {
      en: 'Viktor&Rolf wanted to turn something negative into something beautiful: a grenade that explodes into flowers. Orchid, jasmine and rose detonate over sweet patchouli.',
      es: 'Viktor&Rolf quisieron transformar algo negativo en algo hermoso: una granada que explota en flores. Orquídea, jazmín y rosa estallan sobre pachulí dulce.',
    },
    occasion: { en: 'Weddings, celebrations, any day that deserves flowers.', es: 'Bodas, celebraciones, cualquier día que merezca flores.' },
    verdict: { en: 'Maximalist florals done right.', es: 'Florales maximalistas bien hechos.' },
  },
  'miss-dior': {
    longevity: 3, sillage: 3, seasons: ['spring', 'summer'], time: ['day'],
    mood: { en: 'Tender · Fresh · Feminine', es: 'Tierno · Fresco · Femenino' },
    story: {
      en: 'Named after Christian Dior’s sister Catherine, Miss Dior is a love letter written in roses. The bow on the bottle is hand-tied — like every great gesture.',
      es: 'Nombrado por Catherine, la hermana de Christian Dior, Miss Dior es una carta de amor escrita con rosas. El lazo del frasco se ata a mano, como todo gran gesto.',
    },
    occasion: { en: 'Daytime, garden parties, everyday romance.', es: 'De día, fiestas al aire libre, romance cotidiano.' },
    verdict: { en: 'The prettiest rose in the catalog — easy to love.', es: 'La rosa más bonita del catálogo: fácil de amar.' },
  },
  'acqua-di-gio': {
    longevity: 3, sillage: 3, seasons: ['spring', 'summer'], time: ['day'],
    mood: { en: 'Marine · Clean · Sunlit', es: 'Marino · Limpio · Soleado' },
    story: {
      en: 'Inspired by Pantelleria, the island where Giorgio Armani spends his summers. Salt, citrus and warm skin — a scent that feels like the Caribbean in July.',
      es: 'Inspirado en Pantelleria, la isla donde Giorgio Armani pasa sus veranos. Sal, cítricos y piel tibia: un aroma que se siente como el Caribe en julio.',
    },
    occasion: { en: 'Beach days, office days, everything in between.', es: 'Días de playa, días de oficina y todo lo demás.' },
    verdict: { en: 'Built for Puerto Rico heat. A perennial best seller.', es: 'Hecho para el calor de Puerto Rico. Un best seller eterno.' },
  },
  'lattafa-khamrah': {
    longevity: 5, sillage: 5, seasons: ['fall', 'winter'], time: ['night'],
    mood: { en: 'Warm · Boozy · Cozy', es: 'Cálido · Licoroso · Acogedor' },
    story: {
      en: 'Khamrah means "wine" in Arabic. Dates, praline and cinnamon swirl with tuberose over a vanilla-amber base — a dessert you can wear, with niche-level performance.',
      es: 'Khamrah significa "vino" en árabe. Dátiles, praliné y canela con nardo sobre una base de vainilla y ámbar: un postre que se lleva puesto, con rendimiento de nicho.',
    },
    occasion: { en: 'Cool nights, holidays, cozy dates.', es: 'Noches frescas, festividades, citas acogedoras.' },
    verdict: { en: 'Our best value pick. Smells three times its price.', es: 'Nuestra mejor relación calidad-precio. Huele al triple de su precio.' },
  },
  'armaf-cdni': {
    longevity: 5, sillage: 5, seasons: ['spring', 'fall', 'winter'], time: ['day', 'night'],
    mood: { en: 'Smoky · Citrus · Powerful', es: 'Ahumado · Cítrico · Potente' },
    story: {
      en: 'The fragrance that put Armaf on the map: lemon and pineapple over smoky birch with a powerful, long-lasting dry-down.',
      es: 'La fragancia que puso a Armaf en el mapa: limón y piña sobre abedul ahumado, con un fondo potente y duradero.',
    },
    occasion: { en: 'Nights out and long days that need staying power.', es: 'Salidas y días largos que necesitan duración.' },
    verdict: { en: 'Go light — three sprays fill a room.', es: 'Úsalo con moderación: tres sprays llenan un salón.' },
  },
  'rasasi-hawas': {
    longevity: 4, sillage: 4, seasons: ['spring', 'summer'], time: ['day', 'night'],
    mood: { en: 'Aquatic · Fruity · Bright', es: 'Acuático · Frutal · Brillante' },
    story: {
      en: 'Apple and bergamot over marine ambergris with a pinch of cinnamon. A fresh scent that refuses to fade in tropical heat.',
      es: 'Manzana y bergamota sobre ámbar gris marino con un toque de canela. Un aroma fresco que no desaparece con el calor tropical.',
    },
    occasion: { en: 'Summer nights, beach bars, vacations.', es: 'Noches de verano, chiringuitos, vacaciones.' },
    verdict: { en: 'The summer favorite of the Syndicate.', es: 'El favorito de verano del Syndicate.' },
  },
  'lattafa-oud-mood': {
    longevity: 5, sillage: 4, seasons: ['fall', 'winter'], time: ['night'],
    mood: { en: 'Majestic · Smoky · Rich', es: 'Majestuoso · Ahumado · Intenso' },
    story: {
      en: 'A classic Middle-Eastern oud, softened with Taif rose and saffron, resting on incense and leather. A first step into the world of oud.',
      es: 'Un oud clásico de Medio Oriente, suavizado con rosa de Taif y azafrán, sobre incienso y cuero. Un primer paso al mundo del oud.',
    },
    occasion: { en: 'Formal evenings and special occasions.', es: 'Noches formales y ocasiones especiales.' },
    verdict: { en: 'Oud without intimidation.', es: 'Oud sin intimidación.' },
  },
};
