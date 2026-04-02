# react-simple-bookshelf

A simple animated React bookshelf component with customizable books, spine patterns, bilingual support and click-to-reveal detail cards. Built with Framer Motion.

<p align="center">
  <img src="https://raw.githubusercontent.com/rrcabrera9625/react-simple-bookshelf/main/preview.gif" alt="react-simple-bookshelf preview" width="720" />
</p>

## Installation

```bash
npm install react-simple-bookshelf
# or
yarn add react-simple-bookshelf
# or
bun add react-simple-bookshelf
```

> **Peer dependencies** — make sure these are installed in your project:
> ```bash
> npm install react react-dom framer-motion
> ```

---

## Quick start

```tsx
import { BookShelf } from "react-simple-bookshelf";

const books = [
  {
    title: "Clean Code",
    author: "R. C. Martin",
    fullAuthor: "Robert C. Martin",
    color: "#0f2e25",
    accent: "#3dd6c0",
    pages: "#1a4035",
    tag: "Engineering",
    year: 2008,
    desc: "A handbook of agile software craftsmanship.",
  },
  {
    title: "Atomic Habits",
    author: "J. Clear",
    fullAuthor: "James Clear",
    color: "#2e1a0f",
    accent: "#d4783a",
    pages: "#3d2516",
    tag: "Self-help",
    year: 2018,
    desc: "Tiny changes, remarkable results.",
  },
];

export default function App() {
  return <BookShelf books={books} />;
}
```

---

## Bilingual support

Use `title` + `titleAlt` (and `desc` + `descAlt`) for two languages, then switch with the `lang` prop:

```tsx
const books = [
  {
    title: "Hábitos Atómicos",
    titleAlt: "Atomic Habits",
    desc: "Pequeños cambios, resultados extraordinarios.",
    descAlt: "Tiny changes, remarkable results.",
    author: "J. Clear",
    color: "#2e1a0f",
    accent: "#d4783a",
    pages: "#3d2516",
  },
];

<BookShelf books={books} lang="alt" />  // shows titleAlt / descAlt
<BookShelf books={books} lang="primary" /> // shows title / desc (default)
```

---

## Custom patterns

Each book can use one of the 8 built-in patterns, a custom pattern function, or none at all:

```tsx
import { BookShelf, patterns } from "react-simple-bookshelf";

// Use a specific built-in pattern
{ ...book, pattern: patterns[2] }

// Custom pattern function
{ ...book, pattern: (color) => <svg>...</svg> }

// Disable pattern for this book
{ ...book, pattern: false }

// Disable patterns globally (pass empty array)
<BookShelf books={books} patterns={[]} />
```

---

## Controlled mode

Pass `selectedIndex` to take control of which book is open:

```tsx
const [selected, setSelected] = useState<number | null>(null);

<BookShelf
  books={books}
  selectedIndex={selected}
  onSelect={(book, index) => setSelected(index)}
/>
```

---

## Custom detail card

Replace the built-in detail card with your own render function:

```tsx
<BookShelf
  books={books}
  renderDetail={(book) => (
    <div style={{ padding: 16, background: book.color }}>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
    </div>
  )}
/>
```

---

## Theming

```tsx
// Dark (default)
<BookShelf books={books} theme="dark" />

// Light
<BookShelf books={books} theme="light" />

// Custom shelf colors
<BookShelf
  books={books}
  shelfColor="#d4a017"        // accent line above plank
  shelfPlankColor="#5c3d1e"   // plank wood color
/>
```

---

## Animation config

```tsx
// Disable all animations
<BookShelf books={books} animationConfig={{ disabled: true }} />

// Custom spring
<BookShelf
  books={books}
  animationConfig={{
    selected:   { stiffness: 200, damping: 18 },
    deselected: { stiffness: 300, damping: 24 },
    hover:      { rotateY: -25, y: -12, scale: 1.05 },
  }}
/>
```

---

## Props

### `BookShelfProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `books` | `BookDef[]` | — | **Required.** Array of book definitions |
| `selectedIndex` | `number \| null` | — | Controlled selected index |
| `lang` | `"primary" \| "alt"` | `"primary"` | Language mode — switches `titleAlt`/`descAlt` |
| `patterns` | `PatternFn[]` | built-in 8 | Pattern pool. Pass `[]` to disable globally |
| `onSelect` | `(book, index) => void` | — | Called on select/deselect |
| `showDetail` | `boolean` | `true` | Show the detail card |
| `showShelf` | `boolean` | `true` | Show the shelf plank below books |
| `renderDetail` | `(book) => ReactNode` | — | Custom detail card renderer |
| `theme` | `"dark" \| "light"` | `"dark"` | Detail card color theme |
| `shelfColor` | `string` | `"#3dd6c0"` | Shelf accent line color |
| `shelfPlankColor` | `string` | — | Shelf plank color |
| `animationConfig` | `AnimationConfig` | — | Animation overrides |
| `gap` | `number` | `2` | Gap between books in px |
| `className` | `string` | — | Class on root element |
| `style` | `CSSProperties` | — | Style on root element |

---

### `BookDef`

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Primary title |
| `color` | `string` | ✅ | Spine background color (hex) |
| `accent` | `string` | ✅ | Accent color — binding, highlights (hex) |
| `titleAlt` | `string` | — | Secondary/translated title |
| `author` | `string` | — | Short author name (shown on spine) |
| `fullAuthor` | `string` | — | Full author name (shown in detail card) |
| `pages` | `string` | — | Page edge color (hex) |
| `textColor` | `string` | `"#ffffff"` | Title and author color on the spine |
| `w` | `number` | — | Spine width in px. Default: `40` |
| `h` | `number` | — | Book height in px. Default: `260` |
| `pattern` | `PatternFn \| false` | — | Custom pattern or `false` to disable |
| `tag` | `string` | — | Genre / category tag |
| `year` | `number \| null` | — | Publication year |
| `desc` | `string` | — | Description (shown in detail card) |
| `descAlt` | `string` | — | Secondary/translated description |
| `meta` | `Record<string, unknown>` | — | Any extra data (ISBN, URL, rating…) |

---

### `AnimationConfig`

| Prop | Type | Description |
|---|---|---|
| `disabled` | `boolean` | Disable all animations |
| `selected` | `{ stiffness?, damping? }` | Spring for selected state |
| `deselected` | `{ stiffness?, damping? }` | Spring for deselect/return |
| `hover` | `{ rotateY?, y?, scale? }` | Hover transform values |

---

## License

GNU General Public License v3.0
