/* @ds-bundle: {"format":3,"namespace":"LexDesignSystem_fe3fc3","components":[],"sourceHashes":{"lex-atoms.jsx":"8f62b387cf91","ui_kits/lex-app/App.jsx":"4de37dc6c039","ui_kits/lex-app/Dashboard.jsx":"c8d452a58f9f","ui_kits/lex-app/Rail.jsx":"fbcefb4b113e","ui_kits/lex-app/ReviewQueue.jsx":"933e3a4cddd3","ui_kits/lex-app/SourceDetail.jsx":"9c72fd36471d","ui_kits/lex-app/Topbar.jsx":"b8051cf85d6e","ui_kits/lex-app/data.js":"1c03322ec9db"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LexDesignSystem_fe3fc3 = window.LexDesignSystem_fe3fc3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// lex-atoms.jsx
try { (() => {
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
  pipe: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  history: '<path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l3 2"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  pulse: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 14v4"/><path d="M12 9v9"/><path d="M17 5v13"/>',
  doc: '<path d="M14 2H6.5A1.5 1.5 0 0 0 5 3.5v17A1.5 1.5 0 0 0 6.5 22h11a1.5 1.5 0 0 0 1.5-1.5V7z"/><path d="M14 2v5h5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4.9z"/>',
  bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/>',
  download: '<path d="M12 3v12"/><path d="m7 11 5 4 5-4"/><path d="M5 21h14"/>',
  sync: '<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  flag: '<path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>'
};
function Icon({
  name,
  size = 15,
  stroke = 1.6,
  style,
  className
}) {
  const d = LEX_ICON_PATHS[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className,
    style: {
      flex: '0 0 auto',
      display: 'block',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: d
    }
  });
}

/* ---- tiny atoms ---- */

