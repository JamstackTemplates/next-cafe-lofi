// Content invariants for the café and its menu. Runs with Node's built-in TypeScript type stripping.
// When one of these fails after an edit, the message names the item or day to fix.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { cafe, DAYS, formatAddress, formatTime, groupedHours, openState, publicLinks, toMinutes } from '../content/cafe.ts';
import { allItems, DIETS, featuredItems, formatPrice, menu, startingPrice, type Art } from '../content/menu.ts';
import { matchesAll, matchesFilter, visibleCounts } from '../lib/menu-filter.ts';
import { timeZoneLabel } from '../lib/time-zone.ts';
import { mapDirectionsUrl, mapEmbedUrl, mapSearchUrl } from '../lib/maps.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ARTS: Art[] = ['cup', 'mug', 'glass', 'teapot', 'croissant', 'cookie', 'cake', 'toast', 'bowl', 'onigiri', 'mochi'];

test('menu sections and items have unique, URL-safe ids', () => {
  assert.ok(menu.sections.length >= 1, 'Add at least one menu section.');
  const ids = [...menu.sections.map(section => section.id), ...allItems.map(item => item.id)];
  for (const id of ids) assert.match(id, SLUG, `"${id}" must be lowercase words joined by hyphens`);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert.deepEqual(duplicates, [], `ids must be unique across sections and items: ${duplicates.join(', ')}`);
});

test('every menu item is complete', () => {
  for (const section of menu.sections) {
    assert.ok(section.title.trim() && section.description.trim(), `section ${section.id}`);
    assert.ok(section.items.length >= 1, `section ${section.id} has no items`);
  }
  for (const item of allItems) {
    assert.ok(item.name.trim(), `${item.id}.name`);
    assert.ok(item.description.trim(), `${item.id}.description`);
    assert.ok(ARTS.includes(item.art), `${item.id}.art must be one of ${ARTS.join(', ')}`);
    assert.ok(item.color.trim(), `${item.id}.color`);
    for (const diet of item.diet ?? []) assert.ok(diet in DIETS, `${item.id} has unknown diet "${diet}"`);
    assert.equal(new Set(item.diet).size, item.diet?.length ?? 0, `${item.id} repeats a diet tag`);
  }
});

test('prices are positive numbers with at most two decimals, and sizes are labelled', () => {
  const valid = (amount: number) => Number.isFinite(amount) && amount > 0 && Math.round(amount * 100) === amount * 100;
  for (const item of allItems) {
    if (typeof item.price === 'number') {
      assert.ok(valid(item.price), `${item.id} price ${item.price}`);
    } else {
      assert.ok(item.price.length >= 1, `${item.id} needs at least one size`);
      for (const size of item.price) {
        assert.ok(size.label.trim(), `${item.id} size label`);
        assert.ok(valid(size.amount), `${item.id} ${size.label} price ${size.amount}`);
      }
      assert.equal(new Set(item.price.map(size => size.label)).size, item.price.length, `${item.id} repeats a size`);
    }
  }
  for (const extra of menu.extras) assert.ok(extra.price >= 0 && extra.name.trim(), `extra ${extra.name}`);
});

test('prices format in the menu currency', () => {
  assert.equal(formatPrice(4.5), '$4.50');
  assert.equal(formatPrice(4), '$4');
  assert.equal(formatPrice(0), 'Free');
  assert.equal(startingPrice({ ...allItems[0], price: [{ label: 'L', amount: 6 }, { label: 'S', amount: 5 }] }), 5);
  assert.doesNotThrow(() => new Intl.NumberFormat(menu.locale, { style: 'currency', currency: menu.currency }));
});

test('the home page has favourites to show', () => {
  assert.ok(featuredItems.length >= 3 && featuredItems.length <= 8, 'Mark 3–8 items with featured: true');
});

test('opening hours list each day once with valid times', () => {
  assert.deepEqual(cafe.hours.map(entry => entry.day), [...DAYS]);
  for (const entry of cafe.hours) {
    assert.equal(Boolean(entry.opens), Boolean(entry.closes), `${entry.day}: set both opens and closes, or neither`);
    if (entry.opens && entry.closes) {
      assert.match(entry.opens, /^([01]\d|2[0-3]):[0-5]\d$/, `${entry.day}.opens`);
      assert.match(entry.closes, /^([01]\d|2[0-3]):[0-5]\d$/, `${entry.day}.closes`);
      assert.ok(toMinutes(entry.opens) < toMinutes(entry.closes), `${entry.day} must open before it closes`);
    }
  }
});

