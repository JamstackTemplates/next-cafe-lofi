import type { SVGProps } from 'react';
import type { Amenity } from '../content/cafe';

// Small hand-drawn style line icons. Decorative: always paired with visible text.
type IconName = Amenity['icon'] | 'clock' | 'pin' | 'phone' | 'mail' | 'arrow' | 'sparkle' | 'hot' | 'iced' | 'filter';

const paths: Record<IconName, React.ReactNode> = {
  wifi: <><path d="M3.5 9.5a12 12 0 0 1 17 0" /><path d="M6.5 12.8a7.5 7.5 0 0 1 11 0" /><path d="M9.5 16a3.2 3.2 0 0 1 5 0" /><circle cx="12" cy="19" r="1" fill="currentColor" /></>,
  plug: <><path d="M9 3v4M15 3v4" /><path d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0z" /><path d="M12 16v5" /></>,
  book: <><path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5V19c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z" /><path d="M12 6v13.5" /></>,
  paw: <><ellipse cx="12" cy="16" rx="4.2" ry="3.4" /><circle cx="6.2" cy="11" r="1.7" /><circle cx="9.5" cy="7.3" r="1.7" /><circle cx="14.5" cy="7.3" r="1.7" /><circle cx="17.8" cy="11" r="1.7" /></>,
  vinyl: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="2.5" /><path d="M7.5 8.6a5.5 5.5 0 0 1 3-2" /></>,
  leaf: <><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" /><path d="M5 19l8-8" /></>,
  moon: <><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z" /><path d="M17 4.5v2M16 5.5h2" /></>,
  cup: <><path d="M4.5 9h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z" /><path d="M16.5 10.5h1.5a2.5 2.5 0 0 1 0 5h-1.8" /><path d="M8.5 3.5c-1 1 1 2 0 3.2M12.5 3.5c-1 1 1 2 0 3.2" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="M4.5 7l7.5 6 7.5-6" /></>,
  arrow: <><path d="M5 12h13" /><path d="M13 7l5 5-5 5" /></>,
  sparkle: <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />,
  hot: <><path d="M8 20c-2-2.5 2-4.5 0-7M12 20c-2-2.5 2-4.5 0-7M16 20c-2-2.5 2-4.5 0-7" /><path d="M9 9c-1-1.5 1-2.5 0-4M15 9c-1-1.5 1-2.5 0-4" /></>,
  iced: <><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" /><path d="M9.5 4.5L12 6l2.5-1.5M9.5 19.5L12 18l2.5 1.5" /></>,
  filter: <><path d="M4 6h16M7 12h10M10 18h4" /></>,
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {paths[name]}
    </svg>
  );
}
