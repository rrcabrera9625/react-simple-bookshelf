import React from "react";
import type { PatternFn } from "./types";

export const patterns: PatternFn[] = [
  // 1 — Diamond + rules
  (c) => (
    <svg viewBox="0 0 44 28" width="44" height="28" fill="none">
      <line x1="2" y1="4" x2="42" y2="4" stroke={c} strokeWidth="0.6" />
      <line x1="2" y1="24" x2="42" y2="24" stroke={c} strokeWidth="0.6" />
      <polygon points="22,8 30,14 22,20 14,14" stroke={c} strokeWidth="0.7" fill="none" />
      <circle cx="22" cy="14" r="1.2" fill={c} />
      <line x1="2" y1="14" x2="12" y2="14" stroke={c} strokeWidth="0.5" />
      <line x1="32" y1="14" x2="42" y2="14" stroke={c} strokeWidth="0.5" />
    </svg>
  ),
  // 2 — Fleur / cross ornament
  (c) => (
    <svg viewBox="0 0 44 28" width="44" height="28" fill="none">
      <line x1="4" y1="14" x2="40" y2="14" stroke={c} strokeWidth="0.5" />
      <circle cx="22" cy="14" r="3" stroke={c} strokeWidth="0.7" />
      <circle cx="22" cy="14" r="1" fill={c} />
      <circle cx="10" cy="14" r="1.2" fill={c} />
      <circle cx="34" cy="14" r="1.2" fill={c} />
      <line x1="22" y1="4" x2="22" y2="10" stroke={c} strokeWidth="0.6" />
      <line x1="22" y1="18" x2="22" y2="24" stroke={c} strokeWidth="0.6" />
      <line x1="4" y1="7" x2="40" y2="7" stroke={c} strokeWidth="0.4" strokeDasharray="2 3" />
      <line x1="4" y1="21" x2="40" y2="21" stroke={c} strokeWidth="0.4" strokeDasharray="2 3" />
    </svg>
  ),
  // 3 — Star centered
  (c) => (
    <svg viewBox="0 0 44 28" width="44" height="28" fill="none">
      <line x1="6" y1="4" x2="38" y2="4" stroke={c} strokeWidth="0.5" />
      <line x1="6" y1="24" x2="38" y2="24" stroke={c} strokeWidth="0.5" />
      <polygon points="22,7 23.5,12 29,12 24.5,15.5 26,21 22,17.5 18,21 19.5,15.5 15,12 20.5,12" stroke={c} strokeWidth="0.7" fill="none" />
      <circle cx="22" cy="14" r="1" fill={c} />
    </svg>
  ),
  // 4 — Herringbone / chevrons
  (c) => (
    <svg viewBox="0 0 44 28" width="44" height="28" fill="none">
      <line x1="2" y1="4" x2="42" y2="4" stroke={c} strokeWidth="0.6" />
      <line x1="2" y1="24" x2="42" y2="24" stroke={c} strokeWidth="0.6" />
      {[8, 15, 22, 29, 36].map((x) => (
        <g key={x}>
          <polyline points={`${x - 4},18 ${x},10 ${x + 4},18`} stroke={c} strokeWidth="0.7" fill="none" />
        </g>
      ))}
    </svg>
  ),
  // 5 — Rope border / interlace
  (c) => (
    <svg viewBox="0 0 44 28" width="44" height="28" fill="none">
      <rect x="3" y="3" width="38" height="22" rx="1" stroke={c} strokeWidth="0.6" />
      <rect x="7" y="7" width="30" height="14" rx="1" stroke={c} strokeWidth="0.4" strokeDasharray="2 2" />
      <circle cx="22" cy="14" r="3.5" stroke={c} strokeWidth="0.6" />
      <circle cx="22" cy="14" r="1" fill={c} />
    </svg>
  ),
  // 6 — Laurel / leaf motif
  (c) => (
    <svg viewBox="0 0 44 28" width="44" height="28" fill="none">
      <line x1="4" y1="14" x2="40" y2="14" stroke={c} strokeWidth="0.5" />
      <line x1="4" y1="8" x2="40" y2="8" stroke={c} strokeWidth="0.4" />
      <line x1="4" y1="20" x2="40" y2="20" stroke={c} strokeWidth="0.4" />
      <ellipse cx="14" cy="14" rx="5" ry="2.5" stroke={c} strokeWidth="0.6" transform="rotate(-20 14 14)" />
      <ellipse cx="30" cy="14" rx="5" ry="2.5" stroke={c} strokeWidth="0.6" transform="rotate(20 30 14)" />
      <circle cx="22" cy="14" r="1.5" fill={c} />
    </svg>
  ),
  // 7 — Art deco sunburst
  (c) => (
    <svg viewBox="0 0 44 28" width="44" height="28" fill="none">
      <line x1="4" y1="5" x2="40" y2="5" stroke={c} strokeWidth="0.5" />
      <line x1="4" y1="23" x2="40" y2="23" stroke={c} strokeWidth="0.5" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={22 + Math.cos(rad) * 2}
            y1={14 + Math.sin(rad) * 2}
            x2={22 + Math.cos(rad) * 7}
            y2={14 + Math.sin(rad) * 7}
            stroke={c} strokeWidth="0.6"
          />
        );
      })}
      <circle cx="22" cy="14" r="2" stroke={c} strokeWidth="0.6" />
      <circle cx="22" cy="14" r="0.8" fill={c} />
    </svg>
  ),
  // 8 — Double ring with corner dots
  (c) => (
    <svg viewBox="0 0 44 28" width="44" height="28" fill="none">
      <rect x="3" y="3" width="38" height="22" rx="1.5" stroke={c} strokeWidth="0.5" />
      <rect x="7" y="6" width="30" height="16" rx="1" stroke={c} strokeWidth="0.4" />
      <circle cx="22" cy="14" r="4" stroke={c} strokeWidth="0.6" />
      <circle cx="22" cy="14" r="1.5" stroke={c} strokeWidth="0.5" />
      <circle cx="22" cy="14" r="0.5" fill={c} />
      <circle cx="7" cy="6" r="1" fill={c} />
      <circle cx="37" cy="6" r="1" fill={c} />
      <circle cx="7" cy="22" r="1" fill={c} />
      <circle cx="37" cy="22" r="1" fill={c} />
    </svg>
  ),
];
