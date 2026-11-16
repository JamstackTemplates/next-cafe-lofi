'use client';

import { useState } from 'react';
import { DIETS, formatPrice, isAvailable, menu, type MenuItem } from '../content/menu';
import { DIET_FILTERS, matchesAll, visibleCounts, type DietFilter } from '../lib/menu-filter';
import { Icon } from './icons';
import { MenuArt } from './menu-art';

const BADGES: Record<NonNullable<MenuItem['badge']>, string> = { signature: 'House signature', seasonal: 'Seasonal', new: 'New' };
const SERVE: Record<NonNullable<MenuItem['serve']>, string> = { hot: 'Hot', iced: 'Iced', 'hot-or-iced': 'Hot or iced' };

function Price({ item }: { item: MenuItem }) {
  if (typeof item.price === 'number') return <span className="menu-item__price">{formatPrice(item.price)}</span>;
  return (
    <span className="menu-item__price menu-item__price--sizes">
      {item.price.map(size => (
        <span key={size.label}><span className="menu-item__size">{size.label}</span> {formatPrice(size.amount)}</span>
      ))}
    </span>
  );
}

function Item({ item }: { item: MenuItem }) {
  const available = isAvailable(item);
  return (
    <li id={item.id} className="menu-item" data-available={available}>
      <MenuArt art={item.art} color={item.color} size={58} />
      <div className="menu-item__body">
        <div className="menu-item__head">
          <h3 className="menu-item__name">{item.name}</h3>
          <span className="menu-item__leader" aria-hidden="true" />
          <Price item={item} />
        </div>
        <p className="menu-item__desc">{item.description}</p>
        <p className="menu-item__meta">
          {!available ? <span className="sticker sticker--soldout">Sold out today</span> : null}
          {item.badge ? <span className={`sticker sticker--${item.badge}`}>{BADGES[item.badge]}</span> : null}
          {item.serve ? (
            <span className="serve">
              <Icon name={item.serve === 'iced' ? 'iced' : 'hot'} width={14} height={14} />{SERVE[item.serve]}
            </span>
          ) : null}
          {item.diet?.map(diet => (
            <abbr key={diet} className={`diet diet--${diet}`} title={DIETS[diet].label}>{DIETS[diet].short}</abbr>
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
    <div className="menu-board">
      <div className="menu-tools">
        <nav className="menu-tools__sections" aria-label="Menu sections">
          {menu.sections.map(section => (
            <a key={section.id} href={`#${section.id}`} className="chip">
              {section.title}
              {filters.length ? <span className="chip__count">{counts[section.id]}</span> : null}
            </a>
          ))}
        </nav>
        <div className="menu-tools__filters" role="group" aria-label="Dietary filters">
          <span className="menu-tools__label"><Icon name="filter" width={16} height={16} />Show only</span>
          {DIET_FILTERS.map(filter => (
            <button key={filter.id} type="button" className="chip chip--toggle" aria-pressed={filters.includes(filter.id)} onClick={() => toggle(filter.id)}>
              {filter.label}
            </button>
          ))}
          {filters.length ? <button type="button" className="chip chip--clear" onClick={() => setFilters([])}>Clear</button> : null}
        </div>
        <p className="visually-hidden" role="status" aria-live="polite">
          {filters.length ? `${total} items match.` : ''}
        </p>
      </div>

      {menu.sections.map(section => (
        <section key={section.id} id={section.id} className="menu-section" aria-labelledby={`${section.id}-title`}>
          <header className="menu-section__head">
            <h2 id={`${section.id}-title`} className="menu-section__title">{section.title}</h2>
            <p className="menu-section__desc">{section.description}</p>
          </header>
          {counts[section.id] ? (
            <ul className="menu-list">
              {section.items.filter(item => matchesAll(item, filters)).map(item => <Item key={item.id} item={item} />)}
            </ul>
          ) : (
            <p className="menu-section__empty">Nothing here matches those filters — ask us, we can often adapt a drink.</p>
          )}
        </section>
      ))}
    </div>
  );
}