test('hours format and group for people', () => {
  assert.equal(formatTime('07:00'), '7am');
  assert.equal(formatTime('07:30'), '7:30am');
  assert.equal(formatTime('12:00'), '12pm');
  assert.equal(formatTime('18:15'), '6:15pm');
  assert.equal(formatTime('00:00'), '12am');
  const groups = groupedHours([
    { day: 'Monday', opens: '07:00', closes: '18:00' }, { day: 'Tuesday', opens: '07:00', closes: '18:00' },
    { day: 'Wednesday' }, { day: 'Thursday', opens: '07:00', closes: '18:00' },
  ]);
  assert.deepEqual(groups, [
    { label: 'Mon – Tue', hours: '7am – 6pm' }, { label: 'Wednesday', hours: 'Closed' }, { label: 'Thursday', hours: '7am – 6pm' },
  ]);
});

test('open-now logic handles open, before opening, after closing and closed days', () => {
  const hours = [
    { day: 'Monday', opens: '07:00', closes: '18:00' }, { day: 'Tuesday' },
    { day: 'Wednesday', opens: '08:00', closes: '12:00' },
  ] as const;
  const list = hours.map(entry => ({ ...entry }));
  assert.deepEqual(openState('Monday', toMinutes('09:00'), list), { open: true, closes: '18:00' });
  assert.deepEqual(openState('Monday', toMinutes('06:59'), list), { open: false, next: { day: 'Monday', opens: '07:00' } });
  assert.deepEqual(openState('Monday', toMinutes('18:00'), list), { open: false, next: { day: 'Wednesday', opens: '08:00' } });
  assert.deepEqual(openState('Tuesday', toMinutes('10:00'), list), { open: false, next: { day: 'Wednesday', opens: '08:00' } });
  assert.deepEqual(openState('Wednesday', toMinutes('13:00'), list), { open: false, next: { day: 'Monday', opens: '07:00' } });
  assert.deepEqual(openState('Monday', 600, []), { open: false });
});

test('dietary filters: vegan implies vegetarian and dairy-free; nut-free excludes nuts', () => {
  const base = allItems[0];
  const vegan = { ...base, diet: ['vegan' as const] };
  const nuts = { ...base, diet: ['vegetarian' as const, 'contains-nuts' as const] };
  assert.ok(matchesFilter(vegan, 'vegetarian') && matchesFilter(vegan, 'dairy-free'));
  assert.ok(!matchesFilter(nuts, 'nut-free') && !matchesFilter(nuts, 'vegan'));
  assert.ok(matchesAll(vegan, []));
  assert.ok(!matchesAll(vegan, ['vegan', 'gluten-free']));
  const counts = visibleCounts(menu.sections, []);
  assert.equal(Object.values(counts).reduce((a, b) => a + b, 0), allItems.length);
});

test('contact details and links are publishable', () => {
  assert.match(cafe.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  for (const link of publicLinks) assert.match(link.url, /^https:\/\//, link.url);
  assert.ok(cafe.amenities.length >= 1 && cafe.faqs.length >= 1);
  assert.ok(existsSync(new URL('../public/og.png', import.meta.url)), 'public/og.png social image');
});

test('time zones read naturally next to the hours', () => {
  assert.equal(timeZoneLabel('America/Los_Angeles'), 'Pacific Time');
  assert.equal(timeZoneLabel('America/New_York'), 'Eastern Time');
  assert.equal(timeZoneLabel('Europe/London'), 'United Kingdom Time');
  assert.equal(timeZoneLabel('UTC'), 'UTC');
  assert.equal(timeZoneLabel(''), '');
  assert.ok(timeZoneLabel('Asia/Kolkata').length > 0);
});

test('the address is complete and Google Maps links are keyless and encoded', () => {
  for (const key of ['street', 'locality', 'region', 'postalCode', 'country'] as const) assert.ok(cafe.address[key].trim(), `address.${key}`);
  assert.match(cafe.address.country, /^[A-Z]{2}$/);
  const query = formatAddress();
  assert.equal(query, '20 Times Square, New York, NY 10036');
  assert.equal(mapSearchUrl('A & B, #1'), 'https://www.google.com/maps/search/?api=1&query=A%20%26%20B%2C%20%231');
  assert.ok(mapDirectionsUrl(query).startsWith('https://www.google.com/maps/dir/?api=1&destination=20%20Times%20Square'));
  assert.equal(mapEmbedUrl(query), 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s20+Times+Square%2C+New+York%2C+NY+10036!6i16');
  assert.ok(mapEmbedUrl('Shop! 1').includes('1sShop%21+1!6i16'));
  for (const url of [mapSearchUrl(query), mapDirectionsUrl(query), mapEmbedUrl(query)]) assert.doesNotMatch(url, /key=/);
});
