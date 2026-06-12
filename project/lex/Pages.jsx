/* Lex prototype — Metrics, Tokens, Roadmap. Faithful recreations of
   the existing surfaces (content from the screenshots), cleaned up to
   the design system. */

function PageHead({ eyebrow, title, sub }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div className="hero__eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</div>
      <h1 className="hero__title">{title}</h1>
      {sub && <p className="text-muted" style={{ fontSize: 13.5, marginTop: 12, maxWidth: 640 }}>{sub}</p>}
    </div>
  );
}

/* ---------------- METRICS ---------------- */
function Metrics() {
  const { metrics } = window.LEX;
  return (
    <div style={{ maxWidth: 1180 }}>
      <PageHead eyebrow={`OKR · JUNE 2026 · ${metrics.window.toUpperCase()}`} title="Adoption metrics"
        sub={`Live KPIs for the ${metrics.okr} OKR. Pool of ${metrics.analysts} analyst. Updated ${metrics.updated}.`} />

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{metrics.trajectory.label}</div>
            <div className="text-muted" style={{ fontSize: 11.5, marginTop: 5 }}>{metrics.trajectory.note}</div>
          </div>
          <div style={{ flex: 1, padding: '0 8px' }}>
            <div className="row" style={{ gap: 12 }}>
              <span style={{ font: '500 15px/1 var(--font-display)', color: 'var(--ink)' }}>{metrics.trajectory.value.toFixed(1)}%</span>
              <div style={{ flex: 1 }}><TrajectoryBar value={metrics.trajectory.value} target={metrics.trajectory.target} /></div>
              <Badge variant="success">ON TARGET</Badge>
            </div>
            <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8, gap: 18, font: '500 9.5px/1 var(--font-mono)', color: 'var(--faint)' }}>
              <span>target {metrics.trajectory.target}%</span><span>no prior week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 18 }}>
        {metrics.kpis.map(k => (
          <div key={k.id} className="card">
            <div className="card__title" style={{ margin: '0 0 14px' }}>{k.label}</div>
            <div style={{ font: '500 30px/1 var(--font-display)', letterSpacing: '-0.03em' }}>{k.value}</div>
            <div className="text-muted" style={{ fontSize: 11.5, marginTop: 10 }}>{k.delta}</div>
            <div className="row" style={{ gap: 7, marginTop: 12 }}>
              <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{k.target}</span>
              <span style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.06em', padding: '3px 7px', borderRadius: 4,
                background: k.state === 'on' ? 'var(--success-soft)' : k.state === 'off' ? 'var(--warning-soft)' : 'var(--elevated)',
                color: k.state === 'on' ? 'var(--success)' : k.state === 'off' ? 'var(--warning)' : 'var(--muted)' }}>
                {k.state === 'on' ? 'ON' : k.state === 'off' ? 'OFF TARGET' : '—'}
              </span>
            </div>
            <div className="text-muted" style={{ fontSize: 11, marginTop: 12, lineHeight: 1.4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card__title">Per-analyst breakdown · last 7 days</div>
        <div className="row" style={{ padding: '8px 0', borderBottom: '1px solid var(--hairline)', font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--faint)' }}>
          <span style={{ flex: 1 }}>Analyst</span><span style={{ width: 80, textAlign: 'right' }}>Done</span><span style={{ width: 80, textAlign: 'right' }}>WoW</span><span style={{ width: 110, textAlign: 'right' }}>TTD median</span><span style={{ width: 110, textAlign: 'right' }}>Good-share</span><span style={{ width: 70, textAlign: 'right' }}>Grades</span>
        </div>
        {metrics.perAnalyst.map(a => (
          <div key={a.name} className="row" style={{ padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{a.name}</span>
            <span style={{ width: 80, textAlign: 'right', font: '500 13px/1 var(--font-mono)' }}>{a.done}</span>
            <span style={{ width: 80, textAlign: 'right', font: '500 13px/1 var(--font-mono)', color: 'var(--success)' }}>{a.wow}</span>
            <span style={{ width: 110, textAlign: 'right', font: '500 13px/1 var(--font-mono)' }}>{a.ttd}</span>
            <span style={{ width: 110, textAlign: 'right', font: '500 13px/1 var(--font-mono)' }}>{a.good}</span>
            <span style={{ width: 70, textAlign: 'right' }}><Badge variant="success">{a.grades}</Badge></span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card__title">Friction list · last 1 comment</div>
        <div className="row" style={{ gap: 16, padding: '6px 0', alignItems: 'flex-start' }}>
          <Badge variant="success" style={{ marginTop: 2 }}>GOOD</Badge>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Weekly Active Users by Plan Tier (Last 10 Days)</div>
            <div style={{ font: '500 10.5px/1 var(--font-mono)', color: 'var(--faint)', marginTop: 5 }}>weekly-active-users-plan-tier-10-days</div>
          </div>
          <div style={{ flex: 1.4, fontSize: 13, color: 'var(--ink-2)' }}>Everything went well and cost was low</div>
          <span style={{ font: '500 10.5px/1 var(--font-mono)', color: 'var(--faint)' }}>6/5/2026</span>
        </div>
      </div>
    </div>
  );
}
window.Metrics = Metrics;

/* ---------------- TOKENS ---------------- */
function Tokens() {
  const { tokens } = window.LEX;
  return (
    <div style={{ maxWidth: 1180 }}>
      <PageHead eyebrow="TOKENS · COST TRUTHING" title="Token & cost trends"
        sub="Headline numbers are amortized seat share — what these jobs cost out of the seat fee we already pay. The list-price reference column is what the same tokens would cost retail." />

      <div className="row" style={{ gap: 14, marginBottom: 18, flexWrap: 'wrap', font: '500 11px/1.5 var(--font-mono)', color: 'var(--faint)' }}>
        <Badge variant="grape">{tokens.plan}</Badge>
        <span>fleet bill {tokens.bill}</span><span>·</span>
        <span>monthly tokens {tokens.monthly}</span><span>·</span>
        <span>ccusage baseline calibrated {tokens.baseline}</span>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        {tokens.cards.map(c => (
          <div key={c.label} className="card" style={c.big ? { gridColumn: 'span 1' } : null}>
            <div className="card__title" style={{ margin: '0 0 14px' }}>{c.label}</div>
            <div style={{ font: `500 ${c.big ? 28 : 24}px/1 var(--font-display)`, letterSpacing: '-0.02em' }}>{c.value}</div>
            {c.sub && <div className="text-muted" style={{ fontSize: 11, marginTop: 9 }}>{c.sub}</div>}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
          <div className="card__title" style={{ margin: 0 }}>Per-job ledger · {tokens.ledger.length} jobs</div>
          <div className="row" style={{ gap: 12, font: '500 9.5px/1 var(--font-mono)', color: 'var(--faint)' }}>
            {[['contract', 'var(--past-blue-ink)'], ['build', 'var(--danger)'], ['verify', 'var(--success)'], ['summary', 'var(--warning)']].map(([l, c]) =>
              <span key={l} className="row" style={{ gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}</span>)}
          </div>
        </div>
        <div className="row" style={{ padding: '10px 0', borderBottom: '1px solid var(--hairline)', font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--faint)' }}>
          <span style={{ flex: 1 }}>Job</span><span style={{ width: 70 }}>Version</span><span style={{ width: 150 }}>Phase mix</span><span style={{ width: 90, textAlign: 'right' }}>Seat-share</span><span style={{ width: 80, textAlign: 'right' }}>List ref</span>
        </div>
        {tokens.ledger.map(l => (
          <div key={l.job} className="row" style={{ padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '500 12px/1.3 var(--font-mono)', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.job}</div>
              <div style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--faint)', marginTop: 5 }}>{l.date}</div>
            </div>
            <span style={{ width: 70 }}><Badge>{l.version}</Badge></span>
            <span style={{ width: 150, paddingRight: 16 }}><CostBars phases={l.phases} /></span>
            <span style={{ width: 90, textAlign: 'right', font: '600 13px/1 var(--font-mono)', color: 'var(--ink)' }}>${l.seat.toFixed(4)}</span>
            <span style={{ width: 80, textAlign: 'right', font: '500 12px/1 var(--font-mono)', color: 'var(--muted)' }}>~${l.list.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
window.Tokens = Tokens;

/* ---------------- ROADMAP ---------------- */
function Roadmap() {
  const { roadmap } = window.LEX;
  return (
    <div style={{ maxWidth: 1180 }}>
      <PageHead eyebrow={`ROADMAP · ${roadmap.waves} WAVES · ${roadmap.stories} STORIES`} title="What's next for Lex"
        sub="Each wave is one dot release. The wave at the top is what the team is building now; everything below is queued." />

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.12em', color: 'var(--plum)' }}>{roadmap.okr.name}</span>
          <span style={{ font: '500 22px/1 var(--font-display)', color: 'var(--ink)' }}>{roadmap.okr.days}<span style={{ fontSize: 11, color: 'var(--faint)', fontFamily: 'var(--font-mono)', marginLeft: 6 }}>days to June 30</span></span>
        </div>
        <h4 style={{ fontSize: 21, letterSpacing: '-0.02em', maxWidth: 760 }}>{roadmap.okr.headline}</h4>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 22 }}>
          {roadmap.okr.targets.map(t => (
            <div key={t.label} style={{ paddingTop: 16, borderTop: '1px solid var(--hairline)' }}>
              <div style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>{t.label}</div>
              <div className="mono" style={{ fontSize: 16, color: 'var(--ink)', margin: '10px 0 7px', letterSpacing: '0.02em' }}>{t.value}</div>
              <div className="text-muted" style={{ fontSize: 11 }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
          <div className="row" style={{ gap: 10 }}>
            <span className="label-mono" style={{ margin: 0 }}>{roadmap.now.wave}</span>
            <Badge variant="plum">NOW · JUNE 2026</Badge>
            <span style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--faint)' }}>{roadmap.now.tag} · {roadmap.now.planned} stories</span>
          </div>
          <Btn variant="subtle"><Icon name="copy" size={13} />Copy</Btn>
        </div>
        <p className="text-muted" style={{ fontSize: 12.5, lineHeight: 1.55, maxWidth: 800, marginBottom: 18 }}>{roadmap.now.blurb}</p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {roadmap.now.stories.map(s => (
            <div key={s.id} style={{ border: '1px solid var(--hairline)', borderRadius: 10, padding: 16 }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--muted)' }}>{s.id}</span>
                <Spill variant="neutral" filled>PLANNED</Spill>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 10 }}>{s.title}</div>
              <p className="text-muted" style={{ fontSize: 11.5, lineHeight: 1.45, marginBottom: 14 }}>{s.sub}</p>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--faint)' }}>{s.sp} SP</span>
                <span className="row" style={{ gap: 4, font: '500 11px/1 var(--font-mono)', color: 'var(--plum)' }}>details <Icon name="arrowRight" size={12} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
window.Roadmap = Roadmap;
