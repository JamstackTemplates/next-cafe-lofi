import { DarkModeToggle } from 'jamstacks';
import { cafe } from '../content/cafe';
import { Logo } from './logo';
import { SiteLink } from './site-link';

const navigation = [
  { href: '/menu/', label: 'Menu' },
  { href: '/#find-us', label: 'Find us' },
  { href: '/contact/', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md backdrop-saturate-150">
      <div className="wrap flex min-h-(--header-h) items-center justify-between gap-4">
        <SiteLink href="/" className="inline-flex items-center gap-2.5 no-underline">
          <Logo className="max-xs:hidden max-[340px]:block max-sm:size-7" />
          <span className="font-display font-soft text-xl font-bold whitespace-nowrap italic max-[340px]:hidden sm:text-[1.45rem]">{cafe.name}</span>
        </SiteLink>
        <div className="flex items-center gap-1 sm:gap-3 print:hidden">
          <nav aria-label="Main">
            <ul className="flex gap-1">
              {navigation.map(item => (
                <li key={item.href}>
                  <SiteLink href={item.href} markCurrent="section"
                    className="inline-block rounded-full px-2 py-1.5 font-bold text-muted no-underline transition-colors hover:bg-surface-2 hover:text-ink aria-[current]:bg-accent-soft aria-[current]:text-ink xs:px-2.5 sm:px-3.5">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <DarkModeToggle className="flex-none" />
        </div>
      </div>
    </header>
  );
}
