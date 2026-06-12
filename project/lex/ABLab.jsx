/* Lex — A/B Lab. Persistent tabs (one per run, builds to infinity),
   side-by-side compare, red/green diff, cost-down trend, pin winner. */

function fmt(n) { return '$' + n.toFixed(4); }
function pct(a, b) { return ((b - a) / a) * 100; }

function CostTrend({ trend }) {
  const w = 720, h = 150, padL = 44, padR = 16, padT = 14, padB = 26;
  const max = Math.max(...trend.map((d) => d.seat)) * 1.08;
  const xs = (i) => padL + (i / (trend.length - 1)) * (w - padL - padR);
  const ys = (v) => padT + (1 - v / max) * (h - padT - padB);
  const pts = trend.map((d, i) => [xs(i), ys(d.seat)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
  const area = line + ` L${xs(trend.length - 1)} ${h - padB} L${xs(0)} ${h - padB} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id="abGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--plum)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--plum)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((f) => (
        <g key={f}>
          <line x1={padL} y1={padT + f * (h - padT - padB)} x2={w - padR} y2={padT + f * (h - padT - padB)} stroke="var(--hairline)" strokeWidth="1" />
          <text x={padL - 8} y={padT + f * (h - padT - padB) + 3} textAnchor="end" style={{ font: '500 9px var(--font-mono)', fill: 'var(--faint)' }}>${(max * (1 - f)).toFixed(0)}</text>
        </g>
      ))}
      <path d={area} fill="url(#abGrad)" />
      <path d={line} fill="none" stroke="var(--plum)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {trend.map((d, i) => (
        <g key={i}>
          <circle cx={xs(i)} cy={ys(d.seat)} r={i === trend.length - 1 ? 5 : 3.5} fill={i === trend.length - 1 ? 'var(--plum)' : 'var(--surface)'} stroke="var(--plum)" strokeWidth="2" />
          <text x={xs(i)} y={ys(d.seat) - 11} textAnchor="middle" style={{ font: '600 9px var(--font-mono)', fill: 'var(--ink-2)' }}>{fmt(d.seat)}</text>
          <text x={xs(i)} y={h - 8} textAnchor="middle" style={{ font: '500 9px var(--font-mono)', fill: 'var(--faint)' }}>{d.label}</text>
        </g>
      ))}
    </svg>
  );
}

function AllRuns({ job, runs, onOpenRun, onPin }) {
  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="card" style={{ padding: '22px 26px' }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
          <Eyebrow>Seat-share over versions · cheaper every run</Eyebrow>
          <span className="badge badge--success">▼ {Math.abs(pct(job.costTrend[0].seat, job.costTrend[job.costTrend.length - 1].seat)).toFixed(0)}% since first cut</span>
        </div>
        <CostTrend trend={job.costTrend} />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--hairline)' }}>
          <Eyebrow>Compare all runs · {runs.length}</Eyebrow>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) 1fr 1fr 0.8fr 0.8fr 92px', gap: 12, padding: '10px 22px', background: 'var(--bg-2)', borderBottom: '1px solid var(--hairline)', font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
          <span>Comparison</span><span>Base</span><span>Variant</span><span>Δ cost</span><span>Tests</span><span></span>
        </div>
        {runs.map((r) => {
          const d = pct(r.a.seat, r.b.seat);
          return (
            <div key={r.id} onClick={() => onOpenRun(r.id)} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) 1fr 1fr 0.8fr 0.8fr 92px', gap: 12, padding: '14px 22px', borderBottom: '1px solid var(--hairline)', cursor: 'pointer', alignItems: 'center', transition: 'background 200ms var(--ease-soft)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--elevated)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
              <div className="row" style={{ gap: 9, minWidth: 0 }}>
                {r.pinned && <Icon name="check" size={13} style={{ color: 'var(--plum)' }} />}
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</span>
              </div>
              <span style={{ font: '500 11.5px/1 var(--font-mono)', color: 'var(--ink-2)' }}>{r.a.version} · {fmt(r.a.seat)}</span>
              <span style={{ font: '500 11.5px/1 var(--font-mono)', color: 'var(--ink-2)' }}>{r.b.version} · {fmt(r.b.seat)}</span>
              <span className="badge" style={{ background: d < 0 ? 'var(--success-soft)' : 'var(--danger-soft)', color: d < 0 ? 'var(--success)' : 'var(--danger)' }}>{d < 0 ? '▼' : '▲'} {Math.abs(d).toFixed(0)}%</span>
              <span style={{ font: '500 11.5px/1 var(--font-mono)', color: 'var(--ink-2)' }}>{r.b.tests}</span>
              <button className={'btn ' + (r.pinned ? 'btn--subtle' : 'btn--ghost')} onClick={(e) => { e.stopPropagation(); onPin(r.id); }} style={{ padding: '5px 10px', fontSize: 11 }}>
                {r.pinned ? 'Pinned' : 'Pin'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompareCol({ v, win, side }) {
  return (
    <div style={{ flex: 1, border: '1px solid ' + (win ? 'var(--plum)' : 'var(--hairline)'), borderRadius: 12, padding: '18px 20px', background: win ? 'var(--plum-soft)' : 'var(--surface)' }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>{side}</span>
        {win && <span className="badge badge--plum">Winner</span>}
      </div>
      <div style={{ font: '600 18px/1 var(--font-mono)', color: 'var(--ink)' }}>{v.version}</div>
      <div style={{ font: '500 30px/1 var(--font-display)', letterSpacing: '-0.02em', color: win ? 'var(--plum-3)' : 'var(--ink)', marginTop: 14 }}>{fmt(v.seat)}</div>
      <div style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginTop: 6 }}>amortized seat share</div>
    </div>
  );
}

function MetricCompare({ label, a, b, betterLower }) {
  const num = (x) => { const n = parseFloat(String(x).replace(/[^0-9.]/g, '')); return isNaN(n) ? null : n; };
  const na = num(a), nb = num(b);
  let bWins = null;
  if (na != null && nb != null && na !== nb) bWins = betterLower ? nb < na : nb > na;
  return (
    <div className="row" style={{ gap: 12, padding: '11px 0', borderBottom: '1px solid var(--hairline)' }}>
      <span style={{ flex: 1, font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</span>
      <span style={{ width: 90, textAlign: 'right', font: '500 12px/1 var(--font-mono)', color: 'var(--ink-2)' }}>{a}</span>
      <Icon name="chevronRight" size={12} style={{ color: 'var(--faint)' }} />
      <span style={{ width: 90, textAlign: 'right', font: '600 12px/1 var(--font-mono)', color: bWins ? 'var(--success)' : 'var(--ink)' }}>{b}</span>
    </div>
  );
}

function DiffView({ diff }) {
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-2)' }}>
      <div style={{ padding: '9px 14px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface)', font: '500 10px/1 var(--font-mono)', letterSpacing: '0.06em', color: 'var(--faint)' }}>SQL diff · base → variant</div>
      <pre style={{ margin: 0, padding: '10px 0', font: '12px/1.7 var(--font-mono)', overflow: 'auto' }}>
        {diff.map((d, i) => {
          const bg = d.kind === 'add' ? 'rgba(91,143,107,0.10)' : d.kind === 'del' ? 'rgba(176,90,82,0.10)' : 'transparent';
          const gutter = d.kind === 'add' ? '+' : d.kind === 'del' ? '−' : ' ';
          const col = d.kind === 'add' ? 'var(--success)' : d.kind === 'del' ? 'var(--danger)' : 'var(--ink-2)';
          return (
            <div key={i} className="row" style={{ gap: 0, background: bg, padding: '0 14px' }}>
              <span style={{ width: 18, flex: '0 0 auto', color: col, userSelect: 'none' }}>{gutter}</span>
              <code style={{ color: col, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{d.text}</code>
            </div>
          );
        })}
      </pre>
    </div>
  );
}

function RunView({ run, onPin }) {
  const d = pct(run.a.seat, run.b.seat);
  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="card" style={{ padding: '22px 26px' }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{run.label}</div>
            <div style={{ font: '500 10.5px/1 var(--font-mono)', color: 'var(--faint)', marginTop: 5 }}>Ran {run.date}</div>
          </div>
          <div className="row" style={{ gap: 10 }}>
            <span className="badge" style={{ background: d < 0 ? 'var(--success-soft)' : 'var(--danger-soft)', color: d < 0 ? 'var(--success)' : 'var(--danger)', fontSize: 11 }}>{d < 0 ? '▼' : '▲'} {Math.abs(d).toFixed(1)}% seat-share</span>
            <button className={'btn ' + (run.pinned ? 'btn--subtle' : 'btn--primary')} onClick={() => onPin(run.id)}>
              <Icon name="check" size={14} />{run.pinned ? 'Pinned as winner' : 'Pin winner'}
            </button>
          </div>
        </div>
        <div className="row" style={{ gap: 14, alignItems: 'stretch' }}>
          <CompareCol v={run.a} win={run.winner === 'a'} side="Base" />
          <CompareCol v={run.b} win={run.winner === 'b'} side="Variant" />
        </div>
        <div style={{ marginTop: 20 }}>
          <Eyebrow style={{ marginBottom: 4 }}>Metrics</Eyebrow>
          <MetricCompare label="List-price ref" a={'$' + run.a.listRef} b={'$' + run.b.listRef} betterLower />
          <MetricCompare label="Input tokens" a={run.a.input} b={run.b.input} betterLower />
          <MetricCompare label="Output tokens" a={run.a.output} b={run.b.output} betterLower />
          <MetricCompare label="Cache reads" a={run.a.cache} b={run.b.cache} />
          <MetricCompare label="Rows returned" a={run.a.rows} b={run.b.rows} />
          <MetricCompare label="Verify tests" a={run.a.tests} b={run.b.tests} />
          <MetricCompare label="Latency" a={run.a.latency} b={run.b.latency} betterLower />
        </div>
      </div>
      <DiffView diff={run.diff} />
    </div>
  );
}

function NewRunComposer({ job, onRun, onCancel }) {
  const versions = job.lineage.map((l) => l.version);
  const [base, setBase] = React.useState(versions[versions.length - 2] || versions[0]);
  const [variant, setVariant] = React.useState('HEAD (working)');
  const [model, setModel] = React.useState('sonnet-4');
  const [running, setRunning] = React.useState(false);
  const go = () => { setRunning(true); setTimeout(() => onRun({ base, variant, model }), 1300); };

  if (running) return (
    <div className="card" style={{ padding: '56px 40px', textAlign: 'center' }}>
      <div className="spin" style={{ margin: '0 auto 18px' }} />
      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>Running A/B comparison…</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Building {variant} with {model}, scoring against {base}</div>
    </div>
  );

  const field = (label, value, set, opts) => (
    <div>
      <div className="input-label">{label}</div>
      <select className="input" value={value} onChange={(e) => set(e.target.value)} style={{ cursor: 'pointer' }}>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="card" style={{ padding: '26px 28px' }}>
      <Eyebrow style={{ marginBottom: 4 }}>New A/B test</Eyebrow>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>Pick a baseline and a variant. Every run becomes a tab you can compare against the others.</div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {field('Base version', base, setBase, versions)}
        {field('Variant', variant, setVariant, ['HEAD (working)', ...versions])}
        {field('Dimension · model', model, setModel, ['sonnet-4', 'opus-4', 'haiku-4'])}
      </div>
      <div className="row" style={{ gap: 10, marginTop: 22 }}>
        <button className="btn btn--primary btn--lg" onClick={go}><Icon name="sync" size={15} />Run comparison</button>
        <button className="btn btn--subtle btn--lg" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

function ABLab({ job }) {
  const [runs, setRuns] = React.useState(job.ab.map((r) => ({ ...r })));
  const [tab, setTab] = React.useState('all');
  const [composing, setComposing] = React.useState(false);
  const seq = React.useRef(runs.length);

  const pinWinner = (id) => setRuns((rs) => rs.map((r) => ({ ...r, pinned: r.id === id })));

  const addRun = ({ base, variant, model }) => {
    seq.current += 1;
    const id = 'ab-new-' + seq.current;
    const baseEntry = job.lineage.find((l) => l.version === base);
    const baseSeat = (baseEntry ? parseFloat(String(baseEntry.seat).replace(/[^0-9.]/g, '')) : 4.0) || 4.0;
    const newSeat = Math.max(0.4, baseSeat * (0.55 + Math.random() * 0.2));
    const run = {
      id, label: base + ' → ' + variant + (model !== 'sonnet-4' ? ' · ' + model : ''), date: '2026-06-10', pinned: false, winner: 'b',
      a: { version: base, seat: baseSeat, listRef: +(baseSeat * 2.1).toFixed(2), input: '1.0k', output: '9.0k', cache: '2.4M', rows: '9.0k', tests: '12/12', latency: '24s' },
      b: { version: variant === 'HEAD (working)' ? 'HEAD' : variant, seat: +newSeat.toFixed(4), listRef: +(newSeat * 2.1).toFixed(2), input: '11', output: '4.1k', cache: '780.0k', rows: '4.1k', tests: '12/12', latency: '13s' },
      diff: [
        { kind: 'ctx', text: 'WITH date_spine AS (...)' },
        { kind: 'del', text: '-- baseline ' + base + ' (' + model + ' off)' },
        { kind: 'add', text: '/*+ cache */ scoped event window — ' + model },
      ],
    };
    setRuns((rs) => [...rs, run]);
    setComposing(false);
    setTab(id);
  };

  const closeRun = (id, e) => {
    e.stopPropagation();
    setRuns((rs) => rs.filter((r) => r.id !== id));
    setTab('all');
  };

  const activeRun = runs.find((r) => r.id === tab);

  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="row" style={{ gap: 4, overflowX: 'auto', paddingBottom: 4, borderBottom: '1px solid var(--hairline)' }}>
        <button onClick={() => { setTab('all'); setComposing(false); }} className="row"
          style={{ gap: 7, padding: '9px 14px', borderRadius: '8px 8px 0 0', border: 'none', borderBottom: '2px solid ' + (tab === 'all' && !composing ? 'var(--plum)' : 'transparent'), marginBottom: -1, background: 'transparent', cursor: 'pointer', font: '500 12.5px/1 var(--font-sans)', color: tab === 'all' && !composing ? 'var(--plum)' : 'var(--muted)', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
          <Icon name="chart" size={14} />All runs
        </button>
        {runs.map((r) => (
          <button key={r.id} onClick={() => { setTab(r.id); setComposing(false); }} className="row"
            style={{ gap: 7, padding: '9px 12px', borderRadius: '8px 8px 0 0', border: 'none', borderBottom: '2px solid ' + (tab === r.id ? 'var(--plum)' : 'transparent'), marginBottom: -1, background: 'transparent', cursor: 'pointer', font: '500 12.5px/1 var(--font-sans)', color: tab === r.id ? 'var(--plum)' : 'var(--muted)', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
            {r.pinned && <Icon name="check" size={12} style={{ color: 'var(--plum)' }} />}
            {r.label}
            <span onClick={(e) => closeRun(r.id, e)} style={{ display: 'inline-flex', padding: 2, borderRadius: 4, opacity: 0.5 }} title="Close tab"><Icon name="x" size={11} /></span>
          </button>
        ))}
        <button onClick={() => { setComposing(true); setTab(null); }} className="row"
          style={{ gap: 6, padding: '9px 12px', borderRadius: '8px 8px 0 0', border: 'none', borderBottom: '2px solid ' + (composing ? 'var(--plum)' : 'transparent'), marginBottom: -1, background: 'transparent', cursor: 'pointer', font: '500 12.5px/1 var(--font-sans)', color: composing ? 'var(--plum)' : 'var(--muted)', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
          <Icon name="plus" size={14} />New test
        </button>
      </div>

      {composing ? <NewRunComposer job={job} onRun={addRun} onCancel={() => { setComposing(false); setTab('all'); }} />
        : tab === 'all' ? <AllRuns job={job} runs={runs} onOpenRun={setTab} onPin={pinWinner} />
        : activeRun ? <RunView run={activeRun} onPin={pinWinner} />
        : <AllRuns job={job} runs={runs} onOpenRun={setTab} onPin={pinWinner} />}
    </div>
  );
}
window.ABLab = ABLab;
