/* Lex — shared helpers: status + phase + file-type metadata, tiny atoms. */

// DAG phase order for the git-style board
const LEX_PHASES = ['contract', 'build', 'verify', 'review', 'done'];

const LEX_STATUS = {
  contract: { label: 'CONTRACTING', spill: 'lilac',   ink: 'var(--past-lilac-ink)', bg: 'var(--past-lilac)' },
  build:    { label: 'BUILDING',    spill: 'plum',    ink: 'var(--plum)',           bg: 'var(--plum-soft)' },
  verify:   { label: 'VERIFYING',   spill: 'grape',   ink: 'var(--grape)',          bg: 'var(--past-sky)' },
  review:   { label: 'IN REVIEW',   spill: 'plum',    ink: 'var(--plum-3)',         bg: 'var(--plum-soft)' },
  done:     { label: 'DONE',        spill: 'success', ink: 'var(--success)',        bg: 'var(--past-mint)' },
};

// Phase cost legend colors (matches the real Tokens phase-breakdown bars)
const LEX_PHASE_COLORS = {
  contract: 'var(--grape)',
  build:    'var(--danger)',
  verify:   'var(--amber)',
  summary:  'var(--warning)',
};

const LEX_FILETYPE = {
  sql:  { label: 'SQL',   tint: 'var(--past-blue)',  ink: 'var(--past-blue-ink)',  glyph: 'doc' },
  md:   { label: 'MD',    tint: 'var(--past-sand)',  ink: 'var(--past-sand-ink)',  glyph: 'doc' },
  json: { label: 'JSON',  tint: 'var(--past-mint)',  ink: 'var(--past-mint-ink)',  glyph: 'doc' },
  xlsx: { label: 'XLSX',  tint: 'var(--past-mint)',  ink: 'var(--past-mint-ink)',  glyph: 'chart', soon: true },
  py:   { label: 'PY',    tint: 'var(--past-peach)', ink: 'var(--past-peach-ink)', glyph: 'doc', soon: true },
  html: { label: 'HTML',  tint: 'var(--past-blush)', ink: 'var(--past-blush-ink)', glyph: 'doc', soon: true },
};

// Status pill used on board + job header
function StatusPill({ status, filled = true }) {
  const m = LEX_STATUS[status] || LEX_STATUS.done;
  return <span className={'spill spill--' + m.spill + (filled ? ' spill--filled' : '')}><span className="spill__dot" />{m.label}</span>;
}

// Version chip (mono pill)
function VersionChip({ v, muted }) {
  return (
    <span style={{
      font: '600 10px/1 var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase',
      padding: '3px 7px', borderRadius: 5, background: muted ? 'var(--elevated)' : 'var(--bg-2)',
      color: muted ? 'var(--faint)' : 'var(--ink-2)', border: '1px solid var(--hairline)',
    }}>{v}</span>
  );
}

// Section label (mono eyebrow)
function Eyebrow({ children, style }) {
  return <div style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)', ...style }}>{children}</div>;
}

// A KPI stat (value + mono label)
function Stat({ value, label, sub, accent }) {
  return (
    <div>
      <div style={{ font: '500 28px/1 var(--font-display)', letterSpacing: '-0.025em', color: accent || 'var(--ink)' }}>{value}</div>
      <div style={{ font: '600 9.5px/1.3 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 8 }}>{label}</div>
      {sub && <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

// Tiny phase-cost stacked bar (segments contract/build/verify/summary)
function PhaseBar({ cost, height = 8, max }) {
  const segs = ['contract', 'build', 'verify', 'summary'];
  const total = max || segs.reduce((s, k) => s + (cost[k] || 0), 0) || 1;
  return (
    <div style={{ display: 'flex', height, width: '100%', borderRadius: 999, overflow: 'hidden', background: 'var(--elevated)' }}>
      {segs.map((k) => {
        const w = (cost[k] || 0) / total * 100;
        if (!w) return null;
        return <span key={k} title={k + ' $' + (cost[k] || 0).toFixed(2)} style={{ width: w + '%', background: LEX_PHASE_COLORS[k] }} />;
      })}
    </div>
  );
}

Object.assign(window, { LEX_PHASES, LEX_STATUS, LEX_PHASE_COLORS, LEX_FILETYPE, StatusPill, VersionChip, Eyebrow, Stat, PhaseBar });
