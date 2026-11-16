import { cafe } from '../content/cafe';

const screws = ['top-[4%] left-[3%]', 'top-[4%] right-[3%]', 'bottom-[5%] left-[3%]', 'bottom-[5%] right-[3%]'];

/** Decorative cassette with the house playlist — a little bit of the café's atmosphere. */
export function NowSpinning() {
  if (!cafe.playlist.length) return null;
  return (
    <figure className="card rounded-panel p-6 shadow-lift lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
      <div className="tape-shell" aria-hidden="true">
        <div className="tape-label">
          <span className="-mt-0.5 font-display font-soft text-[clamp(.8rem,1.4vw,1rem)] leading-tight font-semibold text-[#3a2638] italic">side a · rainy day mix</span>
          <div className="tape-window">
            <span className="tape-reel" />
            <span className="mx-[4%] h-2/5 flex-1 rounded-md bg-[#5a3a2c]" />
            <span className="tape-reel" />
          </div>
        </div>
        {screws.map(position => <span key={position} className={`tape-screw ${position}`} />)}
      </div>
      <figcaption>
        <p className="mt-6 flex items-center gap-2.5 font-mono text-[.8rem] tracking-widest text-accent-2 uppercase">
          <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>Now spinning in the café
        </p>
        <ol className="mt-3">
          {cafe.playlist.map((track, index) => (
            <li key={track.title} className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 border-t border-dashed border-line py-2.5">
              <span className="font-mono text-[.82rem] text-muted">{String(index + 1).padStart(2, '0')}</span>
              <span className="font-bold group-first:text-accent">
                {track.title}
                <span className="block text-[.9rem] font-medium text-muted">{track.artist}</span>
              </span>
              <span className="font-mono text-[.82rem] text-muted">{track.length}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
