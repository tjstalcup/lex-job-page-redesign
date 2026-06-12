/* Lex — Home. Snapshot homepage: live pipeline + metrics + tokens + roadmap,
   each tile deep-links into its full surface. */

function TileHead({ eyebrow, title, onOpen }) {
  return (
    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <Eyebrow style={{ marginBottom: 7 }}>{eyebrow}</Eyebrow>
        <div style={{ font: '600 17px/1.1 var(--font-display)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{title}</div>
      </div>
      {onOpen && (
        <button className="btn btn--subtle" onClick={(e) => { e.stopPropagation(); onOpen(); }} style={{ marginRight: -6 }}>
          Open<Icon name="arrowUpRight" size={14} />
        </button>
      )}
    </div>
  );
}

function PipelineSnapshot({ onNavigate, onOpenJob }) {
  const { board, jobs } = window.LEX;
  const attention = jobs.filter((j) => j.status !== 'done');
  const strip = [
    ['In flight', board.inFlight], ['Awaiting review', board.awaitingReview],
    ['Reviewed', board.reviewed], ['Completed', board.completed],
  ];
  return (
    <div className="card" style={{ padding: '24px 26px' }}>
      <TileHead eyebrow={'Pipeline · ' + board.tracked + ' jobs tracked'} title="Job Status" onOpen={() => onNavigate('board')} />
      <div className="row" style={{ gap: 0, marginTop: 22, marginBottom: 6 }}>
        {strip.map(([l, v], i) => (
          <div key={l} style={{ flex: 1, paddingLeft: i ? 18 : 0, borderLeft: i ? '1px solid var(--hairline)' : 'none', marginLeft: i ? 18 : 0 }}>
            <div style={{ font: '500 26px/1 var(--font-display)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{v}</div>
            <div style={{ font: '600 9px/1.3 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 7 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: 'var(--hairline)', margin: '20px 0 4px' }} />
      <Eyebrow style={{ margin: '10px 0 4px' }}>Needs attention</Eyebrow>
      <div className="stack" style={{ gap: 0 }}>
        {attention.map((j) => {
          const m = LEX_STATUS[j.status];
          return (
            <div key={j.id} onClick={() => onOpenJob(j.id)}
              style={{ display: 'grid', gridTemplateColumns: '8px minmax(0,1fr) auto auto', gap: 12, alignItems: 'center', padding: '11px 8px', borderRadius: 8, cursor: 'pointer', transition: 'background 200ms var(--ease-soft)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--elevated)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.ink }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title}</div>
                <div style={{ font: '500 10px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--faint)', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.id}</div>
              </div>
              <StatusPill status={j.status} />
              <Icon name="chevronRight" size={15} style={{ color: 'var(--faint)' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetricsSnapshot({ onNavigate }) {
  const { okr } = window.LEX;
  const pct = Math.min(100, okr.trajectory.value);
  return (
    <div className="card" style={{ padding: '24px 26px' }}>
      <TileHead eyebrow={'Metrics · ' + okr.window} title="Adoption" onOpen={() => onNavigate('metrics')} />
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <span style={{ font: '500 34px/1 var(--font-display)', letterSpacing: '-0.025em', color: 'var(--ink)' }}>{okr.trajectory.value.toFixed(1)}%</span>
        <span className="badge badge--success" style={{ flex: '0 0 auto' }}>ON TARGET</span>
      </div>
      <div style={{ marginTop: 14, height: 8, borderRadius: 999, background: 'var(--elevated)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: pct + '%', background: 'var(--success)', borderRadius: 999 }} />
        <div style={{ position: 'absolute', top: -2, bottom: -2, left: okr.trajectory.target + '%', width: 2, background: 'var(--ink-2)' }} title={'target ' + okr.trajectory.target + '%'} />
      </div>
      <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 8 }}>{okr.trajectory.label} · target {okr.trajectory.target}%</div>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
        {okr.cards.slice(0, 4).map((c) => (
          <div key={c.label} style={{ background: 'var(--bg-2)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ font: '500 18px/1 var(--font-display)', letterSpacing: '-0.02em', color: c.ok ? 'var(--ink)' : 'var(--warning)' }}>{c.value}</div>
            <div style={{ font: '600 8.5px/1.3 var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 6 }}>{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokensSnapshot({ onNavigate }) {
  const { tokens } = window.LEX;
  const seat = tokens.cards.find((c) => c.label === 'Amortized seat share');
  const max = Math.max(...tokens.byVersion.map((v) => parseFloat(v.seat.replace(/[^0-9.]/g, ''))));
  return (
    <div className="card" style={{ padding: '24px 26px' }}>
      <TileHead eyebrow="Tokens · cost truthing" title="Spend" onOpen={() => onNavigate('tokens')} />
      <div className="row" style={{ alignItems: 'baseline', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
        <span style={{ font: '500 34px/1 var(--font-display)', letterSpacing: '-0.025em', color: 'var(--ink)' }}>{seat.value}</span>
        <span style={{ fontSize: 11.5, color: 'var(--muted)', whiteSpace: 'nowrap' }}>amortized seat share</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 6 }}>{tokens.plan} · {tokens.fleetBill} fleet bill</div>
      <Eyebrow style={{ margin: '20px 0 12px' }}>Cost by version</Eyebrow>
      <div className="stack" style={{ gap: 11 }}>
        {tokens.byVersion.map((v) => {
          const val = parseFloat(v.seat.replace(/[^0-9.]/g, ''));
          return (
            <div key={v.version} className="row" style={{ gap: 10 }}>
              <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--ink-2)', width: 52, flex: '0 0 auto' }}>{v.version}</span>
              <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'var(--elevated)', overflow: 'hidden' }}>
                <div style={{ width: (val / max * 100) + '%', height: '100%', background: 'var(--plum)', borderRadius: 999 }} />
              </div>
              <span style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink)', width: 56, textAlign: 'right', flex: '0 0 auto' }}>{v.seat}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoadmapSnapshot({ onNavigate }) {
  const { roadmap } = window.LEX;
  return (
    <div className="card" style={{ padding: '24px 26px' }}>
      <TileHead eyebrow={'Roadmap · ' + roadmap.waves + ' waves · ' + roadmap.stories + ' stories'} title="What's next" onOpen={() => onNavigate('roadmap')} />
      <div style={{ background: 'var(--past-lilac)', borderRadius: 10, padding: '16px 18px', marginTop: 18 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--past-lilac-ink)' }}>June 2026 OKR · laser focus</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: '600 20px/1 var(--font-display)', color: 'var(--past-lilac-ink)' }}>{roadmap.daysToTarget}</div>
            <div style={{ font: '500 8.5px/1.3 var(--font-mono)', letterSpacing: '0.06em', color: 'var(--past-lilac-ink)', opacity: 0.7, marginTop: 3 }}>days to Jun 30</div>
          </div>
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--past-lilac-ink)', fontWeight: 500, marginTop: 10, lineHeight: 1.45 }}>{roadmap.okr}</div>
      </div>
      <Eyebrow style={{ margin: '20px 0 12px' }}>{roadmap.now.wave} · now · {roadmap.now.planned} planned</Eyebrow>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {roadmap.stories_now.map((s) => (
          <div key={s.id} style={{ border: '1px solid var(--hairline)', borderRadius: 10, padding: '14px 15px' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--faint)' }}>{s.id}</span>
              <span className={'spill spill--' + (s.status === 'in-progress' ? 'plum' : 'neutral')} style={{ fontSize: 9 }}><span className="spill__dot" />{s.status === 'in-progress' ? 'IN PROGRESS' : 'PLANNED'}</span>
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', marginTop: 10, lineHeight: 1.35 }}>{s.title}</div>
            <div style={{ font: '500 9.5px/1 var(--font-mono)', color: 'var(--faint)', marginTop: 12 }}>{s.sp} SP</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ onNavigate, onOpenJob }) {
  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="grid" style={{ gridTemplateColumns: '1.55fr 1fr', gap: 20, alignItems: 'start' }}>
        <div className="stack" style={{ gap: 20 }}>
          <PipelineSnapshot onNavigate={onNavigate} onOpenJob={onOpenJob} />
          <RoadmapSnapshot onNavigate={onNavigate} />
        </div>
        <div className="stack" style={{ gap: 20 }}>
          <MetricsSnapshot onNavigate={onNavigate} />
          <TokensSnapshot onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
window.Dashboard = Dashboard;
