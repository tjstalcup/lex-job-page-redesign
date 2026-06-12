/* Lex — Metrics, Tokens, Roadmap, Placeholder screens. */

function PageHead({ eyebrow, title, sub }) {
  return (
    <div>
      <Eyebrow style={{ marginBottom: 9 }}>{eyebrow}</Eyebrow>
      <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em' }}>{title}</h2>
      {sub && <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 12, maxWidth: 640, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

/* ---------- METRICS ---------- */
function Metrics() {
  const { okr } = window.LEX;
  const pct = Math.min(100, okr.trajectory.value);
  return (
    <div className="stack" style={{ gap: 24 }}>
      <PageHead eyebrow={'OKR · ' + okr.window} title="Adoption metrics"
        sub="Live KPIs for the June 2026 OKR. Pool of 1 analyst. Updated 6/10/2026, 9:11 AM." />

      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ minWidth: 160 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{okr.trajectory.label}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{okr.trajectory.note}</div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ font: '500 18px/1 var(--font-display)', color: 'var(--ink)' }}>{okr.trajectory.value.toFixed(1)}%</span>
              <span className="badge badge--success">ON TARGET</span>
            </div>
            <div style={{ position: 'relative', height: 10, borderRadius: 999, background: 'var(--elevated)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, width: pct + '%', background: 'var(--success)', borderRadius: 999 }} />
              <div style={{ position: 'absolute', top: -3, bottom: -3, left: okr.trajectory.target + '%', width: 2, background: 'var(--ink-2)' }} />
            </div>
            <div className="row" style={{ justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--faint)' }}>target {okr.trajectory.target}%</span>
              <span style={{ fontSize: 11, color: 'var(--faint)' }}>no prior week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {okr.cards.map((c) => (
          <div key={c.label} className="card">
            <div className="card__title" style={{ marginBottom: 12 }}>{c.label}</div>
            <div style={{ font: '500 30px/1 var(--font-display)', letterSpacing: '-0.025em', color: c.ok ? 'var(--ink)' : 'var(--warning)' }}>{c.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>{c.sub}</div>
            <div className="row" style={{ gap: 7, marginTop: 12 }}>
              <span style={{ fontSize: 11.5, color: 'var(--faint)' }}>{c.target}</span>
              <span className={'spill spill--' + (c.ok ? 'success' : 'neutral') + ' spill--filled'} style={{ fontSize: 9 }}><span className="spill__dot" />{c.ok ? 'ON' : 'OFF'}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--hairline)', lineHeight: 1.4 }}>{c.foot}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--hairline)' }}>
          <Eyebrow>Per-analyst breakdown · 1 analyst · last 7 days</Eyebrow>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr 1fr 0.8fr', gap: 12, padding: '10px 24px', background: 'var(--bg-2)', font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
          <span>Analyst</span><span>Done</span><span>WoW</span><span>TTD median</span><span>Good-share</span><span>Grade</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr 1fr 0.8fr', gap: 12, padding: '16px 24px', alignItems: 'center' }}>
          <span className="row" style={{ gap: 10 }}><span className="avatar avatar--sm" style={{ borderRadius: 8, width: 26, height: 26, background: 'var(--past-blue)', color: 'var(--past-blue-ink)', fontSize: 10 }}>TJ</span><span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>TJ Stalcup</span></span>
          <span style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--ink-2)' }}>1</span>
          <span><span className="badge badge--success">+1</span></span>
          <span style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--ink-2)' }}>35.2 min</span>
          <span style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--ink-2)' }}>100.0%</span>
          <span><span className="badge badge--plum">G · 1</span></span>
        </div>
      </div>
    </div>
  );
}

/* ---------- TOKENS ---------- */
function Tokens() {
  const { tokens } = window.LEX;
  return (
    <div className="stack" style={{ gap: 24 }}>
      <PageHead eyebrow="Tokens · cost truthing" title="Token & cost trends"
        sub="Headline numbers are amortized seat share — what these jobs cost out of the seat fee we already pay. The list-price reference column is what the same tokens would cost retail." />

      <div className="row" style={{ gap: 10, font: '500 11px/1 var(--font-mono)', color: 'var(--faint)', flexWrap: 'wrap' }}>
        <span style={{ padding: '5px 10px', background: 'var(--grape)', color: '#fff', borderRadius: 6, letterSpacing: '0.04em' }}>{tokens.plan.toUpperCase()}</span>
        <span>fleet bill {tokens.fleetBill} · monthly tokens {tokens.monthlyTokens} · ccusage baseline {tokens.baseline}</span>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {tokens.cards.map((c) => (
          <div key={c.label} className="card">
            <div className="card__title" style={{ marginBottom: 12 }}>{c.label}</div>
            <div style={{ font: '500 26px/1 var(--font-display)', letterSpacing: '-0.025em', color: 'var(--ink)' }}>{c.value}</div>
            {c.sub && <div style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 9 }}>{c.sub}</div>}
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--hairline)' }}>
          <Eyebrow>Cost by Lex version · {tokens.byVersion.length} versions</Eyebrow>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 0.6fr 1fr 1fr 0.9fr 0.9fr 0.9fr 0.9fr', gap: 10, padding: '10px 24px', background: 'var(--bg-2)', font: '600 9px/1 var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--faint)' }}>
          <span>Version</span><span>Jobs</span><span>Seat-share</span><span>List ref</span><span>Contract</span><span>Build</span><span>Verify</span><span>Summary</span>
        </div>
        {tokens.byVersion.map((v, i) => (
          <div key={v.version} style={{ display: 'grid', gridTemplateColumns: '0.9fr 0.6fr 1fr 1fr 0.9fr 0.9fr 0.9fr 0.9fr', gap: 10, padding: '14px 24px', borderTop: i ? '1px solid var(--hairline)' : 'none', alignItems: 'center', font: '500 12px/1 var(--font-mono)', color: 'var(--ink-2)' }}>
            <span><VersionChip v={v.version} muted={v.version === 'unknown'} /></span>
            <span>{v.jobs}</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{v.seat}</span>
            <span style={{ color: 'var(--faint)' }}>{v.listRef}</span>
            <span>{v.contract}</span><span>{v.build}</span><span>{v.verify}</span><span>{v.summary}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- ROADMAP ---------- */
function Roadmap() {
  const { roadmap } = window.LEX;
  const [copied, setCopied] = React.useState(false);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1400); };
  return (
    <div className="stack" style={{ gap: 24 }}>
      <PageHead eyebrow={'Roadmap · ' + roadmap.waves + ' waves · ' + roadmap.stories + ' stories'} title="What's next for Lex"
        sub="Each wave is one dot release. The wave at the top is what the team is building now; everything below is queued. Built for business, engineers, and analysts together." />

      <div className="card" style={{ background: 'var(--past-lilac)', border: 'none' }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--past-lilac-ink)' }}>June 2026 OKR · laser focus</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: '700 24px/1 var(--font-display)', color: 'var(--past-lilac-ink)' }}>{roadmap.daysToTarget}</div>
            <div style={{ font: '500 8.5px/1.3 var(--font-mono)', letterSpacing: '0.06em', color: 'var(--past-lilac-ink)', opacity: 0.7, marginTop: 4 }}>days to Jun 30</div>
          </div>
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--past-lilac-ink)', marginTop: 14, lineHeight: 1.4, maxWidth: 780 }}>{roadmap.okr}</div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 22 }}>
          {roadmap.krs.map((k) => (
            <div key={k.label}>
              <div style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--past-lilac-ink)', opacity: 0.75 }}>{k.label}</div>
              <div style={{ font: '600 18px/1 var(--font-mono)', color: 'var(--past-lilac-ink)', marginTop: 8 }}>{k.value}</div>
              <div style={{ fontSize: 11, color: 'var(--past-lilac-ink)', opacity: 0.7, marginTop: 6 }}>{k.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="row" style={{ justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--hairline)' }}>
          <Eyebrow>{roadmap.now.wave} · now (June 2026) · {roadmap.now.planned} stories</Eyebrow>
          <button className="btn btn--ghost" onClick={copy} style={{ padding: '5px 11px', fontSize: 11.5 }}><Icon name={copied ? 'check' : 'doc'} size={13} />{copied ? 'Copied' : 'Copy report'}</button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18, lineHeight: 1.5, maxWidth: 820 }}>
            The next 30 days is one OKR. Every story here either puts Lex in the analyst's hands every standup, makes skills visible, or instruments the OKR so we can prove progress on June 30.
          </p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {roadmap.stories_now.map((s) => (
              <div key={s.id} className="card card--hover" style={{ padding: '16px 18px' }}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ font: '600 10px/1 var(--font-mono)', color: 'var(--faint)' }}>{s.id}</span>
                  <span className={'spill spill--' + (s.status === 'in-progress' ? 'plum' : 'neutral')} style={{ fontSize: 9 }}><span className="spill__dot" />{s.status === 'in-progress' ? 'IN PROGRESS' : 'PLANNED'}</span>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, lineHeight: 1.45 }}>{s.note}</div>
                <div style={{ font: '500 9.5px/1 var(--font-mono)', color: 'var(--faint)', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--hairline)' }}>{s.sp} SP</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- PLACEHOLDER (Skills / Conventions) ---------- */
function Placeholder({ title, icon, note }) {
  return (
    <div className="stack" style={{ gap: 22 }}>
      <PageHead eyebrow={title} title={title} />
      <div className="card" style={{ padding: '56px 40px', textAlign: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--elevated)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', marginBottom: 16 }}>
          <Icon name={icon} size={20} />
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{title} comes next.</p>
        <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6, maxWidth: 380, marginInline: 'auto', lineHeight: 1.5 }}>{note}</p>
      </div>
    </div>
  );
}

Object.assign(window, { Metrics, Tokens, Roadmap, Placeholder });
