/* Lex — Pipeline board, git-style.
   Two views: Lanes (DAG status columns) + Lineage (commit-graph of versions). */

function StripStat({ label, value, sub, divider }) {
  return (
    <div style={{ flex: 1, paddingLeft: divider ? 28 : 0, marginLeft: divider ? 28 : 0, borderLeft: divider ? '1px solid var(--hairline)' : 'none' }}>
      <div style={{ font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</div>
      <div style={{ font: '500 30px/1 var(--font-display)', letterSpacing: '-0.02em', color: 'var(--ink)', marginTop: 12 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 8 }}>{sub}</div>
    </div>
  );
}

function JobCard({ job, onOpen }) {
  const m = LEX_STATUS[job.status];
  const total = Object.values(job.phaseCost).reduce((a, b) => a + b, 0);
  return (
    <div className="card card--hover" onClick={() => onOpen(job.id)} style={{ padding: '16px 17px' }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
        <VersionChip v={job.version} muted={job.status === 'contract'} />
        <span style={{ font: '500 10px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--faint)', textTransform: 'capitalize' }}>{job.domain}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{job.title}</div>
      <div style={{ font: '500 10px/1.4 var(--font-mono)', letterSpacing: '0.02em', color: 'var(--faint)', marginTop: 7, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.id}</div>
      {total > 0 && (
        <div style={{ marginTop: 14 }}>
          <PhaseBar cost={job.phaseCost} />
          <div className="row" style={{ justifyContent: 'space-between', marginTop: 9 }}>
            <span style={{ fontSize: 11.5, color: 'var(--muted)', whiteSpace: 'nowrap' }}>seat-share</span>
            <span style={{ font: '600 12px/1 var(--font-mono)', color: 'var(--ink)' }}>{job.seatShare}</span>
          </div>
        </div>
      )}
      <div className="row" style={{ justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--hairline)' }}>
        <span style={{ fontSize: 11, color: 'var(--faint)' }}>{job.updated.split(' · ')[0]}</span>
        <span style={{ font: '500 10px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--faint)' }}>{job.owner}</span>
      </div>
    </div>
  );
}

function LanesView({ jobs, onOpen }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 14, alignItems: 'start' }}>
      {LEX_PHASES.map((phase) => {
        const m = LEX_STATUS[phase];
        const inLane = jobs.filter((j) => j.status === phase);
        return (
          <div key={phase} className="stack" style={{ gap: 12 }}>
            <div className="row" style={{ gap: 8, padding: '0 2px 10px', borderBottom: '2px solid ' + m.bg }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.ink, flex: '0 0 auto' }} />
              <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>{m.label}</span>
              <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--faint)', marginLeft: 'auto' }}>{inLane.length}</span>
            </div>
            {inLane.map((j) => <JobCard key={j.id} job={j} onOpen={onOpen} />)}
            {inLane.length === 0 && (
              <div style={{ border: '1px dashed var(--hairline-2)', borderRadius: 10, padding: '20px 12px', textAlign: 'center', font: '500 10.5px/1.4 var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>Empty</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LineageView({ jobs, onOpen, onOpenAB }) {
  const DAY = 86400000;
  const parse = (d) => new Date(d + 'T00:00:00').getTime();
  const seatNum = (s) => { const n = parseFloat(String(s).replace(/[^0-9.]/g, '')); return isNaN(n) ? null : n; };

  const allDates = jobs.flatMap((j) => j.lineage.map((l) => parse(l.date)));
  const dataMin = Math.min(...allDates), dataMax = Math.max(...allDates);

  const WINDOWS = [3, 7, 14, 30];
  const [span, setSpan] = React.useState(14);
  // anchorEnd = right edge of the window (end of day). Default: latest version date.
  const [anchorEnd, setAnchorEnd] = React.useState(dataMax + DAY);

  // reset to the freshest window whenever the span changes
  const setSpanFresh = (n) => { setSpan(n); setAnchorEnd(dataMax + DAY); };

  const winMs = span * DAY;
  const start = anchorEnd - winMs;
  const end = anchorEnd;
  const inWindow = (d) => d >= start && d <= end;
  const xOf = (d) => { const f = Math.max(0, Math.min(1, (d - start) / winMs)); return 5 + f * 90; };

  // can't page past "now" (latest data + 1d); paging back stops once the window clears the earliest data
  const canFwd = anchorEnd < dataMax + DAY;
  const canBack = start > dataMin - DAY;
  const page = (dir) => setAnchorEnd((a) => a + dir * winMs);

  // dynamic ticks: ~5 evenly spaced across the window
  const tickCount = span <= 3 ? 3 : 4;
  const fmtMD = (ts) => { const d = new Date(ts); return String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => start + (i / tickCount) * winMs);

  const rangeLabel = fmtMD(start) + ' → ' + fmtMD(end);
  const domains = [...new Set(jobs.map((j) => j.domain))];
  const visibleCount = jobs.reduce((n, j) => n + j.lineage.filter((l) => inWindow(parse(l.date))).length, 0);

  const segBtn = (n) => (
    <button key={n} onClick={() => setSpanFresh(n)}
      style={{ padding: '5px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', font: '600 11px/1 var(--font-mono)', letterSpacing: '0.02em',
        background: span === n ? 'var(--surface)' : 'transparent', boxShadow: span === n ? 'var(--shadow-1)' : 'none',
        color: span === n ? 'var(--plum)' : 'var(--muted)' }}>{n}d</button>
  );

  return (
    <div className="card" style={{ padding: '22px 26px 26px' }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16, gap: 14, flexWrap: 'wrap' }}>
        <Eyebrow>Version lineage · seat-share over time</Eyebrow>
        <div className="row" style={{ gap: 14 }}>
          <span className="row" style={{ gap: 6, font: '600 9px/1 var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}><span style={{ width: 14, height: 3, borderRadius: 2, background: 'var(--success)' }} />cheaper</span>
          <span className="row" style={{ gap: 6, font: '600 9px/1 var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}><span style={{ width: 14, height: 3, borderRadius: 2, background: 'var(--danger)' }} />pricier</span>
        </div>
      </div>

      {/* window controls */}
      <div className="row" style={{ justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
        <div style={{ display: 'inline-flex', padding: 3, background: 'var(--elevated)', borderRadius: 8, gap: 2 }}>
          {WINDOWS.map(segBtn)}
        </div>
        <div className="row" style={{ gap: 8 }}>
          <button className="btn-icon" onClick={() => page(-1)} disabled={!canBack} title="Earlier"><Icon name="chevronRight" size={15} style={{ transform: 'rotate(180deg)' }} /></button>
          <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--ink-2)', minWidth: 116, textAlign: 'center' }}>{rangeLabel}</span>
          <button className="btn-icon" onClick={() => page(1)} disabled={!canFwd} title="Later"><Icon name="chevronRight" size={15} /></button>
        </div>
      </div>

      {/* time axis */}
      <div style={{ position: 'relative', height: 18, margin: '12px 0 2px', marginLeft: 220 }}>
        {ticks.map((t, i) => (
          <span key={i} style={{ position: 'absolute', left: xOf(t) + '%', transform: 'translateX(-50%)', font: '500 9.5px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--faint)' }}>{fmtMD(t)}</span>
        ))}
      </div>

      <div className="stack" style={{ gap: 0, position: 'relative' }}>
        {domains.map((dom) => (
          <div key={dom}>
            <div className="row" style={{ gap: 8, padding: '14px 0 6px' }}>
              <Icon name="layers" size={12} style={{ color: 'var(--faint)' }} />
              <span style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)' }}>{dom} branch</span>
              <span style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
            </div>
            {jobs.filter((j) => j.domain === dom).map((job) => (
              <div key={job.id} className="row" style={{ gap: 0, alignItems: 'center', padding: '6px 0' }}>
                <div onClick={() => onOpen(job.id)} style={{ width: 220, flex: '0 0 auto', paddingRight: 16, cursor: 'pointer' }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{job.title}</div>
                  <div className="row" style={{ gap: 7, marginTop: 4 }}>
                    <StatusPill status={job.status} filled={false} />
                  </div>
                </div>
                {/* track */}
                <div style={{ position: 'relative', flex: 1, height: 56, borderLeft: '1px dashed var(--hairline)' }}>
                  {/* connecting segments — drawn when at least one endpoint is in window */}
                  {job.lineage.map((l, i) => {
                    if (i === 0) return null;
                    const prev = job.lineage[i - 1];
                    const dp = parse(prev.date), dl = parse(l.date);
                    if (!inWindow(dp) && !inWindow(dl) && !(dp < start && dl > end)) return null;
                    const x1 = xOf(dp), x2 = xOf(dl);
                    const a = seatNum(prev.seat), b = seatNum(l.seat);
                    const color = (a == null || b == null) ? 'var(--hairline-2)' : (b < a ? 'var(--success)' : 'var(--danger)');
                    return <div key={i} style={{ position: 'absolute', top: 27, left: Math.min(x1, x2) + '%', width: Math.abs(x2 - x1) + '%', height: 2.5, background: color, borderRadius: 2 }} />;
                  })}
                  {/* dots — only those inside the window */}
                  {job.lineage.map((l, i) => {
                    const dt = parse(l.date);
                    if (!inWindow(dt)) return null;
                    const x = xOf(dt);
                    return (
                      <div key={i} onClick={() => job.ab.length ? onOpenAB(job.id) : onOpen(job.id)}
                        title={l.version + ' · ' + l.date + ' · ' + l.seat + (l.note ? ' — ' + l.note : '')}
                        style={{ position: 'absolute', left: x + '%', top: 28, transform: 'translate(-50%,-50%)', cursor: 'pointer', textAlign: 'center', zIndex: 2 }}>
                        <div style={{ font: '600 9px/1 var(--font-mono)', color: l.current ? 'var(--plum)' : 'var(--ink-2)', marginBottom: 5, whiteSpace: 'nowrap' }}>{l.version}</div>
                        <div style={{ width: l.current ? 13 : 10, height: l.current ? 13 : 10, borderRadius: '50%', margin: '0 auto',
                          background: l.current ? 'var(--plum)' : 'var(--surface)', border: '2px solid ' + (l.current ? 'var(--plum)' : 'var(--hairline-2)'),
                          boxShadow: l.current ? '0 0 0 4px var(--plum-soft)' : 'none' }} />
                        <div style={{ font: '500 9px/1 var(--font-mono)', color: 'var(--faint)', marginTop: 5, whiteSpace: 'nowrap' }}>{l.seat}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
        {visibleCount === 0 && (
          <div style={{ position: 'absolute', inset: '44px 0 0 220px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '500 11px/1.4 var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>
            No versions in this {span}-day window — page ‹ or › to find them
          </div>
        )}
      </div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--hairline)', fontSize: 11.5, color: 'var(--faint)' }}>
        <Icon name="arrowUpRight" size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 5 }} />{visibleCount} version{visibleCount === 1 ? '' : 's'} shown · click a dot to open its A/B diff · click a job name for the full review.
      </div>
    </div>
  );
}

function Board({ onOpenJob }) {
  const { board, jobs } = window.LEX;
  const [view, setView] = React.useState('lanes');
  const [domain, setDomain] = React.useState('all');
  const domains = ['all', ...new Set(jobs.map((j) => j.domain))];
  const shown = domain === 'all' ? jobs : jobs.filter((j) => j.domain === domain);

  return (
    <div className="stack" style={{ gap: 24 }}>
      <div>
        <Eyebrow style={{ marginBottom: 10 }}>Pipeline board · all domains</Eyebrow>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em', whiteSpace: 'nowrap', textWrap: 'nowrap' }}>{board.tracked} jobs tracked</h2>
          <div className="row" style={{ gap: 6, font: '500 11px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--faint)' }}>
            <span className="spill__dot pulse-dot" style={{ background: 'var(--success)', width: 6, height: 6, borderRadius: '50%' }} />
            Auto-refresh 30s · last 09:03:54 AM
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '22px 28px' }}>
        <div className="row" style={{ gap: 0 }}>
          <StripStat label="In flight" value={board.inFlight} sub="across the pipeline" />
          <StripStat label="Awaiting review" value={board.awaitingReview} sub="peer review pending" divider />
          <StripStat label="Reviewed" value={board.reviewed} sub="have at least one review" divider />
          <StripStat label="Completed" value={board.completed} sub="verified & shipped" divider />
        </div>
      </div>

      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 8 }}>
          <div style={{ display: 'inline-flex', padding: 3, background: 'var(--elevated)', borderRadius: 9, gap: 3 }}>
            {[['lanes', 'pipe', 'Lanes'], ['lineage', 'history', 'Timeline']].map(([id, icon, label]) => (
              <button key={id} onClick={() => setView(id)} className="row"
                style={{ gap: 7, padding: '7px 13px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  background: view === id ? 'var(--surface)' : 'transparent', boxShadow: view === id ? 'var(--shadow-1)' : 'none',
                  color: view === id ? 'var(--ink)' : 'var(--muted)', font: '500 12.5px/1 var(--font-sans)' }}>
                <Icon name={icon} size={14} />{label}
              </button>
            ))}
          </div>
        </div>
        <div className="row" style={{ gap: 4 }}>
          {domains.map((d) => (
            <button key={d} onClick={() => setDomain(d)} className="btn btn--subtle"
              style={{ textTransform: 'capitalize', color: domain === d ? 'var(--plum)' : 'var(--muted)', background: domain === d ? 'var(--plum-soft)' : 'transparent' }}>{d}</button>
          ))}
        </div>
      </div>

      {view === 'lanes'
        ? <LanesView jobs={shown} onOpen={onOpenJob} />
        : <LineageView jobs={shown} onOpen={onOpenJob} onOpenAB={(id) => onOpenJob(id, { tab: 'ab' })} />}
    </div>
  );
}
window.Board = Board;
