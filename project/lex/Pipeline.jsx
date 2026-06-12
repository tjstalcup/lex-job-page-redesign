/* Lex prototype — Pipeline board, reimagined as a git network graph.
   Each job is a branch lane; versions are commits plotted over time;
   A/B experiments fork above the lane and merge back. Below the graph,
   a status-lane DAG (contract→done). Clicking a commit opens a diff
   drawer (this version vs its parent). */

const GRAPHW = 720, PAD = 36, INNERW = GRAPHW - PAD * 2, LANEH = 64, CY = 34, FORKY = 13;
const nodeX = (x) => PAD + x * INNERW;

function CommitNode({ c, isHead, phase, onClick }) {
  const x = nodeX(c.x), y = c.branch ? FORKY : CY;
  const r = isHead ? 6.5 : 4.5;
  const passClean = c.fail === 0 && c.pass > 0;
  const fill = isHead ? phaseColor(phase) : (c.branch ? 'var(--plum)' : 'var(--surface)');
  const stroke = isHead ? phaseColor(phase) : (c.branch ? 'var(--plum)' : 'var(--hairline-2)');
  return (
    <button onClick={onClick} title={c.v}
      style={{ position: 'absolute', left: x - 13, top: y - 13, width: 26, height: 26, padding: 0, border: 'none',
        background: 'transparent', cursor: 'pointer', zIndex: 3 }}
      className="lex-commit">
      <span style={{ position: 'absolute', left: 13 - r, top: 13 - r, width: r * 2, height: r * 2, borderRadius: '50%',
        background: fill, border: `2px solid ${stroke}`, boxSizing: 'border-box' }} />
      {isHead && passClean && (
        <span style={{ position: 'absolute', left: 13 - r - 3, top: 13 - r - 3, width: (r + 3) * 2, height: (r + 3) * 2,
          borderRadius: '50%', border: '1.5px solid var(--success)', opacity: 0.5 }} />
      )}
      <span className="lex-commit__tip" style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        background: 'var(--grape)', color: '#fff', borderRadius: 8, padding: '8px 10px', width: 168, textAlign: 'left',
        boxShadow: 'var(--shadow-pop)', pointerEvents: 'none', opacity: 0, transition: 'opacity 160ms', zIndex: 9 }}>
        <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '0.04em' }}>{c.v}</span>
        <span style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,0.7)', marginTop: 5 }}>{c.model} · {c.date.replace('-', '/')}</span>
        <span style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5 }}>
          <span>{c.seat != null ? '$' + c.seat.toFixed(2) : '—'}</span>
          <span style={{ color: c.fail ? 'var(--warning)' : 'var(--amber-soft)' }}>{c.pass}✓ {c.fail ? c.fail + '✗' : ''}</span>
        </span>
      </span>
    </button>
  );
}

