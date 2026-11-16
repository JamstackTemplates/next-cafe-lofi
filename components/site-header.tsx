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
    <header className="site-header">
      <div className="wrap site-header__inner">
        <SiteLink href="/" className="brand">
          <Logo />
          <span className="brand__name">{cafe.name}</span>
        </SiteLink>
        <div className="site-header__actions">
          <nav aria-label="Main">
            <ul className="site-nav">
              {navigation.map(item => (
                <li key={item.href}>
                  <SiteLink href={item.href} markCurrent="section">{item.label}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>
          <DarkModeToggle className="theme-toggle" />
        </div>
      </div>
    </header>
  );
}
