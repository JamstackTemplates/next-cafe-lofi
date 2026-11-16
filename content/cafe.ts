// Café details. Edit this file to make the website yours.
// Everything here is placeholder content for a fictitious café. The sample address is a well-known
// public landmark (20 Times Square, New York) so the map has something to show; replace it with yours.
// Plain strings only: text is rendered as text, never as HTML.

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const DAYS: readonly Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export interface OpeningHours {
  day: Day;
  /** 24-hour "HH:MM" local time, e.g. "07:30". Omit both to mark the day closed. */
  opens?: string;
  closes?: string;
}

export interface Amenity {
  /** Icon name from components/icons.tsx. */
  icon: 'wifi' | 'plug' | 'book' | 'paw' | 'vinyl' | 'leaf' | 'moon' | 'cup';
  title: string;
  detail: string;
}

export interface Track {
  title: string;
  artist: string;
  /** "m:ss" */
  length: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CafeLink {
  label: string;
  /** Absolute https:// URL. Entries with an empty URL are not rendered. */
  url: string;
}

export interface Cafe {
  name: string;
  /** Short line under the name on the home page. */
  tagline: string;
  /** One or two sentences: the first thing visitors read. */
  introduction: string;
  /** Home page "our story" paragraphs. */
  story: string[];
  /** Public contact address. Choose an address you are happy to publish. */
  email: string;
  /** Public phone number as written for people, e.g. "(555) 010-2040". Set to '' to hide it. */
  phone: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    /** ISO 3166-1 alpha-2, e.g. "US". */
    country: string;
    /** Optional landmark or cross streets shown under the address, e.g. "Corner of 7th Avenue and 47th Street". */
    note?: string;
  };
  /** How to find you: transit, parking, landmarks. */
  directions: string[];
  /** Local times in the café's time zone, which is set by `timeZone` in site.config.json. */
  hours: OpeningHours[];
  /** Optional one-off notice such as holiday hours. Set to '' to hide it. */
  notice: string;
  amenities: Amenity[];
  /** Decorative "now spinning" playlist. Use fictitious or properly licensed track names. */
  playlist: Track[];
  faqs: Faq[];
  /** Public profiles. Leave `url` empty to hide an entry. */
  links: CafeLink[];
}

export const cafe: Cafe = {
  name: 'Lofi Café',
  tagline: 'Slow coffee · soft beats · good company',
  introduction:
    'A small neighbourhood café for slow mornings and late study sessions. Pull up a chair by the rainy window — the kettle’s always on.',
  story: [
    'Lofi Café started with a secondhand espresso machine, a crate of old records and a simple idea: a place where nobody rushes you out.',
    'We roast in small batches with a local roaster, bake every morning before sunrise and keep the music low so you can hear yourself think. Stay for one cup or the whole afternoon.',
  ],
  email: 'hello@example.com',
  phone: '(555) 010-2040',
  address: {
    street: '20 Times Square',
    locality: 'New York',
    region: 'NY',
    postalCode: '10036',
    country: 'US',
    note: 'Northeast corner of 7th Avenue and 47th Street',
  },
  directions: [
    'A five-minute walk from Times Sq–42 St station (1, 2, 3, 7, N, Q, R, W and S trains) — head north up 7th Avenue.',
    'From 49 St station (N, Q, R, W), walk two blocks south. Citi Bike docks are on 47th Street.',
    'Step-free entrance on 7th Avenue and an accessible restroom.',
  ],
  hours: [
    { day: 'Monday', opens: '07:00', closes: '18:00' },
    { day: 'Tuesday', opens: '07:00', closes: '18:00' },
    { day: 'Wednesday', opens: '07:00', closes: '18:00' },
    { day: 'Thursday', opens: '07:00', closes: '22:00' },
    { day: 'Friday', opens: '07:00', closes: '22:00' },
    { day: 'Saturday', opens: '08:00', closes: '22:00' },
    { day: 'Sunday', opens: '09:00', closes: '16:00' },
  ],
  notice: '',
  amenities: [
    { icon: 'wifi', title: 'Fast, free Wi‑Fi', detail: 'The password is on the chalkboard by the till.' },
    { icon: 'plug', title: 'A plug at every table', detail: 'Laptops welcome all day — quiet study tables at the back.' },
    { icon: 'vinyl', title: 'Records, not playlists', detail: 'Low-volume lofi on vinyl. Requests taken from the crate.' },
    { icon: 'book', title: 'Swap shelf', detail: 'Leave a book, take a book. Zines and comics too.' },
    { icon: 'paw', title: 'Dog friendly', detail: 'Water bowls and pup treats at the door.' },
    { icon: 'moon', title: 'Late nights', detail: 'Candles, cocoa and decaf until 10pm Thursday to Saturday.' },
  ],
  playlist: [
    { title: 'Rain on the Window', artist: 'Sleepy Kettle', length: '2:48' },
    { title: 'Oat Milk Afternoon', artist: 'Lantern Club', length: '3:12' },
    { title: 'Pages & Steam', artist: 'Mx. Midnight', length: '2:31' },
    { title: 'Last Bus Home', artist: 'The Soft Static', length: '3:05' },
  ],
  faqs: [
    {
      question: 'Can I work or study here?',
      answer: 'Absolutely. Every table has power and the Wi‑Fi is free. On busy weekend mornings we kindly ask laptop users to share larger tables.',
    },
    {
      question: 'Do you have dairy-free and gluten-free options?',
      answer: 'Yes — oat, soy and almond milk are always available, and the menu marks vegan, vegetarian and gluten-free items. Our kitchen handles nuts and gluten, so please ask us about allergies.',
    },
    {
      question: 'Do you take bookings?',
      answer: 'Tables are first come, first served. For study groups, small events or catering orders, send us a message and we’ll get back to you.',
    },
    {
      question: 'Can I bring my dog?',
      answer: 'Well-behaved dogs are always welcome inside and on the patio.',
    },
  ],
  links: [
    // Add your public profiles. Entries with an empty URL are hidden, so no dead links ship.
    { label: 'Instagram', url: '' },
    { label: 'TikTok', url: '' },
    { label: 'Google Maps', url: '' },
  ],
};

