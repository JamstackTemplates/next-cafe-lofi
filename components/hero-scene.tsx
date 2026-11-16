// The home page illustration: a café window seat. Pure SVG coloured by theme tokens, so the
// same drawing becomes a pastel morning in light mode and a rainy night in dark mode.
// Decorative only — the page text carries all information.

const ARCH = 'M70 392V172A210 132 0 0 1 490 172V392Z';

/** Points along the fairy-light string (a quadratic curve). */
function bulbs(count: number) {
  const [x0, y0, cx, cy, x1, y1] = [96, 112, 280, 196, 464, 112];
  return Array.from({ length: count }, (_, index) => {
    const t = (index + 0.5) / count;
    const u = 1 - t;
    return { x: u * u * x0 + 2 * u * t * cx + t * t * x1, y: u * u * y0 + 2 * u * t * cy + t * t * y1 + 7 };
  });
}

// Skyline blocks: [x, top, width]. Far layer first.
const far: [number, number, number][] = [[64, 268, 40], [100, 250, 34], [130, 286, 46], [172, 236, 30], [200, 262, 52], [250, 226, 38], [286, 258, 44], [326, 240, 30], [352, 272, 50], [398, 230, 40], [436, 256, 60]];
const near: [number, number, number][] = [[60, 312, 56], [112, 290, 42], [150, 320, 64], [212, 300, 40], [248, 328, 58], [302, 296, 48], [346, 318, 40], [382, 292, 54], [432, 314, 66]];

function windows(x: number, top: number, width: number, seed: number) {
  const cells: { x: number; y: number; lit: boolean }[] = [];
  for (let row = 0, y = top + 10; y < 380; row++, y += 16) {
    for (let col = 0, wx = x + 8; wx + 6 < x + width - 4; col++, wx += 13) {
      cells.push({ x: wx, y, lit: ((row * 7 + col * 3 + seed) % 5) < 2 });
    }
  }
  return cells;
}