function JobLane({ job, onOpenJob, onCommit }) {
  const cs = job.commits;
  const last = cs[cs.length - 1];
  // build connector paths
  let main = '';
  if (cs.length > 1) main = `M ${nodeX(cs[0].x)} ${CY} L ${nodeX(last.x)} ${CY}`;
  const forks = [];
  cs.forEach((c, i) => {
    if (c.branch) {
      const p = cs[i - 1], n = cs[i + 1];
      const cx = nodeX(c.x);
      if (p) forks.push(`M ${nodeX(p.x)} ${CY} C ${nodeX(p.x) + 18} ${CY}, ${cx - 18} ${FORKY}, ${cx} ${FORKY}`);
      if (n) forks.push(`M ${cx} ${FORKY} C ${cx + 18} ${FORKY}, ${nodeX(n.x) - 18} ${CY}, ${nodeX(n.x)} ${CY}`);
    }
  });
  const branchCommit = cs.find(c => c.branch);

  return (
    <div className="row lex-lane" style={{ gap: 0, alignItems: 'stretch', borderTop: '1px solid var(--hairline)' }}>
      {/* label column */}
      <div onClick={() => onOpenJob(job.slug)} className="lex-lane__label"
        style={{ width: 312, flex: '0 0 auto', padding: '12px 18px 12px 0', cursor: 'pointer', display: 'flex', gap: 11, alignItems: 'center' }}>
        <span style={{ width: 9, height: 9, borderRadius: 3, marginTop: 1, flex: '0 0 auto',
          background: `var(--past-${domainCat(job.domain)})`, border: `1px solid var(--past-${domainCat(job.domain)}-ink)` }} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</div>
          <div className="row" style={{ gap: 7, marginTop: 4 }}>
            <span style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 168 }}>{job.slug}</span>
          </div>
        </div>
        <Spill variant={job.phase === 'done' ? 'success' : job.phase === 'review' ? 'plum' : 'neutral'} filled
          style={{ flex: '0 0 auto' }}>{job.head !== '—' ? job.head : job.phase.toUpperCase()}</Spill>
      </div>

      {/* graph track */}
      <div style={{ position: 'relative', width: GRAPHW, height: LANEH, flex: '0 0 auto' }}>
        <svg width={GRAPHW} height={LANEH} style={{ position: 'absolute', inset: 0 }}>
          {main && <path d={main} stroke="var(--hairline-2)" strokeWidth="1.5" fill="none" />}
          {forks.map((f, i) => <path key={i} d={f} stroke="var(--plum)" strokeWidth="1.5" fill="none" opacity="0.55" />)}
        </svg>
        {branchCommit && (
          <span style={{ position: 'absolute', left: nodeX(branchCommit.x) + 12, top: FORKY - 7,
            font: '500 8.5px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--plum)', whiteSpace: 'nowrap' }}>
            {branchCommit.branch}
          </span>
        )}
        {cs.map((c, i) => (
          <CommitNode key={c.v + i} c={c} isHead={i === cs.length - 1} phase={job.phase}
            onClick={() => onCommit(job, c, cs[i - 1])} />
        ))}
        {/* seat-share readout at HEAD */}
        {last.seat != null && (
          <span style={{ position: 'absolute', left: Math.min(nodeX(last.x) + 14, GRAPHW - 70), top: CY - 6,
            font: '600 10px/1 var(--font-mono)', color: 'var(--ink-2)' }}>${last.seat.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
}

function DateAxis() {
  const ticks = ['05-19', '05-24', '05-29', '06-03', '06-08'];
  return (
    <div className="row" style={{ gap: 0, alignItems: 'stretch' }}>
      <div style={{ width: 312, flex: '0 0 auto' }} />
      <div style={{ position: 'relative', width: GRAPHW, height: 22, flex: '0 0 auto' }}>
        {ticks.map(t => (
          <span key={t} style={{ position: 'absolute', left: nodeX(window.LEX.frac(t)), top: 4, transform: 'translateX(-50%)',
            font: '500 9px/1 var(--font-mono)', letterSpacing: '0.06em', color: 'var(--faint)' }}>{t}</span>
        ))}
        <span style={{ position: 'absolute', right: 0, top: 4, font: '600 9px/1 var(--font-mono)', letterSpacing: '0.08em', color: 'var(--plum)' }}>NOW</span>
      </div>
    </div>
  );
}

function StatusLanes({ jobs, onOpenJob }) {
  const { PHASES } = window.LEX;
  return (
    <div className="card" style={{ padding: '22px 22px' }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <div className="row" style={{ gap: 8, color: 'var(--muted)' }}><Icon name="layers" size={14} /><span className="label-mono" style={{ margin: 0 }}>Status lanes · DAG</span></div>
        <span style={{ font: '500 10px/1 var(--font-mono)', letterSpacing: '0.06em', color: 'var(--faint)' }}>contract → build → verify → review → done</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
        {PHASES.map(p => {
          const inLane = jobs.filter(j => j.phase === p.id);
          return (
            <div key={p.id} style={{ background: 'var(--bg-2)', borderRadius: 10, padding: 12, minHeight: 130 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="row" style={{ gap: 6, font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: phaseColor(p.id) }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: phaseColor(p.id) }} />{p.label}
                </span>
                <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--faint)' }}>{inLane.length}</span>
              </div>
              <div className="stack" style={{ gap: 8 }}>
                {inLane.map(j => (
                  <div key={j.slug} onClick={() => onOpenJob(j.slug)}
                    style={{ background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 8, padding: '9px 10px', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--hairline-2)'; e.currentTarget.style.boxShadow = 'var(--shadow-1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hairline)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{j.title}</div>
                    <div className="row" style={{ justifyContent: 'space-between', marginTop: 7 }}>
                      <span style={{ font: '500 9px/1 var(--font-mono)', color: 'var(--faint)' }}>{j.head}</span>
                      {j.seat != null && <span style={{ font: '600 9px/1 var(--font-mono)', color: 'var(--ink-2)' }}>${j.seat.toFixed(2)}</span>}
                    </div>
                  </div>
                ))}
                {!inLane.length && <span style={{ font: '500 9.5px/1 var(--font-mono)', color: 'var(--faint)', opacity: 0.6 }}>—</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DiffDrawer({ ctx, onClose, onOpenJob }) {
  const { diff } = window.LEX;
  if (!ctx) return null;
  const { job, commit, parent } = ctx;
  const seatDelta = (parent && parent.seat != null && commit.seat != null) ? commit.seat - parent.seat : null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(20,33,61,0.28)', animation: 'fade-in 180ms' }} />
      <aside style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 560, maxWidth: '92vw', background: 'var(--surface)',
        borderLeft: '1px solid var(--hairline)', boxShadow: 'var(--shadow-pop)', display: 'flex', flexDirection: 'column', animation: 'fade-up 220ms var(--ease-out)' }}>
        <div className="row" style={{ justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--hairline)' }}>
          <div>
            <div className="row" style={{ gap: 8, color: 'var(--muted)', marginBottom: 6 }}><Icon name="diff" size={14} /><span className="label-mono" style={{ margin: 0 }}>Version diff</span></div>
            <div className="row" style={{ gap: 8, font: '600 12px/1 var(--font-mono)', color: 'var(--ink)' }}>
              {parent ? <><span style={{ color: 'var(--faint)' }}>{parent.v}</span><Icon name="arrowRight" size={13} style={{ color: 'var(--faint)' }} /></> : null}
              <span style={{ color: 'var(--plum)' }}>{commit.v}</span>
            </div>
          </div>
          <IconBtn name="x" onClick={onClose} title="Close" />
        </div>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--hairline)' }}>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            <Readout label="Seat-share" value={commit.seat != null ? '$' + commit.seat.toFixed(2) : '—'}
              sub={seatDelta != null ? (seatDelta < 0 ? '▼ ' : '▲ ') + '$' + Math.abs(seatDelta).toFixed(2) : null}
              accent={seatDelta != null && seatDelta < 0 ? 'var(--success)' : undefined} />
            <Readout label="Checks" value={`${commit.pass}✓ ${commit.fail}✗`} sub={commit.fail ? 'has failures' : 'all clean'} accent={commit.fail ? 'var(--warning)' : 'var(--success)'} />
            <Readout label="Model" value={commit.model} sub={commit.note} />
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '0 0 18px' }}>
          <div style={{ padding: '14px 22px 8px', font: '600 10px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>active_users_per_week_tier · sql</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.7 }}>
            {(parent ? diff : diff.filter(d => d.t !== 'del')).map((d, i) => {
              const bg = d.t === 'add' ? 'var(--success-soft)' : d.t === 'del' ? 'var(--danger-soft)' : 'transparent';
              const mark = d.t === 'add' ? '+' : d.t === 'del' ? '−' : ' ';
              const col = d.t === 'add' ? 'var(--success)' : d.t === 'del' ? 'var(--danger)' : 'var(--ink-2)';
              return (
                <div key={i} className="row" style={{ gap: 10, padding: '1px 22px', background: bg, alignItems: 'flex-start' }}>
                  <span style={{ width: 8, color: col, flex: '0 0 auto' }}>{mark}</span>
                  <span style={{ color: col, whiteSpace: 'pre-wrap' }}>{d.t === 'add' ? d.b : d.a}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="row" style={{ gap: 8, padding: '16px 22px', borderTop: '1px solid var(--hairline)' }}>
          <Btn variant="primary" onClick={() => { onClose(); onOpenJob(job.slug); }}><Icon name="arrowUpRight" size={14} />Open job</Btn>
          <Btn variant="ghost" onClick={() => { onClose(); onOpenJob(job.slug); }}><Icon name="beaker" size={14} />Open in A/B Lab</Btn>
        </div>
      </aside>
    </div>
  );
}

function Pipeline({ onOpenJob, onGo }) {
  const { jobs, pipelineStats } = window.LEX;
  const [diffCtx, setDiffCtx] = useState(null);
  const [view, setView] = useState('graph');

  return (
    <div className="stack" style={{ gap: 22, maxWidth: 1180 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="hero__eyebrow" style={{ marginBottom: 12 }}><Icon name="gitBranch" size={14} />PIPELINE BOARD · ALL DOMAINS</div>
          <h1 className="hero__title">7 jobs tracked</h1>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <div className="row" style={{ gap: 2, padding: 3, background: 'var(--bg-2)', borderRadius: 999, border: '1px solid var(--hairline)' }}>
            {[['graph', 'gitBranch', 'Graph'], ['lanes', 'layers', 'Lanes']].map(([id, ic, lb]) => (
              <button key={id} onClick={() => setView(id)} className="row"
                style={{ gap: 6, padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: view === id ? 'var(--surface)' : 'transparent', boxShadow: view === id ? 'var(--shadow-1)' : 'none',
                  color: view === id ? 'var(--ink)' : 'var(--muted)', font: '500 12px/1 var(--font-sans)' }}>
                <Icon name={ic} size={13} />{lb}
              </button>
            ))}
          </div>
          <Btn variant="ghost"><Icon name="filter" size={14} />Filter</Btn>
          <Btn variant="primary"><Icon name="plus" size={15} />New job</Btn>
        </div>
      </div>

      {/* stat strip */}
      <div className="row" style={{ gap: 0, background: 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 12, boxShadow: 'var(--shadow-1)' }}>
        {pipelineStats.map((s, i) => (
          <div key={s.id} style={{ flex: 1, padding: '16px 22px', borderLeft: i ? '1px solid var(--hairline)' : 'none' }}>
            <div style={{ font: '500 9.5px/1 var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>{s.label}</div>
            <div className="row" style={{ alignItems: 'baseline', gap: 8, marginTop: 10 }}>
              <span style={{ font: '500 26px/1 var(--font-display)', letterSpacing: '-0.02em' }}>{s.value}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{s.sub}</span>
            </div>
          </div>
        ))}
        <div style={{ padding: '16px 22px', borderLeft: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="spill__dot pulse-dot" style={{ background: 'var(--success)' }} />
          <span style={{ font: '500 9.5px/1 var(--font-mono)', letterSpacing: '0.08em', color: 'var(--muted)' }}>LIVE<br />auto-refresh 30s</span>
        </div>
      </div>

      {view === 'graph' ? (
        <div className="card" style={{ padding: '14px 22px 20px', overflowX: 'auto' }}>
          <div style={{ minWidth: 312 + GRAPHW }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
              <div className="row" style={{ gap: 8, color: 'var(--muted)' }}><Icon name="gitCommit" size={14} /><span className="label-mono" style={{ margin: 0 }}>Version lineage</span></div>
              <div className="row" style={{ gap: 14 }}>
                <span className="row" style={{ gap: 5, font: '500 10px/1 var(--font-mono)', color: 'var(--faint)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid var(--plum)' }} />A/B fork</span>
                <span className="row" style={{ gap: 5, font: '500 10px/1 var(--font-mono)', color: 'var(--faint)' }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--success)' }} />HEAD</span>
              </div>
            </div>
            <DateAxis />
            {jobs.map(j => <JobLane key={j.slug} job={j} onOpenJob={onOpenJob} onCommit={(job, commit, parent) => setDiffCtx({ job, commit, parent })} />)}
            <div style={{ borderTop: '1px solid var(--hairline)' }} />
            <div style={{ paddingTop: 12, font: '500 10px/1.5 var(--font-mono)', color: 'var(--faint)' }}>Click a commit to diff it against its parent · click a row to open the job</div>
          </div>
        </div>
      ) : (
        <StatusLanes jobs={jobs} onOpenJob={onOpenJob} />
      )}

      {view === 'graph' && <StatusLanes jobs={jobs} onOpenJob={onOpenJob} />}

      <DiffDrawer ctx={diffCtx} onClose={() => setDiffCtx(null)} onOpenJob={onOpenJob} />
    </div>
  );
}

window.Pipeline = Pipeline;