/** Profile links that have a URL. */
export const publicLinks = cafe.links.filter(link => link.url.trim() !== '');

/** Single-line postal address. */
export function formatAddress(address = cafe.address): string {
  return `${address.street}, ${address.locality}, ${address.region} ${address.postalCode}`;
}

/** "07:30" → "7:30am", "18:00" → "6pm". */
export function formatTime(value: string): string {
  const [h, m] = value.split(':').map(Number);
  const suffix = h >= 12 && h < 24 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
}

/** "7am – 6pm" or "Closed". */
export function formatHours(entry: OpeningHours): string {
  return entry.opens && entry.closes ? `${formatTime(entry.opens)} – ${formatTime(entry.closes)}` : 'Closed';
}

/** Consecutive days with the same hours, e.g. [{ label: 'Mon – Wed', hours: '7am – 6pm' }]. */
export function groupedHours(hours = cafe.hours): { label: string; hours: string }[] {
  const groups: { days: Day[]; hours: string }[] = [];
  for (const entry of hours) {
    const text = formatHours(entry);
    const last = groups.at(-1);
    if (last && last.hours === text) last.days.push(entry.day);
    else groups.push({ days: [entry.day], hours: text });
  }
  const short = (day: Day) => day.slice(0, 3);
  return groups.map(group => ({
    label: group.days.length === 1 ? group.days[0] : `${short(group.days[0])} – ${short(group.days.at(-1)!)}`,
    hours: group.hours,
  }));
}

/** Minutes after midnight for "HH:MM". */
export function toMinutes(value: string): number {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
}

export type OpenState = { open: true; closes: string } | { open: false; next?: { day: Day; opens: string } };

/**
 * Whether the café is open at a given local day/time. Pure, so it is unit tested and
 * the browser only supplies the current time in the café's time zone.
 */
export function openState(day: Day, minutes: number, hours = cafe.hours): OpenState {
  const today = hours.find(entry => entry.day === day);
  if (today?.opens && today.closes && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, closes: today.closes };
  }
  const start = DAYS.indexOf(day);
  for (let offset = 0; offset < 8; offset++) {
    const candidate = DAYS[(start + offset) % 7];
    const entry = hours.find(item => item.day === candidate);
    if (!entry?.opens || !entry.closes) continue;
    if (offset === 0 && minutes >= toMinutes(entry.opens)) continue;
    return { open: false, next: { day: candidate, opens: entry.opens } };
  }
  return { open: false };
}