export function HeroScene() {
  return (
    <svg className="scene" viewBox="0 0 560 440" role="presentation" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="scene-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--sky-top)' }} />
          <stop offset=".65" style={{ stopColor: 'var(--sky-mid)' }} />
          <stop offset="1" style={{ stopColor: 'var(--sky-bottom)' }} />
        </linearGradient>
        <radialGradient id="scene-glow">
          <stop offset="0" style={{ stopColor: 'var(--lamp-glow)', stopOpacity: 0.9 }} />
          <stop offset="1" style={{ stopColor: 'var(--lamp-glow)', stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id="scene-sun">
          <stop offset=".55" style={{ stopColor: 'var(--sun)' }} />
          <stop offset="1" style={{ stopColor: 'var(--sun)', stopOpacity: 0 }} />
        </radialGradient>
        <mask id="scene-moon">
          <circle cx="372" cy="138" r="30" fill="#fff" />
          <circle cx="386" cy="128" r="26" fill="#000" />
        </mask>
        <clipPath id="scene-window"><path d={ARCH} /></clipPath>
      </defs>

      {/* Warm wall glow behind the window */}
      <circle className="scene__halo" cx="280" cy="230" r="236" />

      <g clipPath="url(#scene-window)">
        <rect x="60" y="30" width="440" height="370" fill="url(#scene-sky)" />

        {/* Day: sun and drifting clouds */}
        <g className="scene__day">
          <circle cx="378" cy="146" r="64" fill="url(#scene-sun)" />
          <circle cx="378" cy="146" r="30" fill="var(--sun-core)" />
          <g className="scene__clouds" fill="var(--cloud)">
            <path d="M118 182a18 18 0 0 1 30-14 24 24 0 0 1 44 6 14 14 0 0 1 4 27H124a12 12 0 0 1-6-19z" />
            <path d="M300 230a14 14 0 0 1 24-10 18 18 0 0 1 34 5 11 11 0 0 1 2 21h-55a9 9 0 0 1-5-16z" opacity=".8" />
          </g>
          <path className="scene__bird" d="M226 150q6-6 12 0q6-6 12 0" fill="none" stroke="var(--city-near)" strokeWidth="2.5" strokeLinecap="round" />
          <path className="scene__bird" d="M258 132q4-4 8 0q4-4 8 0" fill="none" stroke="var(--city-near)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Night: moon, stars and rain */}
        <g className="scene__night">
          <circle cx="372" cy="138" r="54" fill="url(#scene-glow)" opacity=".35" />
          <rect x="300" y="80" width="140" height="120" fill="var(--moon)" mask="url(#scene-moon)" />
          <g className="scene__stars" fill="var(--star)">
            {[[130, 120], [176, 92], [214, 150], [252, 84], [298, 120], [440, 196], [424, 112], [160, 200], [330, 176], [462, 150]].map(([x, y], index) => (
              <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 2.2 : 1.4} style={{ animationDelay: `${index * 0.37}s` }} />
            ))}
          </g>
        </g>

        {/* Skyline */}
        <g fill="var(--city-far)">
          {far.map(([x, top, width]) => <rect key={`f${x}`} x={x} y={top} width={width} height={400 - top} rx="2" />)}
          <rect x="262" y="206" width="4" height="22" /><rect x="410" y="214" width="3" height="18" />
        </g>
        <g fill="var(--city-near)">
          {near.map(([x, top, width]) => <rect key={`n${x}`} x={x} y={top} width={width} height={400 - top} rx="2" />)}
        </g>
        <g className="scene__lights">
          {near.flatMap(([x, top, width], index) => windows(x, top, width, index).map(cell => (
            <rect key={`${x}-${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width="6" height="8" rx="1"
              fill={cell.lit ? 'var(--window-lit)' : 'var(--window-dim)'} />
          )))}
        </g>

        <g className="scene__rain" stroke="var(--rain)" strokeWidth="1.6" strokeLinecap="round">
          {Array.from({ length: 34 }, (_, index) => {
            const x = 70 + ((index * 53) % 430);
            const y = 30 + ((index * 97) % 330);
            return <line key={index} x1={x} y1={y} x2={x - 6} y2={y + 18} />;
          })}
        </g>

        {/* Glass reflection */}
        <path d="M110 380L250 60h40L150 380z" fill="var(--glass-shine)" />
        <path d="M170 380L310 60h14L184 380z" fill="var(--glass-shine)" />
      </g>

      {/* Window frame and mullions */}
      <path d={ARCH} fill="none" stroke="var(--frame)" strokeWidth="16" />
      <path d="M280 40v352M70 238h420" stroke="var(--frame)" strokeWidth="9" />
      <path d={ARCH} fill="none" stroke="var(--frame-edge)" strokeWidth="2" transform="translate(0 0)" />

      {/* Fairy lights */}
      <path d="M96 112Q280 196 464 112" fill="none" stroke="var(--frame-edge)" strokeWidth="1.5" />
      <g className="scene__bulbs">
        {bulbs(11).map((bulb, index) => (
          <g key={index} style={{ animationDelay: `${(index % 4) * 0.6}s` }}>
            <circle cx={bulb.x} cy={bulb.y} r="9" fill="url(#scene-glow)" className="scene__bulb-glow" />
            <circle cx={bulb.x} cy={bulb.y} r="3.4" fill={index % 3 === 0 ? 'var(--bulb-a)' : index % 3 === 1 ? 'var(--bulb-b)' : 'var(--bulb-c)'} />
          </g>
        ))}
      </g>

      {/* Hanging lamp */}
      <line x1="520" y1="0" x2="520" y2="66" stroke="var(--frame)" strokeWidth="2" />
      <circle className="scene__lamp-glow" cx="520" cy="100" r="80" fill="url(#scene-glow)" />
      <path d="M494 92c0-16 12-26 26-26s26 10 26 26z" fill="var(--lamp)" />
      <ellipse cx="520" cy="94" rx="10" ry="5" fill="var(--lamp-bulb)" />

      {/* Sill */}
      <rect x="34" y="388" width="492" height="22" rx="6" fill="var(--wood)" />
      <rect x="44" y="408" width="472" height="10" rx="4" fill="var(--wood-shadow)" />

      {/* Plant */}
      <g>
        <path d="M120 352c-14-18-28-22-40-20 6 14 20 24 40 26z" fill="var(--leaf-2)" />
        <path d="M122 350c-4-26 4-46 20-56 6 20 0 42-16 58z" fill="var(--leaf)" />
        <path d="M126 352c10-20 26-28 42-26-4 16-20 28-40 30z" fill="var(--leaf-2)" />
        <path d="M118 354c-14-6-26-2-34 8 12 6 26 4 34-6z" fill="var(--leaf)" />
        <path d="M96 352h58l-7 38h-44z" fill="var(--pot)" />
        <rect x="92" y="348" width="66" height="10" rx="3" fill="var(--pot-rim)" />
        <path d="M100 384c-4 12-14 18-24 20" fill="none" stroke="var(--leaf-2)" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="76" cy="404" rx="6" ry="3.5" fill="var(--leaf)" transform="rotate(-30 76 404)" />
      </g>

      {/* Sleeping cat */}
      <g className="scene__cat">
        <path d="M196 390c-6-30 18-44 50-44s58 12 58 34c0 6-2 10-6 10z" fill="var(--cat)" />
        <path d="M222 352c8 6 10 20 6 36M250 348c8 8 10 24 6 40M276 352c6 8 8 22 4 36" fill="none" stroke="var(--cat-stripe)" strokeWidth="4" strokeLinecap="round" />
        <path d="M300 384c18 2 26-8 18-16" fill="none" stroke="var(--cat)" strokeWidth="9" strokeLinecap="round" />
        <circle cx="200" cy="372" r="21" fill="var(--cat)" />
        <path d="M184 360l-2-22 16 12zM206 352l10-18 6 22z" fill="var(--cat)" />
        <path d="M186 356l-1-11 8 6zM208 349l6-10 3 12z" fill="var(--cat-ear)" />
        <path d="M188 374q4 3 8 0M204 374q4 3 8 0" fill="none" stroke="var(--cat-line)" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="200" cy="381" rx="2.5" ry="1.6" fill="var(--cat-ear)" />
        <g className="scene__zzz" fill="var(--zzz)" fontFamily="var(--font-display)" fontWeight="700">
          <text x="226" y="334" fontSize="16">z</text>
          <text x="240" y="318" fontSize="12">z</text>
          <text x="250" y="304" fontSize="9">z</text>
        </g>
      </g>

      {/* Books and mug */}
      <g>
        <rect x="350" y="372" width="112" height="16" rx="3" fill="var(--book-1)" />
        <rect x="358" y="356" width="96" height="16" rx="3" fill="var(--book-2)" />
        <rect x="346" y="341" width="104" height="15" rx="3" fill="var(--book-3)" />
        <path d="M356 380h96M366 364h80M354 348h88" stroke="var(--book-edge)" strokeWidth="1.5" strokeDasharray="2 3" />
        <path d="M418 300c14 0 14 22 0 22" fill="none" stroke="var(--mug)" strokeWidth="6" />
        <path d="M376 290h46v38a12 12 0 0 1-12 12h-22a12 12 0 0 1-12-12z" fill="var(--mug)" />
        <ellipse cx="399" cy="291" rx="23" ry="5" fill="var(--mug-coffee)" />
        <path d="M392 306l7 5 7-5" fill="none" stroke="var(--mug-print)" strokeWidth="2.5" strokeLinecap="round" />
        <g className="scene__steam" fill="none" stroke="var(--steam)" strokeWidth="3" strokeLinecap="round">
          <path d="M390 278c-8-8 8-14 0-24s6-14 0-22" />
          <path d="M406 280c-8-8 8-14 0-24s6-14 0-22" />
        </g>
      </g>
    </svg>
  );
}
