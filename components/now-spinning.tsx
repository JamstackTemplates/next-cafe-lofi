import { cafe } from '../content/cafe';

/** Decorative cassette with the house playlist — a little bit of the café's atmosphere. */
export function NowSpinning() {
  if (!cafe.playlist.length) return null;
  return (
    <figure className="tape">
      <div className="tape__shell" aria-hidden="true">
        <div className="tape__label">
          <span className="tape__title">side a · rainy day mix</span>
          <div className="tape__window">
            <span className="tape__reel" />
            <span className="tape__ribbon" />
            <span className="tape__reel" />
          </div>
        </div>
        <span className="tape__screw tape__screw--tl" /><span className="tape__screw tape__screw--tr" />
        <span className="tape__screw tape__screw--bl" /><span className="tape__screw tape__screw--br" />
      </div>
      <figcaption>
        <p className="tape__now"><span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>Now spinning in the café</p>
        <ol className="tracks">
          {cafe.playlist.map((track, index) => (
            <li key={track.title} className="tracks__item">
              <span className="tracks__no">{String(index + 1).padStart(2, '0')}</span>
              <span className="tracks__title">{track.title}<span className="tracks__artist">{track.artist}</span></span>
              <span className="tracks__len">{track.length}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
