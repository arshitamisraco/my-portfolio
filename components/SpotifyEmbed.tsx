/** Spotify's own player fills these exactly — any taller and the iframe shows dead space below it. */
const EMBED_HEIGHTS = { compact: 80, full: 352 };

/**
 * Pull the resource type + id out of any Spotify link — a share URL
 * ("https://open.spotify.com/track/<id>?si=..."), an already-embed URL, or a
 * URI ("spotify:track:<id>"). Returns null for anything unrecognized so the
 * caller can fall back to the placeholder instead of rendering a dead iframe.
 */
function parseSpotifyLink(link: string): { type: string; id: string } | null {
  const match = link.match(
    /(?:open\.spotify\.com\/(?:embed\/)?(?:intl-[a-z-]+\/)?|spotify:)(track|album|playlist|episode|show|artist)[/:]([A-Za-z0-9]+)/,
  );
  if (!match) return null;
  return { type: match[1], id: match[2] };
}

interface SpotifyEmbedProps {
  /** A Spotify share URL or URI. Pass null/undefined to render the placeholder. */
  url?: string | null;
  /** Accessible name for the iframe, e.g. "Music for the flower field reel". */
  title: string;
  /** Compact (80px) is the one-line player; full (352px) shows cover art. */
  compact?: boolean;
}

/**
 * Spotify's public iframe embed — no API key, no OAuth, no SDK. Nothing plays
 * until the visitor hits play inside the iframe. Logged-out listeners get a ~30s
 * preview; anyone signed into Spotify in that browser gets the full track.
 */
export default function SpotifyEmbed({ url, title, compact = false }: SpotifyEmbedProps) {
  const parsed = url ? parseSpotifyLink(url) : null;
  const height = compact ? EMBED_HEIGHTS.compact : EMBED_HEIGHTS.full;

  if (!parsed) {
    return (
      <div
        style={{ height }}
        className="flex flex-col items-center justify-center gap-1 rounded-frame border border-dashed border-line bg-surface px-6 text-center"
      >
        <p className="text-caption font-medium text-ink">Spotify embed</p>
        <p className="text-caption text-ink-muted">
          Paste a share link to set the track for this one.
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={`https://open.spotify.com/embed/${parsed.type}/${parsed.id}?utm_source=generator`}
      title={title}
      width="100%"
      height={height}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="block rounded-frame"
    />
  );
}
