export type PatternFn = (color: string) => React.ReactElement;

export interface BookDef {
  /** Primary title (used when no titleEn provided, or as Spanish title) */
  title: string;
  /** Optional English title — shown when lang="en" */
  titleEn?: string;
  /** Short author name shown on spine */
  author: string;
  /** Full author name shown in detail card */
  fullAuthor?: string;
  /** Spine background color (hex) */
  color: string;
  /** Accent color for binding strip, text highlights (hex) */
  accent: string;
  /** Page edge color (hex) */
  pages: string;
  /** Spine width in px (default: 40) */
  w?: number;
  /** Book height in px (default: 260) */
  h?: number;
  /** Genre / category tag */
  tag?: string;
  /** Short description shown in detail card */
  desc?: string;
  /** Optional English description */
  descEn?: string;
}

export interface BookShelfProps {
  books: BookDef[];
  /** Language — affects titleEn / descEn fields. Default: "en" */
  lang?: "en" | "es";
  /** Custom pattern functions. Defaults to built-in 8 patterns */
  patterns?: PatternFn[];
  /** Called when a book is selected (or deselected — null) */
  onSelect?: (book: BookDef | null) => void;
  /** Override the shelf plank color */
  shelfColor?: string;
  className?: string;
}
