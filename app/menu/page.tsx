import type { Metadata } from 'next';
import { MenuBoard } from '../../components/menu-board';
import { PageHead } from '../../components/page-head';
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
      <PageHead eyebrow="Menu" title={<>Something warm, <em>something sweet</em></>}>
        <p>
          Everything is made here, by hand, in small batches. Sizes and prices are below; the bakes change with the
          seasons, so ask what’s fresh from the oven.
        </p>
      </PageHead>

      <div className="wrap grid items-start gap-[clamp(1.5rem,4vw,3rem)] pb-(--space-section) lg:grid-cols-[minmax(0,1fr)_17.5rem]">
        <MenuBoard />

        <aside className="mt-4 grid gap-4 max-lg:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]" aria-labelledby="extras-title">
          <div className="card p-[1.4rem]">
            <h2 id="extras-title" className="mb-3 text-[1.3rem]">Make it yours</h2>
            <ul>
              {menu.extras.map(extra => (
                <li key={extra.name} className="flex justify-between gap-4 border-b border-dashed border-line py-2 text-[.95rem]">
                  <span>{extra.name}</span>
                  <span className="font-mono whitespace-nowrap text-accent">{extra.price ? `+${formatPrice(extra.price)}` : 'Free'}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 rounded-card bg-accent-2-soft p-[1.4rem] text-[.9rem] text-muted">
            {menu.notes.map(note => <p key={note}>{note}</p>)}
            <p><SiteLink href="/contact/" className="text-link">Ordering for a group? Tell us</SiteLink></p>
          </div>
        </aside>
      </div>
    </>
  );
}
