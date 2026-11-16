import { cafe } from '../content/cafe';
import { menu } from '../content/menu';
import { absoluteUrl } from './paths';

const SCHEMA_DAYS = { Monday: 'Mo', Tuesday: 'Tu', Wednesday: 'We', Thursday: 'Th', Friday: 'Fr', Saturday: 'Sa', Sunday: 'Su' } as const;

/** schema.org CafeOrCoffeeShop for search engines and maps. Built from the same content as the pages. */
export function cafeStructuredData() {
  const url = absoluteUrl('/');
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: cafe.name,
    description: cafe.introduction,
    ...(url ? { url, hasMenu: absoluteUrl('/menu/') } : {}),
    email: cafe.email,
    ...(cafe.phone ? { telephone: cafe.phone } : {}),
    servesCuisine: ['Coffee', 'Tea', 'Bakery'],
    priceRange: '$',
    currenciesAccepted: menu.currency,
    address: {
      '@type': 'PostalAddress',
      streetAddress: cafe.address.street,
      addressLocality: cafe.address.locality,
      addressRegion: cafe.address.region,
      postalCode: cafe.address.postalCode,
      addressCountry: cafe.address.country,
    },
    openingHours: cafe.hours.filter(entry => entry.opens && entry.closes)
      .map(entry => `${SCHEMA_DAYS[entry.day]} ${entry.opens}-${entry.closes}`),
    sameAs: cafe.links.filter(link => link.url.trim()).map(link => link.url),
  };
}

/** JSON for an inline <script type="application/ld+json">, safe against closing the script tag. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
