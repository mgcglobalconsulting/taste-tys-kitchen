import { ChefHat, Leaf, Star } from 'lucide-react';

const badges = [
  { Icon: ChefHat, label: '5+ years experience' },
  { Icon: Star,    label: 'VIP consultation included' },
  { Icon: Leaf,    label: 'Dietary-friendly menus' },
] as const;

// Three repetitions form one visual cycle (~2 000 px, wider than the
// 1 280 px max-width container). Duplicate that cycle so translateX(-50%)
// lands exactly at the start of the second copy — seamless loop.
const SET  = [...badges, ...badges, ...badges];
const TRACK = [...SET, ...SET];

export function TrustBadges() {
  return (
    <div className="trust-ticker mt-6" aria-label="Service credentials">
      <ul className="trust-ticker-track" role="list">
        {TRACK.map(({ Icon, label }, i) => (
          <li key={i} className="trust-ticker-item">
            <Icon size={12} aria-hidden />
            <span>{label}</span>
            {/* thin gold ornament separates each repeating group of three */}
            {(i + 1) % 3 === 0 && (
              <span className="trust-ticker-sep" aria-hidden>✦</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
