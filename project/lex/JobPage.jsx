/* Lex prototype — Job page. Top-level tabs: Review (deliverable +
   sections + a sticky review rail) and A/B Lab (the experiment system).
   Sections are clean collapsible cards, not heavy accordions. */

function Section({ icon, title, status, children, defaultOpen = true, right }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="row" onClick={() => setOpen(o => !o)}
        style={{ justifyContent: 'space-between', padding: '16px 22px', cursor: 'pointer', userSelect: 'none' }}>
        <div className="row" style={{ gap: 10 }}>
          <Icon name={open ? 'chevronDown' : 'chevronRight'} size={15} style={{ color: 'var(--faint)' }} />
          {icon && <Icon name={icon} size={15} style={{ color: 'var(--muted)' }} />}
          <span className="label-mono" style={{ margin: 0, fontSize: 11.5 }}>{title}</span>
          {status}
        </div>
        {right}
      </div>
      {open && <div style={{ padding: '4px 26px 26px', animation: 'fade-in 180ms' }}>{children}</div>}
    </div>
  );
}
window.Section = Section;

function CostChips({ job }) {
  const items = [['contract', 0.31], ['build', 0.48], ['verify', 2.14], ['summary', 0.50]];
  return (
    <div style={{ marginTop: 22, padding: '18px 20px', background: 'var(--bg-2)', borderRadius: 10 }}>
      <div className="row" style={{ gap: 28, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <div>
          <span style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>Amortized seat share</span>
          <div className="row" style={{ gap: 8, alignItems: 'baseline', marginTop: 7 }}>
            <span style={{ font: '500 24px/1 var(--font-display)', letterSpacing: '-0.02em' }}>${job.seat != null ? job.seat.toFixed(4) : '—'}</span>
          </div>
        </div>
        <div><span style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>Marginal</span>
          <div style={{ fontSize: 15, color: 'var(--ink)', marginTop: 9 }}>$0.00</div></div>
        <div><span style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>List-price ref</span>
          <div style={{ fontSize: 15, color: 'var(--muted)', marginTop: 9 }}>${job.list != null ? job.list.toFixed(2) : '—'}</div></div>
      </div>
      <div className="row" style={{ gap: 18, marginTop: 16, flexWrap: 'wrap' }}>
        {items.map(([l, v]) => (
          <span key={l} className="row" style={{ gap: 7 }}>
            <span style={{ font: '500 10.5px/1 var(--font-mono)', color: 'var(--faint)', textTransform: 'capitalize' }}>{l}:</span>
            <span style={{ font: '600 11px/1 var(--font-mono)', color: 'var(--ink-2)' }}>${v.toFixed(2)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Summary({ job }) {
  return (
    <div>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: 760 }}>
        This job tracks the count of distinct active users in each plan tier, broken out by ISO week, across the trailing 10-day window. It feeds the growth team's daily WAU-by-tier dashboard and is scoped to active accounts only. Because 10 days spans 2 to 3 ISO weeks, boundary weeks are partial — those rows carry an <code style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--plum-3)', background: 'var(--plum-soft)', padding: '1px 5px', borderRadius: 4 }}>is_partial_week</code> flag so readers can interpret the count in context.
      </p>
      <CostChips job={job} />
    </div>
  );
}

function Contract() {
  const cols = [
    ['iso_week', 'derived', 'ISO week start date (Monday) bucketing user activity into weekly windows.'],
    ['plan_tier', 'dim_plans', 'Plan tier of the account the user belongs to (free, starter, growth, enterprise).'],
    ['weekly_active_users', 'derived', 'Count of distinct users with at least one qualifying event in the ISO week, scoped to active accounts.'],
  ];
  const qs = [
    'How many distinct active users were there per plan tier in each ISO week of the last 10 days?',
    'Which plan tier has the largest weekly active user base in the trailing 10-day window?',
    'How does weekly active user volume vary across plan tiers week over week within the last 10 days?',
  ];
  return (
    <div className="stack" style={{ gap: 22 }}>
      <div>
        <div style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 12 }}>Business questions</div>
        <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {qs.map((q, i) => <li key={i} style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{q}</li>)}
        </ol>
      </div>
      <div>
        <div style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 10 }}>Grain</div>
        <p style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>One row represents one plan tier per ISO week within the last 10 days.</p>
      </div>
      <div>
        <div style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 12 }}>Requested columns</div>
        <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden' }}>
          <div className="row" style={{ padding: '10px 16px', background: 'var(--bg-2)', font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
            <span style={{ width: 200 }}>Name</span><span style={{ width: 100 }}>Source</span><span style={{ flex: 1 }}>Description</span>
          </div>
          {cols.map(([n, s, d], i) => (
            <div key={n} className="row" style={{ padding: '13px 16px', borderTop: '1px solid var(--hairline)', alignItems: 'flex-start' }}>
              <span style={{ width: 200, font: '500 12px/1.4 var(--font-mono)', color: 'var(--ink)' }}>{n}</span>
              <span style={{ width: 100, fontSize: 12.5, color: 'var(--muted)' }}>{s}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobPage({ job, onGo, onOpenJob }) {
  const [tab, setTab] = useState('review');
  const { experiments } = window.LEX;
  const isFocus = job.slug === window.LEX.focusSlug;

  useEffect(() => { setTab('review'); window.scrollTo(0, 0); }, [job.slug]);

  const statusBadge = job.phase === 'done'
    ? <Spill variant="success" filled>DONE</Spill>
    : job.phase === 'review' ? <Spill variant="plum" filled>IN REVIEW</Spill>
    : <Spill variant="neutral" filled>{job.phase.toUpperCase()}</Spill>;

  return (
    <div className="stack" style={{ gap: 20, maxWidth: 1240 }}>
      {/* header */}
      <div>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <button className="btn btn--subtle" style={{ marginLeft: -8 }} onClick={() => onGo('pipeline')}>
            <Icon name="chevronLeft" size={14} />Pipeline board
          </button>
          <div className="row" style={{ gap: 8, flex: '0 0 auto' }}>
            {job.seat != null && <Badge variant="plum" style={{ fontSize: 10.5, whiteSpace: 'nowrap' }}>SEAT-SHARE&nbsp;${job.seat.toFixed(4)}</Badge>}
            <Btn variant="ghost" onClick={() => setTab('ablab')}><Icon name="beaker" size={14} />Run A/B test</Btn>
          </div>
        </div>
        <div className="hero__eyebrow" style={{ marginBottom: 12 }}>
          <Icon name={job.phase === 'review' ? 'inbox' : 'doc'} size={13} />
          {job.phase === 'review' ? 'PEER REVIEW' : job.phase === 'done' ? 'SHIPPED' : 'IN PIPELINE'} · {job.slug.toUpperCase()}
        </div>
        <h1 className="hero__title" style={{ fontSize: 31, lineHeight: 1.12, maxWidth: 760 }}>{job.title}</h1>
        <div className="row" style={{ gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          {statusBadge}
          <span className="spill spill--neutral"><Icon name="gitCommit" size={12} />{job.head}</span>
          <span className="spill spill--neutral"><Icon name="clock" size={12} />Updated {job.updated}</span>
          {job.ctes && <span className="spill spill--neutral"><Icon name="code" size={12} />{job.ctes} CTEs</span>}
        </div>
      </div>

      {/* top-level tabs */}
      <div className="tabs" style={{ gap: 2 }}>
        {[['review', 'Review', null], ['ablab', 'A/B Lab', experiments.length]].map(([id, label, n]) => (
          <div key={id} className={'tab' + (tab === id ? ' tab--active' : '')} onClick={() => setTab(id)} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <Icon name={id === 'review' ? 'check' : 'beaker'} size={14} />{label}
            {n != null && <span style={{ font: '600 9.5px/1 var(--font-mono)', padding: '2px 6px', borderRadius: 999, background: tab === id ? 'var(--plum-soft)' : 'var(--elevated)', color: tab === id ? 'var(--plum-3)' : 'var(--muted)' }}>{n}</span>}
          </div>
        ))}
      </div>

      {tab === 'review' ? (
        <div className="grid" style={{ gridTemplateColumns: 'minmax(0,1.62fr) 360px', gap: 20, alignItems: 'start' }}>
          <div className="stack" style={{ gap: 16 }}>
            <Section icon="doc" title="Summary"><Summary job={job} /></Section>
            {isFocus && <Section icon="book" title="Contract" defaultOpen={false}><Contract /></Section>}
            <Deliverables job={job} />
            <VerifyResults />
          </div>
          <div style={{ position: 'sticky', top: 84 }}>
            <ReviewRail job={job} />
          </div>
        </div>
      ) : (
        <ABLab job={job} onOpenJob={onOpenJob} />
      )}
    </div>
  );
}

window.JobPage = JobPage;
