import type { CSSProperties, ReactNode } from 'react';
import type { Art } from '../content/menu';

// Little illustrations for menu items, drawn on a 64×64 grid.
// `color` tints the drink or bake; outlines and ceramics come from theme tokens in tailwind.input.css.

const line = { stroke: 'var(--art-line)', strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;
const shine = 'rgba(255,255,255,.45)';
const shade = 'rgba(40,20,30,.18)';

const steam = (
  <g className="art-steam" fill="none" stroke="var(--art-steam)" strokeWidth="2" strokeLinecap="round">
    <path d="M26 15c-3-3 3-5 0-9" />
    <path d="M34 17c-3-3 3-5 0-9" />
  </g>
);

const drawings: Record<Art, (color: string) => ReactNode> = {
  cup: color => (
    <>
      <ellipse cx="31" cy="51" rx="22" ry="5" fill="var(--art-ceramic)" {...line} />
      <path d="M45 31c8 0 8 10 0 10" fill="none" {...line} strokeWidth="3" />
      <path d="M15 28h31v8c0 8-6.5 13-14 13h-3c-7.5 0-14-5-14-13z" fill="var(--art-ceramic)" {...line} />
      <ellipse cx="30.5" cy="28.5" rx="15.5" ry="4" fill={color} {...line} />
      <path d="M30.5 31c-3-2-4-3.3-2.5-4.3 1.2-.7 2.5.2 2.5 1 0-.8 1.3-1.7 2.5-1 1.5 1-.5 2.3-2.5 4.3z" fill={shine} />
      <path d="M19 36c.5 5 3 8 7 9.5" fill="none" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
      {steam}
    </>
  ),
  mug: color => (
    <>
      <path d="M44 27c9 0 9 15 0 15" fill="none" {...line} strokeWidth="3.5" />
      <rect x="16" y="22" width="29" height="32" rx="7" fill={color} {...line} />
      <ellipse cx="30.5" cy="23" rx="13.5" ry="3.4" fill="var(--art-foam)" {...line} strokeWidth="1.6" />
      <path d="M21 30v16" stroke={shine} strokeWidth="3" strokeLinecap="round" />
      <path d="M16 47h29v.5c0 3.6-3 6.5-6.5 6.5h-16c-3.6 0-6.5-2.9-6.5-6.5z" fill={shade} />
      {steam}
    </>
  ),
  glass: color => (
    <>
      <path d="M40 4l-6 38" stroke="var(--art-straw)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M17 14h30l-3.2 39.5a4 4 0 0 1-4 3.5H24.2a4 4 0 0 1-4-3.5z" fill="var(--art-glass)" />
      <path d="M18.4 26h27.2l-2.3 27.4a3.5 3.5 0 0 1-3.5 3.1H24.2a3.5 3.5 0 0 1-3.5-3.1z" fill={color} />
      <rect x="22" y="24" width="9" height="9" rx="2" fill={shine} transform="rotate(-12 26 28)" />
      <rect x="32" y="29" width="8" height="8" rx="2" fill={shine} transform="rotate(14 36 33)" />
      <path d="M17 14h30l-3.2 39.5a4 4 0 0 1-4 3.5H24.2a4 4 0 0 1-4-3.5z" fill="none" {...line} />
      <path d="M22.5 18l1.6 22" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  teapot: color => (
    <>
      <path d="M46 34c6-2 8-8 10-11" fill="none" {...line} strokeWidth="4" />
      <path d="M14 30c-8 0-8 14 1 14" fill="none" {...line} strokeWidth="3.5" />
      <ellipse cx="31" cy="39" rx="18" ry="14" fill={color} {...line} />
      <path d="M21 25.5c2-3 6-4.5 10-4.5s8 1.5 10 4.5" fill="var(--art-ceramic)" {...line} />
      <circle cx="31" cy="18.5" r="3" fill="var(--art-ceramic)" {...line} />
      <path d="M19 37c0-4 2.5-7 5.5-8.5" fill="none" stroke={shine} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="31" cy="53" rx="14" ry="2.5" fill={shade} />
    </>
  ),
  croissant: color => (
    <>
      <path d="M8 40c2-10 10-18 24-18s22 8 24 18c-4 4-10 3-12 1-3 4-8 5-12 5s-9-1-12-5c-2 2-8 3-12-1z" fill={color} {...line} />
      <path d="M20 41c1-7 3-12 6-16M44 41c-1-7-3-12-6-16M32 46V24" fill="none" stroke={shade} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 31c3-3 7-5 11-6" fill="none" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  cookie: color => (
    <>
      <circle cx="32" cy="34" r="20" fill={color} {...line} />
      <circle cx="25" cy="28" r="2.6" fill="var(--art-foam)" />
      <circle cx="38" cy="25" r="2.2" fill="var(--art-foam)" />
      <circle cx="40" cy="39" r="2.8" fill="var(--art-foam)" />
      <circle cx="28" cy="42" r="2.2" fill="var(--art-foam)" />
      <circle cx="33" cy="33" r="1.6" fill={shade} />
      <path d="M17 30c1-5 4-9 8-11" fill="none" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  cake: color => (
    <>
      <path d="M15 34h34l-4 20H19z" fill="var(--art-paper)" {...line} />
      <path d="M22 35l2 18M32 35v18M42 35l-2 18" stroke={shade} strokeWidth="2" />
      <path d="M12 35c0-10 9-17 20-17s20 7 20 17c0 2-2 3-4 3H16c-2 0-4-1-4-3z" fill={color} {...line} />
      <path d="M19 28c2-3 5-5 9-6" fill="none" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="26" r="1.8" fill={shine} /><circle cx="42" cy="31" r="1.5" fill={shine} />
    </>
  ),
  toast: color => (
    <>
      <path d="M14 52V30c-5-1-6-8-2-12 4-5 12-7 20-7s16 2 20 7c4 4 3 11-2 12v22a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3z" fill="var(--art-bread)" {...line} />
      <path d="M19 32c-3-2-3-7 1-9 3-2 7-3 12-3s9 1 12 3c4 2 4 7 1 9v16H19z" fill={color} />
      <circle cx="26" cy="34" r="2" fill={shine} /><circle cx="36" cy="30" r="1.6" fill={shade} /><circle cx="38" cy="40" r="2.2" fill={shine} />
      <circle cx="28" cy="43" r="1.4" fill={shade} />
    </>
  ),
  bowl: color => (
    <>
      <path d="M17 32c0-6 7-11 15-11s15 5 15 11" fill={color} {...line} />
      <circle cx="25" cy="27" r="3" fill="var(--art-berry)" /><circle cx="33" cy="24" r="3" fill="var(--art-berry)" /><circle cx="40" cy="28" r="2.6" fill="var(--art-leaf)" />
      <path d="M9 32h46c0 12-10 21-23 21S9 44 9 32z" fill="var(--art-ceramic)" {...line} />
      <path d="M15 37c2 6 6 10 11 11.5" fill="none" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  onigiri: color => (
    <>
      <path d="M32 12c4 0 6 3 9 8l10 18c3 6-1 12-8 12H21c-7 0-11-6-8-12l10-18c3-5 5-8 9-8z" fill={color} {...line} />
      <path d="M23 50h18v-11a4 4 0 0 0-4-4H27a4 4 0 0 0-4 4z" fill="var(--art-nori)" {...line} strokeWidth="1.6" />
      <path d="M24 23c2-3 4-5 6-6" fill="none" stroke={shine} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="27" r="1" fill={shade} /><circle cx="22" cy="31" r="1" fill={shade} />
    </>
  ),
  mochi: color => (
    <>
      <ellipse cx="32" cy="52" rx="24" ry="4" fill={shade} />
      <circle cx="20" cy="40" r="11" fill={color} {...line} />
      <circle cx="44" cy="40" r="11" fill="var(--art-leaf)" {...line} />
      <circle cx="32" cy="26" r="11" fill="var(--art-sesame)" {...line} />
      <path d="M14 36c1-3 3-5 6-5.5M38 36c1-3 3-5 6-5.5M26 22c1-3 3-5 6-5.5" fill="none" stroke={shine} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
};

/** Decorative drawing for a menu item, sat on a soft tinted disc. */
export function MenuArt({ art, color, size = 64, className = '' }: { art: Art; color: string; size?: number; className?: string }) {
  return (
    <span className={`menu-art ${className}`} style={{ '--art-tint': color, width: size, height: size } as CSSProperties} aria-hidden="true">
      <svg viewBox="0 0 64 64" width={size} height={size} focusable="false">{drawings[art](color)}</svg>
    </span>
  );
}
