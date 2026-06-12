/* Lex prototype — small shared widgets: phase trail, sparkline,
   trajectory bar, cost-bars, and a couple of mapping helpers. */

const LEX_PASTELS = ['blue', 'mint', 'sky', 'lilac', 'sand', 'peach', 'blush'];
function domainCat(domain) {
  return domain === 'finance' ? 'sand' : domain === 'growth' ? 'mint' : 'blue';
}
function phaseColor(phase) {
  return ({
    contract: 'var(--past-sky-ink)', build: 'var(--past-sand-ink)',
    verify: 'var(--warning)', review: 'var(--plum)', done: 'var(--success)',
  })[phase] || 'var(--muted)';
}
function gradeColor(g) {
  return g === 'good' ? 'var(--success)' : g === 'bad' ? 'var(--danger)' : g === 'neutral' ? 'var(--muted)' : 'var(--faint)';
}

/* PhaseTrail — 5 segments contract→done, filled up to current phase */
function PhaseTrail({ phase, width = 'auto', showLabel }) {
  const { PHASES } = window.LEX;
  const idx = PHASES.findIndex(p => p.id === phase);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width }}>
      <div className="row" style={{ gap: 3 }}>
        {PHASES.map((p, i) => {
          const reached = i <= idx;
          const isCur = i === idx;
          return (
            <div key={p.id} title={p.label} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: reached ? (isCur ? phaseColor(phase) : 'var(--hairline-2)') : 'var(--hairline)',
              opacity: reached ? 1 : 0.6,
            }} />
          );
        })}
      </div>
      {showLabel && (
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: phaseColor(phase) }}>{PHASES[idx] ? PHASES[idx].label : '—'}</span>
          <span style={{ font: '500 9px/1 var(--font-mono)', letterSpacing: '0.08em', color: 'var(--faint)' }}>{idx + 1}/5</span>
        </div>
      )}
    </div>
  );
}

/* Sparkline — small svg line with optional area + end dot. values: number[] */
function Sparkline({ values, width = 130, height = 36, color = 'var(--plum)', down }) {
  if (!values || values.length < 2) return null;
  const max = Math.max(...values), min = Math.min(...values);
  const rng = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (width - 6) + 3;
    const y = height - 4 - ((v - min) / rng) * (height - 8);
    return [x, y];
  });
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = d + ` L${pts[pts.length - 1][0].toFixed(1)} ${height} L${pts[0][0].toFixed(1)} ${height} Z`;
  const end = pts[pts.length - 1];
  const c = down ? 'var(--success)' : color;
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      <path d={area} fill={c} opacity="0.08" />
      <path d={d} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={end[0]} cy={end[1]} r="2.6" fill={c} />
    </svg>
  );
}

/* TrajectoryBar — horizontal progress against a target marker */
function TrajectoryBar({ value, target, max = 100, color = 'var(--success)' }) {
  const pct = Math.min(100, (value / max) * 100);
  const tpct = Math.min(100, (target / max) * 100);
  return (
    <div style={{ position: 'relative', height: 6, borderRadius: 999, background: 'var(--bg-2)', border: '1px solid var(--hairline)' }}>
      <div style={{ position: 'absolute', inset: '0 auto 0 0', width: pct + '%', borderRadius: 999, background: color }} />
      <div title={'target ' + target + '%'} style={{ position: 'absolute', top: -3, bottom: -3, left: tpct + '%', width: 2, background: 'var(--ink-2)', borderRadius: 2 }} />
    </div>
  );
}

/* Phase cost bars — stacked horizontal bar of contract/build/verify/summary cost */
function CostBars({ phases, total, width = '100%', height = 8 }) {
  const order = [['contract', 'var(--past-blue-ink)'], ['build', 'var(--danger)'], ['verify', 'var(--success)'], ['summary', 'var(--warning)']];
  const sum = order.reduce((s, [k]) => s + (phases[k] || 0), 0) || 1;
  return (
    <div className="row" style={{ gap: 0, width, height, borderRadius: 999, overflow: 'hidden', background: 'var(--bg-2)' }}>
      {order.map(([k, c]) => {
        const w = ((phases[k] || 0) / sum) * 100;
        if (!w) return null;
        return <div key={k} title={k + ' $' + (phases[k] || 0).toFixed(2)} style={{ width: w + '%', background: c, height: '100%' }} />;
      })}
    </div>
  );
}

Object.assign(window, { domainCat, phaseColor, gradeColor, PhaseTrail, Sparkline, TrajectoryBar, CostBars, LEX_PASTELS });