function Badge({
  variant,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'badge' + (variant ? ' badge--' + variant : '')
  }, children);
}
function Spill({
  variant = 'neutral',
  filled,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'spill spill--' + variant + (filled ? ' spill--filled' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "spill__dot"
  }), children);
}
function Btn({
  variant = 'ghost',
  size,
  children,
  onClick,
  disabled,
  style
}) {
  const cls = 'btn btn--' + variant + (size ? ' btn--' + size : '');
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    onClick: onClick,
    disabled: disabled,
    style: style
  }, children);
}
function IconBtn({
  name,
  size = 16,
  onClick,
  title
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "btn-icon",
    onClick: onClick,
    title: title
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: size
  }));
}
function Avatar({
  size = 'sm',
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'avatar avatar--' + size
  }, children);
}
Object.assign(window, {
  Icon,
  LEX_ICON_PATHS,
  Badge,
  Spill,
  Btn,
  IconBtn,
  Avatar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "lex-atoms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lex-app/App.jsx
try { (() => {
/* Lex app — root orchestrator. Routes between screens; queue opens detail. */
function Placeholder({
  title,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero__eyebrow"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13
  }), title.toUpperCase()), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 32,
      fontWeight: 500,
      letterSpacing: '-0.03em',
      marginTop: 8
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: '56px 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: 'var(--elevated)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--muted)',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--ink-2)',
      fontWeight: 500
    }
  }, title, " isn't part of this UI kit."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      marginTop: 6,
      maxWidth: 360,
      marginInline: 'auto'
    }
  }, "Left intentionally blank \u2014 this surface wasn't defined in the source spec. Overview and the intake queue are the fully-built screens.")));
}
const CRUMBS = {
  dashboard: ['Workspace', 'Overview'],
  queue: ['Workspace', 'Intake queue'],
  pipelines: ['Workspace', 'Pipelines'],
  sources: ['Library', 'Sources'],
  history: ['Library', 'History'],
  docs: ['Library', 'Documentation']
};
function App() {
  const [active, setActive] = React.useState('dashboard');
  const [detail, setDetail] = React.useState(null);
  const navigate = id => {
    setDetail(null);
    setActive(id);
  };
  let screen,
    crumbs = CRUMBS[active];
  if (active === 'queue' && detail) {
    screen = /*#__PURE__*/React.createElement(SourceDetail, {
      item: detail,
      onBack: () => setDetail(null)
    });
    crumbs = ['Workspace', 'Intake queue', detail.id];
  } else if (active === 'dashboard') {
    screen = /*#__PURE__*/React.createElement(Dashboard, null);
  } else if (active === 'queue') {
    screen = /*#__PURE__*/React.createElement(ReviewQueue, {
      onOpen: setDetail
    });
  } else {
    const item = window.LEX_DATA.nav.flatMap(s => s.items).find(i => i.id === active);
    screen = /*#__PURE__*/React.createElement(Placeholder, {
      title: item.label,
      icon: item.icon
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Rail, {
    active: active,
    onNavigate: navigate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    crumbs: crumbs
  }), /*#__PURE__*/React.createElement("main", {
    className: "canvas",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto'
    },
    key: active + (detail ? detail.id : '')
  }, screen))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lex-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lex-app/Dashboard.jsx
try { (() => {
/* Lex app — Dashboard / Overview screen. */
function Hero() {
  const {
    stats
  } = window.LEX_DATA;
  return /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero__eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spill__dot pulse-dot",
    style: {
      background: 'var(--success)'
    }
  }), "LIVE \xB7 WORKSPACE"), /*#__PURE__*/React.createElement("h1", {
    className: "hero__title"
  }, "Pipeline review"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--muted)',
      marginTop: 12,
      maxWidth: 460
    }
  }, "Six sources awaiting review across four pipelines. Everything synced two minutes ago."), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      marginTop: 22,
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary btn--lg"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), "Add source"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost btn--lg"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 15
  }), "Export"))), /*#__PURE__*/React.createElement("div", {
    className: "hero__stats"
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__stat-value"
  }, s.value), /*#__PURE__*/React.createElement("div", {
    className: "hero__stat-label"
  }, s.label)))));
}
function MetricCard({
  m
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card card--hover"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__title"
  }, m.title), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 32px/1 var(--font-display)',
      letterSpacing: '-0.025em',
      color: 'var(--ink)'
    }
  }, m.value), /*#__PURE__*/React.createElement("span", {
    className: 'badge ' + (m.good ? 'badge--success' : 'badge--warning')
  }, m.delta)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)',
      marginTop: 10
    }
  }, m.unit));
}
function ThroughputChart() {
  const {
    series
  } = window.LEX_DATA;
  const max = 100;
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      gridColumn: 'span 2'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      justifyContent: 'space-between',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__title",
    style: {
      margin: 0
    }
  }, "Throughput \xB7 7 days"), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 14
    }
  }, [['Imported', 'var(--grape)'], ['Reviewed', 'var(--plum)'], ['Flagged', 'var(--amber)']].map(([l, c]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    className: "row",
    style: {
      gap: 6,
      font: '600 9.5px/1 var(--font-mono)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: c
    }
  }), l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${series.length}, 1fr)`,
      gap: 18,
      alignItems: 'end',
      height: 150
    }
  }, series.map(row => /*#__PURE__*/React.createElement("div", {
    key: row.d,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'end',
      gap: 3,
      height: 130,
      width: '100%',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: `${row.a / max * 100}%`,
      background: 'var(--grape)',
      borderRadius: '3px 3px 0 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: `${row.b / max * 100}%`,
      background: 'var(--plum)',
      borderRadius: '3px 3px 0 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: `${row.c / max * 100}%`,
      background: 'var(--amber)',
      borderRadius: '3px 3px 0 0'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 9.5px/1 var(--font-mono)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--faint)'
    }
  }, row.d)))));
}
function ActivityCard() {
  const {
    activity
  } = window.LEX_DATA;
  const tone = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    plum: 'var(--plum)',
    neutral: 'var(--muted)'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__title"
  }, "Recent activity"), /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: 16
    }
  }, activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row",
    style: {
      gap: 11,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: tone[a.tone],
      marginTop: 6,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-2)',
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)',
      fontWeight: 600
    }
  }, a.who), " ", a.what, ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink)'
    }
  }, a.target)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 9.5px/1 var(--font-mono)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--faint)',
      marginTop: 5
    }
  }, a.when))))));
}
function Dashboard() {
  const {
    metrics
  } = window.LEX_DATA;
  return /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  }, metrics.map(m => /*#__PURE__*/React.createElement(MetricCard, {
    key: m.title,
    m: m
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  }, /*#__PURE__*/React.createElement(ThroughputChart, null), /*#__PURE__*/React.createElement(ActivityCard, null)));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lex-app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lex-app/Rail.jsx
try { (() => {
/* Lex app — Sidebar rail. Sticky, full-height, hairline right border. */
function Rail({
  active,
  onNavigate
}) {
  const {
    nav,
    org
  } = window.LEX_DATA;
  return /*#__PURE__*/React.createElement("aside", {
    className: "rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail__brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rail__glyph"
  }), /*#__PURE__*/React.createElement("span", {
    className: "rail__wordmark"
  }, "Lex")), /*#__PURE__*/React.createElement("nav", {
    className: "rail__nav"
  }, nav.map(section => /*#__PURE__*/React.createElement("div", {
    key: section.group
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail__group"
  }, section.group), section.items.map(item => {
    const isActive = item.id === active;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: 'rail__item' + (isActive ? ' rail__item--active' : ''),
      onClick: () => onNavigate(item.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: item.icon,
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, item.label), item.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 10px/1 var(--font-mono)',
        letterSpacing: '0.04em',
        color: isActive ? 'var(--past-blue-ink)' : 'var(--faint)'
      }
    }, item.count));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "rail__footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar avatar--sm",
    style: {
      borderRadius: 8,
      width: 26,
      height: 26,
      background: 'var(--past-blue)',
      color: 'var(--past-blue-ink)'
    }
  }, "N"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 12px/1.2 var(--font-display)',
      color: 'var(--ink)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, org.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 10px/1.3 var(--font-mono)',
      letterSpacing: '0.04em',
      color: 'var(--faint)'
    }
  }, org.plan)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronDown",
    size: 14,
    style: {
      color: 'var(--faint)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 9.5px/1 var(--font-mono)',
      letterSpacing: '0.08em',
      color: 'var(--faint)',
      paddingTop: 4
    }
  }, "LEX \xB7 ", org.version)));
}
window.Rail = Rail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lex-app/Rail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lex-app/ReviewQueue.jsx
try { (() => {
/* Lex app — Intake queue screen. Rows open the source detail. */
function CatChip({
  cat
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 7,
      flex: '0 0 auto',
      background: `var(--past-${cat})`,
      border: '1px solid rgba(20,33,61,0.06)'
    }
  });
}
function StatusBadge({
  status
}) {
  const map = {
    review: ['badge--plum', 'IN REVIEW'],
    pending: ['', 'PENDING'],
    blocked: ['badge--danger', 'BLOCKED']
  };
  const [cls, label] = map[status] || ['', status];
  return /*#__PURE__*/React.createElement("span", {
    className: 'badge ' + cls
  }, label);
}
function QueueRow({
  item,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen(item),
    style: {
      display: 'grid',
      gridTemplateColumns: '22px minmax(0,1fr) 96px 104px 84px 46px 20px',
      alignItems: 'center',
      gap: 12,
      padding: '14px 18px',
      borderBottom: '1px solid var(--hairline)',
      cursor: 'pointer',
      transition: 'background 220ms var(--ease-soft)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--elevated)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement(CatChip, {
    cat: item.cat
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ink)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, item.name), item.flagged && /*#__PURE__*/React.createElement(Icon, {
    name: "flag",
    size: 13,
    style: {
      color: 'var(--danger)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 10px/1 var(--font-mono)',
      letterSpacing: '0.06em',
      color: 'var(--faint)',
      marginTop: 4,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.id, " \xB7 ", item.size)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--muted)'
    }
  }, item.owner), /*#__PURE__*/React.createElement(StatusBadge, {
    status: item.status
  }), /*#__PURE__*/React.createElement("span", {
    className: 'spill spill--' + item.spill
  }, /*#__PURE__*/React.createElement("span", {
    className: "spill__dot"
  }), item.status === 'review' ? 'ACTIVE' : item.status === 'blocked' ? 'HELD' : 'WAITING'), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px/1 var(--font-mono)',
      letterSpacing: '0.04em',
      color: 'var(--faint)'
    }
  }, item.age), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 15,
    style: {
      color: 'var(--faint)'
    }
  }));
}
function ReviewQueue({
  onOpen
}) {
  const {
    queue
  } = window.LEX_DATA;
  const [tab, setTab] = React.useState('all');
  const filtered = tab === 'all' ? queue : queue.filter(q => q.status === tab);
  return /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero__eyebrow"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "inbox",
    size: 13
  }), "INTAKE QUEUE"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 32,
      fontWeight: 500,
      letterSpacing: '-0.03em',
      marginTop: 8
    }
  }, "Awaiting review")), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tabs",
    style: {
      border: 'none'
    }
  }, [['all', 'All'], ['review', 'In review'], ['pending', 'Pending'], ['blocked', 'Blocked']].map(([id, label]) => /*#__PURE__*/React.createElement("div", {
    key: id,
    className: 'tab' + (tab === id ? ' tab--active' : ''),
    onClick: () => setTab(id)
  }, label))), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--subtle"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "filter",
    size: 14
  }), "Filter"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 14
  }), "Export"))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '22px minmax(0,1fr) 96px 104px 84px 46px 20px',
      gap: 12,
      padding: '11px 18px',
      background: 'var(--bg-2)',
      borderBottom: '1px solid var(--hairline)',
      font: '600 9.5px/1 var(--font-mono)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--faint)'
    }
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null, "Source"), /*#__PURE__*/React.createElement("span", null, "Owner"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "State"), /*#__PURE__*/React.createElement("span", null, "Age"), /*#__PURE__*/React.createElement("span", null)), filtered.map(item => /*#__PURE__*/React.createElement(QueueRow, {
    key: item.id,
    item: item,
    onOpen: onOpen
  })), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px',
      textAlign: 'center',
      color: 'var(--muted)',
      fontSize: 13
    }
  }, "Nothing in this state.")));
}
window.ReviewQueue = ReviewQueue;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lex-app/ReviewQueue.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lex-app/SourceDetail.jsx
try { (() => {
/* Lex app — Source detail. Opened from the queue; actions mutate local state. */
function MetaRow({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      justifyContent: 'space-between',
      padding: '11px 0',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 10px/1 var(--font-mono)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--faint)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ink)',
      fontWeight: 500
    }
  }, children));
}
function SourceDetail({
  item,
  onBack
}) {
  const [tab, setTab] = React.useState('overview');
  const [decision, setDecision] = React.useState(null); // 'approved' | 'changes'

  const history = [{
    who: 'P. Diaz',
    what: 'imported the source',
    when: '1h ago',
    tone: 'plum'
  }, {
    who: 'System',
    what: 'ran validation — 3 warnings',
    when: '58m ago',
    tone: 'warning'
  }, {
    who: 'You',
    what: 'opened for review',
    when: 'just now',
    tone: 'neutral'
  }];
  const tone = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    plum: 'var(--plum)',
    neutral: 'var(--muted)'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--subtle",
    style: {
      alignSelf: 'flex-start',
      marginLeft: -8
    },
    onClick: onBack
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 14,
    style: {
      transform: 'rotate(180deg)'
    }
  }), "Back to queue"), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero__eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 5,
      background: `var(--past-${item.cat})`
    }
  }), item.id), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 30,
      fontWeight: 500,
      letterSpacing: '-0.03em',
      marginTop: 8
    }
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 10,
      marginTop: 12
    }
  }, decision === 'approved' ? /*#__PURE__*/React.createElement("span", {
    className: "badge badge--success"
  }, "APPROVED") : decision === 'changes' ? /*#__PURE__*/React.createElement("span", {
    className: "badge badge--warning"
  }, "CHANGES REQUESTED") : /*#__PURE__*/React.createElement("span", {
    className: "badge badge--plum"
  }, "IN REVIEW"), /*#__PURE__*/React.createElement("span", {
    className: "spill spill--neutral"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spill__dot"
  }), item.owner), /*#__PURE__*/React.createElement("span", {
    className: "spill spill--neutral"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12
  }), item.age))), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--danger",
    disabled: !!decision,
    onClick: () => setDecision('changes')
  }, "Request changes"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    disabled: !!decision,
    onClick: () => setDecision('approved')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15
  }), "Approve"))), decision && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: '14px 18px',
      background: decision === 'approved' ? 'var(--success-soft)' : 'var(--warning-soft)',
      border: 'none',
      animation: 'fade-up 220ms var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 10,
      color: decision === 'approved' ? 'var(--success)' : 'var(--warning)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: decision === 'approved' ? 'check' : 'flag',
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, decision === 'approved' ? 'Source approved — moved to the library.' : 'Changes requested — owner notified.'))), /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, [['overview', 'Overview'], ['history', 'History']].map(([id, label]) => /*#__PURE__*/React.createElement("div", {
    key: id,
    className: 'tab' + (tab === id ? ' tab--active' : ''),
    onClick: () => setTab(id)
  }, label))), tab === 'overview' ? /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: '1.4fr 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__title"
  }, "Summary"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--ink-2)',
      lineHeight: 1.55
    }
  }, item.size, " ingested from the upstream connector. Validation flagged ", item.flagged ? 'a schema mismatch on three columns' : 'no blocking issues', ". Review the mapping below and approve to release into the ", item.owner, " pipeline."), /*#__PURE__*/React.createElement("div", {
    className: "grid",
    style: {
      gridTemplateColumns: 'repeat(3,1fr)',
      marginTop: 20,
      gap: 12
    }
  }, [['Rows', item.size.split(' ')[0]], ['Columns', '24'], ['Warnings', item.flagged ? '3' : '0']].map(([l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      background: 'var(--bg-2)',
      borderRadius: 8,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 22px/1 var(--font-display)',
      letterSpacing: '-0.02em',
      color: 'var(--ink)'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 9px/1 var(--font-mono)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--faint)',
      marginTop: 6
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__title"
  }, "Metadata"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "Source ID"
  }, item.id), /*#__PURE__*/React.createElement(MetaRow, {
    label: "Owner"
  }, item.owner), /*#__PURE__*/React.createElement(MetaRow, {
    label: "Category"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'capitalize'
    }
  }, item.cat)), /*#__PURE__*/React.createElement(MetaRow, {
    label: "Ingested"
  }, item.age, " ago"), /*#__PURE__*/React.createElement(MetaRow, {
    label: "Connector"
  }, "Upstream \xB7 SFTP"))) : /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__title"
  }, "Audit trail"), /*#__PURE__*/React.createElement("div", {
    className: "stack",
    style: {
      gap: 16
    }
  }, history.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row",
    style: {
      gap: 11,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: tone[h.tone],
      marginTop: 6,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)',
      fontWeight: 600
    }
  }, h.who), " ", h.what), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 9.5px/1 var(--font-mono)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--faint)',
      marginTop: 5
    }
  }, h.when)))))));
}
window.SourceDetail = SourceDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lex-app/SourceDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lex-app/Topbar.jsx
try { (() => {
/* Lex app — Topbar. Translucent + backdrop blur (non-negotiable). */
function Topbar({
  crumbs,
  onSync
}) {
  const {
    user
  } = window.LEX_DATA;
  const [syncing, setSyncing] = React.useState(false);
  const sync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1100);
    onSync && onSync();
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 8
    }
  }, crumbs.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 12,
    style: {
      color: 'var(--faint)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "crumb",
    style: {
      color: i === crumbs.length - 1 ? 'var(--ink-2)' : 'var(--muted)'
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 11,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--faint)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 14
  })), /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "Search sources\u2026",
    style: {
      width: 220,
      paddingLeft: 32,
      height: 34
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "spill spill--success spill--filled",
    title: "Last sync 2m ago"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spill__dot pulse-dot"
  }), "SYNCED"), /*#__PURE__*/React.createElement("button", {
    className: "btn-icon",
    onClick: sync,
    title: "Sync now"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sync",
    size: 16,
    style: syncing ? {
      animation: 'spin 0.7s linear infinite'
    } : undefined
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn-icon",
    title: "Notifications"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    className: "avatar avatar--sm",
    title: user.name
  }, user.initials)));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lex-app/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/lex-app/data.js
try { (() => {
/* Mock data for the Lex app UI kit — purely cosmetic, not production. */
window.LEX_DATA = {
  org: {
    name: 'Northwind Capital',
    plan: 'Enterprise',
    version: 'v2.4.1'
  },
  user: {
    name: 'Jordan Mehta',
    initials: 'JM',
    role: 'Reviewer'
  },
  nav: [{
    group: 'Workspace',
    items: [{
      id: 'dashboard',
      icon: 'home',
      label: 'Overview'
    }, {
      id: 'queue',
      icon: 'inbox',
      label: 'Intake queue',
      count: 6
    }, {
      id: 'pipelines',
      icon: 'pipe',
      label: 'Pipelines'
    }]
  }, {
    group: 'Library',
    items: [{
      id: 'sources',
      icon: 'layers',
      label: 'Sources'
    }, {
      id: 'history',
      icon: 'history',
      label: 'History'
    }, {
      id: 'docs',
      icon: 'book',
      label: 'Documentation'
    }]
  }],
  stats: [{
    label: 'In review',
    value: '6'
  }, {
    label: 'Approved',
    value: '142'
  }, {
    label: 'Pipeline health',
    value: '98.2%'
  }, {
    label: 'Last sync',
    value: '2m ago'
  }],
  metrics: [{
    title: 'Throughput',
    value: '1,284',
    unit: 'records / day',
    delta: '+4.1%',
    good: true
  }, {
    title: 'Avg review time',
    value: '3.2m',
    unit: 'per item',
    delta: '-0.4m',
    good: true
  }, {
    title: 'Flagged',
    value: '11',
    unit: 'awaiting action',
    delta: '+3',
    good: false
  }],
  // Mini bar series for the dashboard chart (grape / plum / amber legs)
  series: [{
    d: 'Mon',
    a: 62,
    b: 30,
    c: 12
  }, {
    d: 'Tue',
    a: 71,
    b: 28,
    c: 18
  }, {
    d: 'Wed',
    a: 58,
    b: 41,
    c: 14
  }, {
    d: 'Thu',
    a: 80,
    b: 33,
    c: 22
  }, {
    d: 'Fri',
    a: 74,
    b: 38,
    c: 19
  }, {
    d: 'Sat',
    a: 40,
    b: 18,
    c: 8
  }, {
    d: 'Sun',
    a: 33,
    b: 14,
    c: 6
  }],
  queue: [{
    id: 'SRC-4821',
    name: 'Q3 ledger import',
    owner: 'A. Khan',
    cat: 'blue',
    status: 'review',
    spill: 'plum',
    age: '12m',
    size: '2.4k rows'
  }, {
    id: 'SRC-4820',
    name: 'Vendor reconciliation',
    owner: 'P. Diaz',
    cat: 'mint',
    status: 'pending',
    spill: 'neutral',
    age: '34m',
    size: '880 rows'
  }, {
    id: 'SRC-4817',
    name: 'Payroll delta — Aug',
    owner: 'R. Sole',
    cat: 'sky',
    status: 'review',
    spill: 'plum',
    age: '1h',
    size: '1.1k rows'
  }, {
    id: 'SRC-4814',
    name: 'FX rate feed',
    owner: 'T. Lin',
    cat: 'lilac',
    status: 'blocked',
    spill: 'neutral',
    age: '2h',
    size: '320 rows',
    flagged: true
  }, {
    id: 'SRC-4809',
    name: 'Treasury positions',
    owner: 'A. Khan',
    cat: 'sand',
    status: 'pending',
    spill: 'neutral',
    age: '3h',
    size: '640 rows'
  }, {
    id: 'SRC-4802',
    name: 'Intercompany journal',
    owner: 'M. Voss',
    cat: 'peach',
    status: 'review',
    spill: 'plum',
    age: '5h',
    size: '4.0k rows'
  }],
  activity: [{
    who: 'A. Khan',
    what: 'approved',
    target: 'SRC-4798 · Bank statements',
    when: '8m ago',
    tone: 'success'
  }, {
    who: 'You',
    what: 'requested changes on',
    target: 'SRC-4814 · FX rate feed',
    when: '24m ago',
    tone: 'warning'
  }, {
    who: 'P. Diaz',
    what: 'imported',
    target: 'SRC-4821 · Q3 ledger',
    when: '1h ago',
    tone: 'plum'
  }, {
    who: 'System',
    what: 'auto-synced',
    target: '12 sources',
    when: '2h ago',
    tone: 'neutral'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lex-app/data.js", error: String((e && e.message) || e) }); }

})();
