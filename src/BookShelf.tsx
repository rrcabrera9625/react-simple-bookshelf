import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { patterns as defaultPatterns } from "./patterns";
import type { BookDef, BookShelfProps } from "./types";

const DEFAULT_W = 40;
const DEFAULT_H = 260;

const BookShelf = ({
  books,
  lang = "primary",
  patterns = defaultPatterns,
  onSelect,
  showDetail = true,
  renderDetail,
  shelfColor = "#3dd6c0",
  gap = 2,
  className,
  style,
}: BookShelfProps) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, moved: false });

  const selected = selectedIdx !== null ? books[selectedIdx] : null;

  const t = (b: BookDef) => ({
    title: lang === "alt" && b.titleAlt ? b.titleAlt : b.title,
    desc:  lang === "alt" && b.descAlt  ? b.descAlt  : (b.desc ?? ""),
    tag:   b.tag ?? "",
  });

  const toggle = (i: number) => {
    const next = selectedIdx === i ? null : i;
    setSelectedIdx(next);
    onSelect?.(next !== null ? books[next] : null, next);
  };

  const getPattern = (book: BookDef, i: number) => {
    if (book.pattern === false) return null;
    if (typeof book.pattern === "function") return book.pattern(book.accent);
    if (patterns.length === 0) return null;
    return patterns[i % patterns.length](book.accent);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = shelfRef.current;
    if (!el) return;
    dragState.current = { isDragging: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false };
    el.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const d = dragState.current;
    if (!d.isDragging || !shelfRef.current) return;
    const delta = (e.pageX - shelfRef.current.offsetLeft) - d.startX;
    if (Math.abs(delta) > 4) d.moved = true;
    shelfRef.current.scrollLeft = d.scrollLeft - delta;
  };

  const onMouseUp = () => {
    dragState.current.isDragging = false;
    if (shelfRef.current) shelfRef.current.style.cursor = "grab";
  };

  return (
    <div className={className} style={{ fontFamily: "monospace", ...style }}>
      {/* Books row */}
      <div
        ref={shelfRef}
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          justifyContent: "center",
          scrollbarWidth: "none",
          cursor: "grab",
          paddingTop: 32,
          marginTop: -32,
          paddingBottom: 4,
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {books.map((book, i) => {
          const isSelected = selectedIdx === i;
          const w = book.w ?? DEFAULT_W;
          const h = book.h ?? DEFAULT_H;
          const titleH = Math.round(h * 0.58);
          const pattern = getPattern(book, i);

          return (
            <div
              key={i}
              style={{ perspective: 900, alignSelf: "flex-end", flexShrink: 0, cursor: "pointer" }}
              onClick={() => { if (!dragState.current.moved) toggle(i); }}
            >
              <motion.div
                whileHover={!isSelected ? { rotateY: -18, y: -8, scale: 1.03 } : {}}
                animate={isSelected
                  ? { y: -22, scale: 1.06, rotateY: -15, transition: { type: "spring", stiffness: 180, damping: 20 } }
                  : { y: 0,   scale: 1,    rotateY: 0,   transition: { type: "spring", stiffness: 260, damping: 22 } }
                }
                style={{
                  width: w, height: h,
                  transformOrigin: "left center",
                  position: "relative",
                  borderRadius: "2px 4px 4px 2px",
                  overflow: "hidden",
                  boxShadow: isSelected
                    ? `4px 8px 24px rgba(0,0,0,0.7), 0 0 20px ${book.accent}40`
                    : "3px 5px 14px rgba(0,0,0,0.55)",
                }}
              >
                {/* Base */}
                <div style={{ position: "absolute", inset: 0, backgroundColor: book.color }} />
                {/* Page strips */}
                {book.pages && (
                  <>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, backgroundColor: book.pages, opacity: 0.85 }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: book.pages, opacity: 0.85 }} />
                  </>
                )}
                {/* Accent binding */}
                <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 5, backgroundColor: book.accent, opacity: 0.9 }} />
                {/* Shading */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.2) 100%)",
                }} />
                {/* Pattern */}
                {pattern && (
                  <div style={{
                    position: "absolute", bottom: 6, left: 5, right: 0,
                    display: "flex", justifyContent: "center",
                    opacity: isSelected ? 0.75 : 0.3,
                    transition: "opacity 0.2s",
                  }}>
                    {pattern}
                  </div>
                )}
                {/* Title + Author */}
                <div style={{
                  position: "absolute", top: 8, bottom: pattern ? 46 : 8, left: 5, right: 0,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 2,
                }}>
                  <span style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    color: "#ffffff",
                    opacity: isSelected ? 1 : 0.85,
                    fontSize: w >= 48 ? "0.55rem" : "0.45rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    userSelect: "none",
                    lineHeight: 1.3,
                    maxWidth: w - 14,
                    height: titleH,
                    overflow: "hidden",
                    textAlign: "center",
                    textShadow: isSelected ? `0 0 12px ${book.accent}` : "none",
                    transition: "opacity 0.2s, text-shadow 0.2s",
                  }}>
                    {t(book).title}
                  </span>
                  {book.author && (
                    <span style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      color: "#ffffff",
                      opacity: 0.45,
                      fontSize: "0.42rem",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      userSelect: "none",
                      lineHeight: 1.2,
                    }}>
                      {book.author}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Shelf plank */}
      <div style={{
        marginTop: 12,
        height: 1,
        background: `linear-gradient(to right, ${shelfColor}66, ${shelfColor}1a 60%, transparent)`,
      }} />
      <div style={{
        height: 4,
        borderRadius: "0 0 2px 2px",
        background: "linear-gradient(to right, hsl(220 14% 14%), hsl(220 14% 10%))",
        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
      }} />

      {/* Detail card */}
      {showDetail && (
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              {renderDetail ? (
                <div style={{ marginTop: 16 }}>{renderDetail(selected)}</div>
              ) : (
                <motion.div
                  initial={{ y: -8 }} animate={{ y: 0 }} exit={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginTop: 16,
                    borderRadius: 12,
                    overflow: "hidden",
                    border: `1px solid ${selected.accent}30`,
                    boxShadow: `0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 ${selected.accent}15`,
                    background: `linear-gradient(160deg, ${selected.color}e0 0%, hsl(220 18% 7%) 55%)`,
                  }}
                >
                  <div style={{ height: 2, background: `linear-gradient(to right, ${selected.accent}, transparent 60%)` }} />
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    {/* Mini spine */}
                    <div style={{
                      width: 42, flexShrink: 0,
                      position: "relative", overflow: "hidden",
                      backgroundColor: selected.color,
                      borderRight: `1px solid ${selected.accent}20`,
                    }}>
                      {selected.pages && (
                        <>
                          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, backgroundColor: selected.pages, opacity: 0.85 }} />
                          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: selected.pages, opacity: 0.85 }} />
                        </>
                      )}
                      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 5, backgroundColor: selected.accent, opacity: 0.9 }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)" }} />
                      {getPattern(selected, selectedIdx!) && (
                        <div style={{
                          position: "absolute", bottom: 8, left: 5, right: 0,
                          display: "flex", justifyContent: "center",
                          opacity: 0.6,
                          transform: "scale(0.65)", transformOrigin: "bottom center",
                        }}>
                          {getPattern(selected, selectedIdx!)}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0, padding: "16px 18px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>
                          {t(selected).title}
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                          {selected.tag && (
                            <span style={{
                              fontSize: "0.6rem",
                              borderRadius: 999, padding: "2px 8px",
                              border: "1px solid rgba(255,255,255,0.2)",
                              color: "#ffffff",
                              backgroundColor: "rgba(255,255,255,0.07)",
                            }}>
                              {selected.tag}
                            </span>
                          )}
                          {selected.year && (
                            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.35)" }}>
                              {selected.year}
                            </span>
                          )}
                        </div>
                      </div>
                      {(selected.fullAuthor || selected.author) && (
                        <p style={{ fontSize: "0.7rem", marginBottom: 10, color: `${selected.accent}90` }}>
                          {selected.fullAuthor ?? selected.author}
                        </p>
                      )}
                      <div style={{ height: 1, background: `linear-gradient(to right, ${selected.accent}30, transparent)`, marginBottom: 10 }} />
                      {t(selected).desc && (
                        <p style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "hsl(220 14% 62%)", margin: 0 }}>
                          {t(selected).desc}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default BookShelf;
