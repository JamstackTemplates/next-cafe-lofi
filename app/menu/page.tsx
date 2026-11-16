import type { Metadata } from 'next';
import { MenuBoard } from '../../components/menu-board';
import { SiteLink } from '../../components/site-link';
import { cafe } from '../../content/cafe';
import { formatPrice, menu } from '../../content/menu';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Menu',
  description: `Coffee, tea, cold drinks, bakes and snacks at ${cafe.name}.`,
  alternates: { canonical: absoluteUrl('/menu/') },
};

export default function MenuPage() {
  return (
    <>
      <header className="wrap page-head">
        <p className="eyebrow">Menu</p>
        <h1 className="page-head__title">Something warm, <em>something sweet</em></h1>
        <p className="lede">
          Everything is made here, by hand, in small batches. Sizes and prices are below; the bakes change with the
          seasons, so ask what’s fresh from the oven.
        </p>
      </header>

      <div className="wrap menu-layout">
        <MenuBoard />

        <aside className="menu-aside" aria-labelledby="extras-title">
          <div className="extras">
            <h2 id="extras-title" className="subhead">Make it yours</h2>
            <ul className="extras__list">
              {menu.extras.map(extra => (
                <li key={extra.name}><span>{extra.name}</span><span className="extras__price">{extra.price ? `+${formatPrice(extra.price)}` : 'Free'}</span></li>
              ))}
            </ul>
          </div>
          <div className="extras extras--notes">
            {menu.notes.map(note => <p key={note}>{note}</p>)}
            <p><SiteLink href="/contact/" className="text-link">Ordering for a group? Tell us</SiteLink></p>
          </div>
        </aside>
      </div>
    </>
  );
}
