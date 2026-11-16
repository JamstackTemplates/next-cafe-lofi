import type { Diet, MenuItem, MenuSection } from '../content/menu';

/** Filters offered on the menu page. Each one narrows the menu; several together must all match. */
export type DietFilter = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'nut-free';

export const DIET_FILTERS: { id: DietFilter; label: string }[] = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'dairy-free', label: 'Dairy-free' },
  { id: 'nut-free', label: 'Nut-free' },
];

function has(item: MenuItem, diet: Diet): boolean {
  return item.diet?.includes(diet) ?? false;
}

/** Vegan items count as vegetarian and dairy-free even when not tagged twice. */
export function matchesFilter(item: MenuItem, filter: DietFilter): boolean {
  switch (filter) {
    case 'vegan': return has(item, 'vegan');
    case 'vegetarian': return has(item, 'vegetarian') || has(item, 'vegan');
    case 'gluten-free': return has(item, 'gluten-free');
    case 'dairy-free': return has(item, 'dairy-free') || has(item, 'vegan');
    case 'nut-free': return !has(item, 'contains-nuts');
  }
}

export function matchesAll(item: MenuItem, filters: readonly DietFilter[]): boolean {
  return filters.every(filter => matchesFilter(item, filter));
}

/** Count of visible items per section for the active filters. */
export function visibleCounts(sections: readonly MenuSection[], filters: readonly DietFilter[]): Record<string, number> {
  return Object.fromEntries(sections.map(section => [section.id, section.items.filter(item => matchesAll(item, filters)).length]));
}
