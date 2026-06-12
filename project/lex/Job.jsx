/* Lex — Job page. Header + Overview/A/B tabs + accordions + combined review rail. */

function ReviewRail({ job }) {
  const { user } = window.LEX;
  const [decision, setDecision] = React.useState(null);
  const [name, setName] = React.useState(user.name);
  const [comment, setComment] = React.useState('');
  const [thread, setThread] = React.useState(job.reviews);
  const [done, setDone] = React.useState(job.status === 'done');

  const submit = () => {
    if (!decision && !comment.trim()) return;
    const entry = { who: user.initials, name, initials: user.initials, decision: decision || 'comment', when: 'just now', note: comment.trim() || (decision === 'approved' ? 'Approved.' : 'Requested changes.') };
    setThread([...thread, entry]);
    if (decision) setDone(true);
    setComment(''); setDecision(null);
  };

  const decMeta = { approved: ['badge--success', 'APPROVED'], changes: ['badge--warning', 'CHANGES'], comment: ['', 'COMMENT'] };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'sticky', top: 88 }}>
      <div className="row" style={{ justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--hairline)' }}>
        <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>Review</span>
        {done
          ? <span className="badge badge--success"><Icon name="check" size={11} />Approved</span>
          : <span className="badge badge--plum">Awaiting review</span>}
      </div>

      {/* composer */}
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--hairline)' }}>
        <div className="input-label">Your decision</div>
        <div className="row" style={{ gap: 8, marginBottom: 16 }}>
          {[['approved', 'Approve', 'check', 'var(--success)'], ['changes', 'Request changes', 'flag', 'var(--warning)']].map(([id, label, ic, c]) => (
            <button key={id} onClick={() => setDecision(decision === id ? null : id)} className="row"
              style={{ flex: 1, justifyContent: 'center', gap: 7, padding: '9px 10px', borderRadius: 8, cursor: 'pointer', font: '500 12px/1 var(--font-sans)',
                border: '1px solid ' + (decision === id ? c : 'var(--hairline-2)'),
                background: decision === id ? (id === 'approved' ? 'var(--success-soft)' : 'var(--warning-soft)') : 'var(--surface)',
                color: decision === id ? c : 'var(--ink-2)' }}>
              <Icon name={ic} size={14} />{label}
            </button>
          ))}
        </div>
        <div className="input-label">Your name</div>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: 14 }} />
        <div className="input-label">Comment</div>
        <textarea className="textarea" placeholder="Add a comment or notes for the analyst…" value={comment} onChange={(e) => setComment(e.target.value)} style={{ minHeight: 80, marginBottom: 14 }} />
        <button className="btn btn--primary" onClick={submit} disabled={!decision && !comment.trim()} style={{ width: '100%' }}>
          {decision === 'approved' ? 'Approve job' : decision === 'changes' ? 'Request changes' : 'Post comment'}
        </button>
      </div>

      {/* unified thread */}
      <div style={{ padding: '16px 22px' }}>
        <Eyebrow style={{ marginBottom: 14 }}>Activity · {thread.length}</Eyebrow>
        {thread.length === 0 && <div style={{ fontSize: 12.5, color: 'var(--faint)', padding: '8px 0 4px' }}>No reviews yet — be the first to weigh in.</div>}
        <div className="stack" style={{ gap: 16 }}>
          {thread.map((r, i) => {
            const [cls, label] = decMeta[r.decision] || decMeta.comment;
            return (
              <div key={i} className="row" style={{ gap: 11, alignItems: 'flex-start' }}>
                <span className="avatar avatar--sm" style={{ borderRadius: 8, width: 28, height: 28, flex: '0 0 auto', background: 'var(--past-mint)', color: 'var(--past-mint-ink)', fontSize: 10 }}>{r.initials || r.who}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>{r.name || r.who}</span>
                    {label && <span className={'badge ' + cls} style={{ fontSize: 8.5 }}>{label}</span>}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5, marginTop: 5 }}>{r.note}</div>
                  <div style={{ font: '500 9.5px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--faint)', marginTop: 6 }}>{r.when}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Job({ jobId, initialTab, onBack, onNavigate }) {
  const job = window.LEX.jobs.find((j) => j.id === jobId);
  const [tab, setTab] = React.useState(initialTab || 'overview');
  if (!job) return null;
  const m = LEX_STATUS[job.status];
  const hasAB = job.ab && job.ab.length > 0;

  return (
    <div className="stack" style={{ gap: 22 }}>
      {/* header bar */}
      <div className="row" style={{ gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn--subtle" style={{ marginLeft: -8 }} onClick={onBack}>
          <Icon name="chevronRight" size={14} style={{ transform: 'rotate(180deg)' }} />Pipeline
        </button>
        <span style={{ color: 'var(--faint)' }}>/</span>
        <span style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--ink-2)' }}>{job.id}</span>
        <StatusPill status={job.status} />
        <VersionChip v={job.version} muted={job.status === 'contract'} />
        <div className="row" style={{ gap: 10, marginLeft: 'auto' }}>
          {hasAB && <button className="btn btn--ghost" onClick={() => setTab('ab')}><Icon name="sync" size={14} />Run A/B test</button>}
          {job.seatShare !== '—' && (
            <span className="row" style={{ gap: 7, padding: '7px 12px', borderRadius: 8, background: 'var(--plum-soft)', font: '600 11px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--plum-3)' }}>
              SEAT-SHARE {job.seatShare}
            </span>
          )}
        </div>
      </div>

      {/* title */}
      <div>
        <Eyebrow style={{ marginBottom: 9 }}>{job.status === 'review' ? 'Peer review' : job.status === 'contract' ? 'Contract draft' : 'Shipped'} · {job.id}</Eyebrow>
        <h2 style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.03em' }}>{job.title}</h2>
        <div className="row" style={{ gap: 14, marginTop: 12 }}>
          <span className="spill spill--neutral"><Icon name="user" size={12} />{job.owner}</span>
          <span className="spill spill--neutral"><Icon name="clock" size={12} />{job.updated}</span>
          {job.iteration > 0 && <span className="spill spill--neutral"><Icon name="layers" size={12} />Iteration {job.iteration} · {job.ctes} CTEs</span>}
        </div>
      </div>

      {/* tabs */}
      <div className="tabs">
        <div className={'tab' + (tab === 'overview' ? ' tab--active' : '')} onClick={() => setTab('overview')}>Overview</div>
        {hasAB && <div className={'tab' + (tab === 'ab' ? ' tab--active' : '')} onClick={() => setTab('ab')}>A/B Lab · {job.ab.length}</div>}
      </div>

      {tab === 'ab' && hasAB ? (
        <ABLab job={job} />
      ) : (
        <div className="grid" style={{ gridTemplateColumns: job.status === 'contract' ? '1fr' : '1.62fr 1fr', gap: 20, alignItems: 'start' }}>
          <div className="stack" style={{ gap: 14 }}>
            <Accordion title="Summary" defaultOpen>
              <SummaryPanel job={job} />
            </Accordion>
            <Accordion title="Contract" meta={job.questions.length + ' questions'} defaultOpen={job.status === 'contract'}>
              <ContractPanel job={job} />
            </Accordion>
            {job.deliverables.length > 0 && (
              <Accordion title="Deliverables" meta={job.deliverables.length + ' files · cloud'}
                badge={<span className="row" style={{ gap: 6, font: '500 11px/1 var(--font-mono)', color: 'var(--muted)' }}><Icon name="download" size={13} />.zip</span>}>
                <DeliverablesPanel job={job} />
              </Accordion>
            )}
            {job.tests.length > 0 && (
              <Accordion title="Verify results" defaultOpen
                badge={(() => {
                  const fail = job.tests.filter((t) => t.result === 'fail').length;
                  return fail
                    ? <span className="spill spill--filled" style={{ color: 'var(--danger)', background: 'var(--danger-soft)' }}><span className="spill__dot" />{fail} FAILED</span>
                    : <span className="spill spill--success spill--filled"><span className="spill__dot" />PASS</span>;
                })()}>
                <VerifyPanel job={job} />
              </Accordion>
            )}
          </div>

          {job.status !== 'contract' && (
            <ReviewRail job={job} />
          )}
        </div>
      )}
    </div>
  );
}
window.Job = Job;
