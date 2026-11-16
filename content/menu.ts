// The café menu. Add, remove, reorder or reprice items here; every page reads from this file.
// Item names and prices are placeholders — replace them with your own.
// Plain strings only: text is rendered as text, never as HTML.

/** Dietary markers shown as tags and used by the menu filter. */
export type Diet = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'contains-nuts';

export const DIETS: Record<Diet, { label: string; short: string }> = {
  vegan: { label: 'Vegan', short: 'VG' },
  vegetarian: { label: 'Vegetarian', short: 'V' },
  'gluten-free': { label: 'Gluten-free', short: 'GF' },
  'dairy-free': { label: 'Dairy-free', short: 'DF' },
  'contains-nuts': { label: 'Contains nuts', short: 'N' },
};

/** Little drawing shown with an item, tinted by `color`. See components/menu-art.tsx. */
export type Art = 'cup' | 'mug' | 'glass' | 'teapot' | 'croissant' | 'cookie' | 'cake' | 'toast' | 'bowl' | 'onigiri' | 'mochi';

export interface SizePrice {
  /** e.g. "Small", "8oz", "Pot for two". */
  label: string;
  amount: number;
}

export interface MenuItem {
  /** Unique, URL-safe id used for links such as /menu/#ube-latte. */
  id: string;
  name: string;
  description: string;
  /** One price, or a price per size. Amounts are in `menu.currency`, e.g. 4.5 for $4.50. */
  price: number | SizePrice[];
  diet?: Diet[];
  /** Optional highlight shown as a sticker. */
  badge?: 'signature' | 'seasonal' | 'new';
  /** For drinks: how it can be served. */
  serve?: 'hot' | 'iced' | 'hot-or-iced';
  art: Art;
  /** Main colour of the drawing, e.g. the drink or bake. Any CSS colour. */
  color: string;
  /** Set to false to show the item as sold out without deleting it. */
  available?: boolean;
  /** Show on the home page "House favourites". */
  featured?: boolean;
}

export interface MenuSection {
  /** Unique, URL-safe id used for links such as /menu/#coffee. */
  id: string;
  title: string;
  /** Short line shown under the section title. */
  description: string;
  items: MenuItem[];
}

export interface Menu {
  /** ISO 4217 currency code. */
  currency: string;
  /** Locale used to format prices, e.g. "en-US", "en-GB". */
  locale: string;
  sections: MenuSection[];
  /** Add-ons offered with drinks. */
  extras: { name: string; price: number }[];
  /** Small print under the menu, e.g. allergy advice. */
  notes: string[];
}

