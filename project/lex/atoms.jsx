/* ============================================================
   LEX prototype — atoms (icons + presentational helpers)
   Inline SVG, currentColor, stroke-based, round caps — faithful
   to the Lex spec. Base set from lex-atoms.jsx, extended with the
   git / lab / file glyphs this prototype needs (same 24 grid,
   1.6px round-cap discipline).
   ============================================================ */
const LEX_ICONS = {
  pipe:        '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  history:     '<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l3 2"/>',
  book:        '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  pulse:       '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  home:        '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  search:      '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  inbox:       '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  layers:      '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  chart:       '<path d="M3 3v18h18"/><path d="M7 14v4"/><path d="M12 9v9"/><path d="M17 5v13"/>',
  doc:         '<path d="M14 2H6.5A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V7z"/><path d="M14 2v5h5"/>',
  settings:    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4.9z"/>',
  bell:        '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  plus:        '<path d="M12 5v14"/><path d="M5 12h14"/>',
  check:       '<path d="m20 6-11 11-5-5"/>',
  chevronRight:'<path d="m9 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  x:           '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  filter:      '<path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/>',
  download:    '<path d="M12 3v12"/><path d="m7 11 5 4 5-4"/><path d="M5 21h14"/>',
  sync:        '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>',
  user:        '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  flag:        '<path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/>',
  clock:       '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  more:        '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  arrowUpRight:'<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  arrowRight:  '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  /* git family */
  gitBranch:   '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  gitCommit:   '<circle cx="12" cy="12" r="3.2"/><line x1="3" y1="12" x2="8.8" y2="12"/><line x1="15.2" y1="12" x2="21" y2="12"/>',
  gitMerge:    '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 9v1a8 8 0 0 0 8 8h1"/>',
  gitFork:     '<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M6 9v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9"/><path d="M12 12v3"/>',
  diff:        '<path d="M12 3v18"/><path d="M5 8h4"/><path d="M7 6v4"/><path d="M15 16h4"/>',
  /* lab / experiment */
  beaker:      '<path d="M9 3h6"/><path d="M10 3v6.6L4.8 18A2 2 0 0 0 6.6 21h10.8a2 2 0 0 0 1.8-3L14 9.6V3"/><path d="M7.2 14h9.6"/>',
  star:        '<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 10.7l6.5-.9L12 3z"/>',
  zap:         '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  target:      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6"/>',
  trendingDown:'<path d="M22 17 13.5 8.5l-5 5L2 7"/><path d="M16 17h6v-6"/>',
  trendingUp:  '<path d="M22 7 13.5 15.5l-5-5L2 17"/><path d="M16 7h6v6"/>',
  /* files */
  code:        '<path d="m16 18 4-6-4-6"/><path d="m8 6-4 6 4 6"/>',
  eye:         '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  folder:      '<path d="M4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z"/>',
  copy:        '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  message:     '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-1L3 20l1.1-4.5A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/>',
  thumbsUp:    '<path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/><path d="M7 11l4-8a2.5 2.5 0 0 1 2.4 3.4L12.5 9H19a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7"/>',
  coins:       '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  map:         '<path d="m9 4-6 2v16l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v16"/><path d="M15 6v16"/>',
  grid:        '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  list:        '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.6" cy="6" r="0.6"/><circle cx="3.6" cy="12" r="0.6"/><circle cx="3.6" cy="18" r="0.6"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.4 12 2.5 2.5 4.8-4.8"/>',
  xCircle:     '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  alert:       '<path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9.5" x2="12" y2="13.5"/><circle cx="12" cy="17" r="0.6"/>',
  cloud:       '<path d="M6.5 19a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.5 1.5A4 4 0 0 1 17 19z"/>',
};

function Icon({ name, size = 15, stroke = 1.6, style, className }) {
  const d = LEX_ICONS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}
      style={{ flex: '0 0 auto', display: 'block', ...style }}
      dangerouslySetInnerHTML={{ __html: d }} />
  );
}

function Badge({ variant, children, style }) {
  return <span className={'badge' + (variant ? ' badge--' + variant : '')} style={style}>{children}</span>;
}

function Spill({ variant = 'neutral', filled, children, style }) {
  return (
    <span className={'spill spill--' + variant + (filled ? ' spill--filled' : '')} style={style}>
      <span className="spill__dot" />{children}
    </span>
  );
}

function Btn({ variant = 'ghost', size, children, onClick, disabled, style, title }) {
  const cls = 'btn btn--' + variant + (size ? ' btn--' + size : '');
  return <button className={cls} onClick={onClick} disabled={disabled} style={style} title={title}>{children}</button>;
}

function IconBtn({ name, size = 16, onClick, title, active, style }) {
  return (
    <button className="btn-icon" onClick={onClick} title={title}
      style={{ ...(active ? { background: 'var(--elevated)', color: 'var(--ink)' } : null), ...style }}>
      <Icon name={name} size={size} />
    </button>
  );
}

function Avatar({ size = 'sm', children, style }) {
  return <span className={'avatar avatar--' + size} style={style}>{children}</span>;
}

/* Mono structural label */
function Mono({ children, style, className }) {
  return <span className={'label-mono' + (className ? ' ' + className : '')} style={style}>{children}</span>;
}

/* A money/number readout in mono */
function Readout({ label, value, sub, accent }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 7 }}>{label}</div>
      <div style={{ font: '500 21px/1 var(--font-display)', letterSpacing: '-0.02em', color: accent || 'var(--ink)' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

Object.assign(window, { Icon, LEX_ICONS, Badge, Spill, Btn, IconBtn, Avatar, Mono, Readout });
