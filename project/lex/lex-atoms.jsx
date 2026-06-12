/* ============================================================
   LEX — Atoms (icons + tiny presentational helpers)
   ------------------------------------------------------------
   Icons are inline SVG, currentColor, stroke-based, round caps.
   Default 15px in body; pass size for headers (18-20) / stats (24-32).
   Inactive icons sit at --muted; active/hover upgrade to --ink.

   NOTE ON SUBSTITUTION: the original Lex spec references a custom
   21+ glyph set (lex-atoms.jsx) that was NOT shipped with the spec.
   These glyphs are authored in a calm, geometric structural style
   (1.6px round-cap strokes on a 24 grid) consistent with the
   "instrument panel" voice. Swap in the real custom set when
   available — keep the <Icon> API and stroke discipline.
   ============================================================ */

const LEX_ICON_PATHS = {
  pipe:      '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  history:   '<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l3 2"/>',
  book:      '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  pulse:     '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  home:      '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  search:    '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  inbox:     '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  layers:    '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  chart:     '<path d="M3 3v18h18"/><path d="M7 14v4"/><path d="M12 9v9"/><path d="M17 5v13"/>',
  doc:       '<path d="M14 2H6.5A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V7z"/><path d="M14 2v5h5"/>',
  settings:  '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4.9z"/>',
  bell:      '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  plus:      '<path d="M12 5v14"/><path d="M5 12h14"/>',
  check:     '<path d="m20 6-11 11-5-5"/>',
  chevronRight:'<path d="m9 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  x:         '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  filter:    '<path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/>',
  download:  '<path d="M12 3v12"/><path d="m7 11 5 4 5-4"/><path d="M5 21h14"/>',
  sync:      '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>',
  user:      '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  flag:      '<path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/>',
  clock:     '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  more:      '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  arrowUpRight:'<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
};

function Icon({ name, size = 15, stroke = 1.6, style, className }) {
  const d = LEX_ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      className={className}
      style={{ flex: '0 0 auto', display: 'block', ...style }}
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}

/* ---- tiny atoms ---- */

function Badge({ variant, children }) {
  return <span className={'badge' + (variant ? ' badge--' + variant : '')}>{children}</span>;
}

function Spill({ variant = 'neutral', filled, children }) {
  return (
    <span className={'spill spill--' + variant + (filled ? ' spill--filled' : '')}>
      <span className="spill__dot" />{children}
    </span>
  );
}

function Btn({ variant = 'ghost', size, children, onClick, disabled, style }) {
  const cls = 'btn btn--' + variant + (size ? ' btn--' + size : '');
  return <button className={cls} onClick={onClick} disabled={disabled} style={style}>{children}</button>;
}

function IconBtn({ name, size = 16, onClick, title }) {
  return <button className="btn-icon" onClick={onClick} title={title}><Icon name={name} size={size} /></button>;
}

function Avatar({ size = 'sm', children }) {
  return <span className={'avatar avatar--' + size}>{children}</span>;
}

Object.assign(window, { Icon, LEX_ICON_PATHS, Badge, Spill, Btn, IconBtn, Avatar });
