import type React from "react";

export type PatternFn = (color: string) => React.ReactElement;

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
}

export interface AnimationConfig {
  /** Disable all animations. Default: false */
  disabled?: boolean;
  /** Spring config for the selected state */
  selected?: SpringConfig;
  /** Spring config for the deselected/return state */
  deselected?: SpringConfig;
  /** Spring config for hover */
  hover?: { rotateY?: number; y?: number; scale?: number };
}

export type Theme = "dark" | "light";

export interface BookDef {
  // ── Required ──────────────────────────────────────────────
  /** Spine background color (hex recommended) */
  color: string;
  /** Accent color — binding strip, text highlights (hex) */
  accent: string;

  // ── Titles ────────────────────────────────────────────────
  /** Primary title shown on spine and detail card */
  title: string;
  /** Optional secondary/translated title (e.g. English when primary is Spanish) */
  titleAlt?: string;

  // ── Authorship ────────────────────────────────────────────
  /** Short author name shown on spine */
  author?: string;
  /** Full author name shown in detail card */
  fullAuthor?: string;

  // ── Visual ────────────────────────────────────────────────
  /** Page edge color (hex). Defaults to a slightly lighter shade of color */
  pages?: string;
  /** Spine width in px. Default: 40 */
  w?: number;
  /** Book height in px. Default: 260 */
  h?: number;
  /**
   * Ornamental pattern to render at the bottom of the spine.
   * Pass a PatternFn, one of the built-in patterns, or false to disable.
   * Default: cycles through built-in patterns.
   */
  pattern?: PatternFn | false;

  // ── Metadata ──────────────────────────────────────────────
  /** Genre / category tag */
  tag?: string;
  /** Publication year */
  year?: number | null;
  /** Short description shown in detail card */
  desc?: string;
  /** Optional secondary/translated description */
  descAlt?: string;

  // ── Arbitrary extra data ──────────────────────────────────
  /** Any extra data you want to attach (e.g. ISBN, URL, rating) */
  meta?: Record<string, unknown>;
}

export interface BookShelfProps {
  books: BookDef[];

  // ── Controlled mode ───────────────────────────────────────
  /**
   * Controlled selected index. When provided the component becomes controlled —
   * you must update it yourself via onSelect.
   */
  selectedIndex?: number | null;

  // ── Language ──────────────────────────────────────────────
  /**
   * Language mode — when "alt", titleAlt/descAlt fields are preferred.
   * Default: "primary"
   */
  lang?: "primary" | "alt";

  // ── Patterns ──────────────────────────────────────────────
  /**
   * Default pattern pool used when a book doesn't specify its own pattern.
   * Cycles round-robin. Pass [] to disable patterns on all books by default.
   * Default: built-in 8 patterns.
   */
  patterns?: PatternFn[];

  // ── Events ────────────────────────────────────────────────
  /** Called when a book is selected or deselected (null) */
  onSelect?: (book: BookDef | null, index: number | null) => void;

  // ── Detail card ───────────────────────────────────────────
  /** Show the detail card below the shelf on selection. Default: true */
  showDetail?: boolean;
  /**
   * Custom render function for the detail card.
   * Overrides the built-in card entirely.
   */
  renderDetail?: (book: BookDef) => React.ReactNode;

  // ── Theming ───────────────────────────────────────────────
  /** Color theme for the detail card background. Default: "dark" */
  theme?: Theme;
  /** Shelf plank accent color. Default: "#3dd6c0" */
  shelfColor?: string;
  /** Shelf plank wood/base color. Default: auto */
  shelfPlankColor?: string;

  // ── Animation ─────────────────────────────────────────────
  /** Animation configuration. Pass { disabled: true } to turn off all motion. */
  animationConfig?: AnimationConfig;

  // ── Layout ────────────────────────────────────────────────
  /** Gap between books in px. Default: 2 */
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
}