export const menu: Menu = {
  currency: 'USD',
  locale: 'en-US',
  sections: [
    {
      id: 'coffee',
      title: 'Coffee',
      description: 'Small-batch house blend, roasted locally. Single origin on the pour-over bar.',
      items: [
        {
          id: 'espresso',
          name: 'Espresso',
          description: 'A double shot of our chocolatey house blend.',
          price: 3,
          diet: ['vegan', 'gluten-free', 'dairy-free'],
          serve: 'hot',
          art: 'cup',
          color: '#5b3a29',
        },
        {
          id: 'flat-white',
          name: 'Flat white',
          description: 'Double ristretto with silky microfoam.',
          price: [{ label: '6oz', amount: 4.25 }, { label: '8oz', amount: 4.75 }],
          diet: ['vegetarian', 'gluten-free'],
          serve: 'hot',
          art: 'cup',
          color: '#c89b72',
        },
        {
          id: 'oat-latte',
          name: 'Oat latte',
          description: 'Our most-ordered cup. Creamy oat milk, double shot.',
          price: [{ label: '12oz', amount: 5 }, { label: '16oz', amount: 5.75 }],
          diet: ['vegan', 'dairy-free'],
          serve: 'hot-or-iced',
          art: 'mug',
          color: '#d8b48c',
        },
        {
          id: 'honey-lavender-latte',
          name: 'Honey lavender latte',
          description: 'Wildflower honey, house lavender syrup and a sprinkle of dried buds.',
          price: [{ label: '12oz', amount: 5.75 }, { label: '16oz', amount: 6.5 }],
          diet: ['vegetarian', 'gluten-free'],
          badge: 'signature',
          serve: 'hot-or-iced',
          art: 'mug',
          color: '#b9a3d6',
          featured: true,
        },
        {
          id: 'midnight-mocha',
          name: 'Midnight mocha',
          description: 'Dark chocolate, a pinch of sea salt and a toasted marshmallow on top.',
          price: [{ label: '12oz', amount: 6 }, { label: '16oz', amount: 6.75 }],
          diet: ['vegetarian'],
          badge: 'signature',
          serve: 'hot',
          art: 'mug',
          color: '#4a2f2a',
          featured: true,
        },
        {
          id: 'pour-over',
          name: 'Pour-over',
          description: 'Rotating single origin, brewed slowly by hand. Ask what’s on the bar today.',
          price: 5.5,
          diet: ['vegan', 'gluten-free', 'dairy-free'],
          serve: 'hot',
          art: 'cup',
          color: '#7a4a2e',
        },
        {
          id: 'cold-brew',
          name: '18-hour cold brew',
          description: 'Steeped overnight, smooth and low in acidity. Black or with a splash of milk.',
          price: [{ label: '12oz', amount: 4.75 }, { label: '16oz', amount: 5.5 }],
          diet: ['vegan', 'gluten-free', 'dairy-free'],
          serve: 'iced',
          art: 'glass',
          color: '#3d2418',
        },
      ],
    },
    {
      id: 'tea-and-lattes',
      title: 'Tea & not-coffee',
      description: 'Loose-leaf teas and caffeine-gentle lattes for slower afternoons.',
      items: [
        {
          id: 'ube-latte',
          name: 'Ube latte',
          description: 'Purple yam, coconut milk and vanilla. Tastes like a sunset looks.',
          price: [{ label: '12oz', amount: 5.75 }, { label: '16oz', amount: 6.5 }],
          diet: ['vegan', 'gluten-free', 'dairy-free'],
          badge: 'signature',
          serve: 'hot-or-iced',
          art: 'glass',
          color: '#9a72cf',
          featured: true,
        },
        {
          id: 'matcha-latte',
          name: 'Ceremonial matcha latte',
          description: 'Stone-ground matcha whisked to order, lightly sweetened.',
          price: [{ label: '12oz', amount: 5.5 }, { label: '16oz', amount: 6.25 }],
          diet: ['vegetarian', 'gluten-free'],
          serve: 'hot-or-iced',
          art: 'mug',
          color: '#8fb36a',
          featured: true,
        },
        {
          id: 'hojicha-latte',
          name: 'Hojicha latte',
          description: 'Roasted green tea with notes of caramel and toast. Low caffeine.',
          price: [{ label: '12oz', amount: 5.25 }, { label: '16oz', amount: 6 }],
          diet: ['vegetarian', 'gluten-free'],
          serve: 'hot-or-iced',
          art: 'mug',
          color: '#a86f45',
        },
        {
          id: 'masala-chai',
          name: 'Masala chai',
          description: 'Simmered on the stove with fresh ginger, cardamom and black pepper.',
          price: [{ label: '12oz', amount: 5 }, { label: '16oz', amount: 5.75 }],
          diet: ['vegetarian', 'gluten-free'],
          serve: 'hot',
          art: 'mug',
          color: '#c58a5a',
        },
        {
          id: 'london-fog',
          name: 'London fog',
          description: 'Earl grey, steamed milk and vanilla — a rainy-day classic.',
          price: [{ label: '12oz', amount: 5 }, { label: '16oz', amount: 5.75 }],
          diet: ['vegetarian', 'gluten-free'],
          serve: 'hot',
          art: 'mug',
          color: '#b7a8a0',
        },
        {
          id: 'pumpkin-spice-chai',
          name: 'Pumpkin spice chai',
          description: 'Our chai with roasted pumpkin and maple. Only while the leaves fall.',
          price: [{ label: '12oz', amount: 5.75 }, { label: '16oz', amount: 6.5 }],
          diet: ['vegetarian', 'gluten-free'],
          badge: 'seasonal',
          serve: 'hot-or-iced',
          art: 'mug',
          color: '#d9874a',
        },
        {
          id: 'loose-leaf-pot',
          name: 'Pot of loose-leaf tea',
          description: 'Jasmine pearls, sencha, earl grey, chamomile or peppermint.',
          price: [{ label: 'For one', amount: 4 }, { label: 'For two', amount: 6.5 }],
          diet: ['vegan', 'gluten-free', 'dairy-free'],
          serve: 'hot',
          art: 'teapot',
          color: '#e0b96a',
        },
      ],
    },
    {
      id: 'cold-and-sparkling',
      title: 'Cold & sparkling',
      description: 'Bright, fizzy and floral. Made fresh every morning.',
      items: [
        {
          id: 'strawberry-matcha',
          name: 'Strawberry matcha',
          description: 'Layers of strawberry purée, milk and matcha over ice.',
          price: 6.5,
          diet: ['vegetarian', 'gluten-free'],
          badge: 'new',
          serve: 'iced',
          art: 'glass',
          color: '#e88aa0',
        },
        {
          id: 'yuzu-lemonade',
          name: 'Yuzu sparkling lemonade',
          description: 'Yuzu, lemon and a little honey, topped with soda.',
          price: 5,
          diet: ['vegetarian', 'gluten-free', 'dairy-free'],
          serve: 'iced',
          art: 'glass',
          color: '#f3d36b',
        },
        {
          id: 'peach-oolong',
          name: 'Peach oolong iced tea',
          description: 'Cold-steeped oolong with white peach. Unsweetened unless you ask.',
          price: 4.75,
          diet: ['vegan', 'gluten-free', 'dairy-free'],
          serve: 'iced',
          art: 'glass',
          color: '#f2a27e',
        },
        {
          id: 'espresso-tonic',
          name: 'Espresso tonic',
          description: 'A double shot over tonic and orange peel. Fizzy, bitter, wonderful.',
          price: 5.5,
          diet: ['vegan', 'gluten-free', 'dairy-free'],
          serve: 'iced',
          art: 'glass',
          color: '#c27a45',
        },
      ],
    },
    {
      id: 'bakes',
      title: 'Bakes',
      description: 'Baked in-house before sunrise. When they’re gone, they’re gone.',
      items: [
        {
          id: 'butter-croissant',
          name: 'Butter croissant',
          description: 'Three days of laminating for one perfect flake.',
          price: 4,
          diet: ['vegetarian'],
          art: 'croissant',
          color: '#e0a25a',
        },
        {
          id: 'cardamom-bun',
          name: 'Cardamom bun',
          description: 'Knotted, sticky and fragrant with freshly ground cardamom.',
          price: 4.75,
          diet: ['vegetarian'],
          badge: 'signature',
          art: 'cake',
          color: '#c9864b',
          featured: true,
        },
        {
          id: 'miso-brownie',
          name: 'Miso caramel brownie',
          description: 'Fudgy dark chocolate with a ribbon of white miso caramel.',
          price: 4.5,
          diet: ['vegetarian'],
          art: 'cake',
          color: '#4b2c22',
        },
        {
          id: 'matcha-cookie',
          name: 'Matcha white chocolate cookie',
          description: 'Crisp edges, soft middle, generous chunks.',
          price: 3.5,
          diet: ['vegetarian'],
          art: 'cookie',
          color: '#9cbf73',
        },
        {
          id: 'blueberry-muffin',
          name: 'Blueberry crumble muffin',
          description: 'Bursting with berries under an oat crumble.',
          price: 4,
          diet: ['vegan', 'dairy-free'],
          art: 'cake',
          color: '#6f6fbf',
        },
        {
          id: 'banana-bread',
          name: 'Banana walnut bread',
          description: 'Toasted, with salted butter. Ask for it warm.',
          price: 4.25,
          diet: ['vegetarian', 'gluten-free', 'contains-nuts'],
          art: 'cake',
          color: '#b47a45',
          available: false,
        },
      ],
    },
    {
      id: 'snacks',
      title: 'Snacks & toasts',
      description: 'Simple, comforting food for long study sessions. Served until an hour before close.',
      items: [
        {
          id: 'miso-avocado-toast',
          name: 'Miso avocado toast',
          description: 'Sourdough, smashed avocado, miso butter, chilli crisp and sesame.',
          price: 11,
          diet: ['vegetarian'],
          art: 'toast',
          color: '#9cbf5f',
          featured: true,
        },
        {
          id: 'grilled-cheese',
          name: 'Three-cheese toastie',
          description: 'Cheddar, gruyère and mozzarella with a cup of tomato soup for dipping.',
          price: 10.5,
          diet: ['vegetarian'],
          art: 'toast',
          color: '#f0b94a',
        },
        {
          id: 'onigiri',
          name: 'Onigiri pair',
          description: 'Two rice balls: salmon mayo and pickled plum. Wrapped in crisp nori.',
          price: 7,
          diet: ['gluten-free', 'dairy-free'],
          art: 'onigiri',
          color: '#f4efe6',
        },
        {
          id: 'granola-bowl',
          name: 'Maple granola bowl',
          description: 'House granola, coconut yoghurt, seasonal fruit and a drizzle of maple.',
          price: 9,
          diet: ['vegan', 'dairy-free', 'contains-nuts'],
          art: 'bowl',
          color: '#e6a3b5',
        },
        {
          id: 'mochi-trio',
          name: 'Mochi trio',
          description: 'Strawberry, black sesame and matcha. Soft, chewy, very snackable.',
          price: 6,
          diet: ['vegan', 'gluten-free', 'dairy-free'],
          badge: 'new',
          art: 'mochi',
          color: '#f2b7c6',
        },
      ],
    },
  ],
  extras: [
    { name: 'Oat, soy or almond milk', price: 0.75 },
    { name: 'Extra shot', price: 1 },
    { name: 'Vanilla, caramel or lavender syrup', price: 0.6 },
    { name: 'Decaf', price: 0 },
  ],
  notes: [
    'VG vegan · V vegetarian · GF gluten-free · DF dairy-free · N contains nuts.',
    'Our kitchen handles gluten, dairy, nuts and sesame. Please tell us about any allergy before ordering.',
  ],
};

/** Every item, in menu order. */
export const allItems: MenuItem[] = menu.sections.flatMap(section => section.items);

/** Items shown in the home page "House favourites". */
export const featuredItems: MenuItem[] = allItems.filter(item => item.featured);

const formatter = new Intl.NumberFormat(menu.locale, { style: 'currency', currency: menu.currency });

/** "$4.50", or "$4" for whole amounts. */
export function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  const text = formatter.format(amount);
  return Number.isInteger(amount) ? text.replace(/[.,]00(?=\D*$)/, '') : text;
}

/** Lowest price, for compact cards. */
export function startingPrice(item: MenuItem): number {
  return typeof item.price === 'number' ? item.price : Math.min(...item.price.map(size => size.amount));
}

export function isAvailable(item: MenuItem): boolean {
  return item.available !== false;
}
