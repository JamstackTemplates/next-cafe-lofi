'use client';

import { useEffect, useState } from 'react';
import { DAYS, formatTime, openState, type Day, type OpenState } from '../content/cafe';
import { site } from '../lib/site';

/** Current weekday and minutes after midnight in the café's own time zone. */
function cafeNow(timeZone: string): { day: Day; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(new Date());
  const part = (type: string) => parts.find(item => item.type === type)?.value ?? '';
  const day = part('weekday') as Day;
  return { day: DAYS.includes(day) ? day : 'Monday', minutes: Number(part('hour')) * 60 + Number(part('minute')) };
}

function describe(state: OpenState, today: Day): string {
  if (state.open) return `Open now · until ${formatTime(state.closes)}`;
  if (!state.next) return 'Closed';
  const when = state.next.day === today ? 'today' : state.next.day;
  return `Closed · opens ${when} at ${formatTime(state.next.opens)}`;
}

/**
 * "Open now" pill. The static HTML shows a neutral label; the browser fills in the live state
 * after hydration (so the build never bakes in the time it ran) and refreshes it each minute.
 * Without a configured time zone it never claims open or closed: the neutral label stays.
 */
export function OpenBadge({ fallback = 'Open daily' }: { fallback?: string }) {
  const [label, setLabel] = useState<{ text: string; open: boolean } | null>(null);

  useEffect(() => {
    if (!site.timeZone) return;
    const update = () => {
      const now = cafeNow(site.timeZone);
      const state = openState(now.day, now.minutes);
      setLabel({ text: describe(state, now.day), open: state.open });
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-surface py-1.5 pr-3.5 pl-3 text-[.9rem] font-bold shadow-card"
      data-open={label ? String(label.open) : undefined}>
      <span className="open-badge__dot" aria-hidden="true" />
      <span>{label?.text ?? fallback}</span>
    </span>
  );
}
