'use client';

import { useState } from 'react';
import { DIETS, formatPrice, isAvailable, menu, type MenuItem } from '../content/menu';
import { DIET_FILTERS, matchesAll, visibleCounts, type DietFilter } from '../lib/menu-filter';
import { Icon } from './icons';
import { MenuArt } from './menu-art';

const BADGES: Record<NonNullable<MenuItem['badge']>, string> = { signature: 'House signature', seasonal: 'Seasonal', new: 'New' };
const SERVE: Record<NonNullable<MenuItem['serve']>, string> = { hot: 'Hot', iced: 'Iced', 'hot-or-iced': 'Hot or iced' };

const chipSmall = 'chip min-h-[2.1rem] py-0.5 text-[.88rem]';

function Price({ item, dim }: { item: MenuItem; dim: boolean }) {
  const base = `font-mono font-bold whitespace-nowrap text-accent ${dim ? 'opacity-60' : ''}`;
  if (typeof item.price === 'number') return <span className={base}>{formatPrice(item.price)}</span>;
  return (
    <span className={`${base} grid justify-items-end gap-px text-[.92rem]`}>
      {item.price.map(size => (
        <span key={size.label}><span className="text-[.8rem] font-medium text-muted">{size.label}</span> {formatPrice(size.amount)}</span>
      ))}
    </span>
  );
}

function Item({ item }: { item: MenuItem }) {
  const available = isAvailable(item);
  return (
    <li id={item.id} data-available={available}
      className="menu-item card flex scroll-mt-28 items-start gap-3 rounded-card p-3.5 transition hover:border-accent-2/45 hover:shadow-card data-[available=false]:bg-surface-2 sm:gap-4 sm:px-[1.1rem] sm:py-4">
      <MenuArt art={item.art} color={item.color} size={58} className="max-sm:size-[46px]!" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className={`text-[1.18rem] leading-tight ${available ? '' : 'opacity-60'}`}>{item.name}</h3>
          <span className="min-w-4 flex-1 -translate-y-1 border-b-2 border-dotted border-line" aria-hidden="true" />
          <Price item={item} dim={!available} />
        </div>
        <p className="mt-1 text-[.95rem] leading-normal text-muted">{item.description}</p>
        <p className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {!available ? <span className="sticker sticker-soldout">Sold out today</span> : null}
          {item.badge ? <span className={`sticker sticker-${item.badge}`}>{BADGES[item.badge]}</span> : null}
          {item.serve ? (
            <span className="mr-1 inline-flex items-center gap-1 text-[.8rem] font-bold text-muted">
              <Icon name={item.serve === 'iced' ? 'iced' : 'hot'} width={14} height={14} />{SERVE[item.serve]}
            </span>
          ) : null}
          {item.diet?.map(diet => (
            <abbr key={diet} title={DIETS[diet].label}
              className={`inline-grid h-6 min-w-7 cursor-help place-items-center rounded-[7px] border-[1.5px] px-1.5 text-[.7rem] font-extrabold tracking-wide ${
                diet === 'vegan' ? 'border-sage/50 bg-sage-soft text-sage' : 'border-line text-muted'} ${diet === 'contains-nuts' ? 'border-dashed' : ''}`}>
              {DIETS[diet].short}
            </abbr>
          ))}
        </p>
      </div>
    </li>
  );
}

/**
 * The full menu with section shortcuts and dietary filters. The complete menu is in the static
 * HTML; filtering is a progressive enhancement that only hides non-matching items.
 */
export function MenuBoard() {
  const [filters, setFilters] = useState<DietFilter[]>([]);
  const counts = visibleCounts(menu.sections, filters);
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  const toggle = (id: DietFilter) =>
    setFilters(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);

  return (
    <div>
      <div className="sticky top-(--header-h) z-20 mb-4 grid gap-2.5 border-b border-line bg-bg/90 py-3.5 backdrop-blur-md print:hidden">
        <nav className="scrollbar-none flex gap-2 overflow-x-auto p-0.5" aria-label="Menu sections">
          {menu.sections.map(section => (
            <a key={section.id} href={`#${section.id}`} className={chipSmall}>
              {section.title}
              {filters.length ? (
                <span className="min-w-[1.4rem] rounded-full bg-accent-2-soft px-1.5 text-center text-[.78rem] text-accent-2">{counts[section.id]}</span>
              ) : null}
            </a>
          ))}
        </nav>
        <div className="scrollbar-none flex gap-2 overflow-x-auto p-0.5" role="group" aria-label="Dietary filters">
          <span className="inline-flex items-center gap-1.5 pr-1 text-[.85rem] font-bold whitespace-nowrap text-muted"><Icon name="filter" width={16} height={16} />Show only</span>
          {DIET_FILTERS.map(filter => (
            <button key={filter.id} type="button" className={chipSmall} aria-pressed={filters.includes(filter.id)} onClick={() => toggle(filter.id)}>
              {filter.label}
            </button>
          ))}
          {filters.length ? <button type="button" className={`${chipSmall} border-dashed text-muted`} onClick={() => setFilters([])}>Clear</button> : null}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {filters.length ? `${total} items match.` : ''}
        </p>
      </div>

      {menu.sections.map(section => (
        <section key={section.id} id={section.id} className="scroll-mt-20 pt-8 pb-4" aria-labelledby={`${section.id}-title`}>
          <header className="mb-5 grid gap-1.5">
            <h2 id={`${section.id}-title`} className="text-[clamp(1.9rem,3.6vw,2.6rem)] italic after:mt-2.5 after:block after:h-1 after:w-14 after:rounded after:bg-linear-to-r after:from-accent after:to-accent-2">
              {section.title}
            </h2>
            <p className="text-muted">{section.description}</p>
          </header>
          {counts[section.id] ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,21rem),1fr))] gap-3.5">
              {section.items.filter(item => matchesAll(item, filters)).map(item => <Item key={item.id} item={item} />)}
            </ul>
          ) : (
            <p className="rounded-ui border-[1.5px] border-dashed border-line p-5 text-muted">Nothing here matches those filters — ask us, we can often adapt a drink.</p>
          )}
        </section>
      ))}
    </div>
  );
}
